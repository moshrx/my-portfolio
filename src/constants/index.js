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
  tagline: "This is where I keep what I'm into.",
  bio: "Photos, football, coffee, chess, and whatever else has my attention.",
};

/**
 * 2. NAVIGATION
 */
export const NAV_LINKS = [
  { name: "Home", href: "/"},
  { name: "Interests", href: "/interests", type: "internal" },
  { name: "Gallery", href: "/gallery", type: "internal" },
  { name: "Contact", href: "/contact", type: "internal" },
];

/**
 * 3. INTERESTS / BENTO CONTENT
 * `media: "video"` on the coffee card swaps the still for an autoplaying clip.
 */
export const INTERESTS = [
  {
    id: "barca",
    title: "FC Barcelona",
    subtitle: "My team.",
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
    subtitle: "I edit too.",
    icon: Video,
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "md:min-h-[280px]"
  },
  {
    id: "sunset",
    title: "Sunset",
    subtitle: "I watch them.",
    icon: Sun,
    span: "md:col-span-7",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[450px]"
  },
  {
    id: "chess",
    title: "Chess",
    subtitle: "I play.",
    icon: Crown,
    span: "md:col-span-5",
    aspect: "aspect-video md:aspect-auto",
    height: "md:min-h-[350px]",
    image: "https://images.unsplash.com/photo-1571236207041-5fb70cec466e"
  },
  {
    id: "cooking",
    title: "Cooking",
    subtitle: "I cook.",
    icon: Utensils,
    span: "md:col-span-4",
    aspect: "aspect-square",
    height: "md:min-h-[280px]"
  },
];
/**
 * 4. SOCIALS
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
    handle: "Say hi"
  }
];

export const MARQUEE_TAGS = [
  "Culer",
  "Coffee",
  "Chess",
  "Cooking",
  "Sunsets",
  "Cinematic Cuts",
  "Més que un club",
  "Late Nights",
  "Film Photos",
];

// Explicit ID list so we can omit deleted source files without renumbering.
// If you delete an image, also remove its number here.
// 34-95 are the newer batch, ordered by capture date, and lead the grid.
const GALLERY_IDS = [
  95, 94, 93, 92, 91, 90, 89, 88, 87, 86,
  85, 84, 83, 82, 81, 80, 79, 78, 77, 76,
  75, 74, 73, 72, 71, 70, 69, 68, 67, 66,
  65, 64, 63, 62, 61, 60, 59, 58, 57, 56,
  55, 54, 53, 52, 51, 50, 49, 48, 47, 46,
  45, 44, 43, 42, 41, 40, 39, 38, 37, 36,
  35, 34,
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
