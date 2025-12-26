'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from './NewsCard'; // Assuming NewsCard is in the same directory

interface NewsItem {
  id: string;
  title_en: string;
  title_de: string;
  excerpt_en: string;
  excerpt_de: string;
  image_url?: string;
  slug: string;
  published_at: string;
}

interface NewsListProps {
  limit?: number; // Optional limit for number of news items to display
}

const NewsList = ({ limit }: NewsListProps) => {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news'); // Assuming API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsItem[] = await response.json();
        setNews(limit ? data.slice(0, limit) : data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  if (loading) {
    return <div className="text-center text-neutral-dark">{t('Loading news...')}</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{t('Error loading news:')} {error}</div>;
  }

  if (news.length === 0) {
    return <div className="text-center text-neutral-dark">{t('No news articles found.')}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item) => (
        <NewsCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default NewsList;
