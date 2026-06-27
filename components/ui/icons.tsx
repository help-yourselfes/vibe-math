import { cn } from "@/lib/utils"

type IconProps = { className?: string; size?: number }

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function LockIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function SparklesIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M18.5 14.5L19 16l1.5.5-1.5.5-.5 1.5-.5-1.5L16 16.5l1.5-.5.5-1.5z" />
      <path d="M6 16l.5 1.5L8 18l-1.5.5L6 20l-.5-1.5L4 18l1.5-.5L6 16z" />
    </svg>
  )
}

export function FireIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={cn("shrink-0", className)}>
      <path d="M12 23c-3.5 0-7-2.5-7-8 0-3.5 2.5-7 5-9.5.5-.5 1.3-.3 1.5.4.2.8.8 2.5 2 3.6 1.2 1.2 2.5 1.5 2.5-1 .3-1.5 1.5-2 2.5-1.5 1.5.8 3.5 2.5 3.5 6 0 2-.5 4-2 5.5-1.5 1.5-3.5 2-5.5 2z" />
    </svg>
  )
}

export function BrainIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1.1 2.8.4.3.8.6 1.1.9.8.8 1.3 1.9 1.3 3.1 0 1.2-.5 2.3-1.3 3.1-.3.3-.7.6-1.1.9.7.7 1.1 1.7 1.1 2.8a4 4 0 0 1-8 0c0-1.1.4-2.1 1.1-2.8-.4-.3-.8-.6-1.1-.9A4.4 4.4 0 0 1 7 12c0-1.2.5-2.3 1.3-3.1.3-.3.7-.6 1.1-.9A3.9 3.9 0 0 1 8 6a4 4 0 0 1 4-4z" />
    </svg>
  )
}

export function StarIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className={cn("shrink-0", className)}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function InfinityIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  )
}

export function ZapIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

export function TrophyIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export function FunctionIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M4 4h16" />
      <path d="M4 20h16" />
      <path d="M4 4v16" />
      <path d="M16 4v16" />
      <path d="M8 8h8" />
      <path d="M8 12h6" />
      <path d="M8 16h4" />
    </svg>
  )
}

export function IntegralIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M7 4c-1 2-2 4-2 8s2 8 6 8" />
      <path d="M17 4c1 2 2 4 2 8s-2 8-6 8" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function SigmaIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M18 7V4H6l6 8-6 8h12v-3" />
    </svg>
  )
}

export function GraphIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 4-6" />
    </svg>
  )
}

export function CrownIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M2 5l3 14h14l3-14-6 4-4-6-4 6-6-4z" />
    </svg>
  )
}
