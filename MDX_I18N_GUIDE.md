# 📝 MDX 内容多语言指南

## 🎯 方案概述

对于 MDX 文件（如博客文章、作品案例），有以下几种多语言处理方式：

---

## ✅ **方案 1：为每个语言创建单独文件（推荐）**

### 文件结构
```
content/
  work/
    bi-dashboard.en.mdx          ← 英文版本
    bi-dashboard.zh.mdx          ← 中文版本
    llm-powered-ETL.en.mdx
    llm-powered-ETL.zh.mdx
  life/
    trip-2025-okinawa.en.mdx
    trip-2025-okinawa.zh.mdx
    anniversary-2024.en.mdx
    anniversary-2024.zh.mdx
```

### Frontmatter 配置
**英文版 (bi-dashboard.en.mdx):**
```mdx
---
title: "BI Dashboard"
date: "2024-01-15"
summary: "A comprehensive business intelligence dashboard"
tech: ["React", "Python", "PostgreSQL"]
featured: true
visibility: "public"
locale: "en"
---

Full English content here...
```

**中文版 (bi-dashboard.zh.mdx):**
```mdx
---
title: "BI 仪表板"
date: "2024-01-15"
summary: "一个综合商业智能仪表板"
tech: ["React", "Python", "PostgreSQL"]
featured: true
visibility: "public"
locale: "zh"
---

完整的中文内容在这里...
```

### 在页面中使用

**work/page.tsx:**
```typescript
export default function WorkListPage({ params }: { params: { locale: string } }) {
    const locale = params.locale || 'en';
    
    // 根据 locale 过滤文章
    const posts = allWorkPosts
        .filter(post => post.locale === locale)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date));

    return (
        // 渲染文章列表
    );
}
```

**work/[slug]/page.tsx:**
```typescript
export default function WorkPostPage({ 
    params 
}: { 
    params: { slug: string; locale: string } 
}) {
    const locale = params.locale || 'en';
    
    // 找到对应语言的文章
    const post = allWorkPosts.find(
        p => p.slug === params.slug && p.locale === locale
    );

    if (!post) notFound();

    return (
        // 渲染文章内容
    );
}
```

### ✅ 优点
- 内容完全独立，易于管理
- 可以为不同语言定制不同的长度和风格
- 图片、链接等可以分别处理
- SEO 友好

### ⚠️ 缺点
- 需要维护两份文件
- 文件数量翻倍

---

## 🔄 **方案 2：共享 Frontmatter，内容切换（适合短内容）**

### 文件结构
```
content/
  work/
    bi-dashboard.mdx    ← 包含双语内容
```

### Frontmatter 配置
```mdx
---
title: 
  en: "BI Dashboard"
  zh: "BI 仪表板"
date: "2024-01-15"
summary:
  en: "A comprehensive business intelligence dashboard"
  zh: "一个综合商业智能仪表板"
tech: ["React", "Python", "PostgreSQL"]
---

# EN

Full English content here...

---

# ZH

完整的中文内容在这里...
```

### ⚠️ 这个方案需要自定义 Contentlayer 配置，比较复杂，**不推荐**

---

## 🎯 **推荐实践：使用方案 1**

### 步骤 1：为现有 MDX 创建语言版本

以 `trip-2025-okinawa.mdx` 为例：

#### 1. 重命名现有文件
```bash
mv content/life/trip-2025-okinawa.mdx content/life/trip-2025-okinawa.en.mdx
```

#### 2. 添加 `locale: "en"` 到 frontmatter
```mdx
---
title: "Okinawa Trip 2025"
date: "2025-01-15"
summary: "A journey to the islands"
locale: "en"    ← 添加这一行
---
```

#### 3. 创建中文版本
```bash
cp content/life/trip-2025-okinawa.en.mdx content/life/trip-2025-okinawa.zh.mdx
```

#### 4. 翻译中文版本的 frontmatter 和内容
```mdx
---
title: "2025 冲绳之旅"
date: "2025-01-15"
summary: "岛屿之旅"
locale: "zh"
---

中文内容...
```

---

## 📦 更新 Contentlayer 配置（已完成）

在 `contentlayer.config.ts` 中已经添加了 `locale` 字段：

```typescript
export const WorkPost = defineDocumentType(() => ({
    fields: {
        // ...其他字段
        locale: { type: 'enum', options: ['en', 'zh'], default: 'en' },
    },
    computedFields: {
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
```

---

## 🔍 完整示例

### 创建一个双语工作案例

**content/work/my-project.en.mdx:**
```mdx
---
title: "My Amazing Project"
date: "2024-10-01"
summary: "This project showcases my skills in full-stack development"
tech: ["Next.js", "TypeScript", "Tailwind"]
featured: true
visibility: "public"
locale: "en"
---

## Overview

This is a full-stack application built with modern technologies...

## Features

- Feature 1
- Feature 2
- Feature 3

## Tech Stack

Built with Next.js, TypeScript, and Tailwind CSS.
```

**content/work/my-project.zh.mdx:**
```mdx
---
title: "我的精彩项目"
date: "2024-10-01"
summary: "这个项目展示了我在全栈开发方面的技能"
tech: ["Next.js", "TypeScript", "Tailwind"]
featured: true
visibility: "public"
locale: "zh"
---

## 概述

这是一个使用现代技术构建的全栈应用...

## 功能特性

- 功能 1
- 功能 2
- 功能 3

## 技术栈

使用 Next.js、TypeScript 和 Tailwind CSS 构建。
```

---

## 💡 小贴士

### 1. **文件命名规范**
- 使用 `.en.mdx` 和 `.zh.mdx` 后缀
- 保持 slug 部分一致（如 `my-project`）

### 2. **Frontmatter 字段**
- `title`、`summary` 等需要翻译
- `date`、`tech`、`featured` 等保持一致
- **必须添加 `locale` 字段**

### 3. **内容迁移流程**
```bash
# 1. 重命名现有文件
mv content/work/project.mdx content/work/project.en.mdx

# 2. 添加 locale 到 frontmatter
# 编辑文件，添加 locale: "en"

# 3. 复制为中文版
cp content/work/project.en.mdx content/work/project.zh.mdx

# 4. 翻译中文版
# 编辑 project.zh.mdx，翻译所有内容并设置 locale: "zh"
```

### 4. **重新生成 Contentlayer**
```bash
npm run build
# 或在开发时会自动检测
```

---

## ✨ 最终效果

访问：
- `/en/work/my-project` - 显示英文内容
- `/zh/work/my-project` - 显示中文内容

切换语言时会自动跳转到对应语言的文章！

---

## 🚀 开始迁移

建议顺序：
1. 从最重要的文章开始
2. 先做 featured 的项目
3. 逐步迁移其他内容

Happy translating! 🎉


