# Building TelcoOS with Claude Code + Obsidian

*Development journal for a markdown-based telecom operations system*

---

## Purpose of This Document

This file serves as a **development journal and tutorial source**. It documents:

1. **What** we built at each stage
2. **Why** we made specific design decisions
3. **How** the pieces fit together
4. **Problems** we encounteCarrier 39 and how we solved them

Use this document to:
- Write tutorials on building AI-assisted workflow tools
- Onboard new team members to the system
- Remember context when revisiting features months later
- Extract patterns for similar projects

The Session Log at the bottom provides a chronological record. The Phase sections above it provide narrative context explaining the reasoning behind each feature.

---

## The Problem

Running telecom carrier operations involves:
- Tracking deals through complex onboarding workflows
- Managing ongoing relationships with dozens of carriers
- Analyzing traffic performance and margins
- Generating and validating rate decks
- Coordinating follow-ups across multiple stakeholders

Traditional tools are:
- Expensive and over-engineeCarrier 39 for a small team
- Slow to customize for industry-specific workflows
- Disconnected from where actual work happens
- Siloed (CRM here, analytics there, rate management somewhere else)

We wanted an integrated system that lived in our daily workflow (Obsidian) and could be automated with AI assistance.

## The Approach

**Stack:**
- **Obsidian** - Markdown editor with live preview, checkboxes, and linking
- **Claude Code** - AI assistant with custom slash commands
- **Python/UV** - Analytics scripts for traffic, billing, and rate analysis
- **Plain markdown + CSV files** - Version-controllable, portable, future-proof

**Philosophy:**
- Data lives in readable files, not a database
- Claude reads/writes the same files humans edit
- Slash commands encode repeatable workflows
- Checkboxes provide visual progress tracking
- Scripts handle heavy data processing, Claude orchestrates

---

## Development Timeline

### Phase 1: Basic SCarrier 45cture (Sessions 1-5)

**Started with:** A folder of messy deal notes with no consistent format.

**Built:**
1. ExploCarrier 39 existing Deals folder to understand the data
2. Created `CLAUDE.md` as project documentation for Claude
3. Designed a consistent deal file sCarrier 45cture with Metadata, Forms, Provisioning sections
4. Created `/pipeline` command to review all deals and generate prioritized actions
5. Migrated 13 existing deals to the new format

**Key Decision:** Granular checkboxes for each form step (Requested → Completed → Signed → Filed) rather than just "Done/Not Done". This lets you see exactly where each form is stuck.

### Phase 2: Deal Lifecycle (Sessions 6-17)

**Problem:** Live interconnects needed different tracking than onboarding deals.

**Built:**
1. Added `Service Additions` section for existing interconnects adding new services
2. Created templates for Bilateral, Customer, and Provider deal types
3. Added 2026 FUSF Renewal tracking (annual tax forms) as separate section
4. Added "Signed by us" + "Returned to them" steps to MSA workflow
5. Created `/newdeal` command to generate deals from templates
6. Created `/status [carrier]` command for single-deal deep dives

**Key Decision:** Separate 2026 FUSF renewal from onboarding FUSF. Annual renewals are a different workflow than initial onboarding - mixing them created confusion.

### Phase 3: Form Filling Automation (Sessions 18-24)

**Problem:** Filling out carrier forms (KYC, FUSF) means copying the same company data repeatedly.

**Built:**
1. Created `company-info.md` as master data file for all company info
2. Created `/fillform [carrier] [type]` command
3. Made it read actual PDF forms from `INTX_DOCS/[Carrier]/` folder
4. Claude matches PDF field names to company data and outputs ready-to-copy values

**Key Decision:** Read the actual PDF rather than maintaining a list of form fields. Each carrier's form is slightly different - having Claude parse the PDF dynamically handles variations.

**Limitation discoveCarrier 39:** PDF form-filling automation (pdftk, pdf-lib) is possible but adds complexity. For now, Claude outputs data and humans paste it in.

### Phase 4: Traffic Analytics (Sessions 25-38)

**Problem:** No visibility into carrier performance metrics. Quality issues discoveCarrier 39 reactively.

**Built:**
1. Created `REPORTS/` folder sCarrier 45cture for incoming/outgoing traffic data
2. Set up Python/UV environment with matplotlib + pandas
3. Built `ingest_traffic.py` script to parse CSV exports and append to master files
4. Created `/ingest` command to batch-process new data files
5. Natural language chart generation ("Show Clearwater Voice ASR for all Carrier 45nks")

**Key Finding:** Identified 8 carriers with 65-96% no-circuit rates - a route/config problem that wasn't visible before.

**Output:** 5-page PDF traffic analysis, carrier investigation emails auto-generated.

### Phase 5: Todo System (Sessions 39-51)

**Problem:** Action items were scatteCarrier 39 - some in deal files, some in heads, some forgotten.

**Built:**
1. Created `Todos/` folder with daily files (`todos-YYYY-MM-DD.md`)
2. Created `/todos` command to view and consolidate active todos
3. Created `/todo add [description]` for manual todo entry
4. Added `/pipeline todos` to auto-generate todos from deal analysis
5. Workflow: Check items off in Obsidian, ask Claude to sync back to Deal files

**Key Decision:** Todos are standalone, not embedded in deal files. This allows:
- Non-deal todos (meetings, admin tasks)
- Priority grouping across all deals
- Easy daily review in one file

**Key Decision:** Date in parentheses `(YYYY-MM-DD)` is creation date, not due date. Old items that haven't moved are visually obvious.

### Phase 6: Carrier Relationship Management (Sessions 52-72)

**Problem:** Once deals go live, tracking shifts from "forms to complete" to "ongoing relationship management" - performance monitoring, rate negotiations, communications history. The Deals folder wasn't designed for this.

**Built:**
1. Created `Carriers/` folder sCarrier 45cture separate from `Deals/`
2. Carrier template with Profile, Contacts, Rate Decks, Performance, Communications sections
3. Created `/carrier` command for viewing status and generating reports
4. Built rate deck analysis tools (`rate_gap_analysis.py`, `compare_ratedecks.py`)
5. Built multi-carrier comparison tools (`compare_providers.py`, `compare_customers.py`)
6. Auto-populated 39 carrier folders from routing data with metadata

**Key Decision:** Separate `Deals/` (onboarding) from `Carriers/` (ongoing). Different lifecycles need different tracking:
- Deals: Linear progression (docs → provisioning → testing → live)
- Carriers: Continuous relationship (rates, performance, communications)

**Key Decision:** Auto-derive carrier metadata from actual traffic data:
- Type (bilateral/customer/provider) from IN/OUT Carrier 45nk presence
- Volume tier from actual minutes
- Carrier 45nk names from routing records

This ensures carrier files reflect reality, not manual entry that goes stale.

### Phase 7: Rate Deck Generation (Sessions 73-89)

**Problem:** Creating customer rate decks manually is tedious and error-prone. Need to:
1. Know which providers are actually routing each NPA
2. Look up those providers' rates at NPA/NXX granularity
3. Apply target margin
4. Preserve jurisdictional variation (inter/intra/indeterminate)

**First Attempt (v1):** Pure LCR approach - scan all provider rate decks, pick lowest cost for each route.

**Problem with v1:** Doesn't reflect reality. We don't always use the cheapest provider - ASR, capacity, relationships matter. Generated rates were "theoretical" not "actual".

**Second Attempt (v2):** Billing-based approach - use actual billing data to see which providers ARE routing each NPA, then look up those providers' rates.

