// BaitulMamur-Frontend/app/live-stream/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import LiveStreamPlayer from '../components/LiveStreamPlayer';
import { useTranslation } from 'react-i18next';

const LiveStreamPage = () => {
  const { t } = useTranslation();
  const [playbackId, setPlaybackId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For demonstration, let's assume a fixed UID for a live input that's always streaming.
  // In a real application, you might fetch a 'current live stream' UID from a separate endpoint,
  // or store it in your database.
  // This UID can be obtained from the Cloudflare Stream API by creating a live input.
  const FIXED_LIVE_INPUT_UID = 'YOUR_CLOUDFLARE_LIVE_INPUT_UID_HERE'; // TODO: Replace with a real UID

  useEffect(() => {
    const fetchPlaybackUrl = async () => {
      try {
        // You might have an endpoint like /api/live-stream/current-playback-id
        // which gives you the UID of the currently active stream,
        // or you can just use a fixed one if you manage streams manually.
        // For now, we'll directly use the FIXED_LIVE_INPUT_UID with the backend endpoint
        const res = await fetch(`http://localhost:5000/api/live-stream/playback-url/${FIXED_LIVE_INPUT_UID}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch playback URL');
        }
        const data = await res.json();
        setPlaybackId(data.uid); // The API should return the actual UID needed for the player
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

    if (FIXED_LIVE_INPUT_UID && FIXED_LIVE_INPUT_UID !== 'YOUR_CLOUDFLARE_LIVE_INPUT_UID_HERE') {
        fetchPlaybackUrl();
    } else {
        setError("Please configure 'FIXED_LIVE_INPUT_UID' in LiveStreamPage.tsx");
        setLoading(false);
    }

  }, [FIXED_LIVE_INPUT_UID]);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        {t('Live Stream')}
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        {t('Watch our live broadcasts and connect with the community in real-time.')}
      </p>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {loading && <div className="text-center text-gray-500">{t('Loading live stream...')}</div>}
        {error && <div className="text-center text-red-500">{t('Error loading stream:')} {error}</div>}
        {playbackId && !loading && !error && (
          <LiveStreamPlayer playbackId={playbackId} />
        )}
        {!playbackId && !loading && !error && (
            <div className="text-center text-gray-500">{t('No live stream currently active.')}</div>
        )}
      </div>
    </div>
  );
};

export default LiveStreamPage;
