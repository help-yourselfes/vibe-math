import { StepSolverBase } from "@/components/ui/StepSolverBase"

export function USubSolver() {
  return (
    <StepSolverBase
      steps={[
        { label: "Choose u", math: "u = x^2" },
        { label: "Find du", math: "du = 2x\\,dx" },
        { label: "Substitute", math: "\\int 2x\\cos(x^2)\\,dx = \\int \\cos(u)\\,du" },
        { label: "Integrate", math: "\\int \\cos(u)\\,du = \\sin(u) + C" },
        { label: "Substitute back", math: "\\sin(x^2) + C" },
      ]}
    />
  )
}
