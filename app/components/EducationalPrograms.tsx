// components/EducationalPrograms.tsx
'use client';

import { useState, useEffect } from 'react';

interface EducationalProgram {
  id: string;
  title: string;
  description: string;
  target_audience: string;
  start_date: string;
  end_date: string;
  schedule_details: string;
  instructor: string;
  price: number;
  image_url: string;
}

const EducationalPrograms = () => {
  const [programs, setPrograms] = useState<EducationalProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/educational-programs');
        if (!res.ok) {
          throw new Error('Failed to fetch educational programs');
        }
        const data = await res.json();
        setPrograms(data);
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

    fetchPrograms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map(program => (
        <div key={program.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={program.image_url || '/placeholder-image.jpg'} alt={program.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{program.title}</h3>
            <p className="text-gray-600 mb-2">{program.target_audience}</p>
            <p className="text-gray-700 mb-4">{program.description}</p>
            <p className="text-gray-800 font-semibold">{program.instructor} - ${program.price}</p>
            <p className="text-sm text-gray-500">{program.schedule_details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationalPrograms;
