"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/application/providers/react-query-provider";
import SplashScreen from "@/components/SplashScreen";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const disableNavbar = ["/auth/login", "/auth/verify-in", "/profile", "/profile/edit"];

  const showNavbar = !disableNavbar.includes(pathname);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SplashScreen imageSrc="/images/logo.png" text="Siap..." duration={2000} />
        <Toaster position="top-center" />
        <ReactQueryProvider>
        {showNavbar && <Navbar />}
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
