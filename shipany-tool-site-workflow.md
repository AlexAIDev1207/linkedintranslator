# ShipAny Two 工具站快速开发手册

> 基于 SongFromLink 项目实战经验，提炼出的通用开发流程。
> 目标：拿到模板后，照着这份手册从零到上线。

---

## 整体节奏

```
Step 1  初始化 + 跑通模板       ── 30 分钟
Step 2  品牌替换（去掉 ShipAny） ── 2 小时
Step 3  配置登录/支付/邮件/积分  ── 2 小时
Step 4  开发核心工具功能         ── 1-3 天（唯一耗时大头）
Step 5  Logo + UI 定制          ── 2 小时
Step 6  SEO（首页 + 落地页）    ── 4 小时
Step 7  博客内容                ── 4 小时
Step 8  多语言                  ── 2 小时
Step 9  部署上线                ── 2 小时
```

> 除了 Step 4（核心功能），其他步骤都是机械性操作，熟练后半天搞定。

---

## Step 1：初始化 + 跑通模板（30 分钟）

### 1.1 克隆模板

```bash
# 从 ShipAny Two 初始化（v1.8.2，基于 Next.js App Router）
# 建议用 cf 分支（Cloudflare 优化版）
pnpm install
```

### 1.2 最小化环境变量

先只配这 3 个，让模板能跑起来：

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="YourAppName"
AUTH_SECRET=""   # openssl rand -base64 32 生成
```

数据库暂时用 SQLite 或本地 PostgreSQL 即可，不急着配 Supabase。

### 1.3 验证模板可用

```bash
pnpm dev
# 访问 http://localhost:3000 确认页面正常
# 点击登录/注册确认认证流程正常
```

### 模板自带的能力（不需要开发，直接用）

| 能力 | 说明 | 位置 |
|------|------|------|
| 认证 | Better Auth（邮箱密码 + Google/GitHub OAuth + 邮件验证） | `src/core/auth/` |
| 支付 | Stripe / PayPal / Creem（一次性 + 订阅） | `src/extensions/payment/` |
| 积分 | credit 表 + FIFO 消耗 + 过期管理 + 注册赠送 | `src/shared/models/credit.ts` |
| 邮件 | Resend（注册验证、通知） | `src/extensions/email/` |
| i18n | next-intl（默认 en/zh，可扩展） | `src/config/locale/` |
| 博客 | Fumadocs MDX | `content/posts/` |
| 管理后台 | 用户/订单/配置管理 | `src/app/[locale]/(admin)/` |
| UI | shadcn/ui + Tailwind | `src/shared/components/ui/` |
| SEO | sitemap.ts + robots.ts + getMetadata() + JSON-LD | `src/shared/lib/seo.ts` |
| 部署 | Dockerfile + docker-compose + GitHub Actions | 项目根目录 |
| 法律 | 隐私政策 + 服务条款（MDX） | `content/pages/` |

---

## Step 2：品牌替换（2 小时）

**核心原则**：模板所有内容都通过 JSON 配置，不需要改 React 代码。

### 2.1 应用名称和元信息

| 改什么 | 去哪改 |
|--------|--------|
| 应用名（fallback） | `src/config/index.ts` → 把 `ShipAny App` 改成你的名字 |
| 站点 Title / Description | `src/config/locale/messages/{lang}/common.json` → `metadata` 部分 |

### 2.2 首页（最重要）

文件：`src/config/locale/messages/{lang}/pages/index.json`

首页是 **section 驱动** 的，通过 `show_sections` 数组控制显示哪些模块：

```json
{
  "show_sections": ["hero", "your-tool", "usage", "features", "faq", "cta"],
  "sections": {
    "hero": {
      "title": "你的产品标语",
      "description": "副标题描述",
      "buttons": [{ "title": "开始使用", "url": "/chat", "variant": "default" }],
      "block": "hero"
    },
    "usage": {
      "title": "如何使用",
      "items": [
        { "title": "第一步", "description": "...", "icon": "Link" },
        { "title": "第二步", "description": "...", "icon": "Search" }
      ],
      "block": "features-step"
    }
  }
}
```

**模板默认有 ~10 个 section**（hero/logos/introduce/benefits/stats/testimonials...），工具站一般精简为 5-7 个。直接在 `show_sections` 数组里删掉不需要的。

### 2.3 导航栏 + 页脚

文件：`src/config/locale/messages/{lang}/landing.json`

```json
{
  "header": {
    "brand": { "title": "YourApp", "logo": { "src": "/logo.svg" }, "url": "/" },
    "nav": {
      "items": [
        { "title": "定价", "url": "/pricing", "icon": "DollarSign" },
        { "title": "博客", "url": "/blog", "icon": "Newspaper" },
        {
          "title": "功能",
          "icon": "Smartphone",
          "children": [
            { "title": "子页面1", "url": "/page1" },
            { "title": "子页面2", "url": "/page2" }
          ]
        }
      ]
    },
    "user_nav": {
      "show_name": true,
      "show_credits": true,     // 登录后显示积分余额
      "show_sign_out": true
    },
    "show_sign": true,    // 显示登录按钮
    "show_theme": true,   // 显示主题切换
    "show_locale": true   // 显示语言切换
  },
  "footer": {
    "brand": { "title": "YourApp", "description": "一句话介绍" },
    "nav": { "items": [{ "title": "产品", "children": [...] }] },
    "social": { "items": [{ "title": "X", "icon": "RiTwitterXFill", "url": "..." }] },
    "agreement": { "items": [
      { "title": "隐私政策", "url": "/privacy-policy" },
      { "title": "服务条款", "url": "/terms-of-service" }
    ]}
  }
}
```

### 2.4 定价页

文件：`src/config/locale/messages/{lang}/pages/pricing.json`

```json
{
  "items": [
    {
      "title": "积分包",
      "description": "50 次使用",
      "interval": "one-time",
      "amount": 299,          // 单位：分（$2.99）
      "currency": "USD",
      "price": "$2.99",
      "product_id": "credit-pack-50",
      "credits": 50,
      "valid_days": 0,        // 0 = 永不过期
      "features": ["50 次使用", "永不过期"],
      "button": { "title": "购买", "url": "/pricing" }
    },
    {
      "title": "Pro 月付",
      "interval": "month",
      "amount": 399,
      "plan_name": "Pro",
      "credits": 9999,
      "valid_days": 30,
      "is_featured": true     // 高亮推荐
    }
  ]
}
```

### 2.5 其他需要替换的地方

| 文件 | 改什么 |
|------|--------|
| `{lang}/pages/blog.json` | 博客页标题 |
| `{lang}/admin/sidebar.json` | 管理后台标题 |
| `{lang}/ai/chat.json` | 聊天页标题 |
| `{lang}/pages/showcases.json` | 案例页标题 |
| `src/shared/blocks/common/built-with.tsx` | 移除或改成自己的链接 |

> **注意**：每个 JSON 文件在所有语言目录下都要改（默认 en/zh，后续按需加语言）。

---

## Step 3：配置登录/支付/邮件/积分（2 小时）

### 3.1 登录认证

模板用 **Better Auth**，开箱即支持邮箱密码登录，零配置。

**添加 Google 登录**（推荐）：
1. 去 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 凭据
2. 填入 `.env`：
   ```env
   GOOGLE_CLIENT_ID=xxx
   GOOGLE_CLIENT_SECRET=xxx
   ```
3. 完成。模板自动检测到这两个变量就会启用 Google 登录按钮。

**添加 GitHub 登录**（可选）：同理配置 `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`。

**邮件验证**：在管理后台 Settings → Auth 里打开 `email_verification_enabled`。

### 3.2 邮件服务

用于发送注册验证邮件、通知等。

1. 注册 [Resend](https://resend.com/)
2. 填入 `.env`：
   ```env
   RESEND_API_KEY=re_xxx
   ```
3. 在管理后台 Settings → Email 配置发件人邮箱

### 3.3 支付（Stripe）

1. 注册 [Stripe](https://stripe.com/)，获取密钥
2. 填入 `.env`：
   ```env
   STRIPE_PRIVATE_KEY=sk_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
