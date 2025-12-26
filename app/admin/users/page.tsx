'use client';

import React, { ReactNode } from 'react';
import AdminTable from '../components/AdminTable';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const users: User[] = [
    { id: '1', username: 'john_doe', email: 'john@example.com', role: 'member', created_at: '2023-01-01' },
    { id: '2', username: 'admin_user', email: 'admin@example.com', role: 'admin', created_at: '2023-01-05' },
    { id: '3', username: 'imam_ali', email: 'ali@example.com', role: 'imam', created_at: '2023-01-10' },
  ];

  const userColumns: { key: keyof User | 'actions'; header: string; render?: (item: User) => ReactNode }[] = [
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'created_at', header: 'Created At' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
    // TODO: Implement edit functionality (e.g., open a modal)
  };

  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
    // TODO: Implement delete functionality (e.g., show a confirmation dialog)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New User
        </button>
      </div>
      <AdminTable<User>
        data={users}
        columns={userColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
