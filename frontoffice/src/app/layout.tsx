'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { FontInitializer } from '@/components/atoms/FontInitializer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/contexts/auth';
import 'react-day-picker/dist/style.css';
import { Suspense } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FontInitializer />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MainLayout>
              <Toaster position="bottom-right" />
              <Suspense
                fallback={
                  <Typography variant="cardTitle" color="primary" customClassName="mt-40">
                    Chargement...
                  </Typography>
                }
              >
                {children}
              </Suspense>
            </MainLayout>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
