import type { Metadata } from "next";
import { Fraunces, Outfit, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "ClarityCristal | Limpieza Profesional de Cristales y Paneles Solares en Lanzarote",
  description:
    "Especialistas en limpieza de ventanas y paneles solares en Lanzarote con agua desmineralizada. Sin cal, sin manchas. Garantía 100% de satisfacción. Presupuesto gratis en menos de 24h.",
  keywords: [
    "limpieza cristales Lanzarote",
    "limpieza paneles solares Lanzarote",
    "limpieza ventanas Lanzarote",
    "agua desmineralizada cristales",
    "limpieza profesional Arrecife",
    "mantenimiento paneles fotovoltaicos",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://claritycristal.com",
    siteName: "ClarityCristal",
    title: "ClarityCristal | Limpieza de Cristales y Paneles Solares en Lanzarote",
    description:
      "Servicio profesional de limpieza con agua pura: ventanas, cristales y paneles solares en Lanzarote. Garantía total. Presupuesto sin compromiso.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClarityCristal - Limpieza profesional en Lanzarote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClarityCristal | Limpieza de Cristales y Paneles Solares en Lanzarote",
    description:
      "Servicio profesional de limpieza con agua pura. Garantía total. Presupuesto gratis en 24h.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "https://claritycristal.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://claritycristal.com/#business",
      name: "ClarityCristal",
      description:
        "Especialistas en limpieza profesional de cristales y paneles solares en Lanzarote con agua desmineralizada.",
      url: "https://claritycristal.com",
      telephone: "+34604234496",
      email: "info@claritycristal.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle Puerto Rico nº 36",
        addressLocality: "Arrecife",
        addressRegion: "Las Palmas",
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.963,
        longitude: -13.547,
      },
      areaServed: {
        "@type": "Island",
        name: "Lanzarote",
      },
      priceRange: "€€",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "14:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de limpieza",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Limpieza de cristales residencial",
              description: "Limpieza profesional de ventanas y cristales en viviendas",
            },
            price: "4.00",
            priceCurrency: "EUR",
            priceSpecification: { "@type": "UnitPriceSpecification", unitText: "por ventana" },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Limpieza de paneles solares",
              description: "Limpieza de paneles fotovoltaicos con agua desmineralizada",
            },
            price: "5.00",
            priceCurrency: "EUR",
            priceSpecification: { "@type": "UnitPriceSpecification", unitText: "por panel" },
          },
        ],
      },
      sameAs: [
        "https://www.instagram.com/claritycristalpro/",
        "https://www.facebook.com/profile.php?id=61579139587002",
        "https://www.linkedin.com/in/daniel-claritycristal-707944397/",
        "https://www.tiktok.com/@claritycristalpro",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cada cuánto debería realizarse la limpieza de cristales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En Lanzarote, por la calima y el salitre, recomendamos cada 2-3 meses para viviendas y mensualmente para comercios.",
          },
        },
        {
          "@type": "Question",
          name: "¿Es necesario limpiar los paneles solares o la lluvia ya los limpia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La lluvia NO elimina el polvo ni el salitre; solo agua desmineralizada garantiza limpieza total sin residuos. Los paneles sucios pueden perder hasta 25-40% de rendimiento.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta la limpieza de cristales en Lanzarote?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La limpieza de cristales residencial parte de 4€ por ventana. La limpieza comercial con precio a consultar según superficie. Los paneles solares desde 5€ por panel. El desplazamiento es siempre gratuito.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${outfit.variable} ${bodoni.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-pearl text-volcanic antialiased">{children}</body>
    </html>
  );
}
