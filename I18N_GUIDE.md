# 🌐 国际化（i18n）使用指南

## 已实现功能

✅ 基于 `next-intl` 的完整国际化方案
✅ 支持中文（zh）和英文（en）
✅ URL 路径自动添加语言前缀：`/en/...` 和 `/zh/...`
✅ 导航栏的语言切换器（桌面端和移动端）
✅ 自动语言检测（基于浏览器语言）

## 项目结构变化

### 路由结构
所有页面现在都在 `[locale]` 动态路由下：
```
app/
  [locale]/
    (work)/
    (life)/
    (site)/
    page.tsx
    layout.tsx
  layout.tsx (root)
```

### 翻译文件
翻译文件位于 `messages/` 目录：
- `messages/en.json` - 英文翻译
- `messages/zh.json` - 中文翻译

### 核心配置文件
- `i18n.ts` - 国际化配置
- `middleware.ts` - 处理语言路由的中间件
- `next.config.mjs` - Next.js 配置（添加了 next-intl 插件）

## 如何添加新的翻译

### 1. 在页面/组件中使用翻译

```tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function MyPage() {
    const t = useTranslations('PageName');
    const locale = useLocale();
    
    return (
        <div>
            <h1>{t('title')}</h1>
            <Link href={`/${locale}/about`}>About</Link>
        </div>
    );
}
```

### 2. 在翻译文件中添加内容

**messages/en.json:**
```json
{
  "PageName": {
    "title": "My Title",
    "description": "My description"
  }
}
```

**messages/zh.json:**
```json
{
  "PageName": {
    "title": "我的标题",
    "description": "我的描述"
  }
}
```

## MDX 内容的多语言支持

### 方法：在 frontmatter 中指定 locale

```mdx
---
title: "My Post"
date: "2024-01-01"
summary: "This is my post"
locale: "en"
---

Content here...
```

```mdx
---
title: "我的文章"
date: "2024-01-01"
summary: "这是我的文章"
locale: "zh"
---

内容在这里...
```

## URL 结构

- **英文**：`https://yoursite.com/en/work`
- **中文**：`https://yoursite.com/zh/work`

首次访问时，middleware 会根据浏览器语言自动重定向到相应语言版本。

## 语言切换器

导航栏右侧有语言切换按钮：
- 桌面端：EN / 中文 切换按钮
- 移动端：菜单中的 Language 选项

切换语言时会保持当前页面路径，例如：
- 从 `/en/work` 切换到中文 → `/zh/work`
- 从 `/zh/about` 切换到英文 → `/en/about`

## 注意事项

⚠️ **所有内部链接都需要包含 locale 前缀**：
```tsx
// ❌ 错误
<Link href="/work">Work</Link>

// ✅ 正确
<Link href={`/${locale}/work`}>Work</Link>
```

⚠️ **在 MDX 文件的 frontmatter 中指定 locale**：
```mdx
---
title: "标题"
locale: "zh"  # 必须指定
---
```

## 开发和构建

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动
npm start
```

访问：
- http://localhost:3000/en
- http://localhost:3000/zh

## 添加新语言

1. 在 `i18n.ts` 中添加语言代码：
```ts
export const locales = ['en', 'zh', 'fr'] as const; // 添加法语
```

2. 创建新的翻译文件 `messages/fr.json`

3. 在导航组件中添加切换按钮

就这么简单！🎉

