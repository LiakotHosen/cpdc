# Care Point Dental Clinic — Full-Stack Web Platform & Admin Panel Plan

Develop a modern, high-performance, fully dynamic bilingual dental healthcare website and a secure, responsive administrative CMS for **Care Point Dental Clinic (কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক)** in Ashulia, Savar. The project is built using **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, RLS, Storage)**.

---

## User Review Required

> [!IMPORTANT]
> **Supabase Configuration & Local Development Mode**:
> We will configure the application with full Supabase client and server integration (`@supabase/ssr`, `@supabase/supabase-js`).
> We will provide complete database migration SQL (`supabase/schema.sql`) and seed data (`supabase/seed.sql`) containing all 31+ treatments, clinic notes, doctor credentials, and initial FAQs/blogs.
> In addition, a resilient fallback data layer will be included so the website runs seamlessly out-of-the-box locally even before external Supabase environment variables are connected.

> [!WARNING]
> **Brand Color System Compliance**:
> Per the handover brief, the logo's original sky-blue and copper-orange are strictly rejected. The site design will follow the approved brand identity:
> - **Primary Brand**: Navy Blue (`#1B2A6D`)
> - **Supporting Accent**: Ash Grey (`#A7A9AC`)
> - **Neutral Backgrounds**: Crisp White (`#FFFFFF`) and Soft Medical Slate (`#F8FAFC`, `#F1F5F9`)
> - **Text & Contrast**: Charcoal / Deep Navy-Slate (`#0B132B`, `#1E293B`)

---

## Open Questions

> [!NOTE]
> 1. **Floor Number Confirmation**: Printed visiting cards state *"2nd Floor, Mofizuddin Tower"* while Bengali notes mention *"তৃতীয় তলা"*. Per brief instructions, we will default to **2nd Floor (দ্বিতীয় তলা)**, editable anytime via the admin panel.
> 2. **Initial Admin Credentials**: What email address should be seeded as the default admin user for your Supabase authentication (e.g. `admin@carepointdental.com` or `carepointoraldental@gmail.com`)?

---

## Proposed Architecture & Features

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 16 APPLICATION                          │
│                                                                        │
│   ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│   │        Public Website          │  │     Secure Admin Panel     │  │
│   │  - Bilingual (English / বাংলা) │  │  - Supabase Auth & Session │  │
│   │  - Hero, Story & Features      │  │  - Appointments Manager    │  │
│   │  - Interactive Cost Calculator │  │  - Services & Pricing CRUD │  │
│   │  - Dedicated Service Pages     │  │  - Content & Media CMS     │  │
│   │  - Facebook Reels & Gallery    │  │  - Blog & SEO Manager      │  │
│   │  - Online Appointment Booking  │  │  - Bilingual Site Settings │  │
│   └────────────────────────────────┘  └────────────────────────────┘  │
│                                   │                                    │
│                     Server Actions & Route Handlers                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         Supabase BaaS / Database
          ┌─────────────────────────┴─────────────────────────┐
          │ - PostgreSQL (RLS Policies for public vs admin)   │
          │ - Supabase Auth (Admin login & session cookies)   │
          │ - Supabase Storage (`clinic-media` bucket)        │
          └───────────────────────────────────────────────────┘
```

---

## Proposed Changes

### 1. Foundation & Dependencies Setup

Bootstrap and configure the project with Next.js 16, React 19, and Tailwind CSS.

#### [NEW] `package.json`
- Next.js 16 (`next@16`)
- React 19 (`react`, `react-dom`)
- Tailwind CSS (`tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`)
- Supabase libraries: `@supabase/supabase-js`, `@supabase/ssr`
- UI & Icon components: `lucide-react`, `clsx`, `tailwind-merge`
- Utilities: `canvas-confetti` (for booking confirmation), `qrcode` (for Google Review QR code)

#### [NEW] `tailwind.config.ts` & `src/app/globals.css`
- Custom palette tokens: `primary-navy` (`#1B2A6D`), `accent-grey` (`#A7A9AC`), medical teal accents, soft slate neutrals.
- Typography styles for English (Inter / Geist) and Bangla (Hind Siliguri / Noto Sans Bengali).
- Glassmorphism, smooth gradients, and custom utility classes.

