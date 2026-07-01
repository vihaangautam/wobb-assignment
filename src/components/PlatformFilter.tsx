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

  const getPlatformColors = (isSelected: boolean) => {
    if (!isSelected) {
      return "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-dark-300 hover:bg-gray-50 dark:hover:bg-dark-100 bg-white dark:bg-dark-50";
    }
    return "bg-accent text-white border-transparent shadow-sm shadow-accent/20";
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto mb-10">
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
                "flex items-center gap-2.5 px-6 py-2.5 rounded-full border font-bold text-xs uppercase transition-all duration-200 cursor-pointer hover:scale-102 active:scale-98 shadow-sm",
                getPlatformColors(isSelected)
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
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by name..."
          className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-50 text-h placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm focus:shadow-md transition-all duration-200 text-sm font-medium"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
            aria-label="Clear search query"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
