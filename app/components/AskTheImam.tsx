// components/AskTheImam.tsx
'use client';

import { useState } from 'react';

const AskTheImam = () => {
  const [question, setQuestion] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/imam-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'x-auth-token': 'YOUR_JWT_TOKEN_HERE', // TODO: Add auth token if user is logged in
        },
        body: JSON.stringify({ question, is_public: isPublic }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to submit question');
      }

      setMessage('Question submitted successfully!');
      setQuestion('');
      setIsPublic(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Ask the Imam a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">
            Your Question:
          </label>
          <textarea
            id="question"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={5}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="isPublic"
            className="mr-2 leading-tight"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="isPublic" className="text-sm text-gray-700">
            Make this question public (answer will be visible to everyone)
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Question
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default AskTheImam;