---

### 2. Supabase Database & Security Layer

Provide automated database migrations, schemas, security policies, and initial seed data.

#### [NEW] `supabase/schema.sql`
- Tables with UUID primary keys and timestamps:
  1. `site_settings`: Global clinic information, phones, WhatsApp, addresses (EN/BN), Google Maps embed, hours, social links, hero texts.
  2. `doctors`: Dr. Aktar Zahan Ony's profile (name, title, BDS, MPH, JU, BMDC 12990, bio, photo, consulting hours).
  3. `features`: The 17 clinic highlights (sterilization, autoclave, RVG X-ray, power backup, AC, pain-free approach).
  4. `service_categories`: 10 core categories (*General & Diagnostic*, *Cosmetic Dentistry*, *Restorative*, *Root Canal Treatment*, *Oral Surgery*, *Dentures & Prosthodontics*, *Pediatric Dentistry*, *Orthodontics*, *Implants*, *Preventive Care*).
  5. `services`: 31+ sub-services with low/high price ranges in BDT, units, consultation flags, and descriptions.
  6. `video_reels`: 8 curated Facebook reels with direct embed support and thumbnails.
  7. `gallery_items`: Categorized clinic photos.
  8. `faqs`: 10+ bilingual patient FAQs.
  9. `blog_posts`: SEO articles with bilingual content, slugs, meta titles, descriptions, and keywords.
  10. `reviews`: Patient testimonials with Google rating badge.
  11. `appointments`: Online booking requests with status tracking (`pending`, `confirmed`, `completed`, `cancelled`).
- **Row Level Security (RLS)**:
  - Public `SELECT` allowed on all published site content.
  - Public `INSERT` allowed on `appointments` (with validation).
  - `INSERT`, `UPDATE`, `DELETE` strictly restricted to authenticated admin users (`auth.uid()`).
- Supabase storage bucket `clinic-media` with public read access and authenticated admin write access.

#### [NEW] `supabase/seed.sql`
- Pre-populates all 31+ prices from the clinic's price list, clinic notes, Facebook reels, and doctor info.

#### [NEW] `src/lib/supabase/client.ts` & `src/lib/supabase/server.ts`
- Browser-side and Server-side Supabase client initialization using Next.js cookies and `@supabase/ssr`.

#### [NEW] `src/lib/data/fallback-data.ts` & `src/lib/data/api.ts`
- Unified data access layer that reads from Supabase with fallback to local seed data.

---

### 3. Public Frontend Experience

Create a dynamic, bilingual, high-conversion healthcare portal.

#### [NEW] `src/components/layout/Navbar.tsx` & `src/components/layout/Footer.tsx`
- Sticky navbar with clinic logo (`Logo.jpeg`), emergency phone badge, WhatsApp link, language switcher (English / বাংলা), navigation links, and "Book Appointment" CTA.
- Rich footer featuring clinic address, hours, quick links, Google review QR code, and copyright.

#### [NEW] `src/app/page.tsx` (Home Page)
- **Hero Section**: High-impact medical headline, doctor credential badge, instant booking trigger, WhatsApp quick chat.
- **Why Choose Us (17 Clinic Features)**: Modern grid featuring sterilization standards, autoclave, digital RVG X-ray, and patient-first care.
- **Service Categories Overview**: Visual category cards linking to dedicated category pages.
- **Interactive Cost Calculator Preview**: Quick multi-select estimator.
- **Doctor Profile Spotlight**: Dr. Aktar Zahan Ony (Oral & Dental Surgeon).
- **Video Reels Gallery Glimpse**: Facebook Reels preview carousel/grid.
- **Patient Reviews & Google QR Code**: Google 5-star ratings and scan-to-review QR code.
- **Emergency Callout Banner**: Ashulia & Savar helpline.

#### [NEW] `src/app/services/page.tsx` & `src/app/services/[category]/page.tsx`
- Categorized service listings and dedicated category deep-dive pages.
- Detailed sub-service breakdown with prices in BDT (৳), indications, procedures, and consultation notes.

