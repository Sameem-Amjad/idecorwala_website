import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Set NEXT_PUBLIC_IS_PROD=true and NEXT_PUBLIC_SITE_URL in your production environment variables.
  const isProduction = process.env.NEXT_PUBLIC_IS_PROD === "true";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://idecorwala.com";

  if (!isProduction) {
    // Staging / Preview mode: Disallow all search engines from indexing
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // Production mode: Allow indexing and point to the dynamic sitemap
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
