export function StepNav({
  step,
  totalSteps,
  onPrev,
  onNext,
}: {
  step: number
  totalSteps: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrev}
        disabled={step === 0}
        className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
      >
        ← Back
      </button>
      <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
      <button
        onClick={onNext}
        disabled={step === totalSteps - 1}
        className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
      >
        Next →
      </button>
    </div>
  )
}
