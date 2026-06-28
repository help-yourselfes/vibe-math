import { cn } from "@/lib/utils"

export function GlassCard({
  className,
  children,
  hover = false,
  ...props
}: {
  className?: string
  children: React.ReactNode
  hover?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px]",
        hover && "hover:border-[#4f46e5]/30 transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
