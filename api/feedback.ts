interface FeedbackPayload {
  page: string
  section: string
  sectionTitle: string
  category: "correction" | "suggestion" | "missing" | "unclear"
  feedback: string
  submitter: string
  wikiVersion: string
}

const VALID_CATEGORIES = new Set(["correction", "suggestion", "missing", "unclear"])
const ALLOWED_ORIGIN = "https://michaelhil.github.io"
const GITHUB_REPO = "michaelhil/nuclear-wiki"

const validatePayload = (data: unknown): data is FeedbackPayload => {
  if (!data || typeof data !== "object") return false
  const d = data as Record<string, unknown>
  return (
    typeof d.page === "string" && d.page.length > 0 && d.page.length < 200 &&
    typeof d.section === "string" &&
    typeof d.sectionTitle === "string" &&
    typeof d.category === "string" && VALID_CATEGORIES.has(d.category) &&
    typeof d.feedback === "string" && d.feedback.length > 0 && d.feedback.length < 5000 &&
    typeof d.submitter === "string" && d.submitter.length < 200 &&
    typeof d.wikiVersion === "string"
  )
}

const buildIssueBody = (data: FeedbackPayload): string => {
  const timestamp = new Date().toISOString()
  const pageName = data.page.replace(/\.md$/, "")
  const siteUrl = `https://michaelhil.github.io/nuclear-wiki/${pageName}/#${data.section}`

  const meta = [
    "<!-- WIKI-FEEDBACK-META",
    `page: ${data.page}`,
    `section: ${data.section}`,
    `section_title: ${data.sectionTitle}`,
    `category: ${data.category}`,
    `submitter: ${data.submitter}`,
    `wiki_version: ${data.wikiVersion}`,
    `timestamp: ${timestamp}`,
    "-->",
  ].join("\n")

  const readable = [
    `**Page**: [${pageName}](${siteUrl})`,
    `**Section**: ${data.sectionTitle}`,
    `**Wiki version**: \`${data.wikiVersion}\``,
    `**Type**: ${data.category.charAt(0).toUpperCase() + data.category.slice(1)}`,
    "",
    "---",
    "",
    data.feedback,
    "",
    `— ${data.submitter}`,
  ].join("\n")

  return `${meta}\n\n${readable}`
}

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin ?? ""
  const corsOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : ""

  res.setHeader("Access-Control-Allow-Origin", corsOrigin)
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  if (!corsOrigin) {
    return res.status(403).json({ error: "Origin not allowed" })
  }

  const data = req.body
  if (!validatePayload(data)) {
    return res.status(400).json({ error: "Invalid payload" })
  }

  const pat = process.env.GITHUB_PAT
  if (!pat) {
    console.error("GITHUB_PAT not configured")
    return res.status(500).json({ error: "Server misconfigured" })
  }

  const pageName = data.page.replace(/\.md$/, "").split("/").pop() ?? data.page
  const title = `[${data.page.replace(/\.md$/, "")}] ${data.category.charAt(0).toUpperCase() + data.category.slice(1)} — "${data.sectionTitle.slice(0, 60)}"`
  const labels = ["wiki-feedback", `type:${data.category}`, `page:${pageName}`]

  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "nuclear-wiki-feedback",
    },
    body: JSON.stringify({
      title,
      body: buildIssueBody(data),
      labels,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error("GitHub API error:", response.status, err)
    return res.status(502).json({ error: "Failed to create issue" })
  }

  return res.status(201).json({ ok: true })
}
