import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Arimo } from 'next/font/google'
import './layout.css'

const inter = Inter({ subsets: ["latin"] });
const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo',
})


export const metadata: Metadata = {
  title: "Find My Shifts",
  description: "Build by Jian Chen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={arimo.variable}>{children}</body>
      </UserProvider>
    </html>
  );
}
