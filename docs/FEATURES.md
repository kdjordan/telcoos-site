# TelcoOS Desktop - Feature Summary

*Comprehensive overview for landing page development*

---

## What is TelcoOS?

TelcoOS is a native desktop application that unifies telecom carrier operations into a single interface. It replaces the fragmented workflow of multiple tools (terminal, file explorer, note-taking apps, spreadsheets) with an integrated environment powered by AI.

**Target Users:** Telecom operations teams managing carrier relationships, rate decks, traffic analysis, deal pipelines, and billing.

**Platforms:** macOS (primary), Windows, Linux (AppImage)

---

## Core Value Proposition

### Before TelcoOS
- 3+ windows open: Terminal for CLI, Obsidian for notes, Finder for files
- CSV rate decks invisible in markdown editors
- PDF contracts require separate viewer
- Manual copy-paste for form filling
- No unified view of deal pipeline
- Context-switching kills productivity

### With TelcoOS
- One window for everything
- AI assistant with full file access
- Visual viewers for all telecom file types
- Drag-and-drop data ingestion
- Kanban board for deal tracking
- Embedded terminal when needed

---

## Feature Categories

### 1. AI-Powered Chat Interface

**Claude Code Integration**
- Natural language interaction - no commands to memorize
- Full access to your data directory
- Can read, analyze, and modify files
- Streaming responses with real-time token display
- Session memory via `--resume` (conversation continuity)
- Cancel mid-response with Stop button

**18 Built-in Skills**
Users can invoke specialized workflows by just describing what they need:

| Category | Skills |
|----------|--------|
| Data Ingestion | ingest, sync, pullrates |
| Rate Analysis | ratedeck, comparedecks, auditdecks, lcrreport |
| Reporting | report, reportemail, trafficdecline, sd-analysis |
| Carrier Ops | carrier, website |
| Deal Management | newdeal, fillform |
| Utilities | lcgscrape, skill-creator |

**Chat Features**
- Multiple chat sessions with rename support
- Image attachments (drag-drop, paste, or select)
- Click-to-expand image previews
- Personalized greetings based on time of day
- 5 response tones: Professional, Casual, Concise, Detailed, Pirate
- Language preference: Auto, English, Spanish

---

### 2. File Management

**Unified File Tree**
- Browse entire data directory
- Create, rename, delete files and folders
- Protection system for critical paths (prevents accidental deletion)
- Hidden files toggle (show/hide dot files)
- Fuzzy search across all files

**Smart File Viewers**
| File Type | Viewer | Features |
|-----------|--------|----------|
| Markdown (.md) | Milkdown WYSIWYG | Click-to-edit, live preview, tables |
| CSV (.csv) | TanStack Table | Sort, filter, search columns |
| PDF (.pdf) | PDF.js | Annotations, zoom, multi-page |
| Images | Custom viewer | Zoom, pan, lightbox |
| Word (.doc/.docx) | mammoth.js | Read-only rendering |
| Excel (.xls/.xlsx) | SheetJS | Sheet tabs, cell formatting |
| JSON (.json) | Syntax highlighter | Color-coded tokens |
| Code (.py, .js, etc.) | CodeViewer | Syntax highlighting |
| HTML (.html) | Window viewer | Rendered preview |

**Tabbed Interface**
- Multiple files open simultaneously
- Cmd+W to close tabs
- Tab persistence across sessions
- Click tab to switch, drag to reorder

---

### 3. Data Inbox & Classification

**The Problem Solved**
Telecom operations involve many file types: rate decks, billing reports, CDRs, routing snapshots, carrier documents. Knowing where to put each file and how to name it consistently is tedious.

**3-Step Classification Wizard**
1. **Select File Type** - 7 built-in types with auto-detection + custom types
2. **Enter Details** - Direction (in/out), carrier, service, date range
3. **Confirm** - See generated filename and destination, execute

