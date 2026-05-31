import {
  Github,
  Instagram,
  Mail,
  Sun,
  Coffee,
  Heart,
  Video,
  Crown,
  Utensils,
} from "lucide-react";

/**
 * 1. BRAND IDENTITY
 */
export const PERSONAL = {
  name: "Mohammed Shareef",
  location: "Charlottetown, PE",
  email: "shareef3533@gmail.com",
  instagram: "mo_sh_r",
  github: "moshrx",
  x: "moshrx",
  linkedin: "https://www.linkedin.com/in/moshrx/",
  discord: "@moshrx",
  role: "Creative Developer & Editor",
  philosophy: "Spatial motion meets clean digital architecture.",
  tagline: "Just building stuff I'd actually want to use.",
  bio: "I'm Mohammed, based in Charlottetown, building things that feel clean, expressive, and a little cinematic.",
};

/**
 * 2. CINEMATIC NAVIGATION
 */
export const NAV_LINKS = [
  { name: "Home", href: "/"},
  { name: "Interests", href: "/interests", type: "internal" },
  { name: "Work", href: "/work" },
  { name: "Intent", href: "/intent", type: "internal" },
  { name: "Gallery", href: "/gallery", type: "internal" },
  { name: "Contact", href: "/contact", type: "internal" },
];

/**
 * 3. ENRICHED PROJECT DATA
 * Order = display order. `id` is stable for routing (/work/:id) — do not reuse.
 * PickUp AI stays pinned as the featured product.
 */
export const PROJECTS = [
  {
    id: 0,
    title: "PickUp AI",
    year: "2026",
    link: "https://www.listedpei.ca/pickupai",
    tag: "Featured Local AI",
    description: "AI phone agent for PEI businesses. Answers calls, handles FAQs, and routes bookings 24/7. Built around live demo calls and real coverage for tourist-season call volume.",
    tech: ["React", "AI Phone Agent", "Local Business"],
    color: "#8B5CF6",
    image: "/assets/projects/pickup-ai.png"
  },
  {
    id: 1,
    title: "ListedPEI",
    year: "2026",
    link: "https://www.listedpei.ca/",
    tag: "Local AI Tool",
    description: "Free AI-powered Google Business Profile kit generator for PEI small businesses. Tuned for local SEO, quick onboarding, and profile content that actually converts.",
    tech: ["React", "Local SEO", "Gemini AI"],
    color: "#0EA5E9",
    image: "/assets/projects/listedpei.png"
  },
  {
    id: 9,
    title: "Lustrouz",
    year: "2026",
    link: "https://lustrouz-web.vercel.app/",
    tag: "Featured Web Product",
    description: "A polished product surface with smooth motion and a clean component system. Built for speed and a calm, considered feel.",
    tech: ["React", "Tailwind CSS", "Motion"],
    color: "#A78BFA",
    image: "/assets/projects/lustrouz.jpg"
  },
  {
    id: 2,
    title: "Pagebind",
    year: "2026",
    link: "https://pagebind.netlify.app/",
    tag: "PDF Tool",
    description: "Invite-only ebook generator that turns pasted text into a clean, formatted PDF. Structured parsing, style templates, font options, live previews, download capture.",
    tech: ["React", "PDF Render", "Product UI"],
    color: "#4F46E5",
    image: "/assets/projects/pagebind.png"
  },
  {
    id: 4,
    title: "Cricket PEI",
    year: "2026",
    link: "https://cricketpei.ca",
    tag: "Sports Federation",
    description: "Official site for PEI Cricket. Built for speed and quick access to match data and federation updates.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#0071e3",
    image: "/assets/projects/cricket.jpg"
  },
  {
    id: 3,
    title: "Fat Cat Bakery",
    year: "2026",
    link: "https://fatcatbakery.netlify.app/",
    tag: "Local Business",
    description: "Polished bakery site with simple navigation and conversion-friendly layouts.",
    tech: ["NextJs", "Tailwind CSS", "UX/UI"],
    color: "#F2CC8F",
    image: "/assets/projects/fatcat.jpg"
  },
  {
    id: 5,
    title: "Red Soil",
    year: "2026",
    link: "https://redsoil.netlify.app/",
    tag: "Community Branding",
    description: "A clean, structured brand site inspired by PEI’s identity. Grid systems and solid spacing throughout.",
    tech: ["HTML5", "Tailwind CSS", "Brand UI"],
    color: "#BC4749",
    image: "/assets/projects/redsoil.jpg"
  },
  {
    id: 6,
    title: "Lootbins Canada",
    year: "2026",
    link: "https://www.lootbinscanada.com/",
    tag: "E-commerce & Retail",
    description: "Inventory-focused retail site. Clean layout built to handle high product volume and clear navigation.",
    tech: ["Shopify", "UI Design", "E-commerce"],
    color: "#E63946",
    image: "/assets/projects/lootbins.jpg"
  },
  {
    id: 7,
    title: "Moe's Latte",
    year: "2026",
    link: "https://moes-latte.netlify.app/",
    tag: "Café Website",
    description: "Modern café site with strong typography. Built to match the shop's actual vibe.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#D4A373",
    image: "/assets/projects/moes.jpg"
  },
  {
    id: 8,
    title: "Pink Crow",
    year: "2026",
    link: "https://pinkcrow.netlify.app/",
    tag: "Restaurant Experience",
    description: "Bold restaurant site with high-contrast imagery and a clear visual hierarchy.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#D4A373",
    image: "/assets/projects/pinkcrow.jpg"
  }
];
/**
 * 4. INTERESTS / BENTO CONTENT
 * `media: "video"` on the coffee card swaps the still for an autoplaying clip.
 */
