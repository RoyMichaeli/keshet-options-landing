"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <span className="text-xl md:text-2xl font-bold text-accent">
          Keshet.finance
        </span>
      </div>
      
      {/* Floating CTA Button */}
      <Button
        onClick={scrollToForm}
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-lg shadow-accent/25 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold z-50 transition-transform hover:scale-105"
      >
        לשריון מקום
      </Button>
    </header>
  );
}
