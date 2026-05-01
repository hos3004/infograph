import './globals.css';
import type { Metadata } from 'next';
import { Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'فيديوجراف ',
  description: 'Internal Tool for generating infographic videos quickly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="container">
          <header className="header">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video className="text-accent" size={32} />
              فيديوجراف
            </h1>
          </header>
          {children}
          <footer style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            paddingBottom: '.3rem',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            جميع الحقوق محفوظه © حسام المغربي
          </footer>
        </div>
      </body>
    </html>
  );
}