3. 在 Stripe Dashboard 创建产品和价格，拿到 `product_id`
4. 在 `pricing.json` 中的 `product_id` 字段填入对应 Stripe 产品 ID
5. 配置 Webhook 地址：`https://yourdomain.com/api/payment/notify/stripe`
   - 监听事件：`checkout.session.completed`, `invoice.payment_succeeded` 等

> Webhook 端点模板已内置：`/api/payment/notify/[provider]`（stripe / paypal / creem），不需要自己写。

### 3.4 积分系统

模板内置完整积分系统，你只需要在管理后台配置：

| 设置项 | 说明 | 建议值 |
|--------|------|--------|
| `initial_credits_enabled` | 注册送积分 | `true` |
| `initial_credits_amount` | 送多少 | `3~5` |
| `initial_credits_valid_days` | 有效期（天） | `0`（永不过期） |

积分消耗逻辑：在你的工具 API 中调用模板提供的函数：
```typescript
import { consumeCredits, getRemainingCredits } from '@/shared/models/credit'

// 检查余额
const balance = await getRemainingCredits(userId)
// 消耗积分
await consumeCredits(userId, 1, 'TOOL_USE', taskId)
```

### 3.5 数据库

**推荐 Supabase**（免费额度够用）：
1. 创建 Supabase 项目
2. 拿到连接字符串，填入 `.env`：
   ```env
   DATABASE_PROVIDER=postgresql
   DATABASE_URL=postgresql://postgres:xxx@xxx.supabase.co:6543/postgres
   ```