**Built:**
1. `ingest_billing_report.py` - Ingest Carrier 45nk summary and NPA-level detail reports
2. `analyze_carrier_billing.py` - Carrier margin analysis with problem route detection
3. `generate_customer_deck_v2.py` - Billing-based rate deck generator
4. `RATE_DECK_GENERATION.md` - Algorithm documentation
5. `/ratedeck` command - Single command for ingest + generation

**Algorithm (v2):**
```
Billing Detail (NPA 201 routed via Carrier 37 with 500 mins)
       ↓
Select provider with highest volume per NPA
       ↓
Look up Carrier 37's rate deck (201-200, 201-201... with inter/intra/ind)
       ↓
Apply margin: sell_rate = cost_rate / (1 - margin/100)
       ↓
Output rate deck with proper jurisdictional variation
```

**Key Decision:** Provider selection by volume, not cost. The provider carrying the most minutes for an NPA is the one we should price against - that's where the traffic actually flows.

**Key Decision:** Document the algorithm in `RATE_DECK_GENERATION.md`. Rate deck generation involves business logic that will evolve. Having it documented means we can revisit and refine (add ASR weighting, cost caps, etc.) without reverse-engineering the code.

**Key Decision:** Create audit trail CSV alongside rate deck. Shows which provider was used for each NPA/NXX route, enabling validation and debugging.

**Lesson Learned:** Billing data has NPA granularity, rate decks have NPA/NXX granularity. First attempt tried to build NPA/NXX rates from NPA-only billing data - resulted in flattened rates with no variation. Solution: Use billing for provider selection, rate decks for actual rates.

### Phase 8: Data Ingestion Carrier 39esign (Sessions 101-102)

**Problem:** Data ingestion was painful. CSV files don't show in Obsidian, so uploading reports meant navigating a complex folder tree in a separate window to place files in the correct carrier subfolder. Each report type had a different destination, and it was easy to put files in the wrong place.

**Solution:** Single `data/` folder at project root as a drop zone. Files are named with a convention that tells the system what they are. `/ingest` scans the folder, parses filenames, routes to correct destinations, then deletes or moves files as appropriate.

**Built:**
1. Created `data/` folder as universal upload inbox
2. Defined naming conventions for 7 report types
3. Two categories: files that get aggregated (delete after) vs reference files (move to carrier folder)
4. Parser handles flexible date formats and spaces in carrier/service names
5. Updated `/ingest` command to process mixed batches of report types

**Key Decision:** Keep source system filenames when they're already descriptive. Global routing (`carrierReportsIncoming_*.csv`) and billing (`billing_in_*.csv`) files keep their names. Only rename reports with messy/generic names.

**Key Decision:** `providerReport` vs `customerReport` naming instead of `in`/`out` for clarity:
- `providerReport` = which providers handled this customer's inbound traffic
- `customerReport` = which customers' traffic this provider terminated

**Key Decision:** Delete transactional data after aggregation (routing, billing, margins, provider/customer reports). Preserve reference data that can't be aggregated (CDRs, rate decks) by moving to carrier folders.

**Report Types Defined:**

| Type | Convention | After Ingest |
|------|------------|--------------|
| Global routing | `carrierReportsIncoming_*.csv` / `carrierReportsOutgoing_*.csv` | Delete |
| Global billing | `billing_in_*.csv` / `billing_out_*.csv` (`-2` = agent 2) | Delete |
| NPA margins | `margin_[Carrier]_[in|out]_M-D-YYYY.csv` | Delete |
| Provider report | `providerReport_[Carrier]_[Service]_[Date(s)].csv` | Delete |
| Customer report | `customerReport_[Carrier]_[Service]_[Date(s)].csv` | Delete |
| CDR | `cdr_[Carrier]_[in|out]_[Service]_M-D-YYYY.csv` | Move |
| Rate deck | `rates_[Carrier]_[in|out]_[Service]_M-D-YYYY.csv` | Move |

---

## Architecture

### File Relationships

```
Human edits in Obsidian ←→ Claude reads/writes via commands
         ↓                           ↓
    Deal files               Action reports
    Todo files               Status reports
    company-info.md          Traffic charts
```

### Command Design Pattern

Each slash command follows a pattern:
1. **Read** relevant files (deals, todos, traffic data)
2. **Analyze** according to business rules
3. **Output** to appropriate location (file or console)

Commands are stoCarrier 39 in `.claude/commands/` as markdown files that Claude interprets.

### Why Markdown Files Work

- **Obsidian** renders checkboxes as clickable UI
- **Claude** reads/writes them as text
- **Git** can version control them (if desiCarrier 39)
- **Grep/search** works across all files
- **No database** means no schema migrations, no sync issues

---

## Key Design Decisions

### 1. Waiting On: us | them | both
Filtering by "us" instantly shows actionable items. Most deals are "waiting on them" - surfacing the few that need our action is the main value.

### 2. Blocker field
A single-line summary of what's stuck. Forces clarity about the actual obstacle.

### 3. Dated notes at bottom
Each deal has a Notes section with `YYYY-MM-DD:` entries. Creates a timeline you can scroll through.

### 4. Forms have multiple checkbox steps
Instead of: `- [ ] KYC Complete`
We use:
```
- [x] Requested
- [x] Completed
- [ ] Sent to Our Signatory for signature
- [ ] Returned signed
- [ ] Filed
```
This shows exactly where the bottleneck is.

### 5. Templates by deal type
Bilateral deals have KYC/FUSF for BOTH sides. Customer deals only have "Theirs" sections. Templates prevent including irrelevant checkboxes.

---

## What Worked Well

1. **Obsidian as UI** - Live checkbox clicking is satisfying and fast
2. **Claude for batch operations** - Updating 18 deal files with a new field takes seconds
3. **Plain text portability** - Can edit on phone, search with grep, backup easily
4. **Slash commands** - Encode complex workflows in reusable prompts
5. **Traffic reports** - Surfaced quality issues that weren't visible before

## What Could Be Better

1. **PDF form filling** - Still copy-pasting; auto-fill would save time
2. **CRM sync** - Still manually updating the actual CRM separately
3. **Email integration** - Would be nice to auto-log emails to deal notes
4. **Mobile workflow** - Obsidian mobile works but slash commands don't

---

## Future Ideas

- [ ] Explore PDF form-filling automation (pdftk, pdf-lib)
- [ ] Add deal value/size tracking for revenue forecasting
- [ ] Add expected close date for pipeline projections
- [ ] Hourly traffic data for peak-hour analysis
- [ ] Auto-generate weekly summary reports

---

## Session Log

Chronological record of what was built each session:

