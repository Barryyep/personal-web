import { LifePost, WorkPost } from 'contentlayer2/generated';

export type Post = LifePost | WorkPost;

type Visibility = 'public' | 'unlisted' | 'private';

export function isVisible(
    post: Post,
    env: 'dev' | 'prod' = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
): boolean {
    const v = (post as any).visibility as Visibility | undefined;
    if (!v || v === 'public') return true;
    if (v === 'unlisted') return true;
    if (v === 'private') return env === 'dev';
    return true;
}

export function listingFilter<T extends Post>(
    posts: T[],
    env: 'dev' | 'prod'
): T[] {
    return posts.filter((p) => {
        const v = (p as any).visibility as Visibility | undefined;
        if (v === 'private' && env === 'prod') return false;
        if (v === 'unlisted') return false;
        return true;
    });
}
