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
        locale: { type: 'enum', options: ['en', 'zh'], default: 'en' },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => {
                const path = doc._raw.flattenedPath.replace(/^work\//, '');
                // 如果文件名包含 .en 或 .zh，移除它
                return path.replace(/\.(en|zh)$/, '');
            },
        },
        url: {
            type: 'string',
            resolve: (doc) => {
                const locale = doc.locale || 'en';
                const slug = doc._raw.flattenedPath.replace(/^work\//, '').replace(/\.(en|zh)$/, '');
                return `/${locale}/work/${slug}`;
            }
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
        locale: { type: 'enum', options: ['en', 'zh'], default: 'en' },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => {
                const path = doc._raw.flattenedPath.replace(/^life\//, '');
                // 如果文件名包含 .en 或 .zh，移除它
                return path.replace(/\.(en|zh)$/, '');
            },
        },
        url: {
            type: 'string',
            resolve: (doc) => {
                const locale = doc.locale || 'en';
                const slug = doc._raw.flattenedPath.replace(/^life\//, '').replace(/\.(en|zh)$/, '');
                return `/${locale}/life/${slug}`;
            }
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
