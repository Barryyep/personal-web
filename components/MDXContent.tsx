'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import { YouTubeEmbed } from './YouTubeEmbed';

export function MDXContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);

    // Custom components for MDX
    const components = {
        YouTubeEmbed,
    };

    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Component components={components} />
        </div>
    );
}
