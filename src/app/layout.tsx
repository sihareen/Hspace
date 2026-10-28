import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Archivo: display + body (Column Proof — one sans family, variable weight)
const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Runs before paint: resolves theme (stored choice > system), marks JS as available
// (enables Reveal hidden state). /admin is always light (not designed for dark).
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(location.pathname.indexOf('/admin')===0){t='light'}else if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hspace.vercel.app"),
  title: {
    default: "Rizkan Harin | IoT & AI Engineer",
    template: "%s | Rizkan Harin",
  },
  description:
    "Personal portfolio of an IoT & AI Engineer showcasing projects, technologies, and engineering work.",
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
      "Personal portfolio of an IoT & AI Engineer showcasing projects, technologies, and engineering work.",
    type: "website",
    siteName: "Rizkan Harin Portfolio",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizkan Harin | IoT & AI Engineer",
    description:
      "Personal portfolio of an IoT & AI Engineer showcasing projects, technologies, and engineering work.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A111D" },
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
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
