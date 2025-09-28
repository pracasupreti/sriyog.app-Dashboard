import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Metadata } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
});

// const bellota = Bellota_Text({
//   subsets: ['latin'],
//   weight: ["400"],
// })


export const metadata: Metadata = {
  title: "SRIYOG App Dashboard",
  description: "Find Anyone | Find Anywhere : Plumber, Electrician, Painter & 100 more professionals in Nepal",
  icons: {
    icon: [
      { url: "/images/defaultlogo.png", type: "image/png" }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
