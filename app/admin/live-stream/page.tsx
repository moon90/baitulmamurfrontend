// BaitulMamur-Frontend/app/admin/live-stream/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AdminTable from '../components/AdminTable';
// Assume a utility for fetching with auth token
import { fetchWithAuth } from '../../../utils/fetchWithAuth'; // Assuming this utility exists or will be created

interface LiveInput {
  id: string;
  uid: string;
  name: string;
  stream_key: string;
  rtmps_url: string;
  status: string;
  created: string;
  playbackUrl?: string; // Derived
}

export default function AdminLiveStreamPage() {
  const { t } = useTranslation();
  const [liveInputs, setLiveInputs] = useState<LiveInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newStreamName, setNewStreamName] = useState('');
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(false);

  useEffect(() => {
    fetchLiveInputs();
  }, []);

  const fetchLiveInputs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming fetchWithAuth handles JWT token inclusion
      const res = await fetchWithAuth('/api/live-stream/list', {
        method: 'GET',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || 'Failed to fetch live inputs');
      }
      const data = await res.json();
      // Cloudflare API returns result under data.result. If successful, it's an array of live inputs.
      const fetchedInputs = data.result.map((input: any) => ({
        id: input.uid, // Map uid to id
        uid: input.uid,
        name: input.meta.name, // Flatten the name
        stream_key: input.streamKey,
        rtmps_url: input.rtmps.url,
        status: input.status,
        created: input.created,
        playbackUrl: `https://iframe.videodelivery.net/${input.uid}`, // Cloudflare playback URL format
      }));
      setLiveInputs(fetchedInputs);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetchWithAuth('/api/live-stream/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStreamName, recording: { mode: isRecordingEnabled ? 'automatic' : 'off' } }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || 'Failed to create live input');
      }

      setNewStreamName('');
      setIsRecordingEnabled(false);
      fetchLiveInputs(); // Refresh list
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during stream creation');
      }
    }
  };

  const liveInputColumns: { key: keyof LiveInput | 'actions'; header: string; render?: (item: LiveInput) => React.ReactNode }[] = [
    { key: 'name', header: 'Stream Name' },
    { key: 'uid', header: 'UID' },
    { key: 'stream_key', header: 'Stream Key' },
    { key: 'rtmps_url', header: 'RTMP URL' },
    { key: 'status', header: 'Status' },
    { key: 'created', header: 'Created' },
    { key: 'playbackUrl', header: 'Playback URL', render: (item: LiveInput) => <a href={item.playbackUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{t('View')}</a> },
    { key: 'actions', header: 'Actions' }, // For future actions like delete/stop
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(t('Copied to clipboard!'));
  };

  if (loading) return <div className="container mx-auto p-4">{t('Loading live streams...')}</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{t('Error:')} {error}</div>;


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{t('Manage Live Streams')}</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('Create New Live Stream Input')}</h2>
        <form onSubmit={handleCreateStream} className="space-y-4">
          <div>
            <label htmlFor="streamName" className="block text-sm font-medium text-gray-700">{t('Stream Name')}</label>
            <input
              type="text"
              id="streamName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newStreamName}
              onChange={(e) => setNewStreamName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableRecording"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={isRecordingEnabled}
              onChange={(e) => setIsRecordingEnabled(e.target.checked)}
            />
            <label htmlFor="enableRecording" className="ml-2 block text-sm text-gray-900">{t('Enable Automatic Recording')}</label>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('Create Stream Input')}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">{t('Existing Live Stream Inputs')}</h2>
      {liveInputs.length === 0 ? (
        <p>{t('No live stream inputs found.')}</p>
      ) : (
        <AdminTable<LiveInput>
          data={liveInputs}
          columns={liveInputColumns}
          onEdit={(item) => handleCopy(item.stream_key)} // Example: Copy stream key
          onDelete={(item) => handleCopy(item.rtmps_url)} // Example: Copy RTMP URL
        />
      )}
      <p className="mt-4 text-sm text-gray-600">
        {t('Note: Edit button copies Stream Key, Delete button copies RTMP URL for demonstration.')}
      </p>
    </div>
  );
}

// TODO: Create utils/fetchWithAuth.ts or integrate JWT token in fetch requests
// Example fetchWithAuth (replace with actual implementation based on your auth system)
// export async function fetchWithAuth(url: string, options?: RequestInit) {
//   const token = localStorage.getItem('token'); // or wherever your JWT token is stored
//   const headers = {
//     ...options?.headers,
//     'x-auth-token': token,
//   };
//   const response = await fetch(url, { ...options, headers });
//   return response;
// }
