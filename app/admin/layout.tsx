// BaitulMamur-Frontend/app/admin/layout.tsx
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="admin-dashboard-layout">
          <aside className="admin-sidebar">
            {/* Admin sidebar content */}
            <nav>
              <ul>
                <li><a href="/admin/users">Users</a></li>
                <li><a href="/admin/events">Events</a></li>
                <li><a href="/admin/prayer-times">Prayer Times</a></li>
                <li><a href="/admin/imam-questions">Imam Questions</a></li>
                <li><a href="/admin/appointments">Appointments</a></li>
                <li><a href="/admin/educational-programs">Educational Programs</a></li>
                <li><a href="/admin/content-pages">Content Pages</a></li>
                <li><a href="/admin/media">Media</a></li>
                <li><a href="/admin/translations">Translations</a></li>
                <li><a href="/admin/live-stream">Live Stream</a></li>
              </ul>
            </nav>
          </aside>
          <main className="admin-main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
