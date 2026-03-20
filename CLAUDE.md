# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

LinkedIn Translator 工具站 (linkedintranslator.net)，基于 ShipAny Template Two (v1.8.2) AI SaaS 模板开发。目标关键词：LinkedIn Translator、Translate to/from LinkedIn Speak。

## 技术栈

- **框架**: Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **样式**: Tailwind CSS 4 + Shadcn/UI (New York style) + Framer Motion
- **数据库**: Drizzle ORM，支持 SQLite/Turso/PostgreSQL/MySQL/Cloudflare D1
- **认证**: Better Auth (Email + Google + GitHub OAuth)
- **支付**: Stripe / PayPal / Creem (PaymentManager 插件架构)
- **i18n**: next-intl (en/zh)，消息文件在 `src/config/locale/messages/{locale}/`
- **内容**: Fumadocs MDX (`content/` 目录) + Next MDX Remote
- **AI**: OpenRouter + Replicate + AI SDK
- **包管理器**: pnpm

## 常用命令

```bash
pnpm dev                # 开发服务器 (Turbopack)
pnpm build              # 生产构建
pnpm build:fast         # 大内存构建
pnpm lint               # ESLint 检查
pnpm format             # Prettier 格式化
pnpm format:check       # 格式化检查

# 数据库
pnpm db:generate        # 生成 Drizzle schema
pnpm db:migrate         # 运行迁移
pnpm db:push            # 推送 schema 到数据库
pnpm db:studio          # Drizzle Studio

# 认证 & RBAC
pnpm auth:generate      # 生成认证类型
pnpm rbac:init          # 初始化角色权限
pnpm rbac:assign        # 分配角色

# Cloudflare 部署
pnpm cf:preview         # 预览
pnpm cf:deploy          # 部署
```

## 架构分层

```
src/
├── core/        # 框架基础设施 (auth, db, i18n, theme, rbac)
├── config/      # 全局配置 + 数据库 schema + 样式 + 国际化消息
├── extensions/  # 可插拔提供商 (payment, ai, storage, email)
├── shared/      # 可复用业务逻辑
│   ├── blocks/      # 页面区块组件
│   ├── components/  # React 组件 (ui/ 为 Shadcn 基础组件)
│   ├── hooks/       # 自定义 Hooks
│   ├── lib/         # 工具函数 (seo, cache, rate-limit 等)
│   ├── models/      # 数据查询层 (User, Chat, Order, Credit 等)
│   └── services/    # 业务服务层
├── themes/      # 主题样式
└── app/         # Next.js 路由
    ├── [locale]/    # 国际化路由
    │   ├── (landing)/  # 落地页 + 博客 + 设置
    │   ├── (auth)/     # 登录注册
    │   ├── (chat)/     # 聊天界面
    │   ├── (admin)/    # 管理后台
    │   └── (docs)/     # 文档
    └── api/         # API 路由 (auth, chat, payment, ai, user 等)
```

## 关键设计模式

- **数据库多后端**: `src/config/db/schema.{sqlite,postgres,mysql}.ts` 按 `DATABASE_PROVIDER` 环境变量选择
- **支付插件**: `PaymentManager` 在 `src/extensions/payment/` 下注册多个提供商
- **AI 扩展**: `src/extensions/ai/` 下各提供商独立实现
- **SEO**: `src/shared/lib/seo.ts` 提供 metadata 生成，根布局注入 hrefLang
- **内容系统**: MDX 文件在 `content/{docs,pages,posts,logs}/`，`source.config.ts` 配置

## 环境变量

参考 `.env.example`，核心必填项：
- `NEXT_PUBLIC_APP_URL` / `NEXT_PUBLIC_APP_NAME`
- `DATABASE_PROVIDER` / `DATABASE_URL`
- `AUTH_SECRET` / `AUTH_URL`

支付、OAuth、AI、邮件等通过管理后台 Settings 面板配置。

## 代码规范

- **导入顺序**: React/Next → 第三方 → @/core → @/config → @/extensions → @/shared → @/themes → 相对路径
- **路径别名**: `@/*` → `src/*`
- **Prettier**: 80 字符宽度，尾逗号 ES5，单引号，import 排序 + Tailwind 类排序
- **数据库 schema 修改**: 需同时更新对应后端的 schema 文件，然后 `pnpm db:generate && pnpm db:migrate`

## 部署

- **Vercel**: `vercel.json` 配置函数超时 (AI 路由 60s)
- **Cloudflare Workers**: `wrangler.toml.example` 模板 (D1 + Hyperdrive + R2)
- **Docker**: 多阶段构建，Node 20 Alpine，端口 3000
