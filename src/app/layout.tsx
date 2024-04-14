import type { Metadata } from "next";
import {  Roboto_Mono } from "next/font/google";
import * as React from "react";
import "@/style/globals.css";
import { UIProvider } from "./UIProvider";
import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/store/StoreProvider";


const robotoMono =  Roboto_Mono({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "lampachat",
  description: "chat where is warm and cozy",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body className={`default ${robotoMono.className}`}>
        <UIProvider>
          <StoreProvider>
            <div className="flex flex-col min-h-dvh">
              <NavigationBar/>
              <div className="grow flex">
                {children}
              </div>
              <Footer/>
            </div>
          </StoreProvider>
        </UIProvider>
      </body>
    </html>
  );
}