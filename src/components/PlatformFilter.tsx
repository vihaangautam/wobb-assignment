import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { Search, Youtube, Instagram, Video, X } from "lucide-react";
import clsx from "clsx";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  const getIcon = (p: Platform) => {
    switch (p) {
      case "instagram":
        return <Instagram size={16} />;
      case "youtube":
        return <Youtube size={16} />;
      case "tiktok":
        return <Video size={16} />;
      default:
        return null;
    }
  };

  const getPlatformColors = (p: Platform, isSelected: boolean) => {
    if (!isSelected) {
      return "text-text border-2 border-border bg-white dark:bg-dark-100 hover:bg-bg-secondary shadow-sm hover:-translate-y-0.5 hover:shadow-md";
    }
    switch (p) {
      case "instagram":
        return "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white border-2 border-border shadow-sm hover:-translate-y-0.5";
      case "youtube":
        return "bg-red-600 text-white border-2 border-border shadow-sm hover:-translate-y-0.5";
      case "tiktok":
        return "bg-border text-bg dark:bg-border dark:text-bg border-2 border-border shadow-sm hover:-translate-y-0.5";
      default:
        return "bg-accent text-h border-2 border-border shadow-sm";
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto mb-10">
      {/* Platform Tabs */}
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={clsx(
                "flex items-center gap-2.5 px-6 py-2.5 rounded-md font-mono font-bold text-xs uppercase transition-all duration-150 cursor-pointer active:translate-y-0.5 active:shadow-sm",
                getPlatformColors(p, isSelected)
              )}
            >
              {getIcon(p)}
              <span>{getPlatformLabel(p)}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input Box */}
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="SEARCH CREATORS BY NAME..."
          className="w-full pl-10 pr-10 py-3 rounded-md border-2 border-border bg-white dark:bg-dark-50 text-h placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-accent shadow-sm focus:shadow-md transition-all duration-200 text-xs font-mono uppercase tracking-wider"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
            aria-label="Clear search query"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
