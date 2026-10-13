import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'MarketLearn — Learn. Apply. Grow Your Business Online.',
  description: 'Interactive digital marketing training and business-growth platform designed specifically for small-business owners. Practical courses, AI-style tools, quizzes, and live progress tracking.',
  keywords: 'digital marketing for small business, marketing courses, local SEO, content marketing, growth platform, marketing tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-surface-bg text-txt-primary selection:bg-brand-100 selection:text-brand-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
