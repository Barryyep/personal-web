import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Me — Barryyep',
    description: 'Engineer, builder, and occasional photographer based in Los Angeles.',
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="space-y-8">
                <section>

                    <h1 className="text-4xl font-semibold mb-8">About Me</h1>

                    {/* Two-column layout: text on left, photo on right */}
                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Text content - takes 2 columns */}
                        <div className="md:col-span-2 space-y-4 text-[var(--fg-muted)] leading-relaxed">
                            <p>
                                Hi, I'm Barry — a software engineer and builder based in Los Angeles, currently pursuing my Master's in Computer Science at USC.
                                I work on systems that need to scale, interfaces that need to feel right, and problems that don't have obvious solutions yet.
                            </p>
                            <p>
                                My professional focus is on full-stack development, data analysis and ETL, and the occasional frontend challenge.
                                I also have a strong interest in product design and app experiences, and I'm eager to grow toward a Product Manager role in the future.
                                I care about performance, maintainability, and building products that people actually use.
                            </p>
                            <p>
                                Outside of work and study, you'll probably find me swimming, on a golf course, or reading Agatha Christie's detective novels.
                            </p>
                        </div>

                        {/* Photo - takes 1 column */}
                        <div className="md:col-span-1 flex justify-center md:justify-end">
                            <div className="relative aspect-[3/4] w-56 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="/me.jpg"
                                    alt="Barry at the beach"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--border)] pt-8">
                    <h2 className="text-2xl font-semibold mb-4">What I Work With</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-medium mb-2 text-[var(--accent)]">Backend</h3>
                            <ul className="text-sm space-y-1 text-[var(--fg-muted)]">
                                <li>Python (FastAPI)</li>
                                <li>Node.js / TypeScript</li>
                                <li>PostgreSQL, Redis</li>
                                <li>Docker, Kubernetes</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2 text-[var(--accent)]">Frontend</h3>
                            <ul className="text-sm space-y-1 text-[var(--fg-muted)]">
                                <li>React / Next.js</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>Vue.js (learning)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2 text-[var(--accent)]">Tools & Platforms</h3>
                            <ul className="text-sm space-y-1 text-[var(--fg-muted)]">
                                <li>AWS / Vercel</li>
                                <li>GitHub</li>
                                <li>Figma (learning)</li>
                                <li>VS Code / Cursor</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--border)] pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Currently</h2>
                    <div className="space-y-3 text-[var(--fg-muted)]">
                        <p className="flex items-start gap-3">
                            <span className="text-xl">💼</span>
                            <span>Pursuing Master's in Computer Science at USC</span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-xl">📚</span>
                            <span>Reading: <em>Les Misérables</em></span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-xl">🎯</span>
                            <span>Learning Vue.js and using Figma</span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-xl">🏊</span>
                            <span>Swimming, golfing, and solving detective mysteries</span>
                        </p>
                    </div>
                </section>

                <section className="border-t border-[var(--border)] pt-8">
                    <h2 className="text-2xl font-semibold mb-4">This Site</h2>
                    <p className="text-[var(--fg-muted)] mb-4 leading-relaxed">
                        Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Contentlayer for MDX content.
                        Custom dark theme with orange accents for a unique visual identity.
                    </p>
                    <p className="text-sm text-[var(--fg-subtle)]">
                        Hosted on Vercel. Custom font: Birthlong. Code highlighting: Rehype Pretty Code.
                    </p>
                </section>
            </div>
        </main>
    );
}
