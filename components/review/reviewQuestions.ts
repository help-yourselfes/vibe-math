export interface ReviewQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const reviewQuestions: Record<string, ReviewQuestion[]> = {
  "limits-intro": [
    {
      question: "A limit exists if and only if:",
      options: [
        "The function is defined at the point",
        "Both one-sided limits exist",
        "Both one-sided limits exist and are equal",
        "The function is continuous",
      ],
      correctIndex: 2,
      explanation: "For a limit to exist, the left-hand and right-hand limits must both exist AND be equal.",
    },
    {
      question: "Which of the following represents a right-hand limit?",
      options: [
        "\\lim_{x \\to a} f(x)",
        "\\lim_{x \\to a^-} f(x)",
        "\\lim_{x \\to a^+} f(x)",
        "\\lim_{h \\to 0} f(x+h)",
      ],
      correctIndex: 2,
      explanation: "The superscript + indicates approaching from the right (positive direction).",
    },
    {
      question: "What is \\lim_{x \\to 3} (2x + 1)?",
      options: ["5", "6", "7", "8"],
      correctIndex: 2,
      explanation: "As x approaches 3, 2x+1 approaches 2(3)+1 = 7.",
    },
  ],
  "derivatives-intro": [
    {
      question: "The derivative f'(x) represents:",
      options: [
        "The average rate of change",
        "The slope of the secant line",
        "The instantaneous rate of change — the slope of the tangent line",
        "The area under the curve",
      ],
      correctIndex: 2,
      explanation: "The derivative measures instantaneous rate of change, which is the slope of the tangent line at a point.",
    },
    {
      question: "Using the power rule, what is d/dx[x⁵]?",
      options: ["4x⁴", "5x⁴", "5x⁵", "x⁴"],
      correctIndex: 1,
      explanation: "Power rule: bring down the exponent (5) and subtract 1 from the exponent: 5x⁴.",
    },
    {
      question: "What is d/dx[cos x]?",
      options: ["sin x", "-sin x", "cos x", "-cos x"],
      correctIndex: 1,
      explanation: "The derivative of cos x is -sin x.",
    },
    {
      question: "The derivative is defined as a limit of which quotient?",
      options: [
        "\\frac{f(x) - f(a)}{x - a}",
        "\\frac{f(x+h) - f(x)}{h}",
        "\\frac{f(b) - f(a)}{b - a}",
        "\\frac{f(x)}{x}",
      ],
      correctIndex: 1,
      explanation: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} — the difference quotient as h → 0.",
    },
  ],
  "integrals-intro": [
    {
      question: "The integral \\int \\cos x \\, dx equals:",
      options: ["\\sin x + C", "-\\sin x + C", "\\cos x + C", "-\\cos x + C"],
      correctIndex: 0,
      explanation: "Since d/dx[sin x] = cos x, the antiderivative of cos x is sin x + C.",
    },
    {
      question: "What distinguishes a definite integral from an indefinite integral?",
      options: [
        "The definite integral has bounds and gives a number",
        "The definite integral includes +C",
        "The definite integral uses dx",
        "They are the same thing",
      ],
      correctIndex: 0,
      explanation: "A definite integral ∫_a^b has bounds and evaluates to a number. An indefinite integral is a family of functions.",
    },
    {
      question: "\\int x^3 \\, dx equals:",
      options: [
        "3x^2 + C",
        "\\frac{x^4}{4} + C",
        "x^4 + C",
        "\\frac{x^2}{2} + C",
      ],
      correctIndex: 1,
      explanation: "Power rule for integrals: ∫ x^n dx = x^{n+1}/(n+1) + C. Here n=3, so x⁴/4 + C.",
    },
  ],
  "chain-rule": [
    {
      question: "The chain rule is used to differentiate:",
      options: [
        "Products of functions",
        "Composite functions",
        "Quotients of functions",
        "Trigonometric functions only",
      ],
      correctIndex: 1,
      explanation: "The chain rule handles composite functions — functions inside other functions.",
    },
    {
      question: "If f(x) = g(h(x)), then f'(x) =",
      options: [
        "g'(h(x))",
        "g'(x) · h'(x)",
        "g'(h(x)) · h'(x)",
        "g(h'(x)) · h'(x)",
      ],
      correctIndex: 2,
      explanation: "Chain rule: derivative of the outside (evaluated at the inside) times the derivative of the inside.",
    },
    {
      question: "What is d/dx[sin(3x)]?",
      options: [
        "cos(3x)",
        "3 cos(3x)",
        "-3 cos(3x)",
        "cos(3) · 3",
      ],
      correctIndex: 1,
      explanation: "Outside: sin(u) → cos(u). Inside: u=3x → u'=3. Result: 3 cos(3x).",
    },
  ],
  "product-quotient": [
    {
      question: "The product rule states (uv)' =",
      options: [
        "u'v'",
        "u'v + uv'",
        "u'v - uv'",
        "uv' - u'v",
      ],
      correctIndex: 1,
      explanation: "Product rule: first times derivative of second, plus second times derivative of first.",
    },
    {
      question: "The quotient rule formula is:",
      options: [
        "\\frac{u'v + uv'}{v^2}",
        "\\frac{u'v - uv'}{v}",
        "\\frac{u'v - uv'}{v^2}",
        "\\frac{uv' - u'v}{v^2}",
      ],
      correctIndex: 2,
      explanation: "Low d-high minus high d-low, over the square of what's below: (u'v - uv')/v².",
    },
    {
      question: "What is d/dx[x² · sin x]?",
      options: [
        "2x · cos x",
        "x² · cos x + 2x · sin x",
        "2x · sin x + x² · cos x",
        "2x · sin x - x² · cos x",
      ],
      correctIndex: 2,
      explanation: "Product rule with u=x², v=sin x: u'=2x, v'=cos x. Result: 2x·sin x + x²·cos x.",
    },
  ],
  "u-substitution": [
    {
      question: "U-substitution is the integration equivalent of:",
      options: [
        "The product rule",
        "The quotient rule",
        "The chain rule",
        "L'Hôpital's rule",
      ],
      correctIndex: 2,
      explanation: "U-substitution reverses the chain rule, just like integration reverses differentiation.",
    },
    {
      question: "When performing u-substitution on ∫ 2x·cos(x²) dx, the best choice for u is:",
      options: [
        "u = 2x",
        "u = cos(x²)",
        "u = x²",
        "u = 2x·cos(x²)",
      ],
      correctIndex: 2,
      explanation: "Let u = x². Then du = 2x dx, and the integral becomes ∫ cos(u) du = sin(u) + C = sin(x²) + C.",
    },
    {
      question: "After substituting u = g(x), what must you also express in terms of u?",
      options: [
        "Only the integrand",
        "Only the limits (for definite integrals)",
        "Both the integrand and dx",
        "Nothing — the substitution is automatic",
      ],
      correctIndex: 2,
      explanation: "You must rewrite the entire integrand AND dx in terms of u before integrating.",
    },
  ],
  "integration-by-parts": [
    {
      question: "Integration by parts reverses which differentiation rule?",
      options: [
        "Chain rule",
        "Product rule",
        "Quotient rule",
        "Power rule",
      ],
      correctIndex: 1,
      explanation: "Integration by parts is the inverse of the product rule: ∫ u dv = uv - ∫ v du.",
    },
    {
      question: "The LIATE mnemonic helps you choose:",
      options: [
        "Which integration technique to use",
        "Which part should be u in integration by parts",
        "The order of integration limits",
        "The constant of integration",
      ],
      correctIndex: 1,
      explanation: "LIATE (Log, Inverse trig, Algebraic, Trig, Exponential) suggests which function should be u.",
    },
    {
      question: "For ∫ x·e^x dx, what is the best choice for u?",
      options: [
        "u = e^x",
        "u = x",
        "u = x·e^x",
        "u = dx",
      ],
      correctIndex: 1,
      explanation: "Algebraic (x) comes before Exponential (e^x) in LIATE, so u = x, dv = e^x dx.",
    },
  ],
  "lhopitals-rule": [
    {
      question: "L'Hôpital's rule can be applied only when the limit gives:",
      options: [
        "Any fraction",
        "0/0 or ±∞/±∞",
        "0 · ∞",
        "A finite number",
      ],
      correctIndex: 1,
      explanation: "The rule requires an indeterminate form 0/0 or ±∞/±∞. Other forms must be rearranged first.",
    },
    {
      question: "Using L'Hôpital's rule, \\lim_{x \\to 0} \\frac{\\sin x}{x} equals:",
      options: ["0", "1", "\\infty", "Does not exist"],
      correctIndex: 1,
      explanation: "Both sin(0)=0 and x=0 give 0/0. Differentiate: cos(0)/1 = 1.",
    },
    {
      question: "Which of these must be true to apply L'Hôpital's rule?",
      options: [
        "The limit must exist",
        "The derivatives must exist near the point",
        "Both numerator and denominator must be differentiable near the point",
        "The function must be continuous",
      ],
      correctIndex: 2,
      explanation: "f and g must be differentiable near a (except possibly at a), and g'(x) ≠ 0 near a.",
    },
  ],
  "taylor-series": [
    {
      question: "A Taylor series represents a function as:",
      options: [
        "A finite sum of polynomials",
        "An infinite sum of terms built from its derivatives at a point",
        "A ratio of two polynomials",
        "A composition of simpler functions",
      ],
      correctIndex: 1,
      explanation: "A Taylor series is an infinite sum: f(x) = Σ f⁽ⁿ⁾(a)/n! · (x-a)ⁿ.",
    },
    {
      question: "A Maclaurin series is a Taylor series centered at:",
      options: ["x = 1", "x = a", "x = 0", "x = ∞"],
      correctIndex: 2,
      explanation: "A Maclaurin series is simply a Taylor series with a = 0.",
    },
    {
      question: "The Maclaurin series for e^x is:",
      options: [
        "\\sum_{n=0}^{\\infty} \\frac{x^n}{n}",
        "\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}",
        "\\sum_{n=0}^{\\infty} n! x^n",
        "\\sum_{n=0}^{\\infty} x^n",
      ],
      correctIndex: 1,
      explanation: "e^x = Σ xⁿ/n! = 1 + x + x²/2! + x³/3! + ...",
    },
  ],
  "differential-equations": [
    {
      question: "A differential equation involves:",
      options: [
        "Only algebraic expressions",
        "A function and its derivatives",
        "Only exponential functions",
        "Integrals only",
      ],
      correctIndex: 1,
      explanation: "A differential equation relates a function to its derivatives.",
    },
    {
      question: "The solution to dy/dt = ky is:",
      options: [
        "y = C e^{kt}",
        "y = C e^{-kt}",
        "y = k e^{Ct}",
        "y = C t^k",
      ],
      correctIndex: 0,
      explanation: "Separate variables: dy/y = k dt. Integrate: ln|y| = kt + C. Solve: y = Ce^{kt}.",
    },
    {
      question: "Separation of variables works for equations of the form:",
      options: [
        "dy/dx = g(x)h(y)",
        "dy/dx = g(x) + h(y)",
        "d²y/dx² = g(x)",
        "dy/dx = constant",
      ],
      correctIndex: 0,
      explanation: "Separation works when the equation can be written as dy/dx = g(x)h(y), allowing y-terms and x-terms to be separated.",
    },
  ],
}
