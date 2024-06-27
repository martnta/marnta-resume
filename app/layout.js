// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodePipe Resume",
  description: "A pipe resume App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto p-4 mt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}