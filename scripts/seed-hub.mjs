#!/usr/bin/env node
// Seed demo content for the iDecorwala site (schema `idecorwala`) on the
// shared Supabase hub.
//
//   SUPABASE_URL=https://<ref>.supabase.co SUPABASE_SERVICE_ROLE_KEY=... \
//     node --experimental-websocket scripts/seed-hub.mjs
//
// (`--experimental-websocket` is only needed on Node 20; harmless on 22+.)
//
// Idempotent: categories upsert on `slug`, products on `(category_id, name)`,
// blogs on `slug`. The site has no login, so no auth users are created.
// Images point at files already in /public so next/image needs no extra
// remotePatterns.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_SCHEMA = "idecorwala";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  process.exit(1);
}

const db = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  db: { schema: SUPABASE_SCHEMA },
});

const RFP = "/contact#rfp-form";
const HV = "/images/products/high-volume";

// Slugs match src/app/sitemap.ts (/products/walls|floors|ceilings|spaces).
const CATEGORIES = [
  {
    slug: "walls",
    name: "Walls",
    category_order: 1,
    description: "Wallcoverings, acoustic panels and claddings specified for institutional durability.",
    hero_title: "WALLS THAT WORK.\nFINISHES THAT LAST.",
    hero_subtitle:
      "From acoustic panelling in boardrooms to scrubbable wallcoverings in hospital corridors — wall systems engineered for scale, compliance and quick installation.",
    hero_image_url: "/arches/walls.png",
    products: [
      ["Acoustic Wall Panels", "PET-felt and fabric-wrapped panels with NRC up to 0.85 for meeting rooms, auditoriums and lobbies.", `${HV}/panels.png`],
      ["Designer Wallcoverings", "Type II vinyl and textile wallcoverings — Class A fire rated, scrubbable and colour-matched across batches.", `${HV}/material-stack.png`],
      ["Fluted Wall Cladding", "Pre-finished MDF and WPC fluted profiles for feature walls in hospitality and retail.", `${HV}/partitions.png`],
      ["Custom Wall Murals", "Large-format printed murals produced from your brand artwork, installed seam-matched on site.", "/images/services/interiors/material-flatlay.png"],
    ],
  },
  {
    slug: "floors",
    name: "Floors",
    category_order: 2,
    description: "Hard and soft flooring systems for high-footfall offices, hotels, malls and hospitals.",
    hero_title: "FLOORS BUILT FOR\nTEN MILLION FOOTSTEPS.",
    hero_subtitle:
      "Engineered wood, LVT, carpet tiles and seamless resin floors — supplied and installed by one accountable team.",
    hero_image_url: "/arches/floor.png",
    products: [
      ["Engineered Wood Flooring", "Oak and walnut wear layers on a stable multi-ply core; factory-finished with UV-cured lacquer.", "/images/services/interiors/process-livingroom.png"],
      ["Luxury Vinyl Tiles", "0.55 mm wear layer LVT with acoustic underlay — ideal for hotel rooms and IT floors.", `${HV}/material-stack.png`],
      ["Commercial Carpet Tiles", "Solution-dyed nylon tiles with recycled backing, laid in quarter-turn or ashlar patterns.", `${HV}/factory-floor.png`],
      ["Seamless Epoxy & PU Floors", "Hygienic, chemical-resistant resin floors for labs, kitchens and manufacturing bays.", `${HV}/logistics.png`],
    ],
  },
  {
    slug: "ceilings",
    name: "Ceilings",
    category_order: 3,
    description: "Gypsum, metal and acoustic ceiling systems with integrated services coordination.",
    hero_title: "CEILINGS THAT\nHIDE THE HARD WORK.",
    hero_subtitle:
      "Ceiling systems coordinated with HVAC, lighting and fire services in BIM before a single grid goes up.",
    hero_image_url: "/arches/ceiling.png",
    products: [
      ["Gypsum False Ceilings", "Moisture-resistant boards on galvanised grids with access panels pre-planned for MEP.", `${HV}/ceilings.png`],
      ["Metal Baffle Ceilings", "Powder-coated aluminium baffles for atriums, food courts and transit spaces.", `${HV}/ceilings.png`],
      ["Mineral Fibre Acoustic Tiles", "600 × 600 lay-in tiles with high light reflectance and CAC 35+ for open offices.", `${HV}/panels.png`],
    ],
  },
  {
    slug: "spaces",
    name: "Spaces",
    category_order: 4,
    description: "Doors, partitions and fittings that turn a shell into a working space.",
    hero_title: "COMPLETE SPACES.\nONE SUPPLY CHAIN.",
    hero_subtitle:
      "Doors, frames, glass partitions and architectural hardware manufactured in volume and delivered to programme.",
    hero_image_url: "/arches/space.png",
    products: [
      ["Flush & Fire-Rated Doors", "30/60/120-minute fire-rated door sets, factory-laminated and pre-hung for rapid fit-out.", `${HV}/doors.png`],
      ["Door Frames", "Engineered wood and pressed-steel frames in standard and custom profiles.", `${HV}/door-frames.png`],
      ["Glass & Modular Partitions", "Single and double-glazed demountable partitions with STC 42+ acoustic performance.", `${HV}/partitions.png`],
      ["Architectural Hardware & Fittings", "Hinges, locks, closers and handles specified as complete ironmongery schedules.", `${HV}/fittings.png`],
    ],
  },
];

