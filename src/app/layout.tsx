import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nouvx.com"),
  title: "NOUVX | Advanced AI Infrastructure & Robotics Platform",
  description: "Engineering the future of intelligent systems. AI infrastructure, robotics platforms, computer vision, and enterprise-scale operational technology.",
  keywords: ["AI infrastructure", "robotics", "computer vision", "autonomous systems", "edge computing", "Kubernetes", "machine learning"],
  authors: [{ name: "NOUVX" }],
  creator: "NOUVX",
  publisher: "NOUVX",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nouvx.com",
    siteName: "NOUVX",
    title: "NOUVX | Advanced AI Infrastructure & Robotics Platform",
    description: "Engineering the future of intelligent systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NOUVX - Advanced AI Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOUVX | Advanced AI Infrastructure & Robotics Platform",
    description: "Engineering the future of intelligent systems.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#ffffff" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CampaignBanner } from "@/components/campaigns/CampaignBanner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} light h-full antialiased`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.setItem('nouvx-theme', 'light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <CampaignBanner />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}