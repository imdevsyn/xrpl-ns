import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XRP Ledger Names",
  description: "Digital Idenity For The XRPL EVM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
        <Script id="ms-clarity" type="text/javascript">
          {`
          (function(c,l,a,r,i,t,y) {
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}")
        `}
        </Script>
      </body>
    </html>
  );
}