const BLOGS = [
  {
    slug: "industrializing-the-interior-lifecycle",
    title: "Industrializing the Interior Lifecycle",
    excerpt:
      "What happens when interior fit-outs are run like a factory line? An operational look at prefabrication, takt planning and why institutional clients are paying attention.",
    cover_image: "/imgs/blogs_1.png",
    category: "Industry Trends",
    tags: ["featured", "prefabrication", "operations"],
    author: "Soham Sen",
    published_date: "2026-09-12",
    reading_time: "7",
    content: {
      blocks: [
        { type: "paragraph", text: "Interior fit-out has historically been the least industrialised phase of a building's life. Every site is treated as a one-off, and every one-off carries the same risks: rework, idle crews and programme slippage." },
        { type: "heading", level: 2, text: "From site craft to factory process" },
        { type: "paragraph", text: "Moving joinery, partitions and ceiling modules off-site lets us control quality in a predictable environment and ship kits that install in hours, not days." },
        { type: "bullet_list", items: ["Up to 40% shorter on-site programmes", "Measured waste reduction of 25–30%", "Consistent finish quality across multi-city rollouts"] },
        { type: "image", src: "/imgs/construction_sunset.png", alt: "Construction site at sunset", caption: "Prefabricated modules arriving on a hospitality project in Chennai." },
        { type: "quote", text: "The best site is the one where nothing is cut — only assembled." },
        { type: "heading", level: 3, text: "What clients should ask for" },
        { type: "numbered_list", items: ["A frozen design before procurement", "A digital model shared across trades", "A logistics plan with daily drop windows"] },
        { type: "callout", title: "Key takeaway", text: "Industrialisation is not about replacing craftsmanship — it moves craftsmanship to where it can be controlled." },
      ],
    },
  },
  {
    slug: "designing-hospitals-that-heal",
    title: "Designing Hospitals That Heal",
    excerpt:
      "Evidence-based design is reshaping patient rooms, corridors and waiting areas. Here is how material choices influence infection control and recovery times.",
    cover_image: "/imgs/blogs_2.png",
    category: "Design & Engineering",
    tags: ["featured", "healthcare", "materials"],
    author: "Dr. Kavya Raman",
    published_date: "2026-08-28",
    reading_time: "6",
    content: {
      blocks: [
        { type: "paragraph", text: "Healthcare interiors must balance two goals that often pull in opposite directions: clinical rigour and human warmth." },
        { type: "heading", level: 2, text: "Surfaces that defend" },
        { type: "paragraph", text: "Seamless resin floors, antimicrobial wallcoverings and coved skirtings remove the crevices where pathogens thrive." },
        { type: "bullet_list", items: ["Coved skirting at all wet areas", "Non-porous, scrubbable wall finishes", "Hands-free door hardware"] },
        { type: "divider" },
        { type: "heading", level: 2, text: "Spaces that calm" },
        { type: "paragraph", text: "Daylight, acoustic absorption and biophilic finishes measurably reduce patient anxiety and staff fatigue." },
        { type: "callout", title: "Design brief tip", text: "Specify NRC and cleaning protocols together — an acoustic panel that cannot be disinfected will not survive commissioning." },
      ],
    },
  },
  {
    slug: "spacefold-digital-twins-for-fitouts",
    title: "Spacefold: Digital Twins for Every Fit-Out",
    excerpt:
      "How our Spacefold platform turns drawings into a live model that procurement, site teams and clients can all walk through before work starts.",
    cover_image: "/imgs/blogs_3.png",
    category: "Technology",
    tags: ["featured", "spacefold", "bim"],
    author: "Arjun Mehta",
    published_date: "2026-08-14",
    reading_time: "5",
    content: {
      blocks: [
        { type: "paragraph", text: "A drawing tells you what to build. A digital twin tells you what will go wrong — before it does." },
        { type: "heading", level: 2, text: "One model, every stakeholder" },
        { type: "numbered_list", items: ["Design intent captured in BIM", "Quantities pulled directly for procurement", "Site progress mapped back to the model daily"] },
        { type: "image", src: "/imgs/person_sketching.png", alt: "Designer sketching", caption: "Concept sketches flow straight into the Spacefold model." },
        { type: "quote", text: "Clients approve what they can walk through, not what they can read." },
      ],
    },
  },
  {
    slug: "the-economics-of-high-volume-procurement",
    title: "The Economics of High-Volume Procurement",
    excerpt:
      "Rolling out 40 branches or 2,000 hotel keys? Standardised kits and framework agreements change the cost curve. A practical guide for procurement heads.",
    cover_image: "/imgs/blogs_4.png",
    category: "Operations",
    tags: ["featured", "procurement", "rollouts"],
    author: "Meera Iyer",
    published_date: "2026-07-30",
    reading_time: "8",
    content: {
      blocks: [
        { type: "paragraph", text: "Volume only creates savings when it creates repetition. The trick is deciding what to standardise and what to leave local." },
        { type: "heading", level: 2, text: "Standardise the invisible" },
        { type: "bullet_list", items: ["Door sets and hardware schedules", "Ceiling grids and access panels", "Electrical containment and fixings"] },
        { type: "heading", level: 2, text: "Localise the visible" },
        { type: "paragraph", text: "Feature walls, artwork and soft furnishings carry the brand and the regional character — keep them flexible." },
        { type: "callout", title: "Rule of thumb", text: "If a guest or employee never sees it, it belongs in the kit." },
      ],
    },
  },
  {
    slug: "net-zero-interiors-start-with-materials",
    title: "Net-Zero Interiors Start With Materials",
    excerpt:
      "Embodied carbon in fit-outs can rival a decade of operational energy. We break down the material swaps that matter most.",
    cover_image: "/imgs/green_building.png",
    category: "Sustainability",
    tags: ["sustainability", "materials"],
    author: "iDecorwala Editorial",
    published_date: "2026-07-10",
    reading_time: "6",
    content: {
      blocks: [
        { type: "paragraph", text: "Offices are typically refitted every 7–10 years. Each refit locks in a fresh batch of embodied carbon." },
        { type: "heading", level: 2, text: "Three swaps with outsized impact" },
        { type: "numbered_list", items: ["Recycled-content carpet tiles with take-back schemes", "Low-carbon gypsum and bio-based insulation", "Demountable partitions designed for reuse"] },
        { type: "quote", text: "The greenest fit-out is the one you can take apart and use again." },
      ],
    },
  },
  {
    slug: "hospitality-lobbies-first-impressions",
    title: "Hospitality Lobbies: Engineering First Impressions",
    excerpt:
      "A hotel lobby has eight seconds to make an impression. How lighting, acoustics and material layering do the work.",
    cover_image: "/imgs/interior_lounge.png",
    category: "Design & Engineering",
    tags: ["hospitality", "lighting"],
    author: "Soham Sen",
    published_date: "2026-06-22",
    reading_time: "4",
    content: {
      blocks: [
        { type: "paragraph", text: "Guests rarely remember a lobby's floor plan. They remember how it felt to walk in." },
        { type: "heading", level: 2, text: "Layering light" },
        { type: "paragraph", text: "Ambient, accent and decorative layers on separate scenes let one space serve breakfast, check-in and evening lounge." },
        { type: "divider" },
        { type: "callout", text: "Specify dimming protocols with the lighting designer at concept stage — retrofitting scenes is expensive." },
      ],
    },
  },
  {
    slug: "draft-modular-workplaces-2027",
    title: "Modular Workplaces in 2027 (Draft)",
    excerpt: "Work in progress — not visible on the site until is_published is set to true.",
    cover_image: "/imgs/thought_hero.png",
    category: "Industry Trends",
    tags: ["workplace"],
    author: "iDecorwala Editorial",
    published_date: "2026-10-01",
    reading_time: "5",
    is_published: false,
    content: { blocks: [{ type: "paragraph", text: "Draft article body." }] },
  },
];

