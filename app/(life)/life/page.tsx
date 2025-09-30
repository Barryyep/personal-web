import { allLifePosts } from 'contentlayer2/generated';
import Link from 'next/link';
import { listingFilter } from '@/lib/visibility';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Life — Barry',
    description: 'Personal moments, travel notes, and sweet memories',
    openGraph: {
        title: 'Life — Barry',
        images: [
            {
                url: `/api/og?title=${encodeURIComponent('Life')}&type=life`,
                width: 1200,
                height: 630,
                alt: 'Life'
            },
        ],
    },
};

export default function LifeListPage() {
    const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
    const posts = listingFilter(
        allLifePosts.sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        env
    );

    // Group posts by year
    const postsByYear = posts.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {} as Record<number, typeof posts>);

    const years = Object.keys(postsByYear).map(Number).sort((a, b) => b - a);

    return (
        <main className="container mx-auto px-4 py-16 max-w-5xl">
            {/* Header */}
            <div className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                    Life
                </h1>
                <p className="text-xl text-[var(--fg-muted)] max-w-2xl leading-relaxed">
                    Moments worth remembering — travel adventures, personal reflections, and little joys.
                </p>
            </div>

            {years.length > 0 ? (
                <div className="space-y-16">
                    {years.map((year) => (
                        <section key={year}>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-subtle)] mb-8">
                                {year}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {postsByYear[year].map((p) => (
                                    <Link key={p._id} href={p.url} className="block group">
                                        <article className="card p-6 h-full hover:shadow-lg transition-all">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                                                    {p.title}
                                                </h3>
                                                <time className="text-sm text-[var(--fg-subtle)]" dateTime={p.date}>
                                                    {new Date(p.date).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                            </div>

                                            <p className="text-[var(--fg-muted)] leading-relaxed mb-4">
                                                {p.summary}
                                            </p>

                                            {p.tags && p.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {p.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs px-2 py-1 rounded-md bg-[var(--bg-subtle)] text-[var(--fg-subtle)]"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-[var(--fg-muted)] text-lg mb-2">No life posts yet.</p>
                    <p className="text-[var(--fg-subtle)]">More moments to come...</p>
                </div>
            )}
        </main>
    );
}