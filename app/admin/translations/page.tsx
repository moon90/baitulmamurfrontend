'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface Translation {
  id: string;
  key: string;
  language_code: string;
  value: string;
  created_at: string;
}

export default function AdminTranslationsPage() {
  const translations: Translation[] = [
    {
      id: 't1',
      key: 'navbar.home',
      language_code: 'en',
      value: 'Home',
      created_at: '2023-03-01',
    },
    {
      id: 't2',
      key: 'navbar.home',
      language_code: 'de',
      value: 'Startseite',
      created_at: '2023-03-01',
    },
    {
      id: 't3',
      key: 'footer.contact',
      language_code: 'en',
      value: 'Contact Us',
      created_at: '2023-03-05',
    },
  ];

  const translationColumns: { key: keyof Translation | 'actions'; header: string; render?: (item: Translation) => ReactNode }[] = [
    { key: 'key', header: 'Key' },
    { key: 'language_code', header: 'Language' },
    { key: 'value', header: 'Value' },
    { key: 'created_at', header: 'Created At' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (translation: Translation) => {
    console.log('Edit translation:', translation);
    // TODO: Implement edit functionality
  };

  const handleDelete = (translation: Translation) => {
    console.log('Delete translation:', translation);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Translations</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Translation
        </button>
      </div>
      <AdminTable<Translation>
        data={translations}
        columns={translationColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