async function main() {
  // 1. categories
  const catRows = CATEGORIES.map((c) => {
    const row = { ...c, is_active: true };
    delete row.products;
    return row;
  });
  const { data: cats, error: cErr } = await db
    .from("product_categories")
    .upsert(catRows, { onConflict: "slug" })
    .select("id, slug");
  if (cErr) throw new Error(`product_categories: ${cErr.message}`);
  const catId = new Map(cats.map((c) => [c.slug, c.id]));

  // 2. products
  const prodRows = CATEGORIES.flatMap((c) =>
    c.products.map(([name, description, image_url], i) => ({
      category_id: catId.get(c.slug),
      name,
      description,
      image_url,
      redirect_url: RFP,
      display_order: i + 1,
      is_active: true,
    })),
  );
  const { error: pErr } = await db
    .from("products")
    .upsert(prodRows, { onConflict: "category_id,name" });
  if (pErr) throw new Error(`products: ${pErr.message}`);

  // 3. blogs
  const blogRows = BLOGS.map((b) => ({ is_published: true, ...b }));
  const { error: bErr } = await db.from("blogs").upsert(blogRows, { onConflict: "slug" });
  if (bErr) throw new Error(`blogs: ${bErr.message}`);

  const count = async (table) => {
    const { count: n, error } = await db
      .from(table)
      .select("id", { count: "exact", head: true });
    if (error) throw new Error(`count ${table}: ${error.message}`);
    return n;
  };
  console.log(
    `[seed:${SUPABASE_SCHEMA}] product_categories=${await count("product_categories")} ` +
      `products=${await count("products")} blogs=${await count("blogs")}`,
  );
}

main().catch((err) => {
  console.error(`[seed:${SUPABASE_SCHEMA}] failed:`, err.message ?? err);
  process.exit(1);
});
