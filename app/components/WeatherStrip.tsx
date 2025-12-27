'use client';

import { useEffect, useMemo, useState } from 'react';

type WeatherDay = {
  date: string;
  min: number;
  max: number;
  code: number;
};

type WeatherData = {
  city: string;
  temp: number;
  code: number;
  days: WeatherDay[];
};

function weatherLabel(code: number) {
  if (code === 0) return 'Clear';
  if ([1, 2].includes(code)) return 'Mostly clear';
  if (code === 3) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';
  if ([71, 73, 75, 77].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Showers';
  if ([95, 96, 99].includes(code)) return 'Thunder';
  return 'Weather';
}

export default function WeatherStrip() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const url =
        'https://api.open-meteo.com/v1/forecast?latitude=48.2082&longitude=16.3738&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Vienna';
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      const days = data.daily.time.map((date: string, index: number) => ({
        date,
        min: data.daily.temperature_2m_min[index],
        max: data.daily.temperature_2m_max[index],
        code: data.daily.weather_code[index],
      }));
      setWeather({
        city: 'Vienna',
        temp: data.current.temperature_2m,
        code: data.current.weather_code,
        days,
      });
    };
    fetchWeather();
  }, []);

  const items = useMemo(() => weather?.days.slice(0, 7) ?? [], [weather]);

  if (!weather) {
    return (
      <div className="text-sm text-[#4f5b54]">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e6dcc7] rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="min-w-[160px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#0f6b4f]">
            {weather.city}
          </p>
          <p className="text-lg font-display text-[#0f6b4f] mt-1">
            Weather
          </p>
          <p className="text-3xl text-[#0f6b4f] mt-2">
            {Math.round(weather.temp)}C
          </p>
          <p className="text-sm text-[#4f5b54]">
            {weatherLabel(weather.code)}
          </p>
        </div>
        <div className="flex-1">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          {items.map((day) => {
            const label = new Date(`${day.date}T00:00:00`).toLocaleDateString('en-GB', {
              weekday: 'short',
            });
            return (
              <div
                key={day.date}
                className="min-w-[120px] bg-[#f4efe4] rounded-xl p-3 text-center"
              >
                <p className="text-xs uppercase tracking-wider text-[#0f6b4f]">{label}</p>
                <p className="text-[10px] text-[#4f5b54] mt-1">{weatherLabel(day.code)}</p>
                <div className="mt-2 text-sm text-[#0f6b4f]">
                  <span className="font-semibold">{Math.round(day.max)}C</span>
                  <span className="text-[#8a8174] ml-2">{Math.round(day.min)}C</span>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
