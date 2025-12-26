'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface Appointment {
  id: string;
  user_id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string;
}

export default function AdminAppointmentsPage() {
  const appointments: Appointment[] = [
    {
      id: 'ap1',
      user_id: 'user1',
      service_type: 'Marriage Counseling',
      appointment_date: '2025-12-22',
      appointment_time: '14:00',
      status: 'pending',
      notes: 'Initial consultation.',
    },
    {
      id: 'ap2',
      user_id: 'user2',
      service_type: 'Religious Guidance',
      appointment_date: '2025-12-23',
      appointment_time: '10:00',
      status: 'confirmed',
      notes: 'Regarding family matters.',
    },
  ];

  const appointmentColumns: { key: keyof Appointment | 'actions'; header: string; render?: (item: Appointment) => ReactNode }[] = [
    { key: 'user_id', header: 'User ID' },
    { key: 'service_type', header: 'Service Type' },
    { key: 'appointment_date', header: 'Date' },
    { key: 'appointment_time', header: 'Time' },
    { key: 'status', header: 'Status' },
    { key: 'notes', header: 'Notes' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (appointment: Appointment) => {
    console.log('Edit appointment:', appointment);
    // TODO: Implement edit functionality (e.g., status update)
  };

  const handleDelete = (appointment: Appointment) => {
    console.log('Delete appointment:', appointment);
    // TODO: Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Appointments</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Appointment
        </button>
      </div>
      <AdminTable<Appointment>
        data={appointments}
        columns={appointmentColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