**Built-in File Types**
| Type | Action | Destination |
|------|--------|-------------|
| Routing | DELETE | Aggregated to master data |
| Billing | DELETE | Aggregated to master data |
| NPA Margins | DELETE | Aggregated to master data |
| Provider Report | DELETE | Aggregated to master data |
| Customer Report | DELETE | Aggregated to master data |
| CDR | MOVE | Carriers/{carrier}/routing-reports/ |
| Rate Deck | MOVE | Carriers/{carrier}/rate-decks/ |

**Custom File Types**
- Define your own file types in Settings
- Configure action (delete vs move), destination template, required fields
- Pattern keywords for auto-detection
- Persisted to `.telcoos/file-types.json`

**Drag-and-Drop**
- Drop files into Inbox folder
- Visual drop zone indicator
- Batch processing support

---

### 4. Kanban Deal Pipeline

**Visual Deal Tracking**
- 7 stage columns: Lead → Contacted → Qualified → Proposal → Negotiation → Closed Won/Lost
- Drag-and-drop cards between stages
- Updates deal markdown file on disk
- Stage statistics in header

**Card Features**
- Click to open deal file in viewer
- Right-click context menu for quick actions
- Add notes directly from board
- Visual indicators for deal status

**Keyboard Shortcuts**
- `Cmd+P` to toggle Kanban view
- `Escape` to close and return to chat
- Refresh button to reload from disk

---

### 5. Proactive Assistant

**Contextual Notifications**
The app doesn't just wait for commands - it surfaces information you need:

- **Morning greeting** with personalized message
- **Data freshness alerts** - "Your routing data is 2 days old"
- **Stale follow-up reminders** - Deals with no activity
- **Weekly summaries** (Mondays)

**Time-Aware Icons**
- Sun icon for morning
- Sunset icon for afternoon
- Moon icon for evening

---

### 6. Embedded Terminal

**Full PTY Shell**
- Real zsh session with login profile
- Runs in data directory context
- Collapsible drawer at bottom of window

**What Works**
- Interactive programs: vim, less, htop, nano
- Tab completion
- Ctrl+C signal handling
- Proper terminal dimensions (resize)
- Copy/paste (system clipboard)
- Clickable URLs
- Theme-aware colors (light/dark)

