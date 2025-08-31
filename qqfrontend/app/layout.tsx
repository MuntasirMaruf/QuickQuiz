import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
       <h1> this my navigation var</h1>
        <main className="max-w-7xl ma-auto px-4 sm:px-6 lg:px-8">
        {children}
       <Register />
        </main>
              <br />
      <br />
        <h2> this my footer </h2>
      </body>
    </html>
  );
}
