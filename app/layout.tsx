import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Barry — Portfolio',
    description: 'Software engineer, product builder, and storyteller',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        other: [
            {
                rel: 'icon',
                url: '/logo.png',
            },
        ],
    },
    openGraph: {
        title: 'Barry — Portfolio',
        description: 'Software engineer, product builder, and storyteller',
        type: 'website',
        images: ['/logo.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={inter.variable}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}