1. ExploCarrier 39 Deals folder sCarrier 45cture
2. Created CLAUDE.md with project context
3. Created `/pipeline` command and Action folder
4. Carrier 39esigned deal file sCarrier 45cture with granular checkboxes
5. Migrated 13 original deals to new format
6. Added 2026 FUSF Renewal tracking to all files
7. Added Service Additions section for live interconnects
8. Created Pinnacle Networks, Carrier 34 as live interconnects
9. ResCarrier 45ctuCarrier 39 Carrier 37 and Clearwater Voice with service additions
10. Added Account/Opportunity in CRM checkbox to Provisioning
11. Created Mountain Mobile and Coastal Carrier deals
12. Created `/newdeal` command
13. Created `/status` command and Status folder
14. Created process.md context file
15. Added Summit Tel as live customer interconnect
16. Added "Signed by us" + "Returned to them" to MSA workflow
17. Added Email field to Metadata (all templates + deals)
18. Created `company-info.md` with company master data
19. Created `/fillform` command for KYC and FUSF form filling
20. Updated `/fillform` to read actual PDF forms
21. Added contacts: Admin, Rates, Technical emails
22. Updated signatory to [Signatory Name] ([Title])
23. Added RMD Number and compliance info from Robocall Mitigation Plan
24. Created `/rundown` command for daily activity summaries
25. Built Traffic Reports system in REPORTS folder
26. Set up Python/UV environment with matplotlib + pandas
27. Created ingest_traffic.py script for CSV parsing
28. ConfiguCarrier 39 incoming/outgoing traffic data sCarrier 45cture
29. Ingested first day of traffic data
30. Audited data folders, fixed misplaced file
31. Completed full data backfill (36 days both directions)
32. Analyzed traffic patterns for anomalies
33. Identified 8 carriers with high no-circuit rates
34. Created 5-page PDF traffic analysis report
35. Deep-dived into no-circuit root causes
36. Generated 8 carrier investigation emails
37. Updated traffic data coverage
38. Created Carrier 36 performance report
39. Built Todo system - standalone task tracking
40. Created `/todos` command
41. Created `/todo add` command
42. Updated `/pipeline` to support `todos` argument
43. Created `Todos/` folder
44. Ran `/pipeline todos` - generated initial todos
45. Updated Atlas Communications deal with received docs
46. Used `/fillform` for Carrier 33 forms
47. Added manual todos via `/todo add`
48. Synced completed todos back to Deal files
49. Ran `/pipeline` to generate action report
50. 2026 FUSF campaign execution
51. ResCarrier 45ctuCarrier 39 process.md as development narrative
52. Ingested traffic data for 2026-01-06 and 2026-01-07
53. Generated Valley Voice routing + billing reports (38-day analysis)
54. Designed Carrier Relationship Management system
55. Created `Carriers/` folder sCarrier 45cture with templates
56. Created Valley Voice carrier file with performance data
57. Created `/carrier` command for carrier management
58. Documented Carriers system in CLAUDE.md
59. Analyzed Valley Voice rate decks (CV vs SD Carrier 45nks)
60. DiscoveCarrier 39 CV Carrier 45nk underwater (84% losing), SD profitable (86% making money)
61. Created rate gap PDF reports for CV and SD Carrier 45nks
62. Built `rate_gap_analysis.py` script for comparing our rates vs their rates
63. Built `compare_ratedecks.py` script for tracking rate changes over time
64. Created Rate Gap Report Guide documentation
65. Built `compare_providers.py` for multi-carrier provider comparison (best rate by route)
66. Built `compare_customers.py` for multi-carrier customer comparison (pricing consistency)
67. Created 27 carrier folders with internal sCarrier 45cture (rate-decks, reports, routing-snapshots)
68. Populated carrier Carrier 45nks metadata from routing data (full Carrier 45nk names)
69. Auto-derived carrier Type (bilateral/customer/provider) from IN/OUT Carrier 45nk presence
70. Populated Volume Tier (high/medium/low) based on 38-day traffic minutes
71. Created 11 missing carrier folders from routing data (Carrier 44, Carrier 53, Sunrise Communications, etc.)
72. Total carriers now 39 with complete metadata
73. Evaluated Sample Data billing reports (Custom Report + Detail Report)
74. Built `ingest_billing_report.py` for summary and detail billing reports
75. Built `analyze_carrier_billing.py` for carrier-level margin analysis
76. Created billing-data folder sCarrier 45cture in Carriers/
77. Tested with Carrier 38: identified 7.2% margin, problem routes, routing optimization opportunities
78. Documented Carrier Billing Analysis system in CLAUDE.md
79. Built `generate_customer_deck.py` (v1) - pure LCR approach scanning all provider rate decks for lowest cost per route
80. User tested v1 output, noticed all inter/intra/ind rates were identical with large blocks sharing same rates - not the variation expected from real rate decks
81. Diagnosed issue: billing data only has NPA granularity, v1 was averaging rates at NPA level instead of preserving NPA/NXX variation
82. Designed v2 algorithm: use billing data ONLY for provider selection (who routes each NPA), then look up that provider's actual rate deck for NPA/NXX rates
83. Created `RATE_DECK_GENERATION.md` - full algorithm documentation with rationale, future enhancements section, revision history
84. Built `generate_customer_deck_v2.py` implementing billing-based approach with fallback handling for missing providers
85. Tested with Carrier 38 SD: 169K routes, 835 unique inter rates (vs ~323 in v1), 62K routes where inter≠intra (vs 0 in v1)
86. Key insight: billing tells us WHERE traffic goes, rate decks tell us HOW MUCH it costs - combining both gives accurate pricing
87. Created `/ratedeck` command to combine billing ingest + rate deck generation in single workflow
88. Documented command in `.claude/commands/ratedeck.md` with full usage examples and algorithm summary
89. Added `/ratedeck` to `commands.md` quick reference with output locations
90. Renamed project from "Sales Pipeline Tracker" to "TelcoOS" - reflects evolution to full telecom operations system
91. Updated branding in process.md, CLAUDE.md, commands.md
92. Created `future.md` - company-wide vision document for CRO/CTO presentation
93. Documented architecture: Hetzner hosting, department sandboxes, web chat interface, role-based permissions
94. Added "Cross-Functional Intelligence" section - the key insight that unified data + AI enables pattern discovery across silos
95. Removed detailed technical implementation (demo speaks louder than proposals)
96. Added "Capability Evolution: Read → Recommend → Act" - roadmap from read-only to supervised to autonomous operations
97. Renamed project folder from `pipeline/` to `TelcoOS/`
98. Fixed SkCarrier 55 → Carrier 42 carrier naming
99. Audited rate deck coverage against routing Carrier 45nks (50% incoming, 65% outgoing by Carrier 45nk count)
100. Created `context.md` - session startup file for continuity between chats
101. Carrier 39esigned data ingestion system - single `data/` folder as upload inbox
102. Defined naming conventions for 7 report types (routing, billing, margin, providerReport, customerReport, CDR, rates)
103. Built unified `ingest.py` script with pattern matching, handlers for all report types
104. Tested ingestion with 9 files: routing, billing, margins, provider reports
105. Updated `/ingest` command and `commands.md` with file naming reference

---

## Phase 9: Desktop Application (Sessions 106+)

**January 10, 2026 - The Big Pivot**

After 105 sessions building TelcoOS in Obsidian, we hit a wall. The system worked, but the user experience had friction:

1. **Three windows required**: Obsidian for notes, terminal for Claude Code, Finder for file management
2. **CSV blindness**: Obsidian doesn't render CSVs - rate decks and traffic data were invisible
3. **PDF limitation**: Couldn't view PDFs inline without plugins
4. **No unified chat**: Claude Code CLI output was in terminal, separate from the data
5. **Mobile dead end**: Obsidian mobile works, but Claude Code commands don't

**The Question**: What if we built a native desktop app that unified everything?

### The Decision: Tauri + React

Evaluated options:
- **Electron**: Heavy, ships Chromium (~150MB), memory hog
- **Tauri**: Rust backend, native webview, ~10MB binary, fast
- **Flutter**: Cross-platform but less web ecosystem integration
- **Native Swift/Kotlin**: Fast but platform-specific, no code sharing

**Chose Tauri because:**
1. Uses system webview (no bundled browser)
2. Rust backend can call Claude Code CLI directly
3. React frontend means we can use existing JS libraries
4. Small binary size matters for distribution
5. Strong security model with permission system

### Architecture Decisions

