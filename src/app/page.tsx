import {
  MessageSquare,
  FileSpreadsheet,
  Kanban,
  Terminal,
  Zap,
  Shield,
  Cpu,
  ArrowRight,
  Check,
  Sparkles,
  FolderOpen,
  BarChart3,
  Globe,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarlyAccessSection } from "@/components/EarlyAccessSection";
import { HeroCTA } from "@/components/HeroCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">TelcoOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#ai" className="text-sm text-zinc-400 hover:text-white transition-colors">AI Assistant</a>
            <a href="#enterprise" className="text-sm text-zinc-400 hover:text-white transition-colors">Enterprise</a>
            <a href="#early-access" className="text-sm text-zinc-400 hover:text-white transition-colors">Early Access</a>
          </div>
          <a href="#early-access">
            <Button className="bg-teal-600 hover:bg-teal-500 text-white border-0">
              Request Access
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-400 font-medium">AI-Powered Operations Platform</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              <span className="text-gradient">One App.</span>
              <br />
              <span className="text-gradient">Every Carrier.</span>
              <br />
              <span className="text-gradient-teal">Total Control.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 animate-slide-up delay-200" style={{ opacity: 0 }}>
              The unified desktop application that consolidates carrier management,
              rate analysis, deal tracking, and AI assistance into a single
              intelligent interface.
            </p>

            {/* CTA buttons and beta status */}
            <HeroCTA />
          </div>

          {/* Hero visual - App mockup */}
          <div className="mt-20 relative animate-slide-up delay-400" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-xl border border-white/10 overflow-hidden glow-teal">
              {/* Window chrome */}
              <div className="h-10 bg-zinc-900/80 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-zinc-500">TelcoOS — Carrier Operations</span>
              </div>
              {/* App content mockup */}
              <div className="bg-[#0d0d0f] p-6 min-h-[400px] grid grid-cols-12 gap-4">
                {/* Sidebar */}
                <div className="col-span-2 bg-zinc-900/50 rounded-lg p-3 space-y-2">
                  <div className="h-8 bg-teal-500/20 rounded flex items-center px-2 gap-2">
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                    <span className="text-xs text-teal-400">Chat</span>
                  </div>
                  <div className="h-8 bg-zinc-800/50 rounded flex items-center px-2 gap-2">
                    <FolderOpen className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Files</span>
                  </div>
                  <div className="h-8 bg-zinc-800/50 rounded flex items-center px-2 gap-2">
                    <Kanban className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Pipeline</span>
                  </div>
                  <div className="h-8 bg-zinc-800/50 rounded flex items-center px-2 gap-2">
                    <BarChart3 className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Analytics</span>
                  </div>
                </div>
                {/* Main content */}
                <div className="col-span-6 space-y-4">
                  <div className="bg-zinc-900/50 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-zinc-300 mb-2">Analyzing Verizon rate deck for Q1 margins...</div>
                        <div className="text-xs text-zinc-500 terminal-text bg-zinc-800/50 rounded p-2">
                          Found 847 routes with margin &lt; 5%<br/>
                          Identified 23 underwater NPAs<br/>
                          Generating optimization report...
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center px-3">
                        <span className="text-xs text-zinc-500">Ask about your carriers...</span>
                      </div>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-500 border-0 h-8">
                        <Zap className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-white">47</div>
                      <div className="text-xs text-zinc-500">Active Carriers</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-teal-400">12.4M</div>
                      <div className="text-xs text-zinc-500">Minutes/Month</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-white">8.2%</div>
                      <div className="text-xs text-zinc-500">Avg Margin</div>
                    </div>
                  </div>
                </div>
                {/* Right panel */}
                <div className="col-span-4 bg-zinc-900/50 rounded-lg p-4 space-y-3">
                  <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Deal Pipeline</div>
                  {[
                    { name: "AT&T Enterprise", stage: "Negotiation", color: "bg-yellow-500" },
                    { name: "Lumen Wholesale", stage: "Proposal", color: "bg-blue-500" },
                    { name: "Windstream Direct", stage: "Qualified", color: "bg-teal-500" },
                  ].map((deal, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-zinc-800/50 rounded">
                      <span className="text-sm text-zinc-300">{deal.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${deal.color}/20 text-zinc-300`}>
                        {deal.stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                <span className="text-xs text-red-400 font-medium uppercase tracking-wider">The Problem</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Fragmented workflows kill productivity
              </h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  Telecom operations teams juggle multiple disconnected tools daily:
                </p>
                <ul className="space-y-3">
                  {[
                    "Terminal windows for CLI operations",
                    "Spreadsheets for rate deck analysis",
                    "File explorers for document management",
                    "Note-taking apps for carrier tracking",
                    "Separate PDF viewers for contracts",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-500 italic">
                  Context-switching between 5+ windows wastes hours every week and leads to missed opportunities.
                </p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
                <span className="text-xs text-teal-400 font-medium uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-teal">
                One intelligent interface
              </h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  TelcoOS consolidates everything into a single window with an AI assistant that understands your business:
                </p>
                <ul className="space-y-3">
                  {[
                    "AI-powered chat with full file access",
                    "Smart viewers for every telecom file type",
                    "Visual deal pipeline with drag-and-drop",
                    "18 built-in skills for common workflows",
                    "Embedded terminal when you need it",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-teal-400/80 font-medium">
                  Your data stays in readable files you control. No cloud dependency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Everything you need
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Purpose-built for telecom operations teams who demand precision and speed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "AI Chat Interface",
                description: "Natural language interaction with full file access. Ask questions, analyze data, and automate workflows without memorizing commands.",
                accent: "from-teal-500 to-cyan-500",
              },
              {
                icon: FileSpreadsheet,
                title: "Smart File Viewers",
                description: "Native support for CSV rate decks, PDF contracts, markdown notes, Excel billing reports, and more — all in one window.",
                accent: "from-blue-500 to-indigo-500",
              },
              {
                icon: Kanban,
                title: "Deal Pipeline",
                description: "Visual Kanban board for tracking deals from lead to close. Drag-and-drop stage changes update your files automatically.",
                accent: "from-purple-500 to-pink-500",
              },
              {
                icon: Zap,
                title: "18 Built-in Skills",
                description: "Pre-built workflows for rate analysis, billing reports, carrier management, and more. Just describe what you need.",
                accent: "from-amber-500 to-orange-500",
              },
              {
                icon: FolderOpen,
                title: "Data Inbox",
                description: "3-step wizard classifies incoming files automatically. Drop files in, select type, confirm destination — done.",
                accent: "from-emerald-500 to-green-500",
              },
              {
                icon: Terminal,
                title: "Embedded Terminal",
                description: "Full PTY shell when you need it. Run scripts, git commands, or any CLI tool without leaving the app.",
                accent: "from-zinc-400 to-zinc-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card group relative p-6 rounded-xl bg-zinc-900/50 border border-white/5 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.accent} p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-[7px] bg-zinc-900 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-xs text-teal-400 font-medium uppercase tracking-wider">AI-Native</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Claude understands telecom
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Not a chatbot bolted onto a file manager. TelcoOS was built from the ground up with AI as the primary interface.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Full file access",
                    description: "Claude can read, analyze, and modify any file in your data directory.",
                  },
                  {
                    title: "Session memory",
                    description: "Conversations persist across sessions. Pick up right where you left off.",
                  },
                  {
                    title: "Streaming responses",
                    description: "Real-time token display with cancel support. No waiting for complete responses.",
                  },
                  {
                    title: "Tool use",
                    description: "Claude can run scripts, generate reports, and execute complex multi-step workflows.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI demo card */}
            <div className="relative">
              <div className="rounded-xl border border-white/10 bg-zinc-900/80 overflow-hidden">
                <div className="h-10 bg-zinc-800/50 border-b border-white/5 flex items-center px-4">
                  <span className="text-xs text-zinc-500">TelcoOS Chat</span>
                </div>
                <div className="p-6 space-y-6">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-teal-600/20 border border-teal-500/20 rounded-lg rounded-tr-none px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-zinc-200">
                        Compare our AT&T rates against Lumen for high-volume NPAs
                      </p>
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="bg-zinc-800/50 rounded-lg rounded-tl-none px-4 py-3">
                        <p className="text-sm text-zinc-300 mb-3">
                          Analyzing rate decks for NPAs with 10K+ minutes/month...
                        </p>
                        <div className="terminal-text text-xs bg-zinc-900/80 rounded p-3 space-y-1">
                          <div className="text-zinc-500"># Top 5 NPAs where Lumen beats AT&T</div>
                          <div><span className="text-teal-400">201</span> <span className="text-zinc-400">-$0.0012/min</span> <span className="text-zinc-600">(47K mins)</span></div>
                          <div><span className="text-teal-400">212</span> <span className="text-zinc-400">-$0.0008/min</span> <span className="text-zinc-600">(38K mins)</span></div>
                          <div><span className="text-teal-400">310</span> <span className="text-zinc-400">-$0.0015/min</span> <span className="text-zinc-600">(29K mins)</span></div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500">
                        Switching these 5 NPAs to Lumen would save ~$2,400/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl" />
              <div className="absolute -z-10 bottom-8 -left-8 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 mb-6">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Enterprise Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Built for scale
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Custom integrations for enterprise carrier platforms. Connect directly to your switch management and billing systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: "Custom Switch Integration",
                description: "Connect directly to carrier switch management platforms with native authentication. No browser windows, no credential copying.",
              },
              {
                icon: Shield,
                title: "Local-First Architecture",
                description: "Your data never leaves your machine. Files stay in readable formats you control. No cloud sync, no vendor lock-in.",
              },
              {
                icon: Cpu,
                title: "Platform Connectors",
                description: "Native connectors for enterprise billing, routing, and analytics platforms. Built for the scale of major VoIP operations.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-zinc-900/30 border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <EarlyAccessSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">TelcoOS</span>
            </div>

            <div className="flex items-center gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="mailto:kevin@telcoos.io" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>

            <p className="text-sm text-zinc-600">
              © 2026 TelcoOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
