import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const headingFont = Inter({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Mukesh S | Aspiring Data Analyst",
  description:
    "Professional portfolio of Mukesh S — AI & Data Science student focused on Data Analytics, Business Intelligence, and SQL analysis. View projects, experience, and resume.",
  keywords: ["Mukesh S", "Data Analyst", "Excel", "SQL", "Power BI", "Python", "PostgreSQL"],
  authors: [{ name: "Mukesh S" }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
