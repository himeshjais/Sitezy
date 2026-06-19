import { generateResponse } from "../config/openRouter.js";
import { User } from "../models/userModel.js";
import { Website } from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
WEBSITE TYPE — ADAPT AUTOMATICALLY
--------------------------------------------------
Read the USER REQUIREMENT and identify the type of website.
Then apply the matching design language:

- GAMING / ESPORTS → Dark neon theme (cyan/green/purple glows), futuristic font style, game screenshots, leaderboards, hero with animated gradient background, glow effects on cards
- ECOMMERCE / SHOP / STORE / PRODUCT → Clean product grid, cart icons, pricing cards, promo banners, product images, add-to-cart buttons, sale badges
- RESTAURANT / FOOD / CAFE / BAR → Warm rich colors (amber/orange/red), food photography, menu sections, reservation form, chef specials
- PORTFOLIO / PERSONAL → Minimal elegant, project showcase grid, skills section, timeline, contact form, about section
- AGENCY / STARTUP / SAAS → Bold gradients, feature cards, pricing table, testimonials, CTA sections, hero animation
- BLOG / NEWS / MAGAZINE → Article card grid, category filters, featured post hero, author info, newsletter signup
- FITNESS / GYM / SPORTS → High-energy dark theme, class schedules, trainer profiles, transformation photos, membership plans
- EDUCATION / COURSE / SCHOOL → Clean academic, course cards, instructor profiles, curriculum accordion, enrollment CTA
- MEDICAL / CLINIC / HEALTH → Professional blue/white, appointment booking, doctor profiles, services list, trust badges
- REAL ESTATE / PROPERTY → Property card grid, search filters, agent profiles, property details
- TRAVEL / HOTEL / TOURISM → Full-width destination hero, destination cards, booking form, tour packages, reviews
- MUSIC / BAND / ARTIST → Dark moody theme, album covers, tour dates, media player UI, merch section
- TECHNOLOGY / SOFTWARE / APP → Gradient hero, feature highlights, app screenshots, integrations, pricing

If the type is unclear → use a premium modern agency/business style as default.

APPLY THE CORRECT COLOR PALETTE, TYPOGRAPHY STYLE, AND CONTENT
BASED ON THE DETECTED WEBSITE TYPE ABOVE. DO NOT USE GENERIC DEFAULTS.

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons

--------------------------------------------------
⚠️ SPA VISIBILITY RULE — THIS IS THE #1 MOST CRITICAL RULE ⚠️
--------------------------------------------------
THE HOME PAGE MUST BE FULLY VISIBLE AND FILLED WITH CONTENT
IMMEDIATELY WHEN THE PAGE LOADS — NO USER ACTION REQUIRED.

MANDATORY IMPLEMENTATION — FOLLOW EXACTLY:

STEP 1 — HTML structure:
  <section id="home" class="page active">  ← HOME MUST HAVE "active" class in HTML
  <section id="about" class="page">
  <section id="services" class="page">
  <section id="contact" class="page">

STEP 2 — CSS rules (BOTH required):
  .page { display: none; }
  .page.active { display: block; }

STEP 3 — JavaScript navigation function:
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    document.querySelector('nav a[data-page="'+id+'"]').classList.add('active');
  }

STEP 4 — Nav links must use data-page and onclick:
  <a href="#" data-page="home" class="nav-link active" onclick="showPage('home'); return false;">Home</a>
  <a href="#" data-page="about" class="nav-link" onclick="showPage('about'); return false;">About</a>

FORBIDDEN:
  ❌ Do NOT use style="display:none" or style="display:block" to toggle pages
  ❌ Do NOT use inline display toggling in JS
  ❌ Do NOT leave Home page without class="page active" in HTML
  ❌ Do NOT hide all pages — at least Home must be visible on load

IF HOME PAGE IS BLANK OR EMPTY ON LOAD → RESPONSE IS COMPLETELY INVALID.

