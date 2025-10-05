import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Metadata } from 'next';
import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';

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
        <Toaster position='top-right' />
        <ThemeProvider>
          <SidebarProvider>
            <AuthProvider>
            {children}
            </AuthProvider>
            </SidebarProvider>
        </ThemeProvider>
         <div id="changeStatusModal"></div>
      </body>
    </html>
  );
}
