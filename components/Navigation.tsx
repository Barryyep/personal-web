'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export function Navigation() {
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations('Navigation');

    // 移除 locale 前缀后检查路径
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const isWork = pathWithoutLocale.startsWith('/work');
    const isLife = pathWithoutLocale.startsWith('/life');
    const isBkn = pathWithoutLocale.startsWith('/bkn');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 切换语言
    const switchLocale = (newLocale: string) => {
        const pathWithoutLocale = pathname.replace(`/${locale}`, '');
        window.location.href = `/${newLocale}${pathWithoutLocale}`;
    };

    return (
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
                href={`/${locale}`}
                className="logo-font text-3xl md:text-4xl hover:text-[var(--accent-soft)] transition-colors z-50"
            >
                Barryyep
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
                <Link
                    href={`/${locale}/work`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isWork
                        ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                        }`}
                >
                    {t('work')}
                </Link>
                <Link
                    href={`/${locale}/life`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isLife
                        ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                        }`}
                >
                    {t('life')}
                </Link>
                <Link
                    href={`/${locale}/bkn`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isBkn
                        ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                        }`}
                >
                    {t('bkn')}
                </Link>
                <div className="w-px h-6 bg-[var(--border)] mx-2" />
                <Link
                    href={`/${locale}/about`}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                >
                    {t('about')}
                </Link>
                <Link
                    href={`/${locale}/contact`}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                >
                    {t('contact')}
                </Link>

                {/* Language Switcher */}
                <div className="w-px h-6 bg-[var(--border)] mx-2" />
                <div className="flex items-center gap-1 bg-[var(--bg-soft)] rounded-lg p-1">
                    <button
                        onClick={() => switchLocale('en')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${locale === 'en'
                            ? 'bg-[var(--bg)] text-[var(--fg)] shadow-sm'
                            : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => switchLocale('zh')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${locale === 'zh'
                            ? 'bg-[var(--bg)] text-[var(--fg)] shadow-sm'
                            : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                            }`}
                    >
                        中文
                    </button>
                </div>
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
                            href={`/${locale}/work`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isWork
                                ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                                : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                                }`}
                        >
                            {t('work')}
                        </Link>
                        <Link
                            href={`/${locale}/life`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isLife
                                ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                                : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                                }`}
                        >
                            {t('life')}
                        </Link>
                        <Link
                            href={`/${locale}/bkn`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isBkn
                                ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                                : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)]'
                                }`}
                        >
                            {t('bkn')}
                        </Link>
                        <div className="h-px bg-[var(--border)] my-2" />
                        <Link
                            href={`/${locale}/about`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-lg text-base font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                        >
                            {t('about')}
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-lg text-base font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-all"
                        >
                            {t('contact')}
                        </Link>

                        {/* Mobile Language Switcher */}
                        <div className="h-px bg-[var(--border)] my-2" />
                        <div className="flex items-center gap-2 px-4">
                            <span className="text-sm text-[var(--fg-muted)]">Language:</span>
                            <div className="flex items-center gap-1 bg-[var(--bg-soft)] rounded-lg p-1 flex-1">
                                <button
                                    onClick={() => {
                                        switchLocale('en');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`px-3 py-2 rounded text-sm font-medium transition-all flex-1 ${locale === 'en'
                                        ? 'bg-[var(--bg)] text-[var(--fg)] shadow-sm'
                                        : 'text-[var(--fg-muted)]'
                                        }`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => {
                                        switchLocale('zh');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`px-3 py-2 rounded text-sm font-medium transition-all flex-1 ${locale === 'zh'
                                        ? 'bg-[var(--bg)] text-[var(--fg)] shadow-sm'
                                        : 'text-[var(--fg-muted)]'
                                        }`}
                                >
                                    中文
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}