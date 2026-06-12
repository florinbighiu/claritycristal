import type { MetadataRoute } from "next";

const BASE_URL = "https://claritycristal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/services/residencial", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/empresas", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/paneles", changeFrequency: "monthly", priority: 0.9 },
    { path: "/aviso-legal", changeFrequency: "yearly", priority: 0.3 },
    { path: "/politica-de-privacidad", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terminos-y-condiciones", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
