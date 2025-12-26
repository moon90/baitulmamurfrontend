import Link from 'next/link';
import Image from 'next/image'; // Assuming Next.js Image component is desired
import { useTranslation } from 'react-i18next';

interface NewsCardProps {
  id: string;
  title_en: string;
  title_de: string;
  excerpt_en: string;
  excerpt_de: string;
  image_url?: string;
  slug: string;
  published_at?: string;
}

const NewsCard = ({
  id,
  title_en,
  title_de,
  excerpt_en,
  excerpt_de,
  image_url,
  slug,
  published_at,
}: NewsCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const title = currentLanguage === 'de' ? title_de : title_en;
  const excerpt = currentLanguage === 'de' ? excerpt_de : excerpt_en;

  // Format date if published_at is provided
  const formattedDate = published_at ? new Date(published_at).toLocaleDateString(currentLanguage, { year: 'numeric', month: 'long', day: 'numeric' }) : '';

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
        {formattedDate && <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>}
        <h3 className="text-xl font-bold text-primary mb-2 flex-grow">
          {title}
        </h3>
        <p className="text-neutral-dark text-base mb-4">
          {excerpt}
        </p>
        <Link href={`/news/${slug}`} className="mt-auto inline-block bg-accent text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200 text-sm font-medium">
          {t('Read More')}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
