import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const Visibility = ['public', 'unlisted', 'private'] as const;

export const WorkPost = defineDocumentType(() => ({
    name: 'WorkPost',
    filePathPattern: `work/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        summary: { type: 'string', required: true },
        tech: { type: 'list', of: { type: 'string' } },
        hero: { type: 'string', required: false },
        featured: { type: 'boolean', default: false },
        visibility: { type: 'enum', options: Visibility as any, default: 'public' },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath.replace(/^work\//, ''),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/work/${doc._raw.flattenedPath.replace(/^work\//, '')}`
        },
    },
}));

export const LifePost = defineDocumentType(() => ({
    name: 'LifePost',
    filePathPattern: `life/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        summary: { type: 'string', required: true },
        hero: { type: 'string', required: false },
        visibility: { type: 'enum', options: Visibility as any, default: 'public' },
        tags: { type: 'list', of: { type: 'string' } },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath.replace(/^life\//, ''),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/life/${doc._raw.flattenedPath.replace(/^life\//, '')}`
        },
    },
}));

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [WorkPost, LifePost],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            [
                rehypePrettyCode as any,
                {
                    theme: 'github-dark',
                    keepBackground: false,
                },
            ],
        ],
    },
});
