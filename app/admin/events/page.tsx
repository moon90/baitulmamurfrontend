'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface Event {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  category: string;
}

export default function AdminEventsPage() {
  const events: Event[] = [
    {
      id: 'e1',
      title: 'Weekly Lecture',
      description: 'A weekly lecture on Islamic teachings.',
      start_time: '2025-12-25T19:00:00Z',
      end_time: '2025-12-25T20:00:00Z',
      location: 'Main Hall',
      category: 'Lecture',
    },
    {
      id: 'e2',
      title: 'Youth Workshop',
      description: 'Workshop for youth development.',
      start_time: '2026-01-10T10:00:00Z',
      end_time: '2026-01-10T12:00:00Z',
      location: 'Youth Center',
      category: 'Workshop',
    },
  ];

  const eventColumns: { key: keyof Event | 'actions'; header: string; render?: (item: Event) => ReactNode }[] = [
    { key: 'title', header: 'Title' },
    { key: 'description', header: 'Description' },
    { key: 'start_time', header: 'Start Time' },
    { key: 'end_time', header: 'End Time' },
    { key: 'location', header: 'Location' },
    { key: 'category', header: 'Category' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (event: Event) => {
    console.log('Edit event:', event);
    // TODO: Implement edit functionality
  };

  const handleDelete = (event: Event) => {
    console.log('Delete event:', event);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Events</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Event
        </button>
      </div>
      <AdminTable<Event>
        data={events}
        columns={eventColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
