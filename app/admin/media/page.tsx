'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  alt_text: string;
  uploaded_at: string;
}

export default function AdminMediaPage() {
  const mediaItems: MediaItem[] = [
    {
      id: 'm1',
      file_name: 'image1.jpg',
      file_path: '/uploads/image1.jpg',
      file_type: 'image/jpeg',
      alt_text: 'Description for image 1',
      uploaded_at: '2023-02-01',
    },
    {
      id: 'm2',
      file_name: 'video1.mp4',
      file_path: '/uploads/video1.mp4',
      file_type: 'video/mp4',
      alt_text: 'Description for video 1',
      uploaded_at: '2023-02-05',
    },
  ];

  const mediaColumns: { key: keyof MediaItem | 'actions'; header: string; render?: (item: MediaItem) => ReactNode }[] = [
    { key: 'file_name', header: 'File Name' },
    { key: 'file_path', header: 'Path' },
    { key: 'file_type', header: 'Type' },
    { key: 'alt_text', header: 'Alt Text' },
    { key: 'uploaded_at', header: 'Uploaded At' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (media: MediaItem) => {
    console.log('Edit media:', media);
    // TODO: Implement edit functionality
  };

  const handleDelete = (media: MediaItem) => {
    console.log('Delete media:', media);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Media</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload New Media
        </button>
      </div>
      <AdminTable<MediaItem>
        data={mediaItems}
        columns={mediaColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
