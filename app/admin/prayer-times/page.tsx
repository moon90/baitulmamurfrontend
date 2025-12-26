'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface PrayerTime {
  id: string;
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export default function AdminPrayerTimesPage() {
  const prayerTimes: PrayerTime[] = [
    {
      id: 'pt1',
      date: '2025-12-20',
      fajr: '05:30',
      sunrise: '07:00',
      dhuhr: '12:30',
      asr: '15:30',
      maghrib: '17:00',
      isha: '18:30',
    },
    {
      id: 'pt2',
      date: '2025-12-21',
      fajr: '05:31',
      sunrise: '07:01',
      dhuhr: '12:31',
      asr: '15:31',
      maghrib: '17:01',
      isha: '18:31',
    },
  ];

  const prayerTimeColumns: { key: keyof PrayerTime | 'actions'; header: string; render?: (item: PrayerTime) => ReactNode }[] = [
    { key: 'date', header: 'Date' },
    { key: 'fajr', header: 'Fajr' },
    { key: 'sunrise', header: 'Sunrise' },
    { key: 'dhuhr', header: 'Dhuhr' },
    { key: 'asr', header: 'Asr' },
    { key: 'maghrib', header: 'Maghrib' },
    { key: 'isha', header: 'Isha' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (prayerTime: PrayerTime) => {
    console.log('Edit prayer time:', prayerTime);
    // TODO: Implement edit functionality
  };

  const handleDelete = (prayerTime: PrayerTime) => {
    console.log('Delete prayer time:', prayerTime);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Prayer Times</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Prayer Times
        </button>
      </div>
      <AdminTable<PrayerTime>
        data={prayerTimes}
        columns={prayerTimeColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
