'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface EducationalProgram {
  id: string;
  title: string;
  description: string;
  target_audience: string;
  start_date: string;
  end_date: string;
  instructor: string;
  price: number;
}

export default function AdminEducationalProgramsPage() {
  const educationalPrograms: EducationalProgram[] = [
    {
      id: 'ep1',
      title: 'Quranic Studies for Beginners',
      description: 'An introductory course to Quranic Arabic and recitation.',
      target_audience: 'Adults',
      start_date: '2026-01-15',
      end_date: '2026-03-15',
      instructor: 'Sheikh Abdullah',
      price: 50.00,
    },
    {
      id: 'ep2',
      title: 'Islamic Ethics for Youth',
      description: 'Exploring ethical principles in Islam relevant to young people.',
      target_audience: 'Youth',
      start_date: '2026-02-01',
      end_date: '2026-02-28',
      instructor: 'Ustadha Fatima',
      price: 30.00,
    },
  ];

  const educationalProgramColumns: { key: keyof EducationalProgram | 'actions'; header: string; render?: (item: EducationalProgram) => ReactNode }[] = [
    { key: 'title', header: 'Title' },
    { key: 'description', header: 'Description' },
    { key: 'target_audience', header: 'Target Audience' },
    { key: 'start_date', header: 'Start Date' },
    { key: 'end_date', header: 'End Date' },
    { key: 'instructor', header: 'Instructor' },
    { key: 'price', header: 'Price' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (program: EducationalProgram) => {
    console.log('Edit program:', program);
    // TODO: Implement edit functionality
  };

  const handleDelete = (program: EducationalProgram) => {
    console.log('Delete program:', program);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Educational Programs</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Program
        </button>
      </div>
      <AdminTable<EducationalProgram>
        data={educationalPrograms}
        columns={educationalProgramColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
