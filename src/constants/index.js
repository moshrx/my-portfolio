import { 
  Github, 
  Instagram, 
  Mail, 
  Linkedin, 
  Coffee, 
  Sun, 
  Heart,
  Video,
  Monitor
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
  { name: "Services", href: "/services", type: "internal" },
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
    year: "2025",
    link: "https://cricketpei.ca",
    tag: "Sports Federation",
    description: "Architecting a professional digital home for PEI Cricket. Focused on high-performance data delivery and professional athletic branding.",
    tech: ["React", "Framer Motion", "Tailwind"],
    color: "#0071e3", // Primary Blue
    image: "/assets/projects/cricket-hero.jpg"
  },
  {
    id: 1,
    title: "Moe's Latte",
    year: "2024",
    link: "https://moes-latte.netlify.app/",
    tag: "Luxury Café",
    description: "An immersive sensory experience designed for the modern café culture. Minimalist UI with high-end editorial photography.",
    tech: ["Framer Motion", "React", "Design"],
    color: "#D4A373", // Coffee Gold
    image: "/assets/projects/latte-hero.jpg"
  },
  {
    id: 2,
    title: "Red Soil",
    year: "2024",
    link: "https://redsoil.netlify.app/",
    tag: "Community Branding",
    description: "Capturing the essence of Prince Edward Island through structured grid systems and organic color palettes.",
    tech: ["JavaScript", "CSS3", "Design"],
    color: "#BC4749", // Earthy Red
    image: "/assets/projects/redsoil-hero.jpg"
  },
  {
    id: 3,
    title: "Fat Cat Bakery",
    year: "2023",
    link: "https://fatcatbakery.netlify.app/",
    tag: "Artisanal UI",
    description: "A playful yet premium interface for local artisans. Prioritizing tactile micro-interactions and high-conversion layouts.",
    tech: ["UI Design", "Frontend", "Interaction"],
    color: "#F2CC8F", // Bakery Warmth
    image: "/assets/projects/bakery-hero.jpg"
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
    title: "Video & Motion", 
    subtitle: "Color grading.", 
    icon: Video, 
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