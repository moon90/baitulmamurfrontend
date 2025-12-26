'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventCard from './EventCard'; // Assuming EventCard is in the same directory

interface EventItem {
  id: string;
  title: string;
  description: string;
  title_en?: string;
  title_de?: string;
  description_en?: string;
  description_de?: string;
  start_time: string;
  end_time: string;
  location: string;
  location_en?: string;
  location_de?: string;
  image_url?: string;
  category?: string;
}

interface EventsListProps {
  limit?: number; // Optional limit for number of events to display
}

const EventsList = ({ limit }: EventsListProps) => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // Assuming API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: EventItem[] = await response.json();
        // Filter out past events
        const upcoming = data.filter(event => new Date(event.end_time) > new Date());
        // Sort by start_time ascending
        upcoming.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

        setEvents(limit ? upcoming.slice(0, limit) : upcoming);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [limit]);

  if (loading) {
    return <div className="text-center text-neutral-dark">{t('Loading events...')}</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{t('Error loading events:')} {error}</div>;
  }

  if (events.length === 0) {
    return <div className="text-center text-neutral-dark">{t('No upcoming events found.')}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((item) => (
        <EventCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default EventsList;
