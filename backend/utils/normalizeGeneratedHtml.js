const normalizeGeneratedHtml = (code) => {
  if (!code || typeof code !== "string") {
    return ""
  }

  let html = code
    .replace(/^```html/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim()

  if (
    (html.startsWith('"') && html.endsWith('"')) ||
    (html.startsWith("'") && html.endsWith("'"))
  ) {
    html = html.slice(1, -1)
  }

  html = html
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\")
    .trim()

  const doctypeIndex = html.toLowerCase().indexOf("<!doctype")
  const htmlIndex = html.toLowerCase().indexOf("<html")
  const startIndex = doctypeIndex >= 0 ? doctypeIndex : htmlIndex

  if (startIndex > 0) {
    html = html.slice(startIndex).trim()
  }

  return html
}

export const isRenderableHtml = (code) => {
  const html = normalizeGeneratedHtml(code)

  if (
    !html ||
    !/<html[\s>]/i.test(html) ||
    !/<body[\s>]/i.test(html) ||
    !/<\/body>/i.test(html) ||
    !/<\/html>/i.test(html)
  ) {
    return false
  }

  if (hasHiddenPageWithoutVisibleActiveState(html)) {
    return false
  }

  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()

  return visibleText.length >= 30
}

const hasHiddenPageWithoutVisibleActiveState = (html) => {
  const hidesPage = /\.page[^{]*{[^}]*display\s*:\s*none/i.test(html)
  const showsActivePage = /\.page\.active[^{]*{[^}]*display\s*:\s*(block|flex|grid|contents)/i.test(html)
  const bodyHidden = /body[^{]*{[^}]*(display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0)/i.test(html)
  const mainHidden = /(main|header|section)[^{]*{[^}]*(display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0)/i.test(html)

  return bodyHidden || mainHidden || (hidesPage && !showsActivePage)
}

export default normalizeGeneratedHtml
