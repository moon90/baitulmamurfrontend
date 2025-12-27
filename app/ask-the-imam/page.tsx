'use client';

import AskTheImam from '../components/AskTheImam';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface PublicQuestion {
  id: string;
  question: string;
  answer: string;
  asked_at: string;
  answered_at: string;
}

const AskTheImamPage = () => {
  const { t } = useTranslation();
  const [publicQuestions, setPublicQuestions] = useState<PublicQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicQuestions = async () => {
      try {
        const res = await fetch('/api/imam-questions/public');
        if (!res.ok) {
          throw new Error('Failed to fetch public questions');
        }
        const data = await res.json();
        setPublicQuestions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicQuestions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('Ask the Imam')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        {t('Have a question about Islam? Our Imam is here to provide guidance and answers based on the Quran and Sunnah. You can submit your question anonymously or publicly.')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AskTheImam />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('Publicly Answered Questions')}</h2>
          {loading && <p>{t('Loading public questions...')}</p>}
          {error && <p className="text-red-500">{t('Error loading questions:')} {error}</p>}
          {!loading && !error && publicQuestions.length === 0 && (
            <p>{t('No public questions answered yet.')}</p>
          )}
          {!loading && !error && publicQuestions.length > 0 && (
            <div className="space-y-6">
              {publicQuestions.map((q) => (
                <div key={q.id} className="bg-white shadow-md rounded-lg p-6">
                  <p className="font-semibold text-lg text-gray-700 mb-2">{t('Q: ')}{q.question}</p>
                  <p className="text-gray-800 mb-2">{t('A: ')}{q.answer}</p>
                  <p className="text-sm text-gray-500 text-right">{t('Asked on:')} {new Date(q.asked_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskTheImamPage;