**Frontend Stack:**
- React + TypeScript (type safety, component model)
- Tailwind CSS (utility-first, fast iteration)
- shadcn/ui (polished components, not a heavy framework)
- Milkdown (WYSIWYG markdown - users click to edit rendered content)
- TanStack Table (sortable/filterable data grids for CSVs)
- PDF.js (Mozilla's PDF renderer)
- Framer Motion (smooth animations for premium feel)

**Backend Stack:**
- Tauri 2.0 (Rust process management, file system access)
- Direct Claude Code CLI integration (spawn process, pipe stdin/stdout)

**Key Design Principle**: Keep data in the same markdown/CSV files. The desktop app is a better UI for the same underlying system. Users can still edit files in any text editor if needed.

### Build Timeline (Single Day)

Built the entire application in one intensive session with Claude Code:

#### Commit 1: Initial Scaffold (12:19)
```
b039a50 - Initial scaffold with Phase 1 layout complete
```
- Tauri + React + TypeScript scaffold
- Resizable three-panel layout (sidebar, chat, viewer)
- Tailwind CSS configured
- Added dependencies: Monaco, TanStack Table, PDF.js, mammoth, xlsx

**Decision**: Start with the layout. Get the three-panel structure right first, then fill in functionality.

#### Commit 2: Context Command (12:21)
```
46434f4 - Add /context command for session handoff
```
- Custom slash command to read context.md and CLAUDE.md
- Enables quick session resumption across chat windows

**Decision**: Build our own tooling into the development process. The `/context` command became essential for maintaining continuity.

#### Commit 3: File Tree + Viewers (12:39)
```
5329c98 - Add FileTree and viewer components (Chunk 1 progress)
```
- FileTree component with Tauri fs integration
- MarkdownViewer, CsvViewer, PdfViewer, ImageViewer
- Wired up file selection to layout

**Decision**: Get file browsing working early. The whole app revolves around navigating and viewing files.

#### Commit 4: Progress Update (12:42)
```
53f6ebc - Update context.md with current progress
```
- Documented Chunk 1 completion
- Added ralph-wiggum dev loop reference

**Decision**: Document as we go. The context.md file prevents losing progress between sessions.

#### Commit 5: Data Inbox + Chat (17:41)
```
d505c0e - Enhance Data Inbox and Chat Functionality
```
- 3-step file classification wizard
- Custom file types with persistence
- Chat session management (create, select, delete)
- Lucide icons throughout

**Key Decision**: The data inbox wizard. Instead of memorizing naming conventions, users select file type from a menu, fill in details, and the app generates the correct filename and destination. This was the main UX improvement over the CLI workflow.

#### Commit 6: Proactive Assistant (18:26)
```
af3c846 - Implement Proactive Assistant and UI Enhancements
```
- Contextual greetings based on time of day
- Data freshness alerts ("Your routing data is 2 days old")
- Stale follow-up reminders
- shadcn/ui component integration

**Key Decision**: Make the app proactive, not just reactive. Surface information users need before they ask for it.

#### Commit 7: Office Viewers + Tabs (18:56)
```
f271ced - Complete Phases 10-11: Office Viewers and File Tabs
```
- Word viewer (mammoth.js for .doc/.docx)
- Excel viewer (SheetJS for .xls/.xlsx)
- Tabbed interface for multiple open files
- Keyboard shortcuts (Cmd+W to close tab)

**Decision**: Support the actual file types in telecom workflows. Carrier contracts come as Word docs, rate decks as Excel files.

#### Commit 8: Settings + Polish (19:09)
```
da45ff8 - Complete Phase 12: Settings & Polish
```
- Settings store with theme (light/dark/system)
- Tab persistence across sessions
- Keyboard shortcuts: Cmd+,, Cmd+K, Cmd+\
- Drag & drop files to Data Inbox

**Decision**: Dark mode is non-negotiable for a professional tool. Also added drag & drop because clicking through dialogs is slow.

#### Commit 9: Session Management Refactor (19:22)
```
559ad80 - Refactor ChatPanel and Sidebar for Enhanced Session Management
```
- Lifted chat store management to layout level
- Users can create, select, delete chat sessions from sidebar
- Personalized greetings using stored username

**Technical Decision**: State management refactor. Moving chat state up allowed the sidebar to control sessions while ChatPanel focused on display.

#### Commit 10: Full-Page Settings (19:26)
```
09e95b1 - Enhance UI with Redesigned Sidebar and Full-Page Settings
```
- Collapsible sidebar with Chat/Files tabs
- Full-page settings panel with section navigation
- User profile, appearance, Claude Code settings sections

**UX Decision**: Settings deserve their own full-page panel, not a cramped modal. Users will spend time configuring the app.

#### Commit 11: Animations (19:49)
```
ac0c308 - Add Framer Motion animations for premium UX feel
```
- Spring-based animations on all interactions
- Staggered list animations
- Smooth panel transitions
- Message bubble entrance effects

**Decision**: Animations aren't just polish - they provide feedback. A message appearing with a spring animation feels like the app is responding. Static changes feel broken.

#### Commit 12: WYSIWYG Editor (20:21)
```
fc65a05 - Replace markdown editor with Milkdown WYSIWYG editor
```
- Switched from Monaco split-view to Milkdown WYSIWYG
- Click directly into rendered content to edit
- Tables editable in place
- Renamed "Claude Code" to "TelcoOS Chat"

**Key Decision**: WYSIWYG over split-view. Users shouldn't have to context-switch between "edit mode" and "preview mode". Click where you want to type, type, done. This is how Notion works and it's superior for note-taking.

#### Commit 13: Tone + Language Settings (21:41)
```
b45198d - Add chat tone modes (including Pirate) and language settings
```
- 5 response tones: Professional, Casual, Concise, Detailed, Pirate
- Language preference: Auto, English, Spanish
- Tones affect actual Claude responses via instruction prefixes

**Fun Decision**: Pirate mode. A Spanish-speaking company needed language support, but adding a silly option makes the app feel human. "Ahoy, matey! Welcome aboard the good ship TelcoOS!"

### Data Migration Infrastructure

Also built tooling to migrate from the legacy Obsidian vault:

**Export Script** (`tools/export_telcoos.py`):
- Standalone Python script for legacy system
- Creates `.telcoos` archive (zip with manifest.json)
- Exports: CARRIERS, DEALS, TODOS, scripts, templates
- Skips sensitive folders (.obsidian, .git, INTX_DOCS)

**Import/Export in App** (Rust backend):
- `import_telcoos` - Extract archive to data directory
- `export_telcoos` - Create archive from data directory
- Settings → Data panel for user-facing UI

**File Tree Improvements**:
- Hide dot files/folders (.git, .DS_Store, etc.)
- Prioritize main folders: CARRIERS, DEALS, TODOS, REPORTS, DATA
- Clean view of what matters

### Polars Migration

Converted high-volume Python scripts from pandas to polars for 10M+ row support:
- `rate_gap_analysis_polars.py`
- `generate_customer_deck_v3_polars.py`
- `analyze_cdr_polars.py`

**Why**: Rate decks can have 200K+ rows. CDR files can have millions. Pandas chokes; Polars handles it.

### What We Learned

1. **Claude Code as pair programmer**: The entire app was built in conversation. Describe what you want, Claude writes it, iterate. 13 commits in one day.

2. **Tauri is production-ready**: Fast builds, small binaries, excellent DX. The permission system forces you to think about security.

3. **WYSIWYG > Split-view**: For note-taking apps, eliminating mode-switching is worth the implementation complexity.

4. **Proactive UX matters**: An app that tells you "your data is stale" is more valuable than one that waits for you to notice.

5. **Fun features humanize tools**: Pirate mode costs nothing and makes people smile. Enterprise software doesn't have to be boring.

### Production Build

Final output:
- `telcoos-desktop_0.1.0_aarch64.dmg` (~43MB)
- Native macOS app with system webview
- All features working: file browsing, viewers, chat, settings, import/export

### Phase 10: File Management & Communication Tools (Sessions 137-154)

**January 11, 2026 - Rounding Out the Feature Set**

With the core desktop app complete, we added features for day-to-day operations:

#### File Tree Management

**Problem**: Users couldn't create or delete folders from within the app. Had to use Finder.

**Built:**
1. Right-click context menu on file tree items
2. Four operations: New Folder, New File, Rename, Delete
3. Protection system for critical paths
4. Open file check before deletion

**Protection System**:
- **Protected root folders**: CARRIERS, DEALS, TODOS, REPORTS, DATA, TEMPLATES, .claude, .chats, .telcoos
- **Protected config files**: CLAUDE.md, company-info.md
- Items *inside* protected folders can be deleted - only the root is protected
- Prevents accidental deletion of system structure

**Key Decision**: Block deletion if files are open in editor. Users can't accidentally delete a file they're working on.

**Rust Commands Added**:
- `create_directory` - Create new folders
- `delete_directory` - Delete folders (recursive option)
- `create_file` - Create new files with optional content
- `rename_path` - Rename files and folders

#### Chart.js Integration

**Problem**: Need to visualize traffic data, margins, and trends.

**Built:**
1. `Charts.tsx` with reusable components (Bar, Pie, Line, Doughnut)
2. Consistent dark theme styling matching app design
3. Utility functions for data formatting

**Usage**: These components can be embedded in any view that needs data visualization.

#### Email Template System

**Problem**: When analyzing routing data, we identify customers with traffic changes and need to send personalized follow-up emails with statistics and charts.

**Challenge**: Email clients don't support JavaScript. Can't embed interactive Chart.js charts.

**Solution**: Convert charts to base64 PNG images that can be embedded in email HTML.

**Built:**
1. `chartImageGenerator.ts` - Renders Chart.js charts to off-screen canvas, exports as base64 PNG
2. `EmailTemplates.tsx` - React-email templates for customer correspondence
3. Three templates: TrafficDecreaseEmail, CustomerCheckInEmail, RateDeckDeliveryEmail
4. `renderEmailToHtml()` - Converts React components to email-compatible HTML
5. `copyEmailToClipboard()` - Copies HTML for pasting into email client

**Workflow**:
```
Analyze routing data → Identify traffic decreases → Generate charts as images
→ Populate email template → Copy to clipboard → Paste in email client
```

**Key Decision**: Use @react-email/components instead of raw HTML. The library handles email client quirks (Outlook, Gmail differences) and produces consistent output.

#### Data Directory Consolidation

- Changed default from `TelcoOS-Data-Test` to `data-template`
- Consolidated scattered templates into single `TEMPLATES/` folder
- Updated protection lists and Rust export script

### Phase 11: Chat Intelligence & Media Support (Sessions 155-162)

**January 12, 2026 - Making Chat Actually Work**

Deployed TelcoOS to the work machine and discovered fundamental issues with the Claude CLI integration. Fixed those, then enhanced chat with images and intelligent history management.

#### The Problem

When testing on a fresh machine:
1. **Hardcoded paths**: Dev machine paths were scattered throughout the codebase
2. **Claude CLI not found**: GUI apps don't inherit terminal's PATH environment
3. **No conversation memory**: Each message was independent - Claude had no context
4. **Permission prompts**: Claude CLI asked for write permission but `--print` mode is non-interactive

#### Fixes Applied

**Hardcoded Paths Removed:**
- `ChatPanel.tsx` - `DATA_PATH` constant
- `useClaudeCode.ts` - hardcoded fallback
- `chatStore.ts` - `CHATS_DIR` constant (refactored to accept parameter)
- `settingsStore.ts` - `claudeCodePath` default

**Claude CLI Execution Fixed:**
```rust
// Run through zsh login shell to inherit PATH
ProcessCommand::new("/bin/zsh")
    .args(["-l", "-i", "-c", &command])
```

**Permissions Bypassed:**
Added `--dangerously-skip-permissions` flag so Claude can write files without prompting (necessary for non-interactive mode).

#### Image Attachments

**Built:**
1. Drag-and-drop images with visual overlay
2. Paste images from clipboard (Cmd+V)
3. Image button to select files
4. Attachment preview with thumbnails before sending
5. Inline image display in chat messages
6. Click to expand images in modal
7. Auto-save to `DATA/.attachments/` folder
8. Pass image paths to Claude CLI for context

**Rust Command Added:**
- `save_attachment` - Saves images with timestamp-prefixed unique filenames

#### Rolling Chat Summarization

**The Insight**: Sending raw history with every message is wasteful. Claude API charges per token, and long histories get expensive fast.

**Solution**: Periodically summarize older messages, keep recent messages raw.

```
Messages 1-10  →  [Auto-summarize]  →  Summary stored in session
Messages 11-15 →  Keep as raw

What gets sent:
<conversation_summary>
  Summary of messages 1-10
</conversation_summary>

<recent_messages>
  Messages 11-15 (raw)
</recent_messages>

[New message]
```

**Implementation:**
1. Added `summary` and `summarizedUpTo` fields to ChatSession
2. Added `updateSessionSummary` function to chatStore
3. Context building uses summary + last 5 raw messages
4. Auto-summarization triggers every 10 messages
5. Summarization runs in background after assistant response

**Configuration:**
```typescript
const SUMMARIZE_THRESHOLD = 10;  // Trigger every 10 messages
const RECENT_MESSAGES_COUNT = 5; // Always keep last 5 raw
```

**Key Decision**: Summarize in background AFTER showing the response. User sees immediate response, summarization happens async. Non-fatal if it fails.

#### UI Polish

- Auto-expanding textarea (grows up to 150px as you type)
- Removed duplicate spinner animation in chat header

### What's Next

The desktop app is production-ready with intelligent chat and visual pipeline. Future phases:

- [ ] Email generation UI (select customers, generate batch follow-up emails)
- [ ] Chart dashboard for traffic visualization
- [x] Streaming responses from Claude CLI (implemented with stream-json + --resume)
- [x] Kanban board for deals pipeline (implemented Feb 24, 2026)
- [ ] Multi-user support (Hetzner hosting, role-based access)
- [ ] Web version for non-desktop users
- [ ] Direct rate deck editing (in-app spreadsheet)
- [ ] Automated pipeline reports (scheduled Claude runs)
- [ ] CRM integration (bidirectional sync)

---

## Session Log (Continued)

106. Decided to build desktop app to replace Obsidian workflow
107. Evaluated Electron vs Tauri vs Flutter - chose Tauri for size and speed
108. Created initial scaffold with three-panel layout
109. Added /context command for session handoff during development
110. Built FileTree component with Tauri filesystem integration
111. Implemented MarkdownViewer, CsvViewer, PdfViewer, ImageViewer
112. Built 3-step Data Inbox wizard with file type classification
113. Added custom file type persistence to .telcoos/file-types.json
114. Implemented chat session management (create, select, delete)
115. Built Proactive Assistant service (greetings, alerts, reminders)
116. Added shadcn/ui components for polished UI
117. Implemented Word and Excel viewers (mammoth.js, SheetJS)
118. Built tabbed file interface with keyboard shortcuts
119. Added settings store with theme and tab persistence
120. Implemented drag & drop for Data Inbox
121. Refactored ChatPanel state management for better session control
122. Built full-page Settings panel with sidebar navigation
123. Added Framer Motion animations throughout
124. Replaced Monaco editor with Milkdown WYSIWYG
125. Added response tone settings (Professional, Casual, Concise, Detailed, Pirate)
126. Added language preference (Auto, English, Spanish)
127. Built export_telcoos.py for legacy Obsidian migration
128. Implemented import_telcoos/export_telcoos Rust commands
129. Added Data section to Settings with import/export UI
130. Added file tree filtering (hide dot files, prioritize main folders)
131. Converted rate_gap_analysis.py to polars for large file support
132. Converted generate_customer_deck_v3.py to polars
133. Converted analyze_cdr.py to polars
134. Fixed TypeScript build errors for production build
135. Created production build (telcoos-desktop_0.1.0_aarch64.dmg)
136. Updated process.md with Phase 9 desktop app documentation
137. Added Header component with TelcoOS branding and Unbounded font
138. Implemented chat session rename (click to edit inline)
139. Added time-appropriate greeting icons (Sun, Sunset, Moon)
140. Added file tree folder management - create/delete folders with protection system
141. Protected root folders (CARRIERS, DEALS, TODOS, REPORTS, DATA, TEMPLATES, .claude, .chats, .telcoos)
142. Protected config files (CLAUDE.md, company-info.md)
143. Added right-click context menu with New Folder, New File, Rename, Delete options
144. Added open file check before deletion (blocks if files are open in editor)
145. Added New File and New Folder buttons to Files header for root-level creation
146. Consolidated templates folder - moved CARRIERS/templates/ to TEMPLATES/
147. Updated data directory from TelcoOS-Data-Test to data-template
148. Added file rename capability for files and folders
149. Installed Chart.js and react-chartjs-2 for data visualization
150. Created Charts.tsx with BarChart, PieChart, LineChart, DoughnutChart components
151. Created chartImageGenerator.ts for converting charts to base64 PNG images
152. Installed @react-email/components for email template generation
153. Created EmailTemplates.tsx with TrafficDecreaseEmail, CustomerCheckInEmail, RateDeckDeliveryEmail
154. Added renderEmailToHtml() and copyEmailToClipboard() utilities for email workflow
155. Deployed to work machine, discovered hardcoded dev paths breaking app
156. Removed hardcoded paths from ChatPanel, useClaudeCode, chatStore, settingsStore
157. Fixed Claude CLI discovery - GUI apps don't inherit PATH, use zsh login shell
158. Added --dangerously-skip-permissions flag for non-interactive Claude CLI mode
159. Removed duplicate spinner animation in chat header
160. Added image drag-and-drop support with visual overlay
161. Added paste images from clipboard (Cmd+V)
162. Added image button and attachment preview with thumbnails
163. Created save_attachment Rust command for DATA/.attachments/ storage
164. Added inline image display in chat messages with click-to-expand modal
165. Added conversation history context - prepend last 10 messages to each request
166. Discussed chat history approaches: current hack vs proper API vs CLI sessions
167. Designed rolling summarization: auto-compact every 10 messages, keep 5 raw
168. Added summary and summarizedUpTo fields to ChatSession interface
169. Added updateSessionSummary function to chatStore
170. Updated ChatPanel context building to use summary + recent messages
171. Added auto-summarization trigger after assistant response
172. Built production DMG with all chat intelligence features

### Phase 12: Configurable Services & File Explorer Enhancements (Sessions 173-184)

**January 13, 2026 - Making It Customizable**

With core functionality solid, we focused on customization and file explorer improvements.

#### Configurable Services/Workflows

**Problem**: The Commands modal (eyeball icon) had hardcoded slash commands. Users couldn't add their own workflows or modify existing ones.

**Built:**
1. `servicesConfig.ts` - Service configuration management (following fileTypesConfig.ts pattern)
2. Dynamic CommandsModal - Loads services from `.telcoos/services.json` instead of hardcoded array
3. Settings → Services editor - Full CRUD for services and categories
4. Edit Service Modal - Name, command, description, usage, examples, icon
5. Edit Category Modal - Title, icon selection
6. Reset to defaults functionality

**Schema:**
```typescript
interface Service {
  id: string;
  name: string;           // Display name
  command: string;        // Trigger (e.g., "/pipeline")
  description: string;
  usage: string;          // e.g., "/pipeline [todos]"
  examples?: string[];
  icon?: string;          // Lucide icon name
  isDefault?: boolean;
}

interface ServiceCategory {
  id: string;
  title: string;          // e.g., "Pipeline & Deals"
  icon: string;
  services: Service[];
}
```

**Default Services** (4 categories, 11 commands):
- Pipeline & Deals: /pipeline, /newdeal, /status, /rundown
- Carrier Management: /carrier, /carrier report, /carrier log
- Todos: /todos, /todo add
- Rate Decks & Forms: /ratedeck, /fillform

**Key Decision**: Store in `.telcoos/services.json` - same pattern as file types. Configuration lives with user data, not in app bundle.

#### JSON Viewer

**Problem**: Chat history files (`.chats/*.json`) and config files couldn't be viewed in the app.

**Built:**
1. `JsonViewer.tsx` with syntax highlighting
2. Pretty-prints JSON with 2-space indentation
3. Color-coded tokens: keys (purple), strings (green), numbers (blue), booleans (orange), null (red)
4. Added to FileViewer.tsx router
5. Yellow JSON icon in file tree

**Implementation**: Regex tokenizer parses JSON and wraps each token type in colored spans. Simple but effective.

#### Hidden Files Toggle

**Problem**: Dot files (`.chats`, `.claude`, `.telcoos`) were hidden for a clean UI, but sometimes users need to edit them directly.

**Built:**
1. Eye/EyeOff icon button in Explorer header (next to create file/folder buttons)
2. `showHiddenFiles` state toggle
3. FileTree respects the toggle for all nested directories
4. Blue highlight when hidden files are visible

**Key Decision**: Toggle, not permanent setting. Hidden files should usually stay hidden - this is for occasional access.

#### Tauri Permissions Fix

**Problem**: Even with eye toggle enabled, hidden directories showed "forbidden path" error.

**Root Cause**: Tauri capability glob patterns (`$HOME/Desktop/**`) don't match hidden directories by default.

**Fix**: Added explicit patterns for hidden directories:
```json
{
  "identifier": "fs:scope",
  "allow": [
    "$HOME/Desktop/**",
    "$HOME/Desktop/**/.*",
    "$HOME/Desktop/**/.*/**",
    "$HOME/Documents/**",
    "$HOME/Documents/**/.*",
    "$HOME/Documents/**/.*/**"
  ]
}
```

**Key Learning**: Tauri's security model is thorough - even `**` doesn't match dot-prefixed paths. You must explicitly allow them.

#### Data Inbox Delete

**Problem**: Files in the Inbox required opening Finder to delete.

**Built**: Right-click context menu on inbox items with Delete option. Confirms deletion with notification.

#### Fuzzy File Search

**Problem**: Large file trees are tedious to navigate. Users had to manually expand folders to find files.

**Built:**
1. Search input in Explorer header (magnifying glass icon)
2. `fuzzyMatch()` function - matches characters in order (e.g., "act" matches "actions")
3. Recursive `searchFiles()` - scans all directories, max 50 results
4. 200ms debounced search to avoid excessive searches while typing
5. Search results as flat list with file icons and relative paths
6. Click file to open, click folder to navigate (clears search, expands tree)
7. `onClearSearch` callback for folder navigation

**UX Flow:**
```
Type "act" → See "actions" folder and matching files
Click folder → Search clears, tree expands to show folder
Click file → File opens in viewer
```

**Key Decision**: Fuzzy matching over exact substring. Users don't always remember exact names - "cv" should match "CsvViewer.tsx".

#### Bug Fixes

1. **CSV Viewer Dots in Headers**: Headers with dots (e.g., "data.value") caused TanStack Table to interpret them as nested accessors. Fixed by using `accessorFn` instead of `accessorKey`.

2. **Hidden Directory Detection**: `stat()` was failing on hidden directories, causing them to be treated as files ("Unsupported file type: .chats"). Fixed by using `isDirectory` property directly from `readDir()` result instead of calling `stat()`.

---

## Session Log (Continued)

173. Created servicesConfig.ts with Service and ServiceCategory types
174. Added loadServicesConfig() and saveServicesConfig() functions
175. Defined DEFAULT_SERVICES (4 categories, 11 commands)
176. Updated CommandsModal.tsx to load services dynamically
177. Added Services section to SettingsPanel with navigation
178. Built Edit Service Modal (name, command, description, usage, examples, icon)
179. Built Edit Category Modal (title, icon selection)
180. Added Delete/Reset confirmation dialogs for services
181. Fixed unused imports error (Users, ListTodo, ServicesConfigData)
182. Added right-click context menu to DataInbox for file deletion
183. Added eye icon toggle to Sidebar for showing hidden files
184. Added showHiddenFiles prop to FileTree component
185. Fixed hidden directories treated as files - use isDirectory from readDir() instead of stat()
186. Added error visibility and "(empty)" indicator to TreeNode
187. Fixed Tauri permissions for hidden directories - added .*/** patterns to capabilities
188. Created JsonViewer.tsx with syntax highlighting (keys/strings/numbers/booleans/null)
189. Added JSON support to FileViewer.tsx
190. Added yellow JSON icon to FileTree.tsx
191. Fixed TypeScript error - JSX.Element to React.ReactElement in JsonViewer
192. Built production DMG with configurable services, JSON viewer, hidden files support
193. Created services.json template file for production data-template folder
194. Added fuzzy file search input to Sidebar Explorer header
195. Added fuzzyMatch() function for character-order matching
196. Implemented recursive searchFiles() with 50 result limit and 200ms debounce
197. Added search results flat list with file icons and relative paths
198. Added folder click handler - clears search and expands tree to folder location
199. Added onClearSearch callback prop for folder navigation
200. Built production DMG with fuzzy file search

### Phase 13: Embedded Terminal (Sessions 201-210)

**January 14, 2026 - Full Shell in the App**

The final piece for a complete development environment: an embedded terminal.

#### The Problem

Users still needed a separate terminal window for:
- Running Python scripts (`uv run analyze_cdr.py`)
- Git operations
- Quick file operations (mv, cp, grep)
- Any ad-hoc shell commands

Three windows (TelcoOS + Terminal + Finder) defeats the "unified interface" goal.

#### Solution: PTY Terminal Drawer

**Built:**
1. **Rust PTY Backend** (`lib.rs`)
   - `portable-pty` crate for macOS PTY support
   - `spawn_terminal(working_dir, terminal_id)` - Creates PTY with zsh login shell
   - `write_terminal(terminal_id, data)` - Sends bytes to PTY
   - `resize_terminal(terminal_id, cols, rows)` - Updates terminal dimensions
   - `kill_terminal(terminal_id)` - Cleans up PTY and process
   - Async event emission for `terminal-output` and `terminal-exit`

2. **Terminal Component** (`Terminal.tsx`)
   - xterm.js with FitAddon and WebLinksAddon
   - Theme-aware colors (matches app light/dark mode)
   - Auto-focus on creation
   - Handles terminal exit with "press any key to restart"
   - Click handler to refocus after HMR

3. **Layout Integration** (`Layout.tsx`)
   - Always-visible header at bottom ("Terminal zsh")
   - Click header to expand/collapse drawer
   - ChevronUp/Down icons indicate state
   - Resizable height with drag handle
   - `Cmd+`` keyboard shortcut to toggle
   - Terminal stays mounted when collapsed (preserves process)

4. **Settings** (`settingsStore.ts`)
   - `terminalHeight` - Persisted drawer height
   - `terminalOpenOnLaunch` - Auto-open preference

#### Technical Challenges

**PTY Slave Handling:**
Critical discovery: The PTY slave must be explicitly dropped in the parent process after spawning the child. Without this, the shell receives no input.

```rust
let child = pair.slave.spawn_command(cmd)?;
drop(pair.slave);  // Required for proper PTY operation
```

**React StrictMode Double-Mount:**
StrictMode mounts/unmounts/remounts components in dev. This caused double terminal spawns. Fixed with:
- 50ms setTimeout delay before spawning
- `isSpawnedRef` guard
- Rust-side `spawning` HashSet to prevent concurrent spawns

**Event Listener Cleanup:**
Async event listeners (`listen()`) need careful cleanup to prevent stale handlers after HMR:
```typescript
let mounted = true;
listen("terminal-output", (event) => {
  if (!mounted) return;  // Guard
  // handle event
}).then((fn) => {
  if (mounted) unlisten = fn;
  else fn();  // Cleanup immediately if unmounted
});
return () => { mounted = false; unlisten?.(); };
```

**Production-Only Reset Bug:**
Terminal worked in dev but reset when typing in production. Root cause: Terminal component was inside `AnimatePresence` with conditional rendering `{terminalOpen && ...}`. When `terminalOpen` changed, the component unmounted/remounted.

**Fix:** Keep Terminal always mounted, animate height to 0 when closed:
```tsx
<motion.div
  animate={{ height: terminalOpen ? `${height}vh` : 0 }}
>
  <Terminal ... />  {/* Always mounted */}
