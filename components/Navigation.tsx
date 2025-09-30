'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navigation() {
    const pathname = usePathname();
    const isWork = pathname.startsWith('/work');
    const isLife = pathname.startsWith('/life');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
                href="/"
                className="logo-font text-3xl md:text-4xl hover:text-[var(--accent-soft)] transition-colors z-50"
            >
                Barryyep
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
                <Link
                    href="/" // /Work
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isWork
                        ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                        }`}
                >
                    Work
                </Link>
                <Link
                    href="/" // /Life
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isLife
                        ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                        }`}
                >
                    Life
                </Link>
                <div className="w-px h-6 bg-[var(--border)] mx-2" />
                <Link
                    href="/" // /About
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                >
                    About
                </Link>
                <Link
                    href="/" // /Contact
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                >
                    Contact
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors z-50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? (
                    // Close icon
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Menu icon
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-[var(--bg)] z-40 border-t border-[var(--border)] backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-6 flex flex-col gap-2 bg-[var(--bg)]">
                        <Link
                            href="/work"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isWork
                                ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                                : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                                }`}
                        >
                            Work
                        </Link>
                        <Link
                            href="/life"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isLife
                                ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                                : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                                }`}
                        >
                            Life
                        </Link>
                        <div className="h-px bg-[var(--border)] my-2" />
                        <Link
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-lg text-base font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-lg text-base font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}