--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home     (id="home"     class="page active") ← MUST have "active" on load
- About    (id="about"    class="page")
- Services (id="services" class="page") — rename to match website type (Products, Menu, Games, Courses, etc.)
- Contact  (id="contact"  class="page")

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS showPage() function
- Active nav state must update visually on click
- Forms must have client-side JS validation
- Buttons must show hover + active CSS states
- Smooth page transitions (CSS opacity/transform transition recommended)

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY — DO THIS BEFORE OUTPUTTING)
--------------------------------------------------
CHECK EACH ITEM:

✅ 1. Home section has class="page active" in the HTML — CHECK THIS FIRST
✅ 2. CSS has both: .page{display:none} AND .page.active{display:block}
✅ 3. Layout works on mobile, tablet, desktop
✅ 4. No horizontal scroll on mobile
✅ 5. All images from unsplash with proper params
✅ 6. All images are responsive (max-width:100%)
✅ 7. Media queries present and working
✅ 8. Navigation JS function toggles .active class correctly
✅ 9. Website type design language applied (gaming=neon, food=warm, etc.)
✅ 10. Content is specific to the user's request — NO generic lorem ipsum

IF ANY CHECK FAILS → FIX IT BEFORE RESPONDING. DO NOT OUTPUT AN INVALID RESPONSE.

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (user.credits < 10) {
      return res.status(400).json({ message: "You have not enough credits to generate a website" })
    }

    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt)
    let raw = ""
    let parsed = null
    
    // we are using for here so that if the first response is not in the form of json then it will try again (so basically we are giving chace 2 times to AI fpr gin=ving response)
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalPrompt)
      parsed = await extractJson(raw)

      if (!parsed) {
        raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON")
        parsed = await extractJson(raw) // this is for to 
      }
    }
    if (!parsed.code) {
      return res.status(400).json({ message: "AI returned invalid response" })
    }
    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        { role: "user", content: prompt },
        { role: "ai", content: parsed.message }
      ]
    })
    user.credits = user.credits - 10
    await user.save()
    return res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credits
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    return res.status(200).json(website)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const changeWebsite = async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (user.credits < 5) {
      return res.status(400).json({ message: "You have not enough credits to generate a website" })
    }

    const udpatePrompt = `
    UPDATE THIS HTML WEBSITE.
    
    CURRENT CODE:
    ${website.latestCode}

    USER REQUEST:
    ${prompt}

    RETURN RAW JSON ONLY:
    {
      "message":"Short confirmation",
      "code":"<UPDATE FULL HTML>"
    }
    `

    let raw = ""
    let parsed = null
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(udpatePrompt)
      parsed = await extractJson(raw)

      if (!parsed) {
        raw = await generateResponse(udpatePrompt + "\n\nRETURN ONLY RAW JSON")
        parsed = await extractJson(raw)
      }
    }
    if (!parsed.code) {
      return res.status(400).json({ message: "AI returned invalid response" })
    }

    website.conversation.push(
      { role: "ai", content: parsed.message },
      { role: "user", content: prompt },
    )

    website.latestCode = parsed.code
    await website.save()
    user.credits = user.credits - 5
    await user.save()
    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredits: user.credits
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllWebsite = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.user._id })
    return res.status(200).json(websites)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deployWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    if (!website.slug) {
      website.slug = website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0, 60) + website._id.toString().slice(-5)
    }

    website.deployed = true
    website.deployUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/site/${website.slug}` // website.slug --> unique URL path banane ke liye (title + _id ka combination)  // slug is generated from title + part of _id to ensure uniqueness // Agar _id part hata do, toh: Same title wali websites collide kar sakti hain
    await website.save()

    return res.status(200).json({
      url: website.deployUrl
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getBySlug = async (req, res) => {
  try {  
    const website = await Website.findOne({
      slug: req.params.slug
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    return res.status(200).json(website)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteWebsite = async (req, res) => {
  try {
    const website = await Website.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    })
    if (!website) {
      return res.status(404).json({ message: "Website not found" })
    }
    return res.status(200).json({ message: "Website deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