</motion.div>
```

#### What Works Now

- Full zsh shell with login profile (aliases, PATH, etc.)
- Interactive programs: vim, less, htop, nano
- Tab completion
- Ctrl+C signal handling
- Proper terminal dimensions (resize works)
- Copy/paste (system clipboard)
- Clickable URLs (WebLinksAddon)
- Theme switching without restart

#### Session Log

201. Designed embedded terminal feature - PTY drawer at bottom of app
202. Added portable-pty = "0.8" to Cargo.toml
203. Created TerminalState and TerminalSession structs in lib.rs
204. Implemented spawn_terminal command with async output reader
205. Implemented write_terminal, resize_terminal, kill_terminal commands
206. Installed @xterm/xterm, @xterm/addon-fit, @xterm/addon-web-links
207. Added xterm.css import to index.css
208. Created Terminal.tsx with xterm.js initialization
209. Added terminal-output and terminal-exit event listeners
210. Added terminal panel to Layout.tsx with resize handle
211. Fixed shell exiting immediately - store child process handle in session
212. Fixed double spawn from StrictMode - 50ms delay + spawning guard
213. Fixed terminal resetting when typing - mounted flag pattern for listeners
214. Fixed PTY not working - drop pair.slave after spawn
215. Fixed double characters - mounted flag in all event listeners
216. Changed from close button to collapsible drawer UI
217. Added ChevronUp/Down icons for toggle state
218. Moved terminal header to Layout.tsx (always visible)
219. Added Cmd+` keyboard shortcut to toggle terminal
220. Added terminalHeight and terminalOpenOnLaunch to settingsStore
221. Removed getThemeColors from spawn effect dependencies
222. Fixed production reset bug - keep Terminal always mounted, animate height
223. Built production DMG with embedded terminal