**UX**
- Click header to expand/collapse
- `Cmd+`` keyboard shortcut
- Resizable height with drag handle
- Session persists when collapsed

---

### 7. Settings & Customization

**Full-Page Settings Panel** (`Cmd+,`)

| Section | Options |
|---------|---------|
| Profile | User name for personalized greetings |
| Appearance | Theme (Light/Dark/System) |
| Claude Code | Tone preference, language, CLI status |
| Services | Custom workflows and commands |
| File Types | Configure data inbox classification |
| Data | Import/export .telcoos archives, directory management |
| Security | Privacy architecture, data flow info |
| App Settings | Tab persistence, keyboard shortcuts |
| About | Version, links |

**Configurable Services**
- Add your own slash commands
- Edit command name, description, usage, examples
- Organize into categories with icons
- Persisted to `.telcoos/services.json`

---

### 8. Data Import/Export

**Archive Format**
- `.telcoos` files (ZIP with manifest.json)
- Portable across machines
- Excludes sensitive folders (.git, .obsidian)

**Export**
- Settings → Data → Export
- Creates timestamped archive
- Includes: Carriers, Deals, Todos, Templates, Scripts, Config

**Import**
- Settings → Data → Import
- Select .telcoos file
- Extracts to data directory
- Preserves folder structure

**Legacy Migration**
- `tools/export_telcoos.py` for Obsidian vault export
- One-time migration path from markdown-based system

---

### 9. Charts & Email

**Chart.js Integration**
- Bar, Pie, Line, Doughnut charts
- Consistent dark theme styling
- Embeddable in any view

**Email Templates**
- React-email components for professional HTML emails
- Templates: TrafficDecreaseEmail, CustomerCheckInEmail, RateDeckDeliveryEmail
- Chart-to-image conversion for email embedding
- Copy to clipboard for pasting into email client

---

### 10. BTS Service Integration

**Native Authentication**
For organizations using BTS services (ARU, Arena/Billing2, Superset):

- One-click login with platform-native cookie extraction
- Per-service independent authentication
- macOS: objc2/WKHTTPCookieStore
- Windows: webview2-com/ICoreWebView2CookieManager
- Manual fallback with paste fields

---

## Technical Details

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Tauri 2.0 |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Fonts | Unbounded (brand) + Inter (UI) |
| Editor | Milkdown (WYSIWYG markdown) |
| Animations | Framer Motion |
| State | Zustand |
| Tables | TanStack Table |
| PDF | PDF.js |
| Terminal | xterm.js + portable-pty |
| AI | Claude Code CLI |

### Data Architecture

**Philosophy**
- Data lives in readable files, not a database
- Markdown + CSV = version-controllable, portable, future-proof
- Claude reads/writes the same files humans edit
- No schema migrations, no sync issues

**Folder Structure**
```
TelcoOS/
├── CLAUDE.md           # Business context (protected)
├── company-info.md     # Company data (protected)
├── Carriers/           # Carrier folders
├── Deals/              # Deal tracking
├── Todos/              # Task management
├── Data/               # Aggregate data (billing, routing)
├── Inbox/              # File drop zone
├── Templates/          # Document templates
├── .chats/             # Chat session persistence
├── .claude/            # Skills, docs, agents
└── .telcoos/           # App config (file-types.json, services.json)
```

### Build Outputs

| Platform | Format | Size |
|----------|--------|------|
| macOS | DMG | ~43MB |
| Windows | MSI + EXE | ~40MB |
| Linux | AppImage + DEB | ~90MB |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+,` | Open Settings |
| `Cmd+K` | Focus chat input |
| `Cmd+\` | Toggle sidebar |
| `Cmd+`` | Toggle terminal |
| `Cmd+P` | Toggle Kanban board |
| `Cmd+W` | Close current tab |
| `Escape` | Close modal/Kanban |

---

## What Makes TelcoOS Different

1. **Industry-Specific** - Built for telecom operations, not generic project management
2. **AI-Native** - Claude isn't bolted on; it's the primary interface
3. **File-First** - Your data stays in readable files you control
4. **Unified** - One app replaces 5+ tools
5. **Proactive** - The app tells you what needs attention
6. **Customizable** - Define your own file types, services, workflows
7. **Local-First** - Data stays on your machine, no cloud dependency
8. **Cross-Platform** - macOS, Windows, Linux support

---

## Landing Page Sections (Suggested)

1. **Hero** - "Your Telecom Operations, Unified" + screenshot
2. **Problem** - The 5-window workflow chaos
3. **Solution** - One intelligent interface
4. **Features Grid** - Icons + short descriptions
5. **AI Capabilities** - What Claude can do for you
6. **File Viewers** - Visual showcase of supported formats
7. **Kanban** - Deal pipeline screenshot
8. **Testimonial/Use Case** - Real workflow example
9. **Technical** - Stack, security, data ownership
10. **Download** - macOS, Windows, Linux buttons
11. **Pricing** - (if applicable)
12. **Footer** - Links, support, company

---

## Copy Snippets for Landing Page

**Tagline Options:**
- "Your Telecom Operations, Unified"
- "One App. Every Carrier. Total Control."
- "AI-Powered Telecom Operations"
- "Stop Juggling Windows. Start Closing Deals."

**One-Liner:**
TelcoOS is a native desktop app that unifies carrier management, rate analysis, deal tracking, and AI assistance into a single intelligent interface.

**Elevator Pitch:**
Telecom operations teams juggle terminals, spreadsheets, file explorers, and note-taking apps all day. TelcoOS consolidates everything into one window with an AI assistant that understands your business. View rate decks, analyze traffic, track deals, and manage carriers - all without switching contexts. Your data stays in readable files you control, with Claude Code handling the heavy lifting.
