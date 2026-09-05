# Care Point Dental Clinic — Website Handover Brief

**Prepared by:** Benzadid Intelligence
**Client:** Care Point Dental Clinic (কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক)
**Date:** 2026-09-02
**Status:** Phase 1 (Website Copy) — pending. Phase 2 (Design + Development) — not started.

This document is the single source of truth for whoever builds this project (human developer or AI coding agent). Read it fully before writing any code or copy. Where information is still missing, it is marked explicitly — do not guess or invent facts about the clinic; leave a clearly marked placeholder instead.

---

## 0. WORKFLOW ORDER — DO NOT SKIP

This project must be executed in two strict phases. Do not jump to design/dev before Phase 1 is reviewed and approved by the client.

1. **PHASE 1 — Website Copy (English + Bangla), full site, start to finish.**
   Write every page's full copy first: Home hero, About, Why Choose Us, all Service category pages + sub-service detail copy, Gallery intro, FAQ, Contact page copy, footer copy. This must be reviewed and approved before any visual design work begins.
2. **PHASE 2 — Design + Frontend Development with full animation, using the approved copy + assets.**

Do not merge these phases. Do not start building UI before copy is finalized.

---

## 1. LANGUAGE & COPYWRITING RULES (CRITICAL)

- Two full language versions: **English** and **Bangla**. Every page, every section, every service description must exist in both.
- **The Bangla version must NOT be a literal/word-for-word translation of the English copy.** A literal translation reads robotic and unnatural. Instead, write the Bangla version as an independent, naturally-flowing piece of Bangla copywriting that carries the *same meaning and intent* as the English version (transcreation, not translation). Native, warm, conversational-but-professional Bangla — the kind a patient in Ashulia/Savar would actually read and trust, not machine-translated medical jargon.
- Tone: reassuring, trustworthy, easy to understand for all kinds of people (not overly clinical/technical). Avoid jargon-heavy language; explain procedures in plain language a first-time patient would understand.
- All copy must be **SEO-based**: every page needs a clear target keyword focus (e.g., "dental clinic in Ashulia Savar", "tooth extraction cost in Savar", "dental implant Dhaka", "scaling and polishing near me"), naturally embedded in headings, body copy, and meta descriptions — never keyword-stuffed.
- Required copy scope per page:
  - **Home page:** Hero section copy (headline + subheadline + CTA), Why Choose Us / Features section, service category highlights, testimonial/review teaser, video gallery teaser, CTA banner.
  - **About page:** Clinic story, doctor profile section.
  - **Service category pages:** Each category gets full page copy (intro paragraph, what's included, benefits, aftercare notes where relevant).
  - **Sub-service detail copy:** Every individual service/sub-service listed in Section 6 needs its own short descriptive copy block (what it is, why a patient needs it, what to expect) in both languages.
  - **Gallery page:** Intro copy for photo + video gallery.
  - **FAQ page:** Minimum 10 FAQs, written in both languages, SEO-friendly phrasing (real patient questions).
  - **Contact page:** Short intro copy + map section copy.
  - **Footer:** Tagline/short description, in both languages.
- 10 SEO blog articles (English + Bangla, 20 articles total) — topics to be chosen around common patient search queries (e.g., "কত টাকা লাগে দাঁতের রুট ক্যানেল করতে", "dental implant vs bridge", "কেন স্কেলিং জরুরি", etc.) — **this is part of Phase 1 copy scope**, plan for it, but does not need to block the rest of the copy delivery — it can be delivered as a batch.

---

## 2. BRAND IDENTITY

### 2.1 Clinic Name
**Care Point Dental Clinic** (কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক)

### 2.2 Logo
Existing logo file: `1. Doctor's Infomration/Logo.jpeg` — tooth icon + wordmark "CARE POINT" (bold) / "DENTAL CLINIC" (below).

### 2.3 Color System — LOCKED DIRECTION (pending final client sign-off on exact hex)
The client has explicitly rejected the logo's original sky-blue + copper-orange combination. The approved brand color direction, extracted from the logo's own navy wordmark and its grey accent details, is:

| Role | Color | Approx. Hex | Where it comes from |
|---|---|---|---|
| Primary Brand Color | Navy Blue | `#1B2A6D` (range #1A2560–#22317A, confirm exact from vector/high-res logo) | "CARE POINT" wordmark, tooth icon outline stroke |
| Secondary / Accent | Ash Grey | `#A7A9AC` | Small sparkle accent above the "A" in "CARE", and the fill inside part of the tooth icon |

**Rules:**
- Do NOT use sky-blue or copper/orange anywhere in the final site — those were the logo's original accidental colors and are explicitly rejected.
- Navy (`#1B2A6D`) is the dominant brand color — headers, primary buttons, nav bar, key UI elements.
- Ash grey (`#A7A9AC`) is the supporting/secondary color — subtle backgrounds, secondary text, dividers, icon fills.
- A supplementary design inspiration reference (mood/reference images) is pending from the client — if provided before Phase 2 starts, incorporate its visual language (spacing, imagery style, layout mood) while keeping this color system locked.
- **Get the exact hex values confirmed against the original vector/AI logo file if one exists**, before finalizing the design system — the jpeg-derived hex codes above are close estimates from visual inspection, not color-picked from a vector source.

### 2.4 Logo Usage
- Logo must sit cleanly in the navigation bar (properly sized, not stretched/cropped).
- The same logo (or its icon-only tooth mark) must be used as the **favicon**.

---

## 3. DOCTOR INFORMATION

- **Name:** Dr. Aktar Zahan Ony (ডা. আক্তার জাহান অনি)
- **Title:** Oral & Dental Surgeon (ওরাল এন্ড ডেন্টাল সার্জন)
- **Qualification (use exactly this, shortened form — do NOT include "(RU)" or "(Cont.)"):**
  **BDS, MPH, JU**
- **BMDC Registration No.:** 12990
- **CV / detailed bio / years of experience / headshot photo:** ⚠️ **PENDING** — not yet provided by client. Placeholder only ("Full profile coming soon") until received. Do not fabricate experience years, education history, or achievements.

---

## 4. CONTACT & LOCATION

- **Phone / WhatsApp (appointments):** +880 1324-558811
- **Email:** carepointoraldental@gmail.com
  ⚠️ Minor inconsistency in source notes — one mention read closer to "carepointdentalclinic@gmail.com" but the consistent, repeated, and prescription-pad-printed version is **carepointoraldental@gmail.com**. Use this one; flag for final client confirmation before go-live.
- **Facebook Page:** facebook.com/carepointdentalclinic
- **Address (English, as printed on prescription pad & visiting card):**
  2nd Floor, Mofizuddin Tower, Beside UCB Bank Building, Pollibidyut, Ashulia, Savar, Dhaka 1344
- **Address (Bangla, full descriptive form from clinic notes):**
  কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক, মোস্তফা হোটেলের উত্তর পাশে স'মিলের সাথে মফিজ উদ্দিন টাওয়ার (হাংরি টাউন রেস্টুরেন্ট বিল্ডিং), তৃতীয় তলা, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার
  ⚠️ **Floor number conflict:** Bangla notes say "তৃতীয় তলা" (3rd floor), printed English materials say "2nd Floor". **Pending client confirmation** — use "2nd Floor" (printed material) as default until corrected.
- **Google Maps link:** https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac — must be embedded properly (interactive embed, not just a link) on the Contact page.
- **Hours:** Daily, 4:00 PM – 9:00 PM. Note in source: "call 30 minutes before if coming for a morning appointment" — this implies morning slots may be available by special arrangement; mention softly on the Contact/FAQ page rather than as a core operating hour, pending clarification.

---

## 5. CLINIC FEATURES / "WHY CHOOSE US" (source: clinic notes, already final — use as-is basis for copy)

Use these as the basis for a "Why Choose Us" section with icons — do not literally translate each bullet; rewrite as natural, benefit-led copy in both languages:

1. Modern equipment & technology for accurate, advanced treatment
2. High-quality treatment materials used
3. Experienced & skilled dental surgeon
4. Clean, hygienic environment
5. Fully sterile treatment environment
6. Sterilization via Autoclave, UV Sterilizer, and disposable instruments
7. Separate disposable gloves, needles, glasses, suction tips & instrument sets per patient
8. Digital RVG X-ray for instant, accurate diagnosis
9. Fast and accurate diagnosis facility
10. Uninterrupted power backup
11. Air-conditioned environment
12. 24/7 CC camera security
13. Pain-free treatment approach
14. Emergency treatment facility
15. Sincere, caring patient service
16. Easy serial / online appointment booking
17. Convenient patient scheduling

---

## 6. SERVICES & PRICING (source: `Carepointdentalclinic_Price_List__DRAFT.docx`)

All prices in BDT. Ranges must be shown as ranges in the UI (do not average them into a single number) — used both for the static pricing table and as the data source for the Cost Calculator (see Section 7).

| Service | Cost (BDT) |
|---|---|
| Consultation | ৳200 |
| Dental X-ray (RVG) | ৳200 |
| Scaling & Polishing | ৳1,500 – ৳3,000 |
| Tooth Whitening | ৳6,000 – ৳12,000 |
| Smile Designing | ৳15,000 – ৳30,000 |
| Cap / Crown – PFM (per unit) | ৳4,000 – ৳5,000 |
| Cap / Crown – Zirconia (per unit) | ৳11,000 – ৳15,000 |
| Bridge (per unit) | ৳5,000 – ৳6,000 |
| Dental Implant (per tooth) | ৳40,000 – ৳50,000 |
| Tooth-Colored Filling | ৳1,500 – ৳4,000 |
| Front Teeth Gap Closure | ৳5,000 – ৳10,000 |
| Root Canal – Anterior | ৳3,000 – ৳5,000 |
| Root Canal – Posterior | ৳4,000 – ৳6,000 |
| Flexible Denture (per unit) | ৳4,000 |
| Pulp Capping | ৳2,000 – ৳3,500 |
| Pulpectomy | ৳3,000 – ৳4,000 |
| Tooth Extraction (Normal) | ৳700 – ৳2,000 |
| Tooth Extraction (Surgical) | ৳3,000 – ৳4,000 |
| Partial Denture | ৳4,000 |
| Fibre Partial Denture | ৳2,500 |
| Partial Denture – Acrylic | ৳1,000 |
| Cast Partial Denture | ৳40,000 – ৳60,000 |
| Complete Denture | On Consultation (starting ৳30,000) |
| Wisdom Tooth Surgery | ৳4,000 – ৳8,000 |
| Pediatric Filling | ৳600 – ৳1,000 |
| Orthodontic Appliance | Starting from ৳40,000 |
| Dental / Gingival Surgery | On Consultation |
| SDF Application with Pit & Fissure Sealant | ৳500 per tooth |
| Professional Fluoride Application | ৳2,000 – ৳4,000 |
| Periapical Surgery | ৳8,000 – ৳13,000 |
| Tooth Avulsion Management | ৳15,000 |
| Fracture Management | On Consultation |
| Biopsy Surgery | ৳3,000 |

**Service categorization:** ⚠️ **Pending** — the price list above is a flat list. Before/during Phase 1 copy work, group these into logical service categories for the site's navigation and category pages (suggested grouping, subject to client approval): *General & Diagnostic* (Consultation, X-ray, Scaling), *Cosmetic Dentistry* (Whitening, Smile Designing, Gap Closure), *Restorative* (Crowns, Bridges, Fillings), *Root Canal Treatment*, *Oral Surgery* (Extractions, Wisdom Tooth, Periapical/Biopsy/Fracture), *Dentures & Prosthodontics*, *Pediatric Dentistry*, *Orthodontics*, *Implants*, *Preventive Care* (Fluoride, SDF/Sealant, Pulp Capping).

**Sub-service images:** ⚠️ **PENDING** — client will provide images for services and sub-services separately. Build the service page templates to accept an image per service/sub-service, but do not block copywriting or layout work waiting for these — use clearly marked placeholder image slots until assets arrive.

---

## 7. COST CALCULATOR

- Interactive cost calculator page/section, driven by the pricing table in Section 6.
- Since most prices are ranges (not fixed), the calculator must show an **estimated range**, not a false precise total — e.g., selecting "Root Canal (Posterior)" + "Crown (Zirconia)" should show a combined low–high estimate, with a note like "Final cost confirmed after in-person consultation."
- Items marked "On Consultation" must not be averaged into the estimate — show them as "Requires consultation" instead.
- Multi-select (a patient may want multiple services in one visit) with a running subtotal range.

---

## 8. VIDEO GALLERY (Facebook Reels)

- Reels must be **embedded directly** (Facebook embed, not downloaded/re-hosted video files), with **autoplay** and a clean custom **thumbnail** per video.
- Source reel links (client-provided; note items #1/#8 and #3/#9 are duplicates in the source list — de-duplicate to final unique set, likely 8 unique reels):
  1. https://web.facebook.com/reel/1857864901861958
  2. https://web.facebook.com/reel/1706318750448810
  3. https://web.facebook.com/reel/1778058163550814
  4. https://web.facebook.com/reel/1839137160830022
  5. https://web.facebook.com/reel/2426901334500612
  6. https://web.facebook.com/reel/1572476604521557
  7. https://web.facebook.com/reel/2263470164424621
  8. https://web.facebook.com/reel/3061772634024747
- Home page should show a curated "glimpse" preview of a few videos that link through to the full Gallery page.
- Gallery page holds both photos and videos. Photo assets are pending from client.

---

## 9. SITE STRUCTURE / PAGES

- **Home** — Hero, Why Choose Us, Service highlights, Video gallery glimpse, Reviews teaser, CTA.
- **About** — Clinic story + Doctor profile section (CV pending — placeholder until received).
- **Services** — every navigation category listed must have its own **dedicated page**, and every dedicated service category page must list its **sub-services** with individual descriptions (and image once provided).
- **Gallery** — Photos + embedded autoplay video reels.
- **FAQ** — minimum 10 Q&As, bilingual, SEO-phrased.
- **Contact** — Address, phone/WhatsApp, email, hours, embedded Google Map.
- **Blog** — hosts the 10+10 SEO articles (English + Bangla), admin-manageable.
- **Footer** (present sitewide) — clinic short description, quick links, contact info, social links, hours.

Every item in the site's navigation must resolve to a real, dedicated page — no orphan nav items.

---

## 10. DESIGN & ANIMATION REQUIREMENTS (Phase 2)

The site must feel premium and visually striking — not a generic template. Required techniques:

- Parallax scroll effects
- GSAP-based scroll animations
- Storytelling-style scroll sequences (content reveals as a narrative while scrolling)
- Sticky background images with text layers that shift/pan over them while scrolling
- Premium/lucide-style icon set throughout (no generic clipart icons)
- Glassmorphism effects on relevant UI surfaces (cards, nav, overlays)
- Section-breaking imagery (full-bleed images that break the grid between sections)
- Mobile-responsive across iOS, Android, tablet, laptop, and desktop — non-negotiable on every page
- Site must be **super lightning-fast** — animation-heavy but performance must not be compromised (lazy-load media, optimize assets, avoid layout-shift-causing animations)

---

## 11. ADMIN PANEL / BACKEND REQUIREMENTS

Everything visible on the frontend must be editable from an admin panel — no hardcoded content. Minimum required capabilities:

- Edit all page copy (English + Bangla) for every page
- Upload/replace/delete images sitewide (hero images, service images, gallery photos)
- Add / edit / delete blog articles (rich text editor, bilingual fields)
- Add / edit / delete services, sub-services, and their prices (feeds the pricing table + cost calculator automatically)
- Manage video gallery entries (add/remove embedded reel links + thumbnails)
- Manage FAQ entries
- Manage doctor profile info (name, qualifications, bio, photo) — ready to receive CV content once available
- Manage contact info (phone, email, address, map link, hours)

---

## 12. GOOGLE REVIEWS

- Pull and display the clinic's **existing Google Reviews** on the site (e.g., on Home and/or a dedicated Reviews section).
- Generate and display a **"Get Reviews" QR code** linking directly to the clinic's Google review submission link, placed prominently (e.g., footer, Contact page, and/or in-clinic printable version) so patients can scan and leave a review directly on Google.
- ⚠️ Requires the clinic's Google Business Profile listing/link — **pending**, confirm with client before implementation.

---

## 13. OUTSTANDING / PENDING ITEMS (do not fabricate — wait for client)

1. Doctor's CV / detailed bio / years of experience / professional headshot photo
2. Floor number confirmation (2nd vs 3rd floor — conflicting sources)
3. Final email address confirmation
4. Service & sub-service images (client will provide separately)
5. Clinic interior/exterior photos for the Gallery page
6. Google Business Profile link (for Reviews + QR code)
7. Exact hex color confirmation against a vector/high-res source logo file (current hex values are visually estimated from the JPEG)
8. Final approved service category grouping/naming (Section 6 grouping is a proposed draft)
9. Design inspiration references — client mentioned intent to provide these; incorporate once received, without deviating from the locked navy + ash-grey color system

---

*End of brief. This document should be updated as pending items are resolved and as Phase 1 copy is completed and approved.*
