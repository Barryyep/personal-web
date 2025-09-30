import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About — Barry',
    description: 'Engineer, builder, and occasional photographer based in Tokyo.',
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="space-y-8">
                <section>
                    <h1 className="text-4xl font-semibold mb-6">About Me</h1>
                    <div className="prose prose-lg max-w-none space-y-4 opacity-90">
                        <p>
                            Hi, I'm Barry — a software engineer and builder based in Los Angeles. I work on systems that need to scale,
                            interfaces that need to feel right, and problems that don't have obvious solutions yet.
                        </p>
                        <p>
                            My professional work focuses on full-stack systems, distributed architectures, and the occasionally
                            inevitable frontend challenge. I care about performance, maintainability, and shipping products
                            that people actually use.
                        </p>
                        <p>
                            Outside of work, I'm probably exploring a new city, trying to perfect my pour-over coffee technique,
                            or taking way too many photos of architecture and street scenes.
                        </p>
                    </div>
                </section>

                <section className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-4">What I Work With</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-medium mb-2 text-cyan-600">Backend</h3>
                            <ul className="text-sm space-y-1 opacity-80">
                                <li>Python (FastAPI, Django)</li>
                                <li>Node.js / TypeScript</li>
                                <li>PostgreSQL, Redis</li>
                                <li>Docker, Kubernetes</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2 text-cyan-600">Frontend</h3>
                            <ul className="text-sm space-y-1 opacity-80">
                                <li>React / Next.js</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>D3.js for data viz</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2 text-cyan-600">Tools & Platforms</h3>
                            <ul className="text-sm space-y-1 opacity-80">
                                <li>AWS / Vercel</li>
                                <li>GitHub Actions</li>
                                <li>Figma</li>
                                <li>VS Code / Cursor</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Currently</h2>
                    <div className="space-y-3 opacity-90">
                        <p className="flex items-start gap-3">
                            <span className="text-xl">💼</span>
                            <span>Building SaaS products at a Tokyo-based startup</span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-xl">📚</span>
                            <span>Reading: <em>Designing Data-Intensive Applications</em></span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-xl">🎯</span>
                            <span>Learning Rust & exploring systems programming</span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-xl">📸</span>
                            <span>Shooting film on a Contax T2</span>
                        </p>
                    </div>
                </section>

                <section className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-4">This Site</h2>
                    <p className="opacity-90 mb-4">
                        Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Contentlayer for MDX content.
                        Dual theme system inspired by cyberpunk aesthetics (Work) and soft, cute design (Life).
                    </p>
                    <p className="text-sm opacity-70">
                        Open source soon™. Hosted on Vercel. Font: Inter. Code highlighting: Rehype Pretty Code.
                    </p>
                </section>
            </div>
        </main>
    );
}
