'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
    const words = ['matter', 'inspire', 'connect', 'smile'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 6000); // 每6秒切换一次

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-[calc(100vh-7rem)] gradient-bg">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-6" style={{ wordSpacing: '0.0em' }}>
                            <span className="gradient-text">Building things</span>
                            <br />
                        </h1>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-6 flex items-center justify-center gap-3 md:gap-6" style={{ wordSpacing: '0.5em' }}>
                            <span className="whitespace-nowrap">that</span>
                            <span className="inline-block">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[currentWordIndex]}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="gradient-text inline-block logo-font text-6xl md:text-9xl whitespace-nowrap"
                                    >
                                        {words[currentWordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--fg-muted)] mb-12 leading-relaxed max-w-2xl mx-auto">
                            Software engineer, product builder, and storyteller.
                            <br />
                            Crafting elegant solutions to complex problems.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/work" // /Work
                            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
                        >
                            View Work
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/"  // /Life
                            className="btn inline-flex items-center gap-2 px-8 py-3 text-lg"
                        >
                            Read Stories
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* /Work */}
                        <Link href="/work" className="block group">
                            <div className="card p-8 h-full hover:shadow-xl transition-all">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e84600] to-[#ff5e1a] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                                            Work
                                        </h3>
                                        <p className="text-[var(--fg-muted)] leading-relaxed">
                                            Projects, systems, and engineering work. From MVPs to production-scale applications.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-[var(--accent)] font-medium group-hover:translate-x-2 transition-transform">
                                    Explore projects
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* /Life */}
                        <Link href="/" className="block group">
                            <div className="card p-8 h-full hover:shadow-xl transition-all">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e84600] to-[#ff5e1a] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                                            Life
                                        </h3>
                                        <p className="text-[var(--fg-muted)] leading-relaxed">
                                            Personal moments, travel notes, and reflections. Stories worth sharing.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-[var(--accent)] font-medium group-hover:translate-x-2 transition-transform">
                                    Read stories
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* About Preview */}
            <section className="container mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-6">
                        I'm <span className="logo-font text-[var(--accent)] text-2xl">Barry</span>, a builder at heart. From AI-driven analytics to personal stories, I care about creating things that connect—between data and people, between work and life.
                    </p>
                    {/* /About */}
                    <Link href="/" className="text-[var(--accent)] font-medium hover:text-[var(--accent-soft)] transition-colors">
                        More about me →
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}