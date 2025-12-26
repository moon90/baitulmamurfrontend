// BaitulMamur-Frontend/app/components/LiveStreamPlayer.tsx
'use client';

import React from 'react';

interface LiveStreamPlayerProps {
  playbackId: string; // The UID from Cloudflare Stream live input
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ playbackId }) => {
  if (!playbackId) {
    return <div className="text-center text-gray-500">No live stream available.</div>;
  }

  // Cloudflare Stream player embed code
  // Docs: https://developers.cloudflare.com/stream/embed/
  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={`https://iframe.videodelivery.net/${playbackId}`}
        style={{ border: 'none' }}
        height="100%"
        width="100%"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
        title="Live Stream"
      ></iframe>
    </div>
  );
};

export default LiveStreamPlayer;
