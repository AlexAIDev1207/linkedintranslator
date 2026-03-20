import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';

/** 生成站点地图，覆盖核心页面和博客 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = envConfigs.app_url;

  /** 博客文章 slug 列表 */
  const blogSlugs = [
    'linkedin-buzzwords-translated',
    'how-to-write-linkedin-post',
    'linkedin-speak-examples',
    'linkedin-new-job-announcement',
    'corporate-jargon-translator',
    'linkedin-post-templates',
    'why-linkedin-posts-cringe',
    'linkedin-vs-real-life',
    'best-linkedin-post-generators',
    'decode-linkedin-recruiter-messages',
  ];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
