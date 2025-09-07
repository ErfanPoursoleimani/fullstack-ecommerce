import { AuthInitializer } from '@/app/components/auth-initializer';
import { DataInitializer } from '@/app/components/data-initializer';
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Noto_Sans_Arabic, Vazirmatn } from 'next/font/google';
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import "./globals.css";
import { MessagesProvider } from '@/app/contexts/MessagesContext';
import { MessagesContainer } from '@/app/components/ui/MessagesContainer';


const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn'
})

// Alternative: Noto Sans Arabic (supports Persian well)
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-arabic'
})


export const metadata: Metadata = {
  title: "Berenj Poursoleimani",
  description: "rice shop",
};


export default async function RootLayout({children, params}: {children: React.ReactNode, params: Promise<{ lang: string }>}) {
  const { lang } = await params
  

  return (
    <html lang={lang} className={vazirmatn.variable}>
      <body
        className={`overflow-x-hidden select-none antialiased ${vazirmatn.className}`}
        style={{color: "var(--text)"}}
      >
        <CookiesProvider>
          <AuthInitializer lang={lang}>
            <DataInitializer lang={lang}>
              <ClientLayoutWrapper lang={lang}>
                <MessagesProvider>
                  {children}
                  <MessagesContainer position="top-center" />
                </MessagesProvider>
              </ClientLayoutWrapper>
            </DataInitializer>
          </AuthInitializer>
        </CookiesProvider>
      </body>
    </html>
  );
}
