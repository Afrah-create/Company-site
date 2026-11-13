import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import AmbientBackground from "@/components/AmbientBackground";
import CookieNotice from "@/components/CookieNotice";
import CustomCursor from "@/components/CustomCursor";
import FloatingChatButton from "@/components/FloatingChatButton";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MotionRoot from "@/components/MotionRoot";
import Navbar from "@/components/Navbar";
import RouteTransition from "@/components/RouteTransition";
import ScrollProgress from "@/components/ScrollProgress";
import SessionLoader from "@/components/SessionLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const orbitron = localFont({
  src: [
    { path: "./fonts/orbitron-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/orbitron-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/orbitron-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slimcybertech.com"),
  title: {
    default: "SlimCyberTech | Software Development & Technology - West Nile, Uganda",
    template: "%s | SlimCyberTech",
  },
  description:
    "SlimCyberTech builds software, mobile apps, AI, and security work from West Nile, Uganda, for organisations in Africa and beyond.",
  keywords: [
    "software development Uganda",
    "web development Kampala",
    "mobile app development Africa",
    "AI development Uganda",
    "cybersecurity Uganda",
    "tech consulting Kampala",
    "custom software Uganda",
    "Next.js development",
    "SlimCyberTech",
  ],
  alternates: {
    canonical: "./",
  },
  authors: [{ name: "SlimCyberTech", url: "https://slimcybertech.com" }],
  creator: "SlimCyberTech",
  publisher: "SlimCyberTech",
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://slimcybertech.com",
    siteName: "SlimCyberTech",
    title: "SlimCyberTech | Software Development & Technology",
    description:
      "Software, mobile apps, AI, and security work from West Nile, Uganda.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SlimCyberTech, West Nile, Uganda",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@slimcybertech",
    creator: "@slimcybertech",
    title: "SlimCyberTech | Software Development & Technology",
    description:
      "Software, mobile apps, AI, and security work from West Nile, Uganda.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/images/Logo.jpeg", type: "image/jpeg", sizes: "192x192" },
    ],
    apple: "/images/Logo.jpeg",
    shortcut: "/images/Logo.jpeg",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // TODO: Add Google Search Console verification token when available.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} h-full scroll-smooth antialiased`}
      data-theme="dark"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',(s==='light'||s==='dark')?s:d);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--bg)] text-[var(--white)] font-sans">
        <JsonLd />
        <ThemeProvider>
          <MotionRoot>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <AmbientBackground />
            <SessionLoader />
            <RouteTransition />
            <ScrollProgress />
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
            <CookieNotice />
            <FloatingChatButton />
            <CustomCursor />
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
