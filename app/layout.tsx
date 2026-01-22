import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "QoreDB — Le client de bases de données moderne",
  description: "Un client de bases de données moderne, rapide et sécurisé pour les développeurs. SQL + NoSQL unifié, vault sécurisé, local-first.",
  keywords: ["database", "client", "SQL", "NoSQL", "PostgreSQL", "MySQL", "MongoDB", "developer tools"],
  authors: [{ name: "Raphaël Plassart" }],
  openGraph: {
    title: "QoreDB — Le client de bases de données moderne",
    description: "Un client de bases de données moderne, rapide et sécurisé pour les développeurs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
