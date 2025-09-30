'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

export function MDXContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);
    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Component />
        </div>
    );
}
