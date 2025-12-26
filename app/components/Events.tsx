// BaitulMamur-Frontend/app/components/Events.tsx
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
}

const Events = () => {
  const { t } = useTranslation();
  // Dummy data for events - replace with API call later
  const events: Event[] = [
    {
      id: 'e1',
      title: 'Community Iftar Gathering',
      description: 'Break your fast with the community in a spiritual atmosphere.',
      date: 'Friday, March 10, 2026',
      time: '6:30 PM',
      location: 'Baitul Mamur Banquet Hall',
      image_url: 'https://via.placeholder.com/400x250/228B22/FFFFFF?text=Iftar',
    },
    {
      id: 'e2',
      title: 'Youth Sports Day',
      description: 'An exciting day of sports and activities for the youth.',
      date: 'Saturday, March 18, 2026',
      time: '10:00 AM',
      location: 'Local Sports Complex',
      image_url: 'https://via.placeholder.com/400x250/008080/FFFFFF?text=Youth+Sports',
    },
    {
      id: 'e3',
      title: 'Sisters Halaqa',
      description: 'Weekly gathering for sisters to learn and grow in faith.',
      date: 'Wednesday, March 15, 2026',
      time: '11:00 AM',
      location: 'Sisters Activity Room',
      image_url: 'https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Sisters+Halaqa',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
          {event.image_url && (
            <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2 text-green-700">{t(event.title)}</h3>
            <p className="text-gray-600 mb-4">{t(event.description)}</p>
            <div className="flex items-center text-gray-700 mb-2">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              <span>{event.date} - {event.time}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              <span>{event.location}</span>
            </div>
            {/* Link to event details page, if applicable */}
            <div className="mt-4">
              <Link href={`/events/${event.id}`} className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200">
                {t('View Details')}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;