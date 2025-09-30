import { MetadataRoute } from 'next';
import { allWorkPosts, allLifePosts } from 'contentlayer2/generated';
import { listingFilter } from '@/lib/visibility';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

    // Filter posts to only include public ones
    const workPosts = listingFilter(allWorkPosts, env);
    const lifePosts = listingFilter(allLifePosts, env);

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/life`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ];

    // Work posts
    const workUrls = workPosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: post.featured ? 0.8 : 0.6,
    }));

    // Life posts
    const lifeUrls = lifePosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...workUrls, ...lifeUrls];
}
