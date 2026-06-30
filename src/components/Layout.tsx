import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useShortlistStore } from "@/features/shortlist/store/useShortlistStore";
import { ShortlistPanel } from "@/features/shortlist/components/ShortlistPanel";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const profileCount = useShortlistStore((s) => s.profiles.length);

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-900 no-underline">
          Influencer Search
        </Link>
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          aria-label={`Open shortlist — ${profileCount} profiles`}
        >
          <Heart size={16} className={profileCount > 0 ? "fill-purple-600 text-purple-600" : "text-gray-500"} />
          Shortlist
          {profileCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded-full">
              {profileCount}
            </span>
          )}
        </button>
      </header>
      {title && <h1 className="text-2xl mt-2">{title}</h1>}
      <main>{children}</main>

      <ShortlistPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
