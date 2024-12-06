import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "pAIr",
  description: "An AI pair programming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiase min-h-full`}
      >
        <nav className="h-20 w-full border-b-2 bg-black justify-center items-center flex fixed top-0">
          This is the navbar
        </nav>
        <div className="flex flex-col min-h-full justify-center items-center px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
