import { allLifePosts } from 'contentlayer2/generated';
import { notFound } from 'next/navigation';
import { isVisible } from '@/lib/visibility';
import { MDXContent } from '@/components/MDXContent';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return allLifePosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = allLifePosts.find((p) => p.slug === params.slug);

    if (!post) {
        return { title: 'Not Found' };
    }

    return {
        title: `${post.title} — Life`,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date,
            images: [
                {
                    url: `/api/og?title=${encodeURIComponent(post.title)}&type=life`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default function LifeDetailPage({ params }: { params: { slug: string } }) {
    const post = allLifePosts.find((p) => p.slug === params.slug);
    if (!post) return notFound();

    const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
    if (!isVisible(post, env)) return notFound();

    return (
        <article className="container mx-auto px-4 py-16 max-w-3xl">
            {/* Header */}
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--fg-muted)]">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                        <>
                            <span className="text-[var(--border)]">•</span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 rounded-md bg-[var(--bg-subtle)] text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </header>

            {/* Content */}
            <div className="prose-wrapper">
                <MDXContent code={post.body.code} />
            </div>

            {/* Back link */}
            <footer className="mt-16 pt-8 border-t border-[var(--border)]">
                <a
                    href="/life"
                    className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Life
                </a>
            </footer>
        </article>
    );
}