3. 执行迁移：
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

**注意**：Supabase Transaction Pooler (端口 6543) 不支持 `FOR UPDATE` 行级锁。如果需要防竞态，用唯一约束代替。

---

## Step 4：开发核心工具功能（1-3 天）

**这是唯一需要真正写代码的步骤**，其他都是配置。

### 4.1 代码放哪里

遵循模板分层约定：

```
src/extensions/your-tool/     # 核心业务逻辑（必须）
├── types.ts                  # 类型定义
├── api-handlers.ts           # API 处理函数
├── your-provider.ts          # 第三方 API 封装
└── error-codes.ts            # 错误码

src/app/api/your-tool/        # API 路由（必须）
├── process/route.ts          # POST 提交任务
└── result/route.ts           # GET 获取结果

src/shared/components/tool/   # 前端组件（必须）
├── tool-widget.tsx           # 主工具组件
├── input-area.tsx            # 输入
├── result-card.tsx           # 结果展示
└── error-card.tsx            # 错误展示

src/config/db/schema.postgres.ts  # 新增业务表（按需）
src/core/queue/                    # 异步队列（按需，耗时操作用）
```

### 4.2 API 路由写法

API route 只做校验和调用 handler，业务逻辑放 extensions 层：

```typescript
// src/app/api/your-tool/process/route.ts
import { handleProcess } from '@/extensions/your-tool/api-handlers'

export async function POST(request: Request) {
  return handleProcess(request)
}
```

### 4.3 新增数据库表

在 `src/config/db/schema.postgres.ts` 中追加表定义（Drizzle ORM）：

```typescript
export const yourToolResult = pgTable("your_tool_result", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  input: text("input").notNull(),
  output: jsonb("output"),
  createdAt: timestamp("created_at").defaultNow(),
})
```

然后执行迁移：
```bash
pnpm db:generate   # 生成迁移 SQL
pnpm db:migrate    # 执行迁移
```

### 4.4 嵌入首页

开发完工具组件后，在首页配置中引用：

1. 在 `src/themes/default/blocks/` 创建新的 block 文件
2. 在 `pages/index.json` 的 `show_sections` 中添加你的 block
3. block 通过 `id` 关联到对应的 section 数据

### 4.5 如果需要异步队列

耗时操作（>3 秒）建议用 BullMQ：

```
用户提交 → API 入队 → 立即返回 taskId → Worker 后台处理 → 前端轮询结果
```

需要 Redis：
```env
REDIS_URL=redis://localhost:6379/0    # 本地开发
# 或
REDIS_URL=rediss://xxx@xxx.upstash.io:6379  # 生产（Upstash，注意 rediss:// 双 s 表示 TLS）
```

---

## Step 5：Logo + UI 定制（2 小时）

### 5.1 替换 Logo

```
public/logo.svg       ← 主 Logo（SVG 格式，推荐）
public/logo.png       ← PNG 版本（512×512，用于 OG 图）
public/favicon.ico    ← 浏览器标签图标（32+48px）
src/app/favicon.ico   ← Next.js 引用的 favicon
```

操作：设计 SVG → 导出 PNG (512×512) → 转 ICO (32+48) → 替换以上 4 个文件。

在 `landing.json` 的 `header.brand.logo` 中确认路径指向正确。

### 5.2 主题色

编辑 `src/config/style/theme.css` 中的 CSS 变量，或修改 `tailwind.config.ts`。

### 5.3 首页 UI 调整

- Block 组件在 `src/themes/default/blocks/` — 改样式改这里
- 共享组件在 `src/shared/components/` — 改交互改这里
- shadcn/ui 基础组件在 `src/shared/components/ui/` — 一般不用改