#### [NEW] `src/app/calculator/page.tsx`
- Full-page Interactive Cost Calculator:
  - Multi-service selection categorized by dental needs.
  - Real-time estimated low-high price tally in BDT.
  - Smart handling of "On Consultation" procedures.
  - Single-click action to transfer selected treatments directly into the Appointment Booking modal.

#### [NEW] `src/app/about/page.tsx`
- The clinic mission, hygiene protocols, sterilization technology, and Dr. Aktar Zahan Ony's profile.

#### [NEW] `src/app/gallery/page.tsx`
- Tabbed gallery with Facebook video reels (direct embeds) and clinic photos.

#### [NEW] `src/app/faq/page.tsx`
- Categorized accordion FAQs in English and Bengali.

#### [NEW] `src/app/blog/page.tsx` & `src/app/blog/[slug]/page.tsx`
- SEO dental health blog supporting 10+ bilingual articles with metadata.

#### [NEW] `src/app/contact/page.tsx`
- Interactive embedded Google Map (`maps.app.goo.gl`), contact forms, directions, and hours.

#### [NEW] `src/components/booking/AppointmentModal.tsx`
- Modal dialog for patient booking with instant validation and database submission.

---

### 4. Secure Modern Admin Panel (`/admin`)

Build a private, password-protected administrative back-office.

#### [NEW] `src/middleware.ts`
- Intercepts `/admin/*` routes, validates Supabase session token, and redirects unauthenticated visitors to `/admin/login`.

#### [NEW] `src/app/admin/login/page.tsx`
- Sleek authentication screen with email/password login, error handling, and session persistence.

#### [NEW] `src/app/admin/layout.tsx` & `src/components/admin/AdminSidebar.tsx`
- Modern dashboard shell with sidebar navigation, active status, mobile drawer, quick stats, and logout.

#### [NEW] Admin Sub-modules:
1. `src/app/admin/dashboard/page.tsx`: Overview KPI cards (Total Appointments, Pending Requests, Active Services, Blog Count).
2. `src/app/admin/appointments/page.tsx`: Appointment ledger with status filters (`Pending`, `Confirmed`, `Completed`, `Cancelled`), patient details, and notes.
3. `src/app/admin/services/page.tsx`: Full CRUD for services and pricing (edit price ranges, categories, descriptions in EN & BN).
4. `src/app/admin/settings/page.tsx`: Edit clinic phone, WhatsApp, email, addresses, hours, hero copy, and Google review link.
5. `src/app/admin/doctor/page.tsx`: Manage doctor info, qualifications, bio, and photo.
6. `src/app/admin/features/page.tsx`: Manage "Why Choose Us" items and reorder.
7. `src/app/admin/videos/page.tsx`: Manage Facebook Reels links and thumbnails.
8. `src/app/admin/gallery/page.tsx`: Manage photo gallery items with upload/URL support.
9. `src/app/admin/faqs/page.tsx`: Manage bilingual FAQ entries.
10. `src/app/admin/blog/page.tsx`: Blog CMS with markdown/rich editor for English and Bengali content.

---

## Verification Plan

### Automated & Build Verification
1. `npm run build`: Confirm zero TypeScript or Next.js build errors with the App Router.
2. `npm run lint`: Confirm strict code hygiene.

### Functional Verification
1. **Language Switching**: Verify instant toggle between English and natural Bengali on all sections and pages.
2. **Cost Calculator**: Test selecting single and multiple services (including ranges and "On Consultation") and verify calculation accuracy.
3. **Appointment Submission**: Submit test bookings on frontend; verify they appear in the Admin Appointments dashboard.
4. **Admin Panel Security**: Attempt accessing `/admin/dashboard` while logged out; verify redirection to `/admin/login`.
5. **CRUD Functionality**: Update a service price and clinic phone number in Admin; verify public frontend immediately reflects changes.
6. **Responsive Design**: Verify seamless layouts on mobile, tablet, and desktop viewports.
