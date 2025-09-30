import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact — Barry',
    description: 'Get in touch for collaborations, questions, or just to say hi.',
};

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="space-y-8">
                <section>
                    <h1 className="text-4xl font-semibold mb-6">Get in Touch</h1>
                    <p className="text-lg opacity-90 leading-relaxed">
                        I'm always open to interesting conversations, collaboration opportunities, or project inquiries.
                        Whether you're looking to work together or just want to chat about tech, design, or travel —
                        feel free to reach out.
                    </p>
                </section>

                <section className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-6">Contact Methods</h2>
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="text-3xl">📧</div>
                            <div>
                                <h3 className="font-medium mb-1">Email</h3>
                                <a
                                    href="mailto:hello@barry.dev"
                                    className="text-cyan-600 hover:text-cyan-700 transition-colors"
                                >
                                    hello@barry.dev
                                </a>
                                <p className="text-sm opacity-70 mt-1">
                                    Best for: Project inquiries, collaborations, professional matters
                                </p>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="text-3xl">💻</div>
                            <div>
                                <h3 className="font-medium mb-1">GitHub</h3>
                                <a
                                    href="https://github.com/barry"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-600 hover:text-cyan-700 transition-colors"
                                >
                                    @barry
                                </a>
                                <p className="text-sm opacity-70 mt-1">
                                    Best for: Code reviews, open source contributions, technical discussions
                                </p>
                            </div>
                        </div>

                        {/* Twitter/X */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="text-3xl">𝕏</div>
                            <div>
                                <h3 className="font-medium mb-1">Twitter / X</h3>
                                <a
                                    href="https://x.com/barry_dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-600 hover:text-cyan-700 transition-colors"
                                >
                                    @barry_dev
                                </a>
                                <p className="text-sm opacity-70 mt-1">
                                    Best for: Quick questions, sharing ideas, tech discussions
                                </p>
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="text-3xl">💼</div>
                            <div>
                                <h3 className="font-medium mb-1">LinkedIn</h3>
                                <a
                                    href="https://linkedin.com/in/barry-dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-600 hover:text-cyan-700 transition-colors"
                                >
                                    barry-dev
                                </a>
                                <p className="text-sm opacity-70 mt-1">
                                    Best for: Professional networking, job opportunities
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
                    <p className="opacity-90">
                        I typically respond to emails within 24-48 hours during weekdays. For urgent matters,
                        Twitter DMs are usually faster. Please note that I'm based in JST (UTC+9).
                    </p>
                </section>

                <section className="border-t border-gray-200 pt-8 opacity-70 text-sm">
                    <p>
                        <strong>Note on privacy:</strong> I respect your privacy and will never share your contact
                        information with third parties. Any communication will remain between us unless you explicitly
                        state otherwise.
                    </p>
                </section>
            </div>
        </main>
    );
}
