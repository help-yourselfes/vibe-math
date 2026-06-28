export type TermCategory = "definition" | "formula" | "theorem"

export const catColor: Record<string, string> = {
  definition: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  formula: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  theorem: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export const catLabel: Record<string, string> = {
  definition: "Definition",
  formula: "Formula",
  theorem: "Theorem",
}

export interface GlossaryEntry {
  term: string
  definition: string
  category: TermCategory
  lessonSlug: string
  formula?: string
}

export const glossaryTerms: GlossaryEntry[] = [
  // ── Definitions ──
  {
    term: "Limit",
    definition: "The value a function approaches as the input gets arbitrarily close to a given point. The limit exists iff both one-sided limits exist and are equal.",
    category: "definition",
    lessonSlug: "limits-intro",
    formula: "\\lim_{x \\to a} f(x) = L",
  },
  {
    term: "One-sided limit",
    definition: "A limit approached from only one direction — either from the left or from the right.",
    category: "definition",
    lessonSlug: "limits-intro",
    formula: "\\lim_{x \\to a^-} f(x) \\quad \\text{vs} \\quad \\lim_{x \\to a^+} f(x)",
  },
  {
    term: "Derivative",
    definition: "The instantaneous rate of change of a function — the slope of the tangent line at any point. Defined as a limit of the difference quotient.",
    category: "definition",
    lessonSlug: "derivatives-intro",
    formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
  },
  {
    term: "Power Rule",
    definition: "The derivative of x^n is n·x^{n-1}. The most fundamental differentiation rule.",
    category: "formula",
    lessonSlug: "derivatives-intro",
    formula: "\\frac{d}{dx}[x^n] = nx^{n-1}",
  },
  {
    term: "Indefinite Integral",
    definition: "The inverse operation of differentiation — also called the antiderivative. The result is a family of functions differing by a constant.",
    category: "definition",
    lessonSlug: "integrals-intro",
    formula: "\\int f(x)\\,dx = F(x) + C \\quad\\text{where}\\quad F'(x) = f(x)",
  },
  {
    term: "Definite Integral",
    definition: "The net area under a curve between two bounds. Evaluated via the Fundamental Theorem of Calculus.",
    category: "definition",
    lessonSlug: "integrals-intro",
    formula: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
  },
  {
    term: "Riemann Sum",
    definition: "An approximation of the area under a curve by summing rectangles. The definite integral is the limit of Riemann sums as the number of rectangles → ∞.",
    category: "definition",
    lessonSlug: "integrals-intro",
  },
  {
    term: "Chain Rule",
    definition: "The rule for differentiating composite functions: derivative of the outside evaluated at the inside, times the derivative of the inside.",
    category: "definition",
    lessonSlug: "chain-rule",
    formula: "\\frac{d}{dx}[g(h(x))] = g'(h(x)) \\cdot h'(x)",
  },
  {
    term: "Composite Function",
    definition: "A function made by plugging one function into another — a 'function inside a function'.",
    category: "definition",
    lessonSlug: "chain-rule",
    formula: "f(x) = g(h(x))",
  },
  {
    term: "Product Rule",
    definition: "The rule for differentiating a product of two functions: first times derivative of the second, plus second times derivative of the first.",
    category: "definition",
    lessonSlug: "product-quotient",
    formula: "(uv)' = u'v + uv'",
  },
  {
    term: "Quotient Rule",
    definition: "The rule for differentiating a quotient of two functions: low d-high minus high d-low, over the square of what's below.",
    category: "definition",
    lessonSlug: "product-quotient",
    formula: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
  },
  {
    term: "U-Substitution",
    definition: "The integration equivalent of the chain rule. Spot a function and its derivative in the integrand, substitute to simplify, integrate, then substitute back.",
    category: "definition",
    lessonSlug: "u-substitution",
    formula: "\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du, \\quad u = g(x)",
  },
  {
    term: "Integration by Parts",
    definition: "The inverse of the product rule for integration. Rearranges ∫ u dv into uv − ∫ v du.",
    category: "definition",
    lessonSlug: "integration-by-parts",
    formula: "\\int u\\,dv = uv - \\int v\\,du",
  },
  {
    term: "L'Hôpital's Rule",
    definition: "A rule for evaluating limits that produce indeterminate forms (0/0 or ∞/∞) by differentiating numerator and denominator separately.",
    category: "definition",
    lessonSlug: "lhopitals-rule",
    formula: "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
  },
  {
    term: "Indeterminate Form",
    definition: "An expression encountered in limit problems that does not immediately reveal the limit. Examples: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞.",
    category: "definition",
    lessonSlug: "lhopitals-rule",
  },
  {
    term: "Taylor Series",
    definition: "An infinite sum representation of a function built from its derivatives at a single point. The foundation of numerical approximation.",
    category: "definition",
    lessonSlug: "taylor-series",
    formula: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n",
  },
  {
    term: "Maclaurin Series",
    definition: "A Taylor series centered at x = 0.",
    category: "definition",
    lessonSlug: "taylor-series",
    formula: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n",
  },
  {
    term: "Differential Equation",
    definition: "An equation involving a function and its derivatives. They model change in physics, biology, economics, and more.",
    category: "definition",
    lessonSlug: "differential-equations",
    formula: "\\frac{dy}{dx} = f(x, y)",
  },
  {
    term: "Separation of Variables",
    definition: "A method for solving differential equations by moving all y-terms to one side and all x-terms to the other, then integrating both sides.",
    category: "definition",
    lessonSlug: "differential-equations",
  },
  {
    term: "Antiderivative",
    definition: "A function F is an antiderivative of f if F'(x) = f(x). The indefinite integral is the general antiderivative.",
    category: "definition",
    lessonSlug: "integrals-intro",
  },

  // ── Formulas ──
  {
    term: "Difference Quotient",
    definition: "The slope of the secant line between two points. As h→0, it becomes the derivative.",
    category: "formula",
    lessonSlug: "derivatives-intro",
    formula: "\\frac{f(x+h) - f(x)}{h}",
  },
  {
    term: "LIATE Rule",
    definition: "A mnemonic for choosing u in integration by parts: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential (choose u from the top).",
    category: "formula",
    lessonSlug: "integration-by-parts",
  },
  {
    term: "Fundamental Theorem of Calculus",
    definition: "Connects differentiation and integration. Part 1: d/dx ∫_a^x f(t) dt = f(x). Part 2: ∫_a^b f(x) dx = F(b) − F(a) where F' = f.",
    category: "theorem",
    lessonSlug: "integrals-intro",
    formula: "\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x) \\quad\\text{and}\\quad \\int_a^b f(x)\\,dx = F(b) - F(a)",
  },
  {
    term: "Basic Integration Rules",
    definition: "The fundamental antiderivative formulas: power rule, trigonometric, exponential.",
    category: "formula",
    lessonSlug: "integrals-intro",
    formula: "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C,\\; \\int\\cos x\\,dx = \\sin x + C,\\; \\int\\sin x\\,dx = -\\cos x + C,\\; \\int e^x\\,dx = e^x + C",
  },
  {
    term: "Important Derivatives",
    definition: "Core derivative formulas every calculus student should memorize.",
    category: "formula",
    lessonSlug: "derivatives-intro",
    formula: "\\frac{d}{dx}[x^n] = nx^{n-1},\\; \\frac{d}{dx}[\\sin x] = \\cos x,\\; \\frac{d}{dx}[\\cos x] = -\\sin x,\\; \\frac{d}{dx}[e^x] = e^x",
  },
  {
    term: "Power Rule for Integrals",
    definition: "The antiderivative of x^n is x^{n+1}/(n+1) for n ≠ −1.",
    category: "formula",
    lessonSlug: "integrals-intro",
    formula: "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
  },
  {
    term: "Maclaurin Series for e^x",
    definition: "The Maclaurin series expansion of the exponential function.",
    category: "formula",
    lessonSlug: "taylor-series",
    formula: "e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots",
  },
  {
    term: "Maclaurin Series for sin x",
    definition: "The Maclaurin series expansion of sine, containing only odd powers.",
    category: "formula",
    lessonSlug: "taylor-series",
    formula: "\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}",
  },
  {
    term: "Maclaurin Series for cos x",
    definition: "The Maclaurin series expansion of cosine, containing only even powers.",
    category: "formula",
    lessonSlug: "taylor-series",
    formula: "\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}",
  },
  {
    term: "Simple Growth ODE",
    definition: "A differential equation where the rate of change is proportional to the quantity itself. Solution is exponential growth/decay.",
    category: "formula",
    lessonSlug: "differential-equations",
    formula: "\\frac{dy}{dt} = ky \\quad\\Longrightarrow\\quad y(t) = Ce^{kt}",
  },

  // ── Core Theorems ──
  {
    term: "Existence of Limits",
    definition: "A limit exists if and only if both one-sided limits exist and are equal. This is the fundamental test for limit existence.",
    category: "theorem",
    lessonSlug: "limits-intro",
    formula: "\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L",
  },
  {
    term: "FTC Part 1",
    definition: "The derivative of an integral from a constant to x yields the original function. Shows differentiation and integration are inverses.",
    category: "theorem",
    lessonSlug: "integrals-intro",
    formula: "\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)",
  },
  {
    term: "FTC Part 2",
    definition: "A definite integral equals the difference of the antiderivative evaluated at the bounds.",
    category: "theorem",
    lessonSlug: "integrals-intro",
    formula: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
  },
  {
    term: "L'Hôpital's Rule Theorem",
    definition: "If lim f/g gives 0/0 or ±∞/±∞, then lim f/g = lim f'/g' (provided the latter limit exists or is ±∞).",
    category: "theorem",
    lessonSlug: "lhopitals-rule",
    formula: "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
  },
  {
    term: "Taylor's Theorem",
    definition: "A function can be approximated near a point by its Taylor polynomial, with an error term controlled by the next derivative.",
    category: "theorem",
    lessonSlug: "taylor-series",
  },
]

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return glossaryTerms.find(e => e.term.toLowerCase() === term.toLowerCase())
}

export const glossaryRegex = new RegExp(
  "\\b(" + glossaryTerms.map(e => e.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b",
  "gi"
)
