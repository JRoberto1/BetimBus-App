import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { InstallBanner } from "@/components/ui/InstallBanner";
import PwaRegister from "@/components/PwaRegister";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Betim Bus — Transporte em Tempo Real",
  description: "Acompanhe os ônibus de Betim/MG em tempo real. Horários, itinerários e mapas.",
  manifest: "/manifest.json",
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: "Betim Bus — Transporte em Tempo Real",
    description: "Acompanhe os ônibus de Betim/MG em tempo real. Horários, planeje sua jornada e veja itinerários.",
    url: "https://betimbus.com.br", // Subsitituir pelo domínio final depois
    siteName: "Betim Bus",
    images: [
      {
        url: "/icon-512.png", // Usando o icone dinâmico que a gente criou
        width: 512,
        height: 512,
        alt: "Logo do Betim Bus",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Betim Bus",
    description: "Aplicativo Oficial Não-Governamental de Ônibus em Betim/MG.",
    images: ["/icon-512.png"],
  },
  keywords: ["Betim", "Ônibus", "Tempo Real", "Mobilibus", "Transporte Público", "Horários Betim"],
  authors: [{ name: "Betim Bus Developers" }]
};

export const viewport: Viewport = {
  themeColor: "#121826",
  width: 'device-width',
  initialScale: 1,
  viewportFit: "cover"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-brand-text h-screen overflow-hidden flex flex-col items-center justify-center`} suppressHydrationWarning>
        
        {/* AdSense Base Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        
        {/* Main Wrapper imitando chassi de smartphone no mobile, e full width stretch no PC */}
        <div className="w-full h-full max-w-[480px] md:max-w-none md:rounded-none md:h-screen md:border-none md:shadow-none mx-auto relative bg-brand-bg shadow-[0_0_100px_rgba(0,0,0,0.8)] border-x border-[rgba(255,255,255,0.05)] sm:border-y sm:h-[95vh] sm:rounded-[40px] overflow-hidden flex flex-col">
          
          <main className="flex-1 w-full relative overflow-y-auto">
            {children}
            <Footer />
          </main>
          
          <BottomNav />
          <InstallBanner />
          <PwaRegister />
          <Analytics />
          
        </div>
      </body>
    </html>
  );
}
