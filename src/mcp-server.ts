import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { readdir, readFile, writeFile, stat } from "fs/promises"
import { join, relative, basename, extname } from "path"

const WIKI_ROOT = join(import.meta.dir, "..", "wiki")
const RAW_ROOT = join(import.meta.dir, "..", "raw")

// --- Helpers ---

interface WikiPage {
  path: string
  relativePath: string
  name: string
  frontmatter: Record<string, unknown>
  content: string
}

const parseFrontmatter = (raw: string): { frontmatter: Record<string, unknown>; content: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, content: raw }

  const lines = match[1].split("\n")
  const fm: Record<string, unknown> = {}
  let currentKey = ""
  let currentList: string[] | null = null

  for (const line of lines) {
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)$/)
    if (kvMatch) {
      if (currentList && currentKey) {
        fm[currentKey] = currentList
        currentList = null
      }
      const [, key, value] = kvMatch
      if (value === "") {
        currentKey = key
        currentList = []
      } else {
        fm[key] = value.replace(/^["']|["']$/g, "")
        currentKey = key
      }
    } else if (line.match(/^\s+-\s+/) && currentList !== null) {
      currentList.push(line.replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, ""))
    }
  }
  if (currentList && currentKey) fm[currentKey] = currentList

  return { frontmatter: fm, content: match[2] }
}

const collectMdFiles = async (dir: string): Promise<string[]> => {
  const results: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...await collectMdFiles(full))
    } else if (entry.isFile() && extname(entry.name) === ".md") {
      results.push(full)
    }
  }
  return results
}

const readWikiPage = async (path: string): Promise<WikiPage> => {
  const raw = await readFile(path, "utf-8")
  const { frontmatter, content } = parseFrontmatter(raw)
  return {
    path,
    relativePath: relative(WIKI_ROOT, path),
    name: basename(path, ".md"),
    frontmatter,
    content,
  }
}

const getAllPages = async (): Promise<WikiPage[]> => {
  const files = await collectMdFiles(WIKI_ROOT)
  return Promise.all(files.map(readWikiPage))
}

// --- MCP Server ---

const server = new McpServer({
  name: "nuclear-wiki",
  version: "1.0.0",
})

server.tool(
  "wiki_search",
  "Full-text search across wiki pages. Returns matching excerpts with page names and paths.",
  { query: z.string().describe("Search query — matches against page content and frontmatter") },
  async ({ query }) => {
    const pages = await getAllPages()
    const queryLower = query.toLowerCase()
    const matches = pages
      .filter(p => p.content.toLowerCase().includes(queryLower) || JSON.stringify(p.frontmatter).toLowerCase().includes(queryLower))
      .map(p => {
        const lines = p.content.split("\n")
        const matchingLines = lines
          .map((line, i) => ({ line, i }))
          .filter(({ line }) => line.toLowerCase().includes(queryLower))
          .slice(0, 3)
          .map(({ line, i }) => `  L${i + 1}: ${line.trim()}`)
        return `## [[${p.name}]] (${p.relativePath})\nType: ${p.frontmatter.type ?? "unknown"}\n${matchingLines.join("\n")}`
      })

    return {
      content: [{
        type: "text" as const,
        text: matches.length > 0
          ? `Found ${matches.length} pages matching "${query}":\n\n${matches.join("\n\n")}`
          : `No pages found matching "${query}".`,
      }],
    }
  }
)

server.tool(
  "wiki_read",
  "Read a specific wiki page by name (without .md extension) or relative path.",
  { page: z.string().describe("Page name (e.g. 'hallucination') or relative path (e.g. 'concepts/hallucination.md')") },
  async ({ page }) => {
    const pageName = page.replace(/\.md$/, "")
    const pages = await getAllPages()
    const found = pages.find(p => p.name === pageName || p.relativePath === page || p.relativePath === `${page}.md`)

    if (!found) {
      return { content: [{ type: "text" as const, text: `Page "${page}" not found. Use wiki_list to see available pages.` }] }
    }

    const raw = await readFile(found.path, "utf-8")
    return { content: [{ type: "text" as const, text: `# ${found.relativePath}\n\n${raw}` }] }
  }
)

