/**
 * Cloudflare Worker: Wiki Feedback → GitHub Issue proxy
 *
 * Receives POST requests from the wiki feedback form and creates
 * GitHub Issues on behalf of anonymous reviewers.
 *
 * Environment variables (set in Cloudflare dashboard):
 *   GITHUB_PAT       — Personal access token with `repo` scope
 *   GITHUB_REPO      — Repository in "owner/repo" format (e.g. "michaelhil/nuclear-wiki")
 *   ALLOWED_ORIGIN   — Wiki URL for CORS (e.g. "https://michaelhil.github.io")
 *
 * Deploy:
 *   npx wrangler deploy worker/feedback-worker.ts
 */

interface FeedbackPayload {
  page: string
  section: string
  sectionTitle: string
  category: "correction" | "suggestion" | "missing" | "unclear"
  feedback: string
  submitter: string
  wikiVersion: string
}

interface Env {
  GITHUB_PAT: string
  GITHUB_REPO: string
  ALLOWED_ORIGIN: string
}

// Simple in-memory rate limiting (per-isolate, resets on cold start)
const rateMap = new Map<string, { count: number; resetAt: number }>()

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 })
    return false
  }
  entry.count++
  return entry.count > 10
}

const VALID_CATEGORIES = new Set(["correction", "suggestion", "missing", "unclear"])

const validatePayload = (data: unknown): data is FeedbackPayload => {
  if (!data || typeof data !== "object") return false
  const d = data as Record<string, unknown>
  return (
    typeof d.page === "string" && d.page.length > 0 &&
    typeof d.section === "string" &&
    typeof d.sectionTitle === "string" &&
    typeof d.category === "string" && VALID_CATEGORIES.has(d.category) &&
    typeof d.feedback === "string" && d.feedback.length > 0 && d.feedback.length < 5000 &&
    typeof d.submitter === "string" &&
    typeof d.wikiVersion === "string"
  )
}

const buildIssueBody = (data: FeedbackPayload): string => {
  const timestamp = new Date().toISOString()
  const pageName = data.page.replace(/\.md$/, "").replace(/\//g, "/")

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

  const siteUrl = `https://michaelhil.github.io/nuclear-wiki/${pageName}/#${data.section}`
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders })
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown"
    if (isRateLimited(ip)) {
      return new Response("Rate limited", { status: 429, headers: corsHeaders })
    }

    const data = await request.json().catch(() => null)
    if (!validatePayload(data)) {
      return new Response("Invalid payload", { status: 400, headers: corsHeaders })
    }

    const pageName = data.page.replace(/\.md$/, "").split("/").pop() ?? data.page
    const title = `[${data.page.replace(/\.md$/, "")}] ${data.category.charAt(0).toUpperCase() + data.category.slice(1)} — "${data.sectionTitle.slice(0, 60)}"`
    const labels = ["wiki-feedback", `type:${data.category}`, `page:${pageName}`]

    const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GITHUB_PAT}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "nuclear-wiki-feedback-worker",
      },
      body: JSON.stringify({
        title,
        body: buildIssueBody(data),
        labels,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error("GitHub API error:", err)
      return new Response("Failed to create issue", { status: 502, headers: corsHeaders })
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  },
}
