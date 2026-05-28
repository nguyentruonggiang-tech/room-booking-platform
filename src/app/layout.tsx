import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProvider from "@/components/providers/AppProvider";
import { HomeLayout } from "@/components/layout/home";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Room Booking Platform",
  description: "Airbnb clone mini with Next.js and Ant Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AppProvider>
          <HomeLayout>{children}</HomeLayout>
        </AppProvider>
      </body>
    </html>
  );
}
