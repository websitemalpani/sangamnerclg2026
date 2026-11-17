import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sangamnercollege.edu.in"),
  title: "Sangamner College | Learn. Discover. Lead.",
  description: "Sangamner College is an autonomous, NAAC A+ institution offering education in Arts, Commerce, Science and vocational studies.",
  applicationName: "Sangamner College",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sangamner College",
    title: "Sangamner College | Learn. Discover. Lead.",
    description: "Autonomous, NAAC A+ education in Arts, Commerce, Science and vocational studies.",
    images: [{ url: "/images/brand/sangamner-college-logo.png", alt: "Sangamner College" }],
  },
  twitter: {
    card: "summary",
    title: "Sangamner College | Learn. Discover. Lead.",
    description: "Autonomous, NAAC A+ education in Arts, Commerce, Science and vocational studies.",
    images: ["/images/brand/sangamner-college-logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${manrope.variable} ${instrumentSerif.variable}`}>{children}<ScrollToTop /></body>
    </html>
  );
}