### Phase 14: Permissions & Deployment Fixes (Sessions 224+)

**January 28, 2026 - Production Deployment Issues**

#### fs:scope Expansion

**Problem**: Users couldn't set their data directory to custom locations. The Tauri fs:scope only allowed:
- `$HOME/Desktop/**`
- `$HOME/Documents/**`
- `$HOME/.telcoos/**`

When setting data directory to `~/TelcoOS` or `~/.telcoos`, the app failed with permission errors.

**Fix**: Simplified fs:scope to allow any path under the user's home folder:
```json
{
  "identifier": "fs:scope",
  "allow": [
    "$HOME/**",
    "$HOME/**/.*",
    "$HOME/**/.*/**"
  ]
}
```

**Key Learning**: Tauri's security-first approach means you need to explicitly allow paths. For a user-facing app where the user chooses their own data location, restricting to specific folders creates friction.

#### Session Log

224. Fixed fs:scope permissions - expanded from specific folders to $HOME/**
225. Built production DMG with flexible data directory support

### Phase 15: Streaming Chat & Hardening (Sessions 226-235)

**February 4-5, 2026 - Real-Time Streaming & Production Fixes**

#### The Problem

Chat used `claude --print` — a single-shot mode with no memory, no file access, and no streaming. Each message was a fresh invocation where we manually injected conversation history (summary + recent messages) into the prompt. This produced inferior results compared to the CLI, which maintains a persistent session with native context, tool use, and file access.

#### Solution: Stream-JSON with Session Continuity

Replaced `claude --print` with `claude -p --output-format stream-json --verbose --dangerously-skip-permissions` and `--resume SESSION_ID`.

**What this gives us:**
1. **Real-time streaming** — tokens appear as they're generated
2. **Native session memory** — Claude CLI maintains its own conversation history via `--resume`
3. **File/tool access** — Claude can read files, run commands, use tools in the data directory
4. **No manual context injection** — removed the summary/recent-messages stuffing

#### Implementation

**Rust Backend (lib.rs):**
- `ClaudeStreamState` — registry of active streaming sessions with PIDs
- `start_claude_stream` — spawns Claude CLI with stream-json, reads stdout line by line, emits Tauri events
- `cancel_claude_stream` — sends SIGTERM then SIGKILL to process group
- Event payloads: `claude-stream-init` (session ID), `claude-stream-message` (text chunks), `claude-stream-complete` (session ID + cost), `claude-stream-error`
- Concurrent stderr draining via separate tokio task to prevent pipe buffer blocking

**Chat Store (chatStore.ts):**
- Added `claudeSessionId` to `ChatSession` interface for `--resume` persistence
- Added `updateSessionClaudeId` method

**ChatPanel (ChatPanel.tsx):**
- Replaced `invoke("run_claude")` with event-based streaming
- Set up 4 Tauri event listeners per message (init, message, complete, error)
- Live streaming text display with blinking cursor
- Removed manual context injection (summary + recent messages)
- Removed auto-summarization — `--resume` handles conversation memory natively
- Updated cancel to use `cancel_claude_stream`

**Streaming UI:**
- Thin 2px blinking pipe cursor while text streams
- Three animated dots while waiting for first token
- Red pill-styled Stop button on its own line

#### Technical Challenges

**Pipe Buffer Blocking:**
The `-i` (interactive) flag on zsh caused stderr output (compinit, shell startup messages) that filled the pipe buffer. Since stderr wasn't being read concurrently, the process blocked.

**Fix:** Three changes:
1. `stdin(Stdio::null())` — prevent interactive shell from waiting for stdin
2. Concurrent stderr drain via `tokio::spawn` — read and discard stderr in parallel
3. Fallback completion event if no `result` line parsed

**PATH Resolution:**
Removing `-i` broke PATH resolution since `.zshrc` (where claude PATH is configured) only loads with `-i`.

**Fix:** Restored `-i` flag, kept the real fixes (stdin null + concurrent stderr drain).

#### macOS Hidden Folder Fix

**Problem:** Folders transferred via AirDrop had the macOS hidden flag set, making them invisible in Finder even though they existed on disk (verified via `ls`).

**Built:**
- `unhide_data_directory` Rust command — runs `chflags -R nohidden` on the data directory
- Called automatically on every app launch from `App.tsx`
- macOS-only via `#[cfg(target_os = "macos")]`
- Fire-and-forget (`.catch(() => {})`) so it doesn't block startup

#### PDF Annotation Persistence

**Problem:** When annotating a PDF and switching to another tab (e.g., to copy text from an MD file), all annotations were lost on return. The PdfViewer unmounted on tab switch, and on remount, the `useEffect` loaded annotations from disk — but unsaved annotations weren't on disk.

**Root Cause:** The `stateByFile` Map in `pdfAnnotationStore.ts` survived unmount (it's module-level), but the `useEffect` blindly overwrote it from disk every time.

**Fix:** Skip disk load if in-memory state already has annotations or unsaved changes:
```typescript
const existing = stateByFile.get(filePath);
if (existing && (existing.annotations.length > 0 || existing.hasUnsavedChanges)) {
  return; // Don't overwrite from disk
}
```

#### Session Log

226. Designed streaming chat upgrade plan (stream-json + --resume)
227. Added ClaudeStreamState, event payload structs to lib.rs
228. Implemented start_claude_stream command with stdout line parsing
229. Implemented cancel_claude_stream with process group kill
230. Added claudeSessionId to ChatSession interface and updateSessionClaudeId method
231. Rewired ChatPanel from invoke("run_claude") to event-based streaming
232. Removed manual context injection and auto-summarization from ChatPanel
233. Fixed pipe buffer blocking - concurrent stderr drain + stdin null
234. Fixed PATH resolution - restored -i flag for .zshrc sourcing
235. Added streaming UI - blinking cursor, animated dots, red Stop button
236. Built production DMG with streaming chat
237. Added unhide_data_directory command for macOS hidden folders
238. Called unhide_data_directory on every app launch from App.tsx
239. Fixed PDF annotation persistence - skip disk load when in-memory state exists
240. Built production DMG with all hardening fixes

### Phase 16: Kanban Board (Sessions 241-242)

**February 24, 2026 - Visual Deal Pipeline**

#### The Problem

Deal tracking was text-based — checking deal status required reading markdown files or asking Claude. No visual overview of the pipeline, no drag-and-drop stage changes, no quick way to see all deals at a glance.

#### Solution: Kanban Board

**Built:**
1. **KanbanBoard.tsx** — Main board component replacing chat panel when open
2. **KanbanColumn.tsx** — Stage columns (Lead, Contacted, Qualified, Proposal, Negotiation, Closed Won, Closed Lost)
3. **KanbanCard.tsx** — Individual deal cards with drag-and-drop
4. **AddNoteModal.tsx** — Quick note entry for deals from the board
5. **kanbanStore.ts** — Zustand store for board state, drag state, refresh
6. **kanbanService.ts** — Service layer for reading deals from DEALS/ folder, parsing stages from markdown

**Features:**
- Drag-and-drop cards between stages (updates deal file on disk)
- Click card to open deal file in viewer
- Right-click context menu for quick actions
- Add notes directly from board
- Stage statistics in header
- Refresh button to reload from disk
- Keyboard shortcut: `Cmd+P` to toggle board
- Escape to close and return to chat

**Integration:**
- Header gets Kanban toggle button with active state highlighting
- Layout conditionally renders KanbanBoard or ChatPanel based on `kanbanOpen` state
- Escape key handler extended to close Kanban before other modals

#### Session Log

241. Designed Kanban board feature - visual deal pipeline with drag-and-drop
242. Created KanbanBoard, KanbanColumn, KanbanCard components
243. Created AddNoteModal for quick note entry
244. Created kanbanStore with Zustand for state management
245. Created kanbanService for reading/parsing deal files from DEALS/ folder
246. Added Kanban toggle button to Header with Cmd+P shortcut
247. Integrated KanbanBoard into Layout with conditional rendering
248. Added Escape key handler for closing Kanban view
249. Committed and pushed: "Add Kanban board for deals pipeline"
