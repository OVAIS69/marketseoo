# MarketLearn — Digital Marketing Training & Growth Platform

> **Learn. Apply. Grow Your Business Online.**

MarketLearn is a modern, production-grade interactive digital marketing education and business-growth platform designed specifically for small-business owners. It bridges the gap between passive learning and practical daily execution with integrated marketing tools, diagnostic growth assessments, multi-channel campaign management, and verified certification.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router & Route Handlers)
- **Frontend**: React.js, Tailwind CSS (Custom SaaS Design Tokens)
- **Database & ORM**: SQLite + Prisma ORM
- **Charts & Visualizations**: Recharts
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 🌟 Key Features

1. **High-Converting SaaS Landing Page**
   - Interactive hero with floating business growth UI cards
   - Value proposition strip
   - 6 Core digital marketing course showcases
   - 4-step execution process with visual connecting roadmap
   - Dashboard product preview mockup
   - Animated platform statistics counters & testimonial reviews
2. **Authenticated SaaS Dashboard**
   - Real-time **Digital Growth Score** (e.g., 72/100)
   - Learning progress (68%) and quiz average (84%)
   - Personalized recommendations based on diagnostic audit
   - "Continue Learning" quick resume card
3. **Interactive Business Growth Assessment**
   - 6-question diagnostic covering Social Media, SEO, Content, Advertising, and Analytics
   - Real-time channel mastery percentage breakdown
   - Dynamic prioritization of high-leverage focus areas
4. **Dedicated Course Learning Experience**
   - Structured curriculum with lesson modules and status checkmarks
   - Video lesson placeholders
   - Actionable takeaways and practical business exercises with instant saving
5. **Knowledge Check Quizzes**
   - Question-by-question scoring and immediate feedback
   - Detailed rationale explanations for correct and incorrect choices
   - Confetti celebration and XP awards upon passing
6. **Integrated Marketing Tools Suite**
   - **Social Caption Generator**: High-converting hook + body + CTA format
   - **Hashtag Generator**: Curated broad, niche, and community tags
   - **Content Idea Generator**: 5 evergreen content pillars
   - **Marketing Plan Generator**: 90-day quarterly roadmap and budget allocation
   - **Budget & ROAS Calculator**: Model ad spend, clicks, and break-even targets
   - **Small Business SEO Checklist**: Step-by-step local search audit
7. **Social Content Calendar**
   - Schedule, edit, and filter posts by platform (Instagram, LinkedIn, etc.) and status (Draft, Planned, Published)
8. **Campaign Manager**
   - Multi-channel ad tracking with budget sliders, live progress bars, reach, clicks, and conversion metrics
9. **Performance Analytics Dashboard**
   - Interactive Recharts area chart, channel distribution donut chart, acquisition funnel, and 7/30/90-day time filters
10. **Gamification & XP**
    - Progression tiers: *Beginner* → *Learner* → *Digital Marketer* → *Growth Expert*
    - Unlockable milestone badges (*SEO Starter*, *Content Creator*, etc.)
11. **Official Verified Certificate**
    - Printable PDF layout with gold verification seal, QR code, and public verification page at `/verify/[code]`
12. **Admin Management Console**
    - Platform oversight at `/admin` to create/edit courses, inspect registered small businesses, and audit quiz records

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed Content
```bash
npx prisma db push
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

- **Learner Account**:
  - Email: `alex@marketlearn.dev`
  - Password: `password123`
  - Organization: *Artisan Roast Coffee Co.*
- **Admin Account**:
  - Email: `admin@marketlearn.dev`
  - Password: `adminpassword123`
  - Role: `ADMIN`
