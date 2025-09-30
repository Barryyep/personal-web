# 🌟 Personal Portfolio Website

> **A modern, dual-themed personal website built with Next.js 14+**

Separate your professional work from personal moments with distinct design aesthetics — **Work** (cyber/tech) and **Life** (cute/soft).

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready!

📖 **New here?** Start with [START_HERE.md](./START_HERE.md) for a guided tour.

---

## 🎨 Design Philosophy

- **Work Section**: Cyber/tech aesthetic with dark colors, neon accents, and grid patterns
- **Life Section**: Cute/soft aesthetic with pastel colors, gentle gradients, and playful elements
- **Content-First**: MDX-powered blog posts with visibility controls (public/unlisted/private)

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Content**: Contentlayer + MDX
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## 📦 Features

- ✅ Dual-themed UI (Work = Cyber, Life = Cute)
- ✅ MDX content with syntax highlighting
- ✅ Content visibility control (public/unlisted/private)
- ✅ Dynamic OG Image generation
- ✅ SEO optimized with sitemap
- ✅ Fully responsive design
- ✅ Type-safe content with Contentlayer
- ✅ Animated page transitions

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [START_HERE.md](./START_HERE.md) | 👋 New? Start here! Quick overview and first steps |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | 📖 Detailed setup and customization guide |
| [COMMANDS.md](./COMMANDS.md) | ⚡ Quick reference for common commands |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | 📋 Complete feature list and architecture |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | ✅ Pre-launch checklist |

---

## 🎯 What You Get

- ✨ **Dual Theme System** - Cyber aesthetic for Work, Cute design for Life
- 📝 **MDX Blog** - Write posts with Markdown + React components
- 🔒 **Visibility Control** - Public, unlisted, or private posts
- 🎨 **Animated UI** - Smooth transitions with Framer Motion
- 📱 **Fully Responsive** - Beautiful on all devices
- 🚀 **SEO Ready** - Auto-generated sitemaps, OG images, and meta tags
- ⚡ **Fast** - Optimized Next.js App Router with edge functions
- 🎭 **Type Safe** - Full TypeScript coverage

## 📝 Content Management

### Adding Work Posts

Create a new `.mdx` file in `content/work/`:

```mdx
---
title: "Your Project Title"
date: 2025-03-15
summary: "Brief description of the project"
tech: ["React", "Node.js", "PostgreSQL"]
featured: true
visibility: public
---

Your content here...
```

### Adding Life Posts

Create a new `.mdx` file in `content/life/`:

```mdx
---
title: "Your Story Title"
date: 2025-03-15
summary: "Brief description"
tags: ["travel", "photography"]
visibility: public
---

Your content here...
```

### Visibility Options

- `public`: Visible in listings and search engines
- `unlisted`: Accessible via direct link, not in listings
- `private`: Only visible in development mode

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize theme colors:

```css
.theme-work {
  --bg: #0a0b0f;
  --accent: #22d3ee;
  /* ... */
}

.theme-life {
  --bg: #fff9fb;
  --accent: #ff89b6;
  /* ... */
}
```

### Personal Information

Update the following files:
- `app/(site)/about/page.tsx` - About page content
- `app/(site)/contact/page.tsx` - Contact information
- `app/layout.tsx` - Site metadata

## 📁 Project Structure

```
personal-web/
├── app/
│   ├── (site)/           # Main site group
│   │   ├── about/
│   │   └── contact/
│   ├── (work)/           # Work section (cyber theme)
│   │   └── work/
│   ├── (life)/           # Life section (cute theme)
│   │   └── life/
│   ├── api/
│   │   └── og/           # OG image generation
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── MDXContent.tsx
│   └── Navigation.tsx
├── content/
│   ├── work/             # Work posts (MDX)
│   └── life/             # Life posts (MDX)
├── lib/
│   └── visibility.ts     # Content visibility logic
├── contentlayer.config.ts
└── package.json
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
4. Deploy!

Vercel will automatically:
- Build your site with Contentlayer
- Generate static pages
- Set up edge functions for OG images

### Custom Domain

1. Add your domain in Vercel dashboard
2. Update DNS records at your registrar
3. Wait for DNS propagation

## 📊 Analytics (Optional)

Add analytics by installing:
- Vercel Analytics
- Plausible Analytics
- Google Analytics

## 💬 Comments (Optional)

Add comments to posts using:
- Giscus (GitHub Discussions)
- Utterances (GitHub Issues)

## 📄 License

MIT License - feel free to use this as a template for your own site!

## 🙏 Acknowledgments

- Design inspiration: Cyberpunk aesthetics + Kawaii culture
- Built with the amazing Next.js and Tailwind CSS communities

---

Built with ❤️ by Barry