import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import { SurveyProvider } from '@/context/SurveyContext';
import { AuthProvider } from '@/context/AuthContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Survey Pelayanan Masyarakat - Polsek Dwikora Pontianak',
  description: 'Portal Resmi Survei Kepuasan Masyarakat (SKM) Polsek Dwikora Pontianak. Transparan, Akuntabel, Presisi.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-polri-dark text-slate-100 font-sans min-h-screen flex flex-col antialiased">
        <SiteSettingsProvider>
          <Preloader />
          <AuthProvider>
            <SurveyProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </SurveyProvider>
          </AuthProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
