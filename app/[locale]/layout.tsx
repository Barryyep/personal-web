import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navigation } from '@/components/Navigation';
import { Analytics } from '@vercel/analytics/next';

export function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'zh' }
    ];
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const locale = params.locale || 'en';

    // 获取当前语言的翻译消息
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <header className="border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg)]/80">
                <Navigation />
            </header>
            {children}
            <Analytics />
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
        </NextIntlClientProvider>
    );
}

