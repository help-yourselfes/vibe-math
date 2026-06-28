import { StepSolverBase } from "@/components/ui/StepSolverBase"

export function ProductRuleSolver() {
  return (
    <StepSolverBase
      steps={[
        { label: "Identify u and v", math: "u = x^2,\\; v = \\sin(x)" },
        { label: "Find u' and v'", math: "u' = 2x,\\; v' = \\cos(x)" },
        { label: "Apply product rule", math: "f'(x) = u'v + uv'" },
        { label: "Substitute", math: "f'(x) = (2x)(\\sin(x)) + (x^2)(\\cos(x))" },
        { label: "Result", math: "f'(x) = 2x\\sin(x) + x^2\\cos(x)" },
      ]}
    />
  )
}
