"use client"

interface MathSparklineProps {
  slug: string
  width?: number
  height?: number
}

const sparklines: Record<string, { path: string; color: string }> = {
  "limits-intro": {
    path: "M0,80 Q40,-10 80,0 T160,60 T240,80",
    color: "#4f46e5",
  },
  "derivatives-intro": {
    path: "M0,80 Q40,20 80,30 T160,50 T240,80 M0,80 L240,0",
    color: "#818cf8",
  },
  "integrals-intro": {
    path: "M0,80 Q60,0 120,20 T240,60",
    color: "#4f46e5",
  },
  "chain-rule": {
    path: "M0,40 Q20,80 40,0 Q60,80 80,0 Q100,80 120,0 Q140,80 160,0 Q180,80 200,0 Q220,80 240,40",
    color: "#818cf8",
  },
  "product-quotient": {
    path: "M0,40 Q60,80 80,20 T160,60 T240,40",
    color: "#4f46e5",
  },
  "u-substitution": {
    path: "M0,80 Q40,0 80,40 T160,10 T240,80",
    color: "#818cf8",
  },
  "integration-by-parts": {
    path: "M0,40 C40,0 80,80 120,40 C160,0 200,80 240,40",
    color: "#4f46e5",
  },
  "lhopitals-rule": {
    path: "M0,40 Q10,0 20,40 Q30,80 40,40 Q50,0 60,40 Q70,80 80,40 Q90,0 100,40 Q110,80 120,40 Q130,0 140,40 Q150,80 160,40 Q170,0 180,40 Q190,80 200,40 Q210,0 220,40 Q230,80 240,40",
    color: "#818cf8",
  },
  "taylor-series": {
    path: "M0,80 C30,40 50,0 80,20 C110,40 130,60 160,40 C190,20 210,0 240,0",
    color: "#4f46e5",
  },
  "differential-equations": {
    path: "M0,80 C40,60 80,40 120,20 C160,10 200,5 240,0",
    color: "#818cf8",
  },
}

const defaultPath = "M0,80 Q60,40 120,40 T240,80"

export function MathSparkline({ slug, width = 120, height = 40 }: MathSparklineProps) {
  const data = sparklines[slug] ?? { path: defaultPath, color: "#4f46e5" }

  return (
    <svg width={width} height={height} viewBox="0 0 240 80" className="shrink-0">
      <path
        d={data.path}
        fill="none"
        stroke={data.color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d={data.path}
        fill="none"
        stroke={data.color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.15"
      />
    </svg>
  )
}
