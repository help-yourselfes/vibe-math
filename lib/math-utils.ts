export function parseInlineMath(content: string) {
  const parts: Array<{ type: "text" | "math"; value: string }> = []
  const regex = /\$([^$]+)\$/g
  let lastIndex = 0, match
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) parts.push({ type: "text", value: content.slice(lastIndex, match.index) })
    parts.push({ type: "math", value: match[1] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < content.length) parts.push({ type: "text", value: content.slice(lastIndex) })
  return parts
}
