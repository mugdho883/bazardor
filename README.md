# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে — দাম বাড়া-কমার হিসাব, ক্যাটাগরি অনুযায়ী তালিকা, এবং বাজারভিত্তিক দামের বিস্তারিত তুলনা।

**Live:** https://bazardor-94tcsqsfq-mugdho4.vercel.app/signup · **Repo:** https://github.com/mugdho883/bazardor

## Technologies

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · DaisyUI 5 · BetterAuth (email/password, Google, GitHub) · PostgreSQL · react-hot-toast

## Key Features

1. **Live price ticker** — অনন্ত স্ক্রলিং মার্কি, দামের ▲/▼ শতাংশসহ।
2. **Home sections** — আজ দাম বেড়েছে (Top 6), দাম কমেছে (Top 6) এবং সব পণ্য; Hero CTA `#সব-পণ্য` অ্যাঙ্করে স্ক্রল করে।
3. **Category pages + sorting** — ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম (বাংলা সংখ্যা সঠিকভাবে numeric হিসেবে সর্ট), skeleton loading ও 404-style empty state।
4. **Protected product details** — লগইন ছাড়া ঢুকলে সাইন ইন পেজে রিডাইরেক্ট ও toast; বাজারভিত্তিক min/max/avg দাম।
5. **BetterAuth authentication** — Email/Password + Google + GitHub, toast feedback, প্রোফাইল ও নাম আপডেট।
6. Fully responsive (mobile / tablet / desktop) এবং বাংলা তারিখ ও সংখ্যা।

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run migrate              # creates BetterAuth tables in your Postgres
npm run dev
```

OAuth callback URLs: `{BETTER_AUTH_URL}/api/auth/callback/google` and `/github`.

## Deploy (Vercel)

Add all variables from `.env.example` in Vercel project settings (set `BETTER_AUTH_URL` to your production URL). Dynamic routes (`/product/[slug]`, `/category/[slug]`) are server-rendered, so reloads never 404.
