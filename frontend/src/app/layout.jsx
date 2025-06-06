// 'use client';
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar.jsx"; // ✅ Import Navbar component
import "./globals.css";
import Footer from "../components/Footer.jsx";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickCast",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Toaster position="top-right" />
        {children}  {/* This renders the current page content */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
