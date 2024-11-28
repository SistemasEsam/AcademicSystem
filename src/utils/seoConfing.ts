// Type imports
import type { ManifestOptions } from "vite-plugin-pwa";

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
  baseURL: "https://academico-docentes.esam.edu.bo/", // Production URL.
  description:
    "Sistema Académico para postulación e invitación a docentes de ESAM.",
  type: "website",
  image: {
    url: "https://cdn.lavelada.dev/og.jpg",
    alt: "ESAM Docentes",
    width: 705,
    height: 606,
  },
  siteName: "ESAM Docentes",
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
  name: "ESAM Docentes",
  short_name: "ESAM Docentes",
  description:
    "Sistema Académico para postulación e invitación a docentes de ESAM.",
  theme_color: "#d5ff00",
  background_color: "#d5ff00",
  display: "fullscreen",
  icons: [
    {
      src: "/img/icons/favicon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/img/icons/favicon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/img/icons/favicon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};
