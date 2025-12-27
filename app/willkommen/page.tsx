import Link from 'next/link';

import PrayerTimes from '../components/PrayerTimes';
import PrayerTimesCountdown from '../components/PrayerTimesCountdown';
import PrayerTimesTable from '../components/PrayerTimesTable';
import WeatherStrip from '../components/WeatherStrip';

type CardItem = {
  title: string;
  image: string;
  href?: string;
};

type SectionData = {
  title: string;
  subtitle?: string;
  items: CardItem[];
  columns?: string;
};

const navLinks = [
  { label: 'Welcome', href: '/willkommen' },
  { label: 'The Mosque', href: '/about' },
  { label: 'Service', href: '/contact' },
  { label: 'Education & Culture', href: '/education' },
  { label: 'Events', href: '/events' },
  { label: 'Media', href: '/news' },
  { label: 'Social', href: '/contact' },
  { label: 'App', href: '/mobile-app' },
];

const highlightCards: CardItem[] = [
  { title: 'Ask the Imam', image: '', href: '/ask-the-imam' },
  { title: 'Online Appointment Booking', image: '', href: '/contact' },
  { title: 'Friday Sermon & Prayer', image: '', href: '/events' },
];

const adminSection: SectionData = {
  title: 'Administration & Opening Hours',
  subtitle: 'Our offices and visitor services',
  items: [
    { title: 'Administration Office', image: '' },
    { title: "Director's Office", image: '' },
    { title: 'Office of the Imams', image: '' },
    { title: 'MWL Office', image: '' },
  ],
  columns: 'lg:grid-cols-4',
};

const childrenSection: SectionData = {
  title: 'Children & Youth',
  subtitle: 'Programs for families, kids, and teens',
  items: [
    { title: 'Children', image: '', href: '/education' },
    { title: 'Youth', image: '', href: '/education' },
    { title: 'Islam 4 Kids Club', image: '', href: '/education' },
    { title: 'Al-Manara Arabic Kids Club', image: '', href: '/education' },
    { title: 'Muslim Youth Club', image: '', href: '/education' },
  ],
  columns: 'lg:grid-cols-5',
};

const quranSection: SectionData = {
  title: "Qur'an & Education",
  subtitle: 'Courses and structured programs',
  items: [
    { title: "IQRA Qur'an Program", image: '', href: '/education' },
    { title: 'Education Overview', image: '', href: '/education' },
    { title: 'Islam Basic Course', image: '', href: '/education' },
  ],
};

const coursesSection: SectionData = {
  title: 'Courses & Workshops',
  subtitle: 'Seasonal and continuous learning',
  items: [
    { title: 'Student Mentoring 2023', image: '', href: '/education' },
    { title: 'Summer Program 2023', image: '', href: '/education' },
    { title: 'Summer Program for Children 2025', image: '', href: '/education' },
    { title: 'Adult Programs', image: '', href: '/education' },
  ],
  columns: 'lg:grid-cols-4',
};

const discoverSection: SectionData = {
  title: 'Discover the Mosque',
  subtitle: 'Visitor information and guidance',
  items: [
    { title: 'Mosque Tours', image: '', href: '/virtual-tour' },
    { title: 'Visitor Information', image: '', href: '/contact' },
    { title: 'Mosque House Rules', image: '' },
    { title: 'Mosque Dress Code', image: '' },
    { title: 'Direction Page', image: '', href: '/contact' },
  ],
  columns: 'lg:grid-cols-5',
};

const eventsSection: SectionData = {
  title: 'Events & Calendar',
  subtitle: 'Highlights across the year',
  items: [
    { title: 'Open Mosque Day', image: '', href: '/events' },
    { title: 'International & World Days', image: '', href: '/events' },
    { title: 'Eid al-Fitr', image: '', href: '/events' },
    { title: 'Eid al-Adha', image: '', href: '/events' },
    { title: 'Iftar (Breaking the Fast)', image: '', href: '/events' },
    { title: 'The Day of Arafah', image: '', href: '/events' },
  ],
  columns: 'lg:grid-cols-3',
};

const hajjSection: SectionData = {
  title: 'Hajj & Umrah',
  subtitle: 'Pilgrimage guidance and resources',
  items: [
    { title: 'Hajj', image: '' },
    { title: 'The Hajj', image: '' },
    { title: 'The Umrah', image: '' },
    { title: 'Hajj & Umrah', image: '' },
    { title: 'Umrah', image: '' },
  ],
  columns: 'lg:grid-cols-5',
};

const mediaSection: SectionData = {
  title: 'Media & Statements',
  subtitle: 'Press releases, talks, and updates',
  items: [
    { title: 'Press', image: '', href: '/news' },
    { title: 'Statements', image: '', href: '/news' },
    { title: 'IZ Talk', image: '', href: '/news' },
  ],
};

const socialSection: SectionData = {
  title: 'Social & Humanitarian',
  subtitle: 'Community care and outreach',
  items: [
    { title: 'Humanitarian', image: '' },
    { title: 'Volunteering', image: '' },
    { title: 'Zakah', image: '' },
  ],
};

const sections: SectionData[] = [
  adminSection,
  childrenSection,
  quranSection,
  coursesSection,
  discoverSection,
  eventsSection,
  hajjSection,
  mediaSection,
  socialSection,
];

