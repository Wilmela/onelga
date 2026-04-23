import type { Metadata } from "next";
import { Montserrat, Roboto, Heebo } from "next/font/google";
import "./globals.css";
import { URL } from "url";
import { siteConfig } from "@/site-config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const hebbo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseURL),
  title: {
    template: `%s | ${siteConfig.shortTitle}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={` ${montserrat.variable} ${roboto.variable} ${hebbo.variable} antialiased bg-background overflow-x-hidden`}
      >
        <TooltipProvider>
          <main className="grow z-0">{children}</main>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
