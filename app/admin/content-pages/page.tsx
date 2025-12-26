'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface ContentPage {
  id: string;
  slug: string;
  title: string;
  language_code: string;
  created_at: string;
}

export default function AdminContentPagesPage() {
  const contentPages: ContentPage[] = [
    {
      id: 'cp1',
      slug: 'about-us',
      title: 'About Us',
      language_code: 'en',
      created_at: '2023-01-01',
    },
    {
      id: 'cp2',
      slug: 'contact-us',
      title: 'Contact Us',
      language_code: 'en',
      created_at: '2023-01-05',
    },
    {
      id: 'cp3',
      slug: 'ueber-uns',
      title: 'Über Uns',
      language_code: 'de',
      created_at: '2023-01-10',
    },
  ];

  const contentPageColumns: { key: keyof ContentPage | 'actions'; header: string; render?: (item: ContentPage) => ReactNode }[] = [
    { key: 'title', header: 'Title' },
    { key: 'slug', header: 'Slug' },
    { key: 'language_code', header: 'Language' },
    { key: 'created_at', header: 'Created At' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (page: ContentPage) => {
    console.log('Edit content page:', page);
    // TODO: Implement edit functionality
  };

  const handleDelete = (page: ContentPage) => {
    console.log('Delete content page:', page);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Content Pages</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Content Page
        </button>
      </div>
      <AdminTable<ContentPage>
        data={contentPages}
        columns={contentPageColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
