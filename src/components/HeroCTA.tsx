"use client";

import { useState } from "react";
import { Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "./EarlyAccessSection";

export function HeroCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300" style={{ opacity: 0 }}>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-12 px-8 bg-teal-600 hover:bg-teal-500 text-white border-0 text-base font-medium glow-teal"
        >
          <Mail className="w-5 h-5 mr-2" />
          Request Early Access
        </Button>
        <a href="#features">
          <Button
            variant="outline"
            className="h-12 px-8 text-base font-medium border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            Learn More
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
      </div>

      {/* Beta status */}
      <p className="mt-8 text-sm text-zinc-500 animate-fade-in delay-500" style={{ opacity: 0 }}>
        Currently in private beta
      </p>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
