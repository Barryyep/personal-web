import { allWorkPosts } from 'contentlayer2/generated';
import Link from 'next/link';
import { listingFilter } from '@/lib/visibility';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Work — Barry',
    description: 'Projects, systems, and engineering work',
    openGraph: {
        title: 'Work — Barry',
        images: [
            {
                url: `/api/og?title=${encodeURIComponent('Work')}&type=work`,
                width: 1200,
                height: 630,
                alt: 'Work'
            },
        ],
    },
};

export default function WorkListPage() {
    const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
    const posts = listingFilter(
        allWorkPosts.sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        env
    );

    const featuredPosts = posts.filter(p => p.featured);
    const regularPosts = posts.filter(p => !p.featured);

    return (
        <main className="container mx-auto px-4 py-16 max-w-5xl">
            {/* Header */}
            <div className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                    Work
                </h1>
                <p className="text-xl text-[var(--fg-muted)] max-w-2xl leading-relaxed">
                    Selected projects and engineering work — from prototypes to production systems.
                </p>
            </div>

            {/* Featured Projects */}
            {featuredPosts.length > 0 && (
                <section className="mb-20">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-subtle)] mb-8">
                        Featured
                    </h2>
                    <div className="space-y-6">
                        {featuredPosts.map((p) => (
                            <Link key={p._id} href={p.url} className="group block">
                                <article className="card p-8 hover:shadow-xl transition-all">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-2xl font-semibold group-hover:text-[var(--accent)] transition-colors">
                                            {p.title}
                                        </h3>
                                        <span className="text-sm text-[var(--fg-subtle)] whitespace-nowrap">
                                            {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                    <p className="text-[var(--fg-muted)] mb-6 leading-relaxed text-lg">
                                        {p.summary}
                                    </p>
                                    {p.tech && p.tech.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {p.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-sm px-3 py-1 rounded-lg bg-[var(--bg-subtle)] text-[var(--fg-muted)] border border-[var(--border-subtle)]"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* All Projects */}
            {regularPosts.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-subtle)] mb-8">
                        {featuredPosts.length > 0 ? 'More Projects' : 'All Projects'}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {regularPosts.map((p) => (
                            <Link key={p._id} href={p.url} className="group block">
                                <article className="card p-6 h-full hover:shadow-lg transition-all">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h3 className="text-xl font-semibold group-hover:text-[var(--accent)] transition-colors">
                                            {p.title}
                                        </h3>
                                        <span className="text-xs text-[var(--fg-subtle)] whitespace-nowrap">
                                            {new Date(p.date).getFullYear()}
                                        </span>
                                    </div>
                                    <p className="text-[var(--fg-muted)] mb-4 leading-relaxed">
                                        {p.summary}
                                    </p>
                                    {p.tech && p.tech.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {p.tech.slice(0, 3).map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-xs px-2 py-1 rounded-md bg-[var(--bg-subtle)] text-[var(--fg-subtle)]"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            {p.tech.length > 3 && (
                                                <span className="text-xs text-[var(--fg-subtle)] flex items-center">
                                                    +{p.tech.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {posts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[var(--fg-muted)] text-lg">No work posts yet. Coming soon...</p>
                </div>
            )}
        </main>
    );
}