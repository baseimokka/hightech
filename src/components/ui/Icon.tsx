import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Car,
  Check,
  CheckCheck,
  CircleDot,
  Clock,
  Cog,
  Eye,
  Facebook,
  Factory,
  FileCheck,
  Flame,
  Frame,
  Fuel,
  GraduationCap,
  Grid2x2,
  Headset,
  Image as ImageIcon,
  Instagram,
  Languages,
  Layers,
  LayoutGrid,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pill,
  Plane,
  Play,
  ScanLine,
  Settings,
  ShieldCheck,
  Square,
  Target,
  Truck,
  Users,
  Wrench,
  X,
  Youtube,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps the kebab-case icon names used throughout the content (mirrors the
 * design system's Lucide call-sites) to their lucide-react components.
 */
const ICONS = {
  'scan-line': ScanLine,
  cog: Cog,
  wrench: Wrench,
  'shield-check': ShieldCheck,
  headset: Headset,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  layers: Layers,
  target: Target,
  truck: Truck,
  'badge-check': BadgeCheck,
  users: Users,
  fuel: Fuel,
  car: Car,
  'building-2': Building2,
  zap: Zap,
  pill: Pill,
  plane: Plane,
  factory: Factory,
  play: Play,
  image: ImageIcon,
  'arrow-right': ArrowRight,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  clock: Clock,
  languages: Languages,
  menu: Menu,
  x: X,
  'message-circle': MessageCircle,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  eye: Eye,
  lock: Lock,
  'file-check': FileCheck,
  check: Check,
  'check-check': CheckCheck,
  square: Square,
  'layout-grid': LayoutGrid,
  'circle-dot': CircleDot,
  frame: Frame,
  'grid-2x2': Grid2x2,
  settings: Settings,
  flame: Flame,
  eye2: Eye,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
}

export function Icon({ name, size = 20, className, strokeWidth = 2, ...rest }: IconProps) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  return <Glyph size={size} strokeWidth={strokeWidth} className={className} aria-hidden {...rest} />;
}
