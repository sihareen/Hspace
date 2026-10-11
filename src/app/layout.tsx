import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

// 700 is only for /admin (font-bold); the public page tops out at 600.
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

// Runs before paint: resolves theme (stored choice > system).
// /admin is always light (not designed for dark).
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(location.pathname.indexOf('/admin')===0){t='light'}else if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hspace.vercel.app"),
  title: {
    default: "Rizkan Harin | IoT & AI Engineer",
    template: "%s | Rizkan Harin",
  },
  description:
    "Rizkan Harin, electrical engineer working on IoT, embedded systems and telemetry. Projects, experience and contact.",
  keywords: [
    "IoT Engineer",
    "AI Engineer",
    "Embedded Systems",
    "Automation",
    "Portfolio",
    "Rizkan Harin",
  ],
  openGraph: {
    title: "Rizkan Harin | IoT & AI Engineer",
    description:
      "Rizkan Harin, electrical engineer working on IoT, embedded systems and telemetry. Projects, experience and contact.",
    type: "website",
    siteName: "Rizkan Harin Portfolio",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizkan Harin | IoT & AI Engineer",
    description:
      "Rizkan Harin, electrical engineer working on IoT, embedded systems and telemetry. Projects, experience and contact.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFBFA" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
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
      data-theme="light"
      suppressHydrationWarning
      className={`${body.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
