"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WaitlistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const endpoint = process.env.NEXT_PUBLIC_WAITLIST_URL;

      if (!endpoint) {
        throw new Error("Waitlist endpoint not configured");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        mode: "no-cors", // Google Apps Script requires this
      });

      // With no-cors, we can't read the response, so we assume success
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    if (status !== "loading") {
      setStatus("idle");
      setEmail("");
      setErrorMessage("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={handleClose}
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
          onClick={handleClose}
          disabled={status === "loading"}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>

        {status === "success" ? (
          // Success state
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              You&apos;re on the list!
            </h3>
            <p className="text-zinc-400 mb-6">
              We&apos;ll be in touch when your spot is ready.
            </p>
            <Button
              onClick={handleClose}
              variant="outline"
              className="border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
            >
              Close
            </Button>
          </div>
        ) : (
          // Form state
          <>
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-teal-400" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Request Early Access
            </h3>
            <p className="text-zinc-400 text-center mb-6">
              TelcoOS is currently in private beta. Join the waitlist to get priority access when we launch.
            </p>

            {/* Error message */}
            {status === "error" && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{errorMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                disabled={status === "loading"}
                className="w-full h-12 px-4 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 bg-teal-600 hover:bg-teal-500 text-white border-0 font-medium disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Join Waitlist
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <p className="text-xs text-zinc-600 text-center mt-4">
              We&apos;ll only email you when your access is ready. No spam, ever.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export function EarlyAccessSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="early-access" className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-400 font-medium">Early Access Program</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Be the first to try TelcoOS
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            We&apos;re onboarding select telecom operations teams for early access.
            Join the waitlist to get priority access when we launch.
          </p>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-8 bg-teal-600 hover:bg-teal-500 text-white border-0 text-base font-medium glow-teal"
          >
            Request Early Access
            <Send className="w-4 h-4 ml-2" />
          </Button>

          {/* Platform availability */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 mb-4">Available for</p>
            <div className="flex items-center justify-center gap-8">
              {[
                { name: "macOS", detail: "Apple Silicon & Intel" },
                { name: "Windows", detail: "64-bit" },
                { name: "Linux", detail: "AppImage & DEB" },
              ].map((platform, i) => (
                <div key={i} className="text-center">
                  <div className="text-white font-medium">{platform.name}</div>
                  <div className="text-xs text-zinc-600">{platform.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
