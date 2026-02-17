import { 
  Github, 
  Instagram, 
  Mail, 
  Sun,
  Coffee, 
  Heart,
  Video,
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
  role: "Creative Developer & Editor",
  philosophy: "Merging spatial motion with clean digital architecture."
};

/**
 * 2. CINEMATIC NAVIGATION
 */
export const NAV_LINKS = [
  { name: "Work", href: "/", type: "internal" },
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
    title: "Cricket PEI",
    year: "2026",
    link: "https://cricketpei.ca",
    tag: "Sports Federation",
    description: "Designed and developed the official website for PEI Cricket. Focused on structured layouts, fast performance, and clear access to match data and updates.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#0071e3",
    image: "/assets/projects/cricket.jpg"
  },
  {
    id: 1,
    title: "Moe's Latte",
    year: "2026",
    link: "https://moes-latte.netlify.app/",
    tag: "Café Website",
    description: "A cozy, modern café website built with strong typography, warm tones, and smooth transitions to reflect the in-store atmosphere.",
    tech: ["HTML5", "Tailwind CSS", "UI Design"],
    color: "#D4A373",
    image: "/assets/projects/moes.jpg"
  },
  {
    id: 2,
    title: "Red Soil",
    year: "2026",
    link: "https://redsoil.netlify.app/",
    tag: "Community Branding",
    description: "A clean and structured brand website inspired by Prince Edward Island’s identity. Focused on grid systems, spacing, and visual consistency.",
    tech: ["HTML5", "Tailwind CSS", "Brand UI"],
    color: "#BC4749",
    image: "/assets/projects/redsoil.jpg"
  },
  {
    id: 3,
    title: "Fat Cat Bakery",
    year: "2026",
    link: "https://fatcatbakery.netlify.app/",
    tag: "Local Business",
    description: "A playful yet polished bakery website with subtle micro-interactions and conversion-focused layout decisions.",
    tech: ["HTML5", "Tailwind CSS", "UX/UI"],
    color: "#F2CC8F",
    image: "/assets/projects/fatcat.jpg"
  },
  {
    id: 4,
    title: "Pink Crow",
    year: "2026",
    link: "https://pinkcrow.netlify.app/",
    tag: "Restaurant Experience",
    description: "A bold, high-contrast restaurant website built around immersive imagery, strong hierarchy, and fluid motion design.",
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
    title: "The Blue & Red", 
    subtitle: "Culer since day one.", 
    icon: Heart, 
    span: "md:col-span-8",
    aspect: "aspect-video md:aspect-auto",
    height: "min-h-[450px]" // Taller for drama
  },
  { 
    id: "coffee", 
    title: "Coffee", 
    subtitle: "Black roast logic.", 
    icon: Coffee, 
    span: "md:col-span-3",
    aspect: "aspect-square",
    height: "min-h-[280px]" // Shorter, focused crop
  },
  { 
    id: "video", 
    title: "Video & Motion", 
    subtitle: "Color grading.", 
    icon: Video, 
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "min-h-[280px]" // Ultrawide cinematic
  },
  { 
    id: "sunset", 
    title: "Peak hour", 
    subtitle: "I like sky colors.", 
    icon: Sun, 
   span: "md:col-span-7",
    aspect: "aspect-video md:aspect-auto",
    height: "min-h-[450px]" /// Ultrawide cinematic
  }
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

export const GALLERY_IMAGES = [
  { 
    id: 1, 
    src: "/assets/gallery/img1.jpg", 
    alt: "Perspective 01", 
    caption: "The Blue Hour", 
    location: "PEI" 
  },
  { 
    id: 2, 
    src: "/assets/gallery/img2.jpg", 
    alt: "Perspective 02", 
    caption: "Red Dirt Roads", 
    location: "California" 
  },
  { 
    id: 3, 
    src: "/assets/gallery/img3.jpg", 
    alt: "Perspective 03", 
    caption: "Stadium Lights", 
    location: "California" 
  },
  { 
    id: 4, 
    src: "/assets/gallery/img4.jpg", 
    alt: "Perspective 04", 
    caption: "Geometric Shadows", 
    location: "California" 
  },
  { 
    id: 5, 
    src: "/assets/gallery/img5.jpg", 
    alt: "Perspective 05", 
    caption: "Caffeine & Code", 
    location: "California" 
  },
];