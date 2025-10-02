import { getRequestConfig } from 'next-intl/server';

// 支持的语言列表
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    // 如果 locale 未定义，使用默认值
    const finalLocale = (locale as Locale) || 'en';

    return {
        locale: finalLocale,
        messages: (await import(`./messages/${finalLocale}.json`)).default
    };
});

