import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Barry — Portfolio',
    description: 'Software engineer, product builder, and storyteller',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
        title: 'Barry — Portfolio',
        description: 'Software engineer, product builder, and storyteller',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased">
                <header className="border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg)]/80">
                    <Navigation />
                </header>
                {children}
                <footer className="border-t border-[var(--border)] bg-[var(--bg-soft)]">
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-[var(--fg-muted)]">
                                © {new Date().getFullYear()} Barry. All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <a
                                    href="https://github.com/Barryyep"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                                >
                                    GitHub
                                </a>
                                {/* <a
                                    href="https://twitter.com/barry"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                                >
                                    Twitter
                                </a> */}
                                <a
                                    href="https://www.linkedin.com/in/yuanshen-wang/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}