export const spring = {
  gentle: { type: "spring" as const, stiffness: 300, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 20 },
  bouncy: { type: "spring" as const, stiffness: 500, damping: 15 },
  modal: { type: "spring" as const, stiffness: 350, damping: 26 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 25 },
  quick: { type: "spring" as const, stiffness: 400, damping: 15 },
}