export const INTERESTS = [
  {
    id: "barca",
    title: "FC Barcelona",
    subtitle: "Culer for life.",
    icon: Heart,
    span: "md:col-span-8",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[450px]"
  },
  {
    id: "coffee",
    title: "Coffee",
    subtitle: "I like coffee.",
    icon: Coffee,
    span: "md:col-span-3",
    aspect: "aspect-square",
    height: "md:min-h-[280px]",
    media: "video",
    video: "/assets/interests/video-clip.mp4",
    poster: "/assets/interests/coffee.avif"
  },
  {
    id: "video",
    title: "Video & Motion",
    subtitle: "Editing pulled me in fast.",
    icon: Video,
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "md:min-h-[280px]"
  },
  {
    id: "sunset",
    title: "Sunset",
    subtitle: "Best hour of the day.",
    icon: Sun,
    span: "md:col-span-7",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[450px]"
  },
  {
    id: "chess",
    title: "Chess",
    subtitle: "A few games before sleep.",
    icon: Crown,
    span: "md:col-span-5",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[350px]",
    image: "https://images.unsplash.com/photo-1571236207041-5fb70cec466e"
  },
  {
    id: "cooking",
    title: "Cooking",
    subtitle: "Underrated creative outlet.",
    icon: Utensils,
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "md:min-h-[280px]"
  },
];
/**
 * 5. SOCIAL ECOSYSTEM
 */
export const SOCIALS = [
  {
    label: "Instagram",
    href: `https://instagram.com/${PERSONAL.instagram}`,
    icon: Instagram,
    handle: `@${PERSONAL.instagram}`
  },
  {
    label: "GitHub",
    href: `https://github.com/${PERSONAL.github}`,
    icon: Github,
    handle: PERSONAL.github
  },
  {
    label: "Email",
    href: `mailto:${PERSONAL.email}`,
    icon: Mail,
    handle: "Send Inquiry"
  }
];

export const MARQUEE_TAGS = [
  "Culer",
  "Late Night Builds",
  "Cinematic Cuts",
  "Recipe Experiments",
  "Always Iterating",
  "Post-Workout Calm",
  "Més que un club",
  "Chess",
  "Developer",
];

// Explicit ID list so we can omit deleted source files without renumbering.
// If you delete an image, also remove its number here.
const GALLERY_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, /* 26 removed */ 27, 28, 29, 30,
  31, 32, 33,
];

export const GALLERY_IMAGES = GALLERY_IDS.map((id) => ({
  id,
  src: `/assets/gallery/img${id}.avif`,
  alt: `Perspective ${String(id).padStart(2, '0')}`,
}));
