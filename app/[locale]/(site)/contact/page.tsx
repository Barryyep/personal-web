import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Me — Barryyep',
    description: 'Get in touch for collaborations, questions, or just to say hi.',
};

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="space-y-8">
                <section>
                    <h1 className="text-4xl font-semibold mb-6">Get in Touch</h1>
                    <p className="text-lg text-[var(--fg-muted)] leading-relaxed">
                        I'm always open to interesting conversations, collaboration opportunities, or project inquiries.
                        Whether you're looking to work together or just want to chat about tech, design, or travel —
                        feel free to reach out.
                    </p>
                </section>

                <section className="border-t border-[var(--border)] pt-8">
                    <h2 className="text-2xl font-semibold mb-6">Contact Methods</h2>
                    <div className="space-y-6">
                        {/* Instagram */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow card">
                            <div className="text-3xl">📸</div>
                            <div>
                                <h3 className="font-medium mb-1">Instagram</h3>
                                <a
                                    href="https://instagram.com/barryyep"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                                >
                                    @barryyep
                                </a>
                                <p className="text-sm text-[var(--fg-muted)] mt-1">
                                    Best for: Life updates, travel photos, casual connections
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow card">
                            <div className="text-3xl">📧</div>
                            <div>
                                <h3 className="font-medium mb-1">Email</h3>
                                <a
                                    href="mailto:barryyep@hotmail.com"
                                    className="text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                                >
                                    barryyep@hotmail.com
                                </a>
                                <p className="text-sm text-[var(--fg-muted)] mt-1">
                                    Best for: Project inquiries, collaborations, professional matters
                                </p>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow card">
                            <div className="text-3xl">💻</div>
                            <div>
                                <h3 className="font-medium mb-1">GitHub</h3>
                                <a
                                    href="https://github.com/Barryyep"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                                >
                                    @Barryyep
                                </a>
                                <p className="text-sm text-[var(--fg-muted)] mt-1">
                                    Best for: Open source contributions, technical discussions
                                </p>
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow card">
                            <div className="text-3xl">💼</div>
                            <div>
                                <h3 className="font-medium mb-1">LinkedIn</h3>
                                <a
                                    href="https://linkedin.com/in/yuanshen-wang"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                                >
                                    yuanshen-wang
                                </a>
                                <p className="text-sm text-[var(--fg-muted)] mt-1">
                                    Best for: Professional networking, job opportunities
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--border)] pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
                    <p className="text-[var(--fg-muted)]">
                        I typically respond to emails within 24-48 hours during weekdays.
                        Please note that I'm based in PST (UTC-8).
                    </p>
                </section>

                <section className="border-t border-[var(--border)] pt-8 text-[var(--fg-subtle)] text-sm">
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
