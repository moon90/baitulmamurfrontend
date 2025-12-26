import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface EventCardProps {
  id: string;
  title: string; // The existing title field
  description: string; // The existing description field
  title_en?: string;
  title_de?: string;
  description_en?: string;
  description_de?: string;
  start_time: string;
  end_time: string;
  location: string; // The existing location field
  location_en?: string;
  location_de?: string;
  image_url?: string;
  category?: string;
}

const EventCard = ({
  id,
  title: defaultTitle,
  description: defaultDescription,
  location: defaultLocation,
  title_en,
  title_de,
  description_en,
  description_de,
  location_en,
  location_de,
  start_time,
  end_time,
  image_url,
  category,
}: EventCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Determine which language fields to use
  const title = currentLanguage === 'de' ? (title_de || defaultTitle) : (title_en || defaultTitle);
  const description = currentLanguage === 'de' ? (description_de || defaultDescription) : (description_en || defaultDescription);
  const eventLocation = currentLanguage === 'de' ? (location_de || defaultLocation) : (location_en || defaultLocation);

  // Format date and time
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  const formattedDate = startDate.toLocaleDateString(currentLanguage, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedStartTime = startDate.toLocaleTimeString(currentLanguage, { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = endDate.toLocaleTimeString(currentLanguage, { hour: '2-digit', minute: '2-digit' });


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      {image_url && (
        <div className="relative h-48 w-full">
          <Image
            src={image_url}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary mb-2 flex-grow">
          {title}
        </h3>
        <p className="text-neutral-dark text-base mb-4">
          {description}
        </p>
        <div className="flex items-center text-neutral-dark mb-2 text-sm">
          <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          <span>{formattedDate} {t('at')} {formattedStartTime} - {formattedEndTime}</span>
        </div>
        <div className="flex items-center text-neutral-dark text-sm">
          <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
          <span>{eventLocation}</span>
        </div>
        {category && <p className="text-sm text-gray-500 mt-2">{t('Category')}: {t(category)}</p>}
        {/* Link to individual event page - assuming slug or ID routing */}
        <Link href={`/events/${id}`} className="mt-auto inline-block bg-accent text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200 text-sm font-medium">
          {t('Details')}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
