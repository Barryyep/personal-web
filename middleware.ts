import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
    // 支持的语言列表
    locales: locales,

    // 默认语言
    defaultLocale: 'en',

    // 语言检测策略
    localeDetection: false,

    // URL 路径前缀策略
    localePrefix: 'always' // URL 会是 /en/... 或 /zh/...
});

export const config = {
    // 匹配除了 API、静态文件、图片等之外的所有路径
    matcher: [
        // 匹配所有路径除了
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ]
};

