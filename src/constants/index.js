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
  philosophy: "Merging spatial motion with clean digital architecture.",
  tagline: "Just making things I'd want to use.",
  bio: "I'm Mohammed — living in Charlottetown, and I spend most of my time making things that feel clean, expressive, and a little cinematic.",
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
 * Added 'color' for theme-switching and 'year' for editorial feel.
 */
export const PROJECTS = [
  { 
    id: 0,
    title: "Fat Cat Bakery",
    year: "2026",
    link: "https://fatcatbakery.netlify.app/",
    tag: "Local Business",
    description: "Polished bakery site with a focus on simple navigation and conversion-friendly layouts.",
    tech: ["NextJs", "Tailwind CSS", "UX/UI"],
    color: "#F2CC8F",
    image: "/assets/projects/fatcat.jpg"
  },
  {
    id: 1,
    title: "Cricket PEI",
    year: "2026",
    link: "https://cricketpei.ca",
    tag: "Sports Federation",
    description: "Official site for PEI Cricket. Built for speed and easy access to match data and federation updates.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#0071e3",
    image: "/assets/projects/cricket.jpg"
  },
  {
    id: 2, // Red Soil moved up to 2nd
    title: "Red Soil",
    year: "2026",
    link: "https://redsoil.netlify.app/",
    tag: "Community Branding",
    description: "A clean, structured brand site inspired by PEI’s identity. Focus on grid systems and solid spacing.",
    tech: ["HTML5", "Tailwind CSS", "Brand UI"],
    color: "#BC4749",
    image: "/assets/projects/redsoil.jpg"
  },
  {
    id: 3, // New Lootbins entry
    title: "Lootbins Canada",
    year: "2026",
    link: "https://www.lootbinscanada.com/",
    tag: "E-commerce & Retail",
    description: "Inventory-focused retail site. Clean layout designed to handle high product volume and clear navigation.",
    tech: ["Shopify", "UI Design", "E-commerce"],
    color: "#E63946",
    image: "/assets/projects/lootbins.jpg" // Make sure to add this image
  },
  {
    id: 4,
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
    id: 5,
    title: "Pink Crow",
    year: "2026",
    link: "https://pinkcrow.netlify.app/",
    tag: "Restaurant Experience",
    description: "Bold restaurant site with high-contrast imagery and a focus on visual hierarchy.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#D4A373",
    image: "/assets/projects/pinkcrow.jpg"
  }
];
/**
 * 4. INTERESTS / BENTO CONTENT
 */
export const INTERESTS = [
  { 
    id: "barca", 
    title: "FC Barcelona", 
    subtitle: "A Culer.", 
    icon: Heart, 
    span: "md:col-span-8",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[450px]" // Taller for drama
  },
  { 
    id: "coffee", 
    title: "Coffee", 
    subtitle: "I like coffee.", 
    icon: Coffee, 
    span: "md:col-span-3",
    aspect: "aspect-square",
    height: "md:min-h-[280px]" // Shorter, focused crop
  },
  { 
    id: "video", 
    title: "Video & Motion", 
    subtitle: "I just found out video editing is fun.", 
    icon: Video, 
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "md:min-h-[280px]" // Ultrawide cinematic
  },
  { 
    id: "sunset", 
    title: "Sunset", 
    subtitle: "My top best time.", 
    icon: Sun, 
    span: "md:col-span-7",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[450px]" // Ultrawide cinematic
  },
  {
    id: "chess",
    title: "Chess",
    subtitle: "I play chess before sleep.",
    icon: Crown,
    span: "md:col-span-5",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[350px]",
    image: "https://images.unsplash.com/photo-1571236207041-5fb70cec466e"
  },
  { 
    id: "cooking", 
    title: "Cooking", 
    subtitle: "Cooking is actually fun.", 
    icon: Utensils, 
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "md:min-h-[280px]" // Ultrawide cinematic

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
  "Coffee Enthusiast",
  "Late Night Ideas",
  "Recipe Experiments",
  "Always Improving",
  "Post-Workout Peace",
  "Mes Que Un Club",
  "Chess",
  "Developer",
];

export const GALLERY_IMAGES = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  src: `/assets/gallery/img${i + 1}.avif`,
  alt: `Perspective ${String(i + 1).padStart(2, '0')}`,
}));
