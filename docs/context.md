# TelcoOS Desktop - Development Context

*Last updated: March 11, 2026 (Native BTS Auth + Chat Streaming Fix)*

## Current Status

**ALL PHASES COMPLETE (1-38)** - App is production-ready.

**This Session:** Native BTS authentication with platform-native cookie extraction, chat streaming fix (accumulates text), and Skills modal detail view with natural language invocation.

## What's Been Built This Session

### Native BTS Authentication (Mar 11)
Platform-native cookie extraction for one-click BTS login:

- **macOS implementation** — Uses objc2/block2 for WKHTTPCookieStore access
- **Windows implementation** — Uses webview2-com for ICoreWebView2CookieManager
- **Per-service auth** — ARU, Arena (billing2), Superset with independent Connect buttons
- **Token support** — Superset uses guest token auth (JWT bearer), others use cookies
- **Manual fallback** — Advanced section with paste fields still available

**Files modified:**
- `src-tauri/Cargo.toml` — Added objc2, block2, objc2-web-kit (macOS), webview2-com, windows (Windows)
- `src-tauri/src/bts_auth.rs` — Native cookie extraction, multi-service support, auth types
- `src/components/SettingsPanel.tsx` — Per-service Connect buttons, token auth UI

### Chat Streaming Fix (Mar 11)
Fixed issue where assistant messages replaced each other instead of accumulating:

- **Root cause** — Claude CLI sends multiple `assistant` events during tool use
- **Fix** — Rust backend now accumulates text across assistant messages
- **Result** — Thinking text + tool results + final answer all display together

**Files modified:**
- `src-tauri/src/lib.rs` — Added `accumulated_text` variable, emit accumulated content

### Skills Modal Improvements (Mar 11)
Enhanced Available Skills modal with detail view and better messaging:

- **Detail view** — Click any skill to see full SKILL.md content rendered as markdown
- **Back navigation** — Arrow button to return to skill list
- **Natural language messaging** — Changed from "/command" style to "Just ask Claude"
- **Pro tip updated** — Explains natural language invocation

**Files modified:**
- `src/components/CommandsModal.tsx` — Detail view, ReactMarkdown rendering, new messaging

## Previous Sessions (Recent)

### Hide Embedded Terminal (Mar 11)
Removed terminal tray from the main UI (backend preserved for re-enablement).

### Multi-Service BTS Cookie Storage (Mar 10)
Each BTS service now has independent authentication:

- **Per-service cookies** — ARU and Billing2 each store cookies separately
- **Rust backend updates** — All `bts_auth_*` commands now accept `service_id` parameter
- **Settings UI** — Integrations panel shows separate cards for each service

### Skills System Migration (Mar 10)
Complete migration from legacy commands to modern skills architecture:

- **Commands → Skills** — Converted 7 commands (carrier, comparedecks, fillform, newdeal, report, sd-analysis, website) to skills with YAML frontmatter
- **Scripts reorganization** — Moved all Python scripts from `Scripts/` into respective skill folders
- **Shared scripts** — Created `_shared/scripts/` for utilities used by multiple skills
- **skill-creator bundled** — Added Anthropic's skill-creator meta-skill for creating new skills
- **skills-guide.md** — Added comprehensive skills guide to `.claude/docs/`
- **CLAUDE.md updated** — Removed Scripts/ and commands/ references, unified skills table
- **Production migration** — Successfully synced production system using single handoff document

**Folder changes:**
- Deleted: `.claude/commands/` (all converted to skills)
- Deleted: `Scripts/` (all moved to skill folders)
- Added: 7 new skill folders (carrier, comparedecks, fillform, newdeal, report, sd-analysis, website)
- Added: `.claude/docs/skills-guide.md`
- Added: `_shared/scripts/` with 5 shared utilities

## Previous Sessions (Recent)

### Concurrent Chat Streams Fix + Multi-LLM Wizard (Mar 2)
- Fixed concurrent chat streaming bug (per-stream listener maps)
- Multi-LLM Setup Wizard with Claude/OpenAI provider selection
- Role-based templates for Sales, Operations, Analyst, Admin
- AnimatePresence and chat streaming hang fixes

### Kanban Board (Feb 24)
Full deals pipeline board with drag-and-drop stage management:

- **KanbanBoard component** — Main board view replacing chat panel when open
- **KanbanColumn component** — Stage columns (Lead, Contacted, Qualified, etc.)
- **KanbanCard component** — Individual deal cards with drag-and-drop
- **AddNoteModal** — Add notes to deals from the board
- **kanbanStore** — Zustand store for board state management
- **kanbanService** — Service layer for deal data operations
- **Header integration** — Kanban toggle button with active state highlighting
- **Keyboard shortcut** — Cmd+P to toggle Kanban view
- **Escape to close** — Press Escape to return to chat view

## Previous Sessions (Summary)

### Streaming Chat Upgrade (Feb 4-5)
- Real-time streaming with `--output-format stream-json`
- Native session memory via `--resume SESSION_ID`
- Event-based architecture for streaming UI

### macOS Hidden Folder Fix (Feb 5)
- Auto-unhide data directory on startup
- Fixes AirDrop quarantine issues

### PDF Annotation Persistence (Feb 5)
- Fixed annotations lost on tab switch

