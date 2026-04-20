import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const headingFont = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0b0f19] text-slate-100">{children}</body>
    </html>
  );
}
