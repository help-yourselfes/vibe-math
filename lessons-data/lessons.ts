export interface LessonSection {
  type: "text" | "math" | "interactive" | "quiz"
  content: string
  interactive?: string
  quizOptions?: string[]
  quizCorrectIndex?: number
  quizExplanation?: string
}

export interface LessonData {
  slug: string
  title: string
  sections: LessonSection[]
}



export const lessons: Record<string, LessonData> = {
  "limits-intro": {
    slug: "limits-intro",
    title: "What is a Limit?",
    sections: [
      { type: "text", content: "The concept of a **limit** is the foundation of all calculus. A limit asks: *what value does a function approach as the input gets closer and closer to some point?*" },
      { type: "text", content: "Formally, we write: $$\\\\lim_{x \\\\to a} f(x) = L$$ This means that as $x$ gets arbitrarily close to $a$, $f(x)$ gets arbitrarily close to $L$." },
      { type: "interactive", content: "Try it yourself! Drag the slider to see how f(x) = x² - 1 behaves as x approaches 2:", interactive: "LimitExplorer" },
      { type: "text", content: "**Key ideas:**" },
      { type: "text", content: "- **Left-hand limit**: $\\\\lim_{x \\\\to a^-} f(x)$ — approach from below" },
      { type: "text", content: "- **Right-hand limit**: $\\\\lim_{x \\\\to a^+} f(x)$ — approach from above" },
      { type: "text", content: "- The limit exists **only if** the left and right-hand limits are equal." },
      { type: "text", content: "$$\\\\lim_{x \\\\to a} f(x) \\\\text{ exists if and only if } \\\\lim_{x \\\\to a^-} f(x) = \\\\lim_{x \\\\to a^+} f(x)$$" },
      {
  type: "quiz",
  content: "**Check your understanding:** What is $\\\\lim_{x \\\\to 3} (2x + 1)$?",
  quizOptions: ["5", "6", "7", "8"],
  quizCorrectIndex: 2,
  quizExplanation: "As $x$ approaches 3, $2x + 1$ approaches $2(3) + 1 = 7$."
},
    ],
  },
  "derivatives-intro": {
    slug: "derivatives-intro",
    title: "Introduction to Derivatives",
    sections: [
      { type: "text", content: "The **derivative** measures how a function changes as its input changes. It's the *instantaneous rate of change* — the slope of the tangent line at any point." },
      { type: "text", content: "The derivative is defined as a limit: $$f'(x) = \\\\lim_{h \\\\to 0} \\\\frac{f(x+h) - f(x)}{h}$$" },
      { type: "text", content: "Let's work through an example with $f(x) = x^2$ step by step:" },
      { type: "interactive", content: "", interactive: "DerivativeStepSolver" },
      { type: "text", content: "**Important derivatives to remember:**" },
      { type: "text", content: "- $\\\\frac{d}{dx}[x^n] = nx^{n-1}$ (Power Rule)" },
      { type: "text", content: "- $\\\\frac{d}{dx}[\\\\sin x] = \\\\cos x$" },
      { type: "text", content: "- $\\\\frac{d}{dx}[\\\\cos x] = -\\\\sin x$" },
      { type: "text", content: "- $\\\\frac{d}{dx}[e^x] = e^x$" },
    ],
  },
  "integrals-intro": {
    slug: "integrals-intro",
    title: "The Antiderivative & Basic Integrals",
    sections: [
      { type: "text", content: "**Integration** is the inverse operation of differentiation. If differentiation finds the rate of change, integration finds the original function." },
      { type: "text", content: "The **indefinite integral** (antiderivative) is written as: $$\\\\int f(x) \\\\, dx = F(x) + C$$ where $F'(x) = f(x)$ and $C$ is the constant of integration." },
      { type: "text", content: "The **definite integral** gives the area under a curve: $$\\\\int_a^b f(x) \\\\, dx = F(b) - F(a)$$" },
      { type: "interactive", content: "Explore how Riemann sums approximate the area under f(x) = x²:", interactive: "IntegralVisualizer" },
      { type: "text", content: "**Basic integration rules:**" },
      { type: "text", content: "- $\\\\int x^n \\\\, dx = \\\\frac{x^{n+1}}{n+1} + C$" },
      { type: "text", content: "- $\\\\int \\\\cos x \\\\, dx = \\\\sin x + C$" },
      { type: "text", content: "- $\\\\int \\\\sin x \\\\, dx = -\\\\cos x + C$" },
      { type: "text", content: "- $\\\\int e^x \\\\, dx = e^x + C$" },
    ],
  },
  "chain-rule": {
    slug: "chain-rule",
    title: "The Chain Rule",
    sections: [
      { type: "text", content: "The **chain rule** lets us differentiate composite functions — functions inside other functions." },
      { type: "text", content: "If $f(x) = g(h(x))$, then: $$f'(x) = g'(h(x)) \\\\cdot h'(x)$$" },
      { type: "text", content: "In words: *derivative of the outside, plug in the inside, times the derivative of the inside.*" },
      { type: "interactive", content: "Explore the chain rule with f(x) = sin(x²):", interactive: "ChainExplorer" },
      { type: "text", content: "**Example:** Find $f'(x)$ for $f(x) = (3x^2 + 1)^5$" },
      { type: "text", content: "- Outside: $u^5$, derivative: $5u^4$" },
      { type: "text", content: "- Inside: $u = 3x^2 + 1$, derivative: $6x$" },
      { type: "text", content: "- Result: $f'(x) = 5(3x^2 + 1)^4 \\\\cdot 6x = 30x(3x^2 + 1)^4$" },
    ],
  },
  "product-quotient": {
    slug: "product-quotient",
    title: "Product & Quotient Rules",
    sections: [
      { type: "text", content: "When two functions are multiplied or divided, we need special rules to differentiate them." },
      { type: "text", content: "**Product Rule:** $$(uv)' = u'v + uv'$$ *First times derivative of second, plus second times derivative of first.*" },
      { type: "interactive", content: "Step through the product rule with f(x) = x² · sin(x):", interactive: "ProductRuleSolver" },
      { type: "text", content: "**Quotient Rule:** $$\\\\left(\\\\frac{u}{v}\\\\right)' = \\\\frac{u'v - uv'}{v^2}$$" },
      { type: "text", content: "**Memory aid:** *Low d-high minus high d-low, over the square of what's below.*" },
    ],
  },
  "u-substitution": {
    slug: "u-substitution",
    title: "U-Substitution",
    sections: [
      { type: "text", content: "**U-substitution** is the integration equivalent of the chain rule. It reverses the chain rule to find antiderivatives." },
      { type: "text", content: "The idea: spot a function and its derivative in the integrand, then substitute to simplify." },
      { type: "interactive", content: "Step through ∫ 2x · cos(x²) dx:", interactive: "USubSolver" },
      { type: "text", content: "**General strategy:**" },
      { type: "text", content: "1. Choose $u = g(x)$ (the inner function)" },
      { type: "text", content: "2. Compute $du = g'(x) dx$" },
      { type: "text", content: "3. Rewrite the integral in terms of $u$" },
      { type: "text", content: "4. Integrate with respect to $u$" },
      { type: "text", content: "5. Substitute back to $x$" },
    ],
  },
  "integration-by-parts": {
    slug: "integration-by-parts",
    title: "Integration by Parts",
    sections: [
      { type: "text", content: "**Integration by parts** is the inverse of the product rule for derivatives." },
      { type: "text", content: "The formula: $$\\\\int u \\\\, dv = uv - \\\\int v \\\\, du$$" },
      { type: "text", content: "**Choose $u$ and $dv$ wisely.** A common guideline is **LIATE**:" },
      { type: "text", content: "- **L**ogarithmic functions" },
      { type: "text", content: "- **I**nverse trigonometric functions" },
      { type: "text", content: "- **A**lgebraic functions (polynomials)" },
      { type: "text", content: "- **T**rigonometric functions" },
      { type: "text", content: "- **E**xponential functions" },
      { type: "text", content: "Choose $u$ from the top of this list, $dv$ from the bottom." },
      { type: "text", content: "**Example:** $\\\\int x \\\\cdot e^x \\\\, dx$" },
      { type: "text", content: "- Let $u = x$, $dv = e^x dx$" },
      { type: "text", content: "- Then $du = dx$, $v = e^x$" },
      { type: "text", content: "- Result: $\\\\int x e^x \\\\, dx = x e^x - \\\\int e^x \\\\, dx = x e^x - e^x + C$" },
    ],
  },
  "lhopitals-rule": {
    slug: "lhopitals-rule",
    title: "L'Hôpital's Rule",
    sections: [
      { type: "text", content: "**L'Hôpital's Rule** helps evaluate limits that give indeterminate forms like $\\\\frac{0}{0}$ or $\\\\frac{\\\\infty}{\\\\infty}$." },
      { type: "text", content: "The rule: If $\\\\lim_{x \\\\to a} \\\\frac{f(x)}{g(x)}$ gives $\\\\frac{0}{0}$ or $\\\\frac{\\\\pm\\\\infty}{\\\\pm\\\\infty}$, then: $$\\\\lim_{x \\\\to a} \\\\frac{f(x)}{g(x)} = \\\\lim_{x \\\\to a} \\\\frac{f'(x)}{g'(x)}$$" },
      { type: "text", content: "**Important:** Only use L'Hôpital's rule when you have an **indeterminate form**. Applying it to determinate forms gives wrong answers!" },
      { type: "text", content: "**Example:** $\\\\lim_{x \\\\to 0} \\\\frac{\\\\sin x}{x} = \\\\lim_{x \\\\to 0} \\\\frac{\\\\cos x}{1} = 1$" },
      { type: "text", content: "Other indeterminate forms ($0 \\\\cdot \\\\infty$, $\\\\infty - \\\\infty$, $1^\\\\infty$, etc.) need to be algebraically rearranged into $\\\\frac{0}{0}$ or $\\\\frac{\\\\infty}{\\\\infty}$ first." },
    ],
  },
  "taylor-series": {
    slug: "taylor-series",
    title: "Taylor Series",
    sections: [
      { type: "text", content: "A **Taylor series** represents a function as an infinite sum of terms calculated from its derivatives at a single point." },
      { type: "text", content: "The Taylor series of $f(x)$ centered at $x = a$ is: $$f(x) = \\\\sum_{n=0}^{\\\\infty} \\\\frac{f^{(n)}(a)}{n!} (x - a)^n$$" },
      { type: "text", content: "When $a = 0$, this is called a **Maclaurin series**: $$f(x) = \\\\sum_{n=0}^{\\\\infty} \\\\frac{f^{(n)}(0)}{n!} x^n$$" },
      { type: "text", content: "**Important Maclaurin series to know:**" },
      { type: "text", content: "- $e^x = \\\\sum_{n=0}^{\\\\infty} \\\\frac{x^n}{n!} = 1 + x + \\\\frac{x^2}{2!} + \\\\frac{x^3}{3!} + \\\\cdots$" },
      { type: "text", content: "- $\\\\sin x = \\\\sum_{n=0}^{\\\\infty} \\\\frac{(-1)^n x^{2n+1}}{(2n+1)!}$" },
      { type: "text", content: "- $\\\\cos x = \\\\sum_{n=0}^{\\\\infty} \\\\frac{(-1)^n x^{2n}}{(2n)!}$" },
      { type: "text", content: "Taylor series are the foundation of numerical methods — calculators use them to compute $\\\\sin$, $\\\\cos$, and $e^x$!" },
    ],
  },
  "differential-equations": {
    slug: "differential-equations",
    title: "Introduction to Differential Equations",
    sections: [
      { type: "text", content: "A **differential equation** is an equation involving a function and its derivatives. They model everything from population growth to planetary motion." },
      { type: "text", content: "**Example: Simple Growth** $$\\\\frac{dy}{dt} = ky$$ This says: the rate of change of $y$ is proportional to $y$ itself. The solution is: $$y(t) = Ce^{kt}$$" },
      { type: "text", content: "**Separation of Variables:** For equations of the form $\\\\frac{dy}{dx} = g(x)h(y)$:" },
      { type: "text", content: "1. Separate: $\\\\frac{dy}{h(y)} = g(x) \\\\, dx$" },
      { type: "text", content: "2. Integrate both sides: $\\\\int \\\\frac{dy}{h(y)} = \\\\int g(x) \\\\, dx$" },
      { type: "text", content: "3. Solve for $y$ if possible" },
      { type: "text", content: "**Example:** $\\\\frac{dy}{dx} = xy$" },
      { type: "text", content: "- $\\\\frac{dy}{y} = x \\\\, dx$" },
      { type: "text", content: "- $\\\\int \\\\frac{dy}{y} = \\\\int x \\\\, dx$" },
      { type: "text", content: "- $\\\\ln|y| = \\\\frac{x^2}{2} + C$" },
      { type: "text", content: "- $y = Ce^{x^2/2}$" },
    ],
  },
}
