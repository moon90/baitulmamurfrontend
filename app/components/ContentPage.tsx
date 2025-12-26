// components/ContentPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Content {
  id: string;
  slug: string;
  title: string;
  content: string;
  language_code: string;
}

interface ContentPageProps {
  slug: string;
}

const ContentPage = ({ slug }: ContentPageProps) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/content-pages/${slug}/${i18n.language}`);
        if (!res.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await res.json();
        setContent(data);
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

    fetchContent();
  }, [slug, i18n.language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>Content not found.</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
};

export default ContentPage;