function SectionGrid({ title, subtitle, items, columns }: SectionData) {
  const columnClasses = columns ?? 'lg:grid-cols-3';
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c59a2f] font-semibold">
            Islamic Center Vienna
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-[#0f6b4f] mt-2">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-sm text-[#4f5b54] mt-2 max-w-2xl">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${columnClasses} gap-6`}>
          {items.map((item) => {
            const cardContent = (
              <>
                <div className="h-44 sm:h-48 lg:h-52 bg-[#e9e2d5] flex items-center justify-center text-xs uppercase tracking-[0.3em] text-[#8a8174]">
                  Image Placeholder
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#0f6b4f] uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </>
            );

            return item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-xl bg-white border border-[#e6dcc7] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={item.title}
                className="overflow-hidden rounded-xl bg-white border border-[#e6dcc7] shadow-sm"
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function WillkommenPage() {
  return (
    <div className="bg-[#f4efe4] text-[#14221c]">
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#e6dcc7]">
            <div className="h-64 sm:h-80 lg:h-96 bg-[#d9e1d7] flex flex-col items-center justify-center text-center px-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white">
                Willkommen
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-2">
                Welcome to BAITUL MAMUR MASJID FAVORITEN
              </h1>
              <p className="text-sm sm:text-base text-white mt-3 max-w-2xl">
                A place of prayer, culture, and community service in the heart of Vienna.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <WeatherStrip />
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#0f6b4f] rounded-2xl p-8 shadow-sm">
            <PrayerTimesCountdown />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
            <div className="bg-white border border-[#e6dcc7] rounded-2xl p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#c59a2f] font-semibold">
                Welcome Message
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-[#0f6b4f] mt-2">
                Welcome to BAITUL MAMUR MASJID FAVORITEN
              </h2>
              <p className="text-sm text-[#4f5b54] mt-4 leading-relaxed">
                We are committed to serving the Muslim community and fostering dialogue
                through education, culture, and social engagement. Explore prayer times,
                events, and programs for all ages.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/prayer-times"
                  className="bg-[#0f6b4f] text-white px-4 py-2 text-xs uppercase tracking-widest rounded-full"
                >
                  Prayer Times
                </Link>
                <Link
                  href="/events"
                  className="border border-[#0f6b4f] text-[#0f6b4f] px-4 py-2 text-xs uppercase tracking-widest rounded-full"
                >
                  Events
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white via-white to-[#f6f0e5] border border-[#e6dcc7] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#c59a2f] font-semibold">
                    Today
                  </p>
                  <h3 className="font-display text-2xl text-[#0f6b4f] mt-2">
                    Prayer Times
                  </h3>
                </div>
                <span className="text-xs uppercase tracking-[0.35em] text-[#0f6b4f] bg-white px-3 py-1 rounded-full border border-[#e6dcc7]">
                  Vienna
                </span>
              </div>
              <div className="mt-5 bg-white rounded-xl border border-[#efe7d6] shadow-sm p-4">
                <PrayerTimes />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <PrayerTimesTable />
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlightCards.map((card) => (
            <Link
              key={card.title}
              href={card.href ?? '/willkommen'}
              className="overflow-hidden rounded-2xl bg-white border border-[#e6dcc7] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 bg-[#e9e2d5] flex items-center justify-center text-xs uppercase tracking-[0.3em] text-[#8a8174]">
                Image Placeholder
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[#0f6b4f] uppercase tracking-wide">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#e6dcc7] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-[#0f6b4f]">IZW Mobile App</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-[#c59a2f]">
                Download
              </span>
            </div>
            <p className="text-sm text-[#4f5b54]">
              Access prayer times, events, and news from your phone.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 bg-[#e9e2d5] flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-[#8a8174]">
                QR
              </div>
              <Link
                href="/mobile-app"
                className="text-xs uppercase tracking-widest text-[#0f6b4f]"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-white border border-[#e6dcc7] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-[#0f6b4f]">Center Updates</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-[#c59a2f]">
                Subscribe
              </span>
            </div>
            <p className="text-sm text-[#4f5b54]">
              Stay connected with important notices and announcements.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 bg-[#e9e2d5] flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-[#8a8174]">
                Notice
              </div>
              <Link
                href="/news"
                className="text-xs uppercase tracking-widest text-[#0f6b4f]"
              >
                View Notices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <SectionGrid key={section.title} {...section} />
      ))}

      <footer className="bg-[#0f6b4f] text-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Contact
            </p>
            <h3 className="font-display text-lg mt-2">BAITUL MAMUR MASJID FAVORITEN</h3>
            <p className="text-sm text-white/80 mt-2">
              1100 WIEN, SCHEUGASSE 9
              <br />
              1210 Wien
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Reach Us
            </p>
            <p className="text-sm text-white/80 mt-2">
              office@islamiccentre.at
              <br />
              +43 1 2933194
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Explore
            </p>
            <div className="mt-2 flex flex-col text-sm text-white/80 gap-2">
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
              <Link href="/education" className="hover:text-white">
                Education
              </Link>
              <Link href="/news" className="hover:text-white">
                News
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 text-xs text-white/70 px-4 py-4 text-center">
          Copyright 2025 BAITUL MAMUR MASJID FAVORITEN. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
