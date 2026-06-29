import { MetadataRoute } from "next";

// TODO: Replace with your actual production domain when deploying.
// You can also use process.env.NEXT_PUBLIC_SITE_URL to configure this dynamically.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://idecorwala.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/company/about",
    "/company/thought-leadership",
    "/company/partner-portal",
    "/company/careers",
    "/contact",
    "/technology/spacefold",
    "/solutions/hospitality",
    "/solutions/healthcare",
    "/solutions/malls-multiplexes",
    "/solutions/it-park-campuses",
    "/solutions/manufacturing-infrastructure",
    "/services/design-architecture",
    "/services/civil-structural-facade",
    "/services/interiors-fitouts",
    "/products/walls",
    "/products/floors",
    "/products/ceilings",
    "/products/spaces",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