server.tool(
  "wiki_write",
  "Create or update a wiki page. Content must include YAML frontmatter.",
  {
    page: z.string().describe("Relative path within wiki/ (e.g. 'concepts/new-concept.md')"),
    content: z.string().describe("Full page content including YAML frontmatter"),
  },
  async ({ page, content }) => {
    const targetPath = join(WIKI_ROOT, page)
    const { frontmatter } = parseFrontmatter(content)

    if (!frontmatter.title || !frontmatter.type) {
      return { content: [{ type: "text" as const, text: "Error: Page must have 'title' and 'type' in YAML frontmatter." }] }
    }

    const dir = join(targetPath, "..")
    await Bun.write(targetPath, content)

    // Append to log
    const logPath = join(WIKI_ROOT, "log.md")
    const logEntry = `\n- **WRITE** ${page} — ${frontmatter.title} (${new Date().toISOString().split("T")[0]})\n`
    const existingLog = await readFile(logPath, "utf-8").catch(() => "# Wiki Activity Log\n")
    await writeFile(logPath, existingLog + logEntry)

    return { content: [{ type: "text" as const, text: `Written: ${page} (${frontmatter.title})` }] }
  }
)

server.tool(
  "wiki_list",
  "List all wiki pages, optionally filtered by type.",
  { type: z.string().optional().describe("Filter by type: concept, entity, summary, comparison, scenario") },
  async ({ type }) => {
    const pages = await getAllPages()
    const filtered = type
      ? pages.filter(p => p.frontmatter.type === type)
      : pages

    const grouped: Record<string, string[]> = {}
    for (const p of filtered) {
      const t = (p.frontmatter.type as string) ?? "other"
      if (!grouped[t]) grouped[t] = []
      grouped[t].push(`  - [[${p.name}]] — ${p.frontmatter.title ?? p.name}`)
    }

    const output = Object.entries(grouped)
      .map(([t, items]) => `## ${t} (${items.length})\n${items.join("\n")}`)
      .join("\n\n")

    return {
      content: [{
        type: "text" as const,
        text: `Wiki pages${type ? ` (type: ${type})` : ""}: ${filtered.length} total\n\n${output}`,
      }],
    }
  }
)

server.tool(
  "wiki_lint",
  "Run health checks on the wiki: orphan pages, dead links, missing cross-references.",
  {},
  async () => {
    const pages = await getAllPages()
    const pageNames = new Set(pages.map(p => p.name))
    const issues: string[] = []

    // Dead link check
    for (const p of pages) {
      const wikilinks = p.content.match(/\[\[([^\]]+)\]\]/g) ?? []
      for (const link of wikilinks) {
        const target = link.replace(/\[\[|\]\]/g, "")
        if (!pageNames.has(target)) {
          issues.push(`DEAD LINK: [[${target}]] in ${p.relativePath}`)
        }
      }
    }

    // Orphan check (pages not linked from anywhere)
    const linkedPages = new Set<string>()
    for (const p of pages) {
      const wikilinks = p.content.match(/\[\[([^\]]+)\]\]/g) ?? []
      for (const link of wikilinks) {
        linkedPages.add(link.replace(/\[\[|\]\]/g, ""))
      }
    }
    const orphans = pages.filter(p => !linkedPages.has(p.name) && p.name !== "index" && p.name !== "log" && p.name !== "tags")
    for (const o of orphans) {
      issues.push(`ORPHAN: ${o.relativePath} — not linked from any other page`)
    }

    // Missing frontmatter
    for (const p of pages) {
      if (!p.frontmatter.title) issues.push(`MISSING TITLE: ${p.relativePath}`)
      if (!p.frontmatter.type && !["index", "log", "tags"].includes(p.name)) {
        issues.push(`MISSING TYPE: ${p.relativePath}`)
      }
    }

    const summary = issues.length > 0
      ? `Found ${issues.length} issues:\n\n${issues.join("\n")}`
      : "Wiki is healthy — no issues found."

    return { content: [{ type: "text" as const, text: summary }] }
  }
)

// --- Start ---

const transport = new StdioServerTransport()
await server.connect(transport)
