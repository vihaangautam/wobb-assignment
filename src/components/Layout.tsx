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
    <div className="flex flex-col min-h-screen bg-secondary transition-colors duration-200">
      {/* Sticky Header with Backdrop Blur */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-dark-50/80 border-b border-gray-200 dark:border-dark-300 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-h no-underline tracking-tight group"
          >
            <div className="p-1.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
              <Sparkles size={18} />
            </div>
            <span>
              Wobb<span className="text-purple-600 font-medium">Vibe</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-200 text-h shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Shortlist Trigger Button */}
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2 h-[38px] text-sm font-semibold rounded-xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-200 text-h shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              aria-label={`Open shortlist — ${profileCount} profiles`}
            >
              <Heart
                size={16}
                className={
                  profileCount > 0
                    ? "fill-purple-600 text-purple-600 animate-pulse"
                    : "text-gray-400 dark:text-gray-500"
                }
              />
              <span>Shortlist</span>
              {profileCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-purple-600 rounded-full animate-bounce">
                  {profileCount}
                </span>
              ) : (
                <span className="text-xs text-gray-400 dark:text-gray-500">0</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {title && (
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-h tracking-tight sm:text-4xl">
              {title}
            </h1>
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-dark-300 py-6 bg-white dark:bg-dark-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Wobb. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
              Vibe Coder Intern Assignment
            </span>
          </div>
        </div>
      </footer>

      {/* Shortlist Drawer */}
      <ShortlistPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
