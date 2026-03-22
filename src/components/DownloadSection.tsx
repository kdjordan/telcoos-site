"use client";

import { useState } from "react";
import { Download, X, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const platforms = [
    { platform: "macOS", arch: "Apple Silicon & Intel", primary: true },
    { platform: "Windows", arch: "64-bit", primary: false },
    { platform: "Linux", arch: "AppImage & DEB", primary: false },
  ];

  const handleDownloadClick = (platform: string) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="download" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Ready to unify your operations?
          </h2>
          <p className="text-xl text-zinc-400 mb-12">
            Download TelcoOS for your platform and start consolidating your workflow today.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {platforms.map((item, i) => (
              <button
                key={i}
                onClick={() => handleDownloadClick(item.platform)}
                className={`platform-btn p-6 rounded-xl border transition-all cursor-pointer ${
                  item.primary
                    ? "bg-teal-600/20 border-teal-500/30 hover:border-teal-500/50"
                    : "bg-zinc-900/50 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Download className={`w-5 h-5 ${item.primary ? "text-teal-400" : "text-zinc-400"}`} />
                  <span className={`font-semibold ${item.primary ? "text-teal-400" : "text-white"}`}>
                    {item.platform}
                  </span>
                </div>
                <span className="text-xs text-zinc-500">{item.arch}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-zinc-500">
            Version 1.0.0 • Requires macOS 12+, Windows 10+, or Ubuntu 20.04+
          </p>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-teal-400" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Coming Soon
            </h3>
            <p className="text-zinc-400 text-center mb-8">
              TelcoOS for <span className="text-white font-medium">{selectedPlatform}</span> is currently in development and will be available soon.
            </p>

            {/* Email CTA */}
            <div className="space-y-4">
              <a
                href="mailto:kevin@telcoos.io?subject=TelcoOS%20Inquiry&body=Hi%2C%0A%0AI%27m%20interested%20in%20learning%20more%20about%20TelcoOS.%0A%0APlatform%3A%20${selectedPlatform}%0A%0A"
                className="flex items-center justify-center gap-2 w-full h-12 px-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Us for More Information
              </a>

              <p className="text-xs text-zinc-500 text-center">
                Email us at{" "}
                <a
                  href="mailto:kevin@telcoos.io"
                  className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                  kevin@telcoos.io
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-xs text-zinc-600 uppercase">or</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* Close button */}
            <Button
              variant="outline"
              className="w-full border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
