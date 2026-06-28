import { InfinityIcon } from "./icons"

export function Logo({ size = "sm" }: { size?: "sm" | "md" }) {
  const dims = size === "md" ? "w-8 h-8" : "w-7 h-7"
  const iconSize = size === "md" ? 16 : 14
  return (
    <span className={`flex items-center justify-center ${dims} rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#818cf8] text-white shrink-0`}>
      <InfinityIcon size={iconSize} />
    </span>
  )
}
