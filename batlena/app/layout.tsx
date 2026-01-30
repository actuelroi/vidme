import type { Metadata } from "next";
import { Nunito } from "next/font/google";
//@ts-ignore
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/next';

const font= Nunito({
  subsets: ["latin"]
})





export const metadata: Metadata = {
  metadataBase: new URL("https://www.batlena.com"), // change to real domain
  title: {
    default: "Batle-NA | Leader Européen du e-commerce B2B à prix compétitifs",
    template: "%s | Batle-NA",
  },
  description:
    "Batle-NA est le leader européen du e-commerce B2B spécialisé dans les produits à prix compétitifs. Achetez en gros, réduisez vos coûts et développez votre business avec Batle-NA.",
  keywords: [
    "Batle-NA",
    "B2B ecommerce Europe",
    "grossiste en ligne",
    "produits pas chers B2B",
    "fournisseur européen",
    "achat en gros",
    "marketplace B2B",
    "ecommerce professionnel",
  ],
  authors: [{ name: "Batle-NA" }],
  creator: "Batle-NA",
  publisher: "Batle-NA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.batlena.com",
    siteName: "Batle-NA",
    title: "Batle-NA | Leader Européen du e-commerce B2B",
    description:
      "La marketplace B2B européenne pour acheter des produits à prix compétitifs. Batle-NA accompagne les professionnels avec des solutions fiables et économiques.",
    images: [
      {
        url: "/og-image.png", // create later
        width: 1200,
        height: 630,
        alt: "Batle-NA – Ecommerce B2B Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batle-NA | Ecommerce B2B Europe",
    description:
      "Achetez en gros sur Batle-NA, la référence européenne du e-commerce B2B à prix compétitifs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>

    <html lang="fr">
      <body
        className={`${font.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
      </body>
    </html>
     </ClerkProvider>
  );
}
