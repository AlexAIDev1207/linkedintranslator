import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';

export default function robots(): MetadataRoute.Robots {
  const appUrl = envConfigs.app_url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?*q=',
          '/privacy-policy',
          '/terms-of-service',
          '/settings/*',
          '/activity/*',
          '/admin/*',
          '/api/*',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'CCBot',
          'Bytespider',
          'anthropic-ai',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}