### fs:scope Fix (Jan 28)
- Expanded Tauri fs:scope to allow any `$HOME/**` path

### UI Polish Session (Jan 24)
- Tray-based layout improvements
- CodeViewer for Python and other code files
- HTML window viewer with copy filename
- File viewer fullscreen mode

### File Search Session (Jan 13)
- Fuzzy search in Explorer panel
- Folder navigation from search results

### Services Config Session (Jan 13)
- Configurable services/workflows in Settings
- JSON viewer with syntax highlighting
- Hidden files toggle, Inbox delete

### Earlier Sessions
- Core layout, file tree, viewers
- Chat with Claude Code CLI
- Data inbox wizard, proactive assistant
- Settings panel, import/export
- Rolling chat summarization, image attachments
- Embedded PTY terminal with xterm.js

## Data Directory

**Production:** `~/Documents/TelcoOS/` (or user-chosen location)
**Development:** Uses `data-template/` from project root

## Folder Structure

```
TelcoOS/
├── CLAUDE.md               # Business context + skills docs (PROTECTED)
├── company-info.md         # Company data for /fillform (PROTECTED)
├── Carriers/               # Carrier folders (PROTECTED root)
├── Deals/                  # Deal tracking (PROTECTED root)
├── Todos/                  # Task management (PROTECTED root)
├── Data/                   # Aggregate data storage (PROTECTED root)
│   ├── billing/in|out/
│   └── routing/in|out/
├── Inbox/                  # File drop zone (PROTECTED root)
├── Templates/              # Document templates (PROTECTED root)
├── .chats/                 # Chat persistence (PROTECTED root)
├── .claude/                # Claude configuration (PROTECTED root)
│   ├── skills/             # 18 skills with bundled scripts
│   │   ├── _shared/        # Shared knowledge + scripts/
│   │   ├── ingest/         # /ingest + scripts
│   │   ├── ratedeck/       # /ratedeck + scripts
│   │   ├── skill-creator/  # Meta-skill for creating skills
│   │   └── ...             # 15 more skills
│   ├── docs/               # Reference docs (skills-guide.md)
│   └── agents/             # Subagent definitions
├── .telcoos/               # App config (PROTECTED root)
│   ├── file-types.json     # Custom file types
│   └── services.json       # Custom services/workflows
```

## Commands

```bash
# Development
npm run tauri dev

# Build for production
npm run tauri build

# Output: src-tauri/target/release/bundle/dmg/TelcoOS_0.1.0_aarch64.dmg

# If dependencies break
rm -rf node_modules && npm install
cd src-tauri && cargo clean
```

## Important Files

| File | Purpose |
|------|---------|
| `context.md` | This file - session handoff |
| `src/components/Layout.tsx` | Main layout with trays |
| `src/components/ChatPanel.tsx` | Streaming chat with Claude CLI |
| `src/components/KanbanBoard.tsx` | Deals pipeline board |
| `src/components/Terminal.tsx` | Embedded PTY terminal |
| `src/stores/kanbanStore.ts` | Kanban board state management |
| `src/stores/chatStore.ts` | Chat sessions with claudeSessionId |
| `src/stores/settingsStore.ts` | User settings incl. role and LLM provider |
| `src/services/llmProvider.ts` | LLM provider abstraction layer |
| `src/components/SetupWizard/` | Wizard step components (role, provider, auth) |
| `src-tauri/src/lib.rs` | Rust backend (32+ commands incl. streaming) |

## To Resume Development

1. Read this file (`context.md`) and `CLAUDE.md`
2. Run `npm run tauri dev` to start the app
3. **Current state**: App is production-ready, all 32 phases complete

**To build production DMG (with BTS features):**
```bash
npx --package @tauri-apps/cli -- tauri build --features bts-direct
# Output: src-tauri/target/release/bundle/dmg/TelcoOS_0.1.0_aarch64.dmg
```

**To build without BTS features:**
```bash
npm run tauri build
```

## What's Next

**Production ready** - TelcoOS Desktop is feature-complete.

**Recent additions:**
- Native BTS auth (Phase 36) - One-click login with platform-native cookie extraction
- Chat streaming fix (Phase 37) - Text accumulates across assistant messages
- Skills modal detail view (Phase 38) - Click to expand, natural language messaging
- Multi-service BTS auth (Phase 34) - ARU, Arena, Superset with independent auth
- Skills system migration (Phase 33) - all commands now skills with bundled scripts
- Multi-LLM support with Claude/OpenAI provider selection (Phase 32)

**Skills available (18 total):**
- Just describe what you want - Claude understands your intent
- Core: ingest, ratedeck, lcrreport, sync, pullrates, auditdecks
- Reports: report, reportemail, trafficdecline, website, sd-analysis
- Utilities: carrier, comparedecks, fillform, newdeal, lcgscrape
- Meta: skill-creator (create new skills)

**Future enhancements (if needed):**
- PDF auto-fill feature (plan exists)
- Python script execution UI
- Windows build testing (BTS auth needs testing)
- Email generation UI
- Chart dashboard for traffic visualization
- Error retry/backoff for API 500s

**Separate project:**
- LinkedIn integration as standalone app (Chrome extension code at `../telcoos-linkedin-extension/`)
