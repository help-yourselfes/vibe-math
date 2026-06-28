import { SparklesIcon } from "@/components/ui/icons"

export function BadgePill({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-[#4f46e5]/20 bg-[#4f46e5]/5 px-4 py-1.5 text-xs font-medium text-[#818cf8] ${className ?? ""}`}>
      <SparklesIcon size={14} />
      {text}
    </div>
  )
}