---

## Step 6：SEO 优化（4 小时）

### 6.1 基础 SEO（每个页面都要做）

模板提供 `getMetadata()` 统一生成 TD + OG + canonical：

```typescript
// 在任意 page.tsx 中
export const generateMetadata = getMetadata({
  metadataKey: 'pages.pricing.metadata',  // 从 i18n JSON 读取
  canonicalUrl: '/pricing',
})
```

**各页面 SEO 配置都在 JSON 文件的 `metadata` 字段**：

```json
{
  "metadata": {
    "title": "控制在 50-60 字符，含主关键词",
    "description": "控制在 130-155 字符"
  }
}
```

### 6.2 首页深度 SEO

| 要点 | 做法 |
|------|------|
| H1 唯一 | hero 的 title 即 H1，全页只有一个 |
| 关键词密度 | ~3-5%，主关键词在前 100 字出现 |
| 内链 | CTA 区域链接到落地页和博客，≥10 条 |
| 配图 | Unsplash/Pexels 免费商用图，加 alt 文字 |
| 结构化数据 | WebApplication + FAQPage JSON-LD |

### 6.3 创建场景/平台落地页

为每个使用场景创建独立落地页，增加关键词覆盖面：

```
src/app/[locale]/(landing)/
├── scenario-a/page.tsx
├── scenario-b/page.tsx
└── scenario-c/page.tsx
```

每个落地页建议 7 个 section：
```
Hero → How It Works → Why Use → Limitations → FAQ → Related Pages → CTA
```

**关键**：页面之间互相链接（Related Pages section），形成内链网络。

**踩坑提醒**：`generateMetadata` 如果是高阶函数（返回函数），必须正确调用，不能直接 export 返回值。

### 6.4 结构化数据

```typescript
// 在页面中添加 JSON-LD
<WebApplicationJsonLd name="YourApp" url="https://..." />
<FAQPageJsonLd questions={faqData} />
<BreadcrumbJsonLd items={breadcrumbs} />
```

### 6.5 Sitemap & Robots

模板自带动态 `sitemap.ts`，新增页面后确认已包含。`robots.ts` 默认配置合理，一般不用改。

---

## Step 7：博客内容（4 小时）

### 7.1 写博客

模板用 Fumadocs MDX，文章放 `content/posts/` 目录：

```
content/posts/
├── how-to-use-feature-a.mdx         # 英文
├── how-to-use-feature-a.zh.mdx      # 中文
├── compare-with-competitor.mdx
└── troubleshooting-guide.mdx
```

MDX frontmatter 格式：
```yaml
---
title: "文章标题"
description: "SEO 描述"
created_at: "2026-03-20"
image: "/imgs/seo/blog/cover.jpg"
category: "tutorial"
---
```

### 7.2 博客主题规划

工具站博客建议覆盖这几类：
- **How-to 教程**：每个功能/场景一篇
- **对比文章**：vs 竞品（如 "YourTool vs Competitor"）
- **故障排查**："为什么 XX 不工作？"
- **科普/原理**："XX 是如何工作的？"
- **评测/盘点**："2026 年最好的 XX 工具"

### 7.3 SEO 质检标准

- 每篇 ≥1000 词
- 关键词密度 3-5%
- ≥3 条内链（链接到工具页、落地页、其他博客）
- 配图 3 张（封面 + 2 张正文）
- 零竞争关键词优先发布

### 7.4 分批发布（可选）

在文章获取函数中过滤 `created_at > 当前时间`，实现定时发布。按 SEO 优先级排序：竞争度低的关键词先发。

---

## Step 8：多语言扩展（2 小时）

模板默认 en/zh，扩展新语言的步骤：

### 8.1 注册语言

`src/config/locale/index.ts`：在 `locales` 数组中添加语言代码。

### 8.2 翻译 UI

为每种新语言创建完整目录结构（~35 个 JSON 文件）：
```
src/config/locale/messages/{新语言}/
├── common.json
├── landing.json
├── pages/index.json
├── pages/pricing.json
├── pages/blog.json
├── admin/sidebar.json
├── settings/*.json
└── ... (与 en/ 目录结构一致)
```

### 8.3 翻译内容

- 博客文章：`content/posts/{slug}.{lang}.mdx`
- 落地页数据：如果有数据驱动的落地页，在数据文件中添加新语言
- 法律页面：`content/pages/privacy-policy.{lang}.mdx`

### 8.4 更新配置

