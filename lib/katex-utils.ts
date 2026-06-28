import katex from "katex"

export function renderMath(tex: string) {
  return { __html: katex.renderToString(tex, { throwOnError: false }) }
}
