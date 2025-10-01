'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import { YouTubeEmbed } from './YouTubeEmbed';
import { GoogleSlidesEmbed } from './GoogleSlidesEmbed';

export function MDXContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);

    // Custom components for MDX
    const components = {
        YouTubeEmbed,
        GoogleSlidesEmbed,
    };

    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Component components={components} />
        </div>
    );
}
