import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from 'react-toastify';

import { headers } from "next/headers";
import ContextProvider from "@/context";
import ReduxProvider from "@/components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OrbitX Cross Chain DApp",
  description: "An app which leverages alchemy api to fetch transactions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersData = await headers();
  const cookies = headersData.get('cookie');
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full  bg-black lg:pl-0 flex flex-col  overflow-hidden`}
      >
        <ReduxProvider>
          <ToastContainer autoClose={2000} position="top-right" />
          <ContextProvider cookies={cookies}>
            <div className="flex-1 overflow-auto">
              {children}
      
            </div>

          </ContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