- Fumadocs languages 配置
- `sitemap.ts` 确认包含新语言路由

---

## Step 9：部署上线（2 小时）

### 9.1 推荐架构

```
用户 → Cloudflare（DNS + CDN + SSL）→ VPS（Nginx）
                                        ├── Web（Next.js :3000）
                                        ├── Worker（BullMQ，可选）
                                        ├── Redis（可选）
                                        └── Supabase（远程 PostgreSQL）
```

### 9.2 操作清单

**数据库**：
- [ ] 创建 Supabase 项目
- [ ] 拿到连接字符串填入 `.env`
- [ ] 执行 `pnpm db:migrate`
- [ ] 在 Supabase Dashboard 配置 RLS 策略

**域名**：
- [ ] Cloudflare 添加 DNS A 记录指向 VPS IP
- [ ] 开启代理模式（橙色云朵）
- [ ] SSL 模式设为 Full (Strict)

**服务器**：
- [ ] VPS 安装 Docker + Nginx
- [ ] 配置 Nginx 反向代理（模板提供 `deploy/nginx.conf`）
- [ ] 配置防火墙（只开 80/443）

**CI/CD**：
- [ ] GitHub Actions 自动构建 Docker 镜像（模板已配置 `.github/workflows/docker-build.yaml`）
- [ ] VPS 拉取镜像：`docker compose up -d`

**支付**：
- [ ] 在 Stripe Dashboard 配置 Webhook 地址
- [ ] 测试完整支付流程（建议先用 Stripe 测试模式）

**验证**：
- [ ] 访问 `https://yourdomain.com/api/health` 确认服务正常
- [ ] 测试注册 → 登录 → 使用工具 → 支付完整流程

---

## 踩坑清单（避免重复踩）

| 坑 | 症状 | 解法 |
|----|------|------|
| Supabase 不支持 FOR UPDATE | 积分操作报错 | 用唯一约束代替行级锁防竞态 |
| getMetadata() 返回的是函数 | 新页面 TD 全显示默认值 | 检查是否正确调用了返回的函数 |
| 积分枚举值不一致 | 分享积分可无限刷 | 写入和查询用同一个枚举常量 |
| 积分结算非原子 | 扣费和记录不一致 | 用 db.transaction 包裹 |
| Upstash Redis 需要 TLS | 生产环境连接超时 | `rediss://` 协议时启用 TLS 选项 |
| 前端轮询把网络错误当失败 | 弱网下误报任务失败 | 加连续错误计数（阈值 3 次） |

---

## 速查：我要改 XX 去哪改？

| 要改什么 | 文件 |
|----------|------|
| 应用名称 / URL | `.env` + `src/config/index.ts` |
| 首页内容和 section | `src/config/locale/messages/{lang}/pages/index.json` |
| 导航栏 / 页脚 | `src/config/locale/messages/{lang}/landing.json` |
| 定价方案 | `src/config/locale/messages/{lang}/pages/pricing.json` |
| 全站 TD（fallback） | `src/config/locale/messages/{lang}/common.json` → `metadata` |
| Logo / Favicon | `public/logo.svg` + `public/logo.png` + `public/favicon.ico` |
| 主题色 / 样式 | `src/config/style/theme.css` / `tailwind.config.ts` |
| 认证方式 | `src/core/auth/config.ts` + `.env`（OAuth 密钥） |
| 初始积分数量 | 管理后台 Settings → Credits（或数据库 config 表） |
| 数据库表 | `src/config/db/schema.postgres.ts` → `pnpm db:generate && pnpm db:migrate` |
| 语言列表 | `src/config/locale/index.ts` |
| SEO 工具 | `src/shared/lib/seo.ts` |
| 结构化数据 | `src/shared/components/seo/json-ld.tsx` |
| 博客文章 | `content/posts/*.mdx` |
| 法律页面 | `content/pages/privacy-policy.mdx` / `terms-of-service.mdx` |
| 首页 Block 样式 | `src/themes/default/blocks/` |
| Docker | `Dockerfile` + `docker-compose.yml` |
| CI/CD | `.github/workflows/docker-build.yaml` |
| Nginx | `deploy/nginx.conf` |
| 支付 Webhook | 模板已内置 `/api/payment/notify/[provider]`，只需在 Stripe 配 URL |
| 新增 API | `src/app/api/your-tool/route.ts` + `src/extensions/your-tool/` |
| 新增前端组件 | `src/shared/components/your-tool/` |
