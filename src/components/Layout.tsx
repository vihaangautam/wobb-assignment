import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Sun, Moon } from "lucide-react";
import { useShortlistStore } from "@/features/shortlist/store/useShortlistStore";
import { ShortlistPanel } from "@/features/shortlist/components/ShortlistPanel";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const profileCount = useShortlistStore((s) => s.profiles.length);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="flex flex-col min-h-screen bg-bg transition-colors duration-200">
      {/* Sticky Header with Backdrop Blur */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-bg/85 border-b-2 border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-black text-h no-underline tracking-tighter font-mono group"
          >
            <div className="p-1 border border-border bg-accent text-h rounded transition-all duration-200 group-hover:-rotate-3 group-hover:scale-105">
              <Sparkles size={16} />
            </div>
            <span>
              wobb<span className="text-accent font-light">.vibe</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="brutalist-btn p-2 flex items-center justify-center"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Shortlist Trigger Button */}
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="brutalist-btn px-4 py-2 flex items-center gap-2 h-9 text-xs"
              aria-label={`Open shortlist — ${profileCount} profiles`}
            >
              <Heart
                size={14}
                className={
                  profileCount > 0
                    ? "fill-accent text-accent animate-pulse"
                    : "text-gray-400 dark:text-gray-500"
                }
              />
              <span className="font-bold tracking-wider">SHORTLIST</span>
              {profileCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 font-bold text-h bg-accent border border-border rounded-sm">
                  {profileCount}
                </span>
              ) : (
                <span className="text-gray-400 dark:text-gray-500">0</span>
              )}
            </button>
          </div>
        </div>
        {/* Full-width Cyan Accent Bar */}
        <div className="h-[3px] w-full bg-accent" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {title && (
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-4xl font-black text-h tracking-tight sm:text-5xl">
              {title}
            </h1>
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-border py-8 bg-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 wobb.vibe. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="brutalist-badge bg-accent-light text-accent">
              VIBE CODER INTERN ASSIGNMENT
            </span>
          </div>
        </div>
      </footer>

      {/* Shortlist Drawer */}
      <ShortlistPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
