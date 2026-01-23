import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { useTranslation as initTranslations } from "@/app/[locale]/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { ThemeProvider } from "next-themes";
import { DownloadProvider } from "@/contexts/DownloadProvider";
import { dir } from "i18next";
import { Agentation } from "agentation";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, "common");

  return (
			<html lang={locale} dir={dir(locale)} suppressHydrationWarning>
				<body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
					<TranslationsProvider
						namespaces={["common"]}
						locale={locale}
						resources={resources}
					>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<DownloadProvider>{children}</DownloadProvider>
						</ThemeProvider>
					</TranslationsProvider>
					{process.env.NODE_ENV === "development" && <Agentation />}
				</body>
			</html>
		);
}

