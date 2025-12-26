'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface ImamQuestion {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  asked_at: string;
  status: string;
  is_public: boolean;
}

export default function AdminImamQuestionsPage() {
  const imamQuestions: ImamQuestion[] = [
    {
      id: 'iq1',
      user_id: 'user1',
      question: 'What is the ruling on X?',
      answer: 'The ruling is Y.',
      asked_at: '2025-12-15T10:00:00Z',
      status: 'answered',
      is_public: true,
    },
    {
      id: 'iq2',
      user_id: 'user2',
      question: 'Can I do Z?',
      answer: '',
      asked_at: '2025-12-18T14:00:00Z',
      status: 'pending',
      is_public: false,
    },
  ];

  const imamQuestionColumns: { key: keyof ImamQuestion | 'actions'; header: string; render?: (item: ImamQuestion) => ReactNode }[] = [
    { key: 'question', header: 'Question' },
    { key: 'answer', header: 'Answer', render: (item: ImamQuestion) => (item.answer || 'N/A') },
    { key: 'status', header: 'Status' },
    { key: 'is_public', header: 'Public', render: (item: ImamQuestion) => (item.is_public ? 'Yes' : 'No') },
    { key: 'asked_at', header: 'Asked At' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (question: ImamQuestion) => {
    console.log('Edit question:', question);
    // TODO: Implement edit/answer functionality
  };

  const handleDelete = (question: ImamQuestion) => {
    console.log('Delete question:', question);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Imam Questions</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Question
        </button>
      </div>
      <AdminTable<ImamQuestion>
        data={imamQuestions}
        columns={imamQuestionColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
