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
      return "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-dark-300 hover:bg-gray-50 dark:hover:bg-dark-100 bg-white dark:bg-dark-50";
    }
    switch (p) {
      case "instagram":
        return "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white border-transparent shadow-md shadow-pink-500/10";
      case "youtube":
        return "bg-red-600 text-white border-transparent shadow-md shadow-red-600/10";
      case "tiktok":
        return "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md shadow-black/10 dark:shadow-white/5";
      default:
        return "bg-purple-600 text-white border-transparent";
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto mb-8">
      {/* Platform Tabs */}
      <div className="flex flex-wrap gap-3 justify-center w-full">
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={clsx(
                "flex items-center gap-2 px-5 py-2.5 rounded-2xl border font-semibold text-sm transition-all duration-200 cursor-pointer hover:scale-102 active:scale-98",
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
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by username or name..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-50 text-h placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 shadow-sm focus:shadow-md transition-all duration-200 text-sm"
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
