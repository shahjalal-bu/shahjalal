import './globals.css'
import { Grand_Hotel, Lato, Luckiest_Guy, Inter } from "next/font/google";
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import GotoTop from '@/components/layout/goto-top'
import Preloader from '@/components/layout/preloader'
import { Metadata } from 'next'
import ActiveSectionContextProvider from '@/context/active-section-context'

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const grandHotel = Grand_Hotel({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-grand-hotel",
});

const luckiestGuy = Luckiest_Guy({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Md Shahjalal | Full Stack Web Developer',
    template: '%s | Md Shahjalal'
  },
  description: 'Portfolio of Md Shahjalal, a Full Stack Web Developer specializing in MERN stack (MongoDB, Express, React, Node.js). View my projects, skills, and blog.',
  keywords: ['Full Stack Developer', 'Web Developer', 'MERN Stack', 'React', 'Next.js', 'Node.js', 'Portfolio', 'Md Shahjalal'],
  authors: [{ name: 'Md Shahjalal' }],
  creator: 'Md Shahjalal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shahjalal.vercel.app', // Replace with actual URL
    title: 'Md Shahjalal | Full Stack Web Developer',
    description: 'Portfolio of Md Shahjalal, a Full Stack Web Developer specializing in MERN stack.',
    siteName: 'Md Shahjalal Portfolio',
    images: [
      {
        url: '/shahjalal2.jpg', // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'Md Shahjalal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Shahjalal | Full Stack Web Developer',
    description: 'Portfolio of Md Shahjalal, a Full Stack Web Developer specializing in MERN stack.',
    images: ['/shahjalal2.jpg'],
    creator: '@shahjalal_bu', // Replace with actual handle if available
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://shahjalal.vercel.app'), // Replace with actual URL
}

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${lato.variable} ${grandHotel.variable} ${luckiestGuy.variable} bg-background text-foreground relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionContextProvider>
            <Preloader />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <GotoTop />
            <Footer />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
