import { MetadataRoute } from 'next';
import { ROUTES, createRouteSlug } from '@/lib/linhas';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.betimbus.com.br';

  const statics: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/linhas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/favoritos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const dynamics: MetadataRoute.Sitemap = ROUTES.map((linha) => ({
    url: `${BASE_URL}/linha/${createRouteSlug({ name: linha.name, value: linha.value })}`, // Ensures consistency
    lastModified: new Date(),
    changeFrequency: 'always',
    priority: 0.8,
  }));

  return [...statics, ...dynamics];
}
