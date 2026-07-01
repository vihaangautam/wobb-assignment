import { useState, useMemo } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useDebounce } from "@/hooks/useDebounce";
import { Sparkles, Compass } from "lucide-react";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce query to optimize filtering performance
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  // Memoize extracted profiles per platform
  const allProfiles = useMemo(() => {
    return extractProfiles(platform);
  }, [platform]);

  // Memoize filtered profiles based on debounced search query
  const filtered = useMemo(() => {
    return filterProfiles(allProfiles, debouncedSearchQuery);
  }, [allProfiles, debouncedSearchQuery]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 py-6 animate-fade-in border-b-2 border-border pb-10">
        <div className="max-w-2xl text-left">
          <div className="brutalist-badge bg-accent-light text-accent mb-4">
            <Sparkles size={12} />
            <span>DISCOVER CREATORS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-h tracking-tighter mb-4">
            Find the Perfect <span className="text-accent underline decoration-4 decoration-border">Influencer</span>
          </h1>
          <p className="font-mono text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            SEARCH. FILTER. SHORTLIST. SHIP. GET REAL CREATORS ON DAY ONE.
          </p>
        </div>
        {/* Floating Brutalist Tags Panel */}
        <div className="flex flex-wrap gap-2.5 max-w-xs justify-start md:justify-end">
          <span className="brutalist-badge -rotate-2 hover:rotate-0 transition-transform bg-accent text-h">#Instagram</span>
          <span className="brutalist-badge rotate-3 hover:rotate-0 transition-transform bg-white dark:bg-dark-100 text-h">#YouTube</span>
          <span className="brutalist-badge -rotate-1 hover:rotate-0 transition-transform bg-white dark:bg-dark-100 text-h">#TikTok</span>
          <span className="brutalist-badge rotate-2 hover:rotate-0 transition-transform bg-accent-light text-accent">#Discovery</span>
          <span className="brutalist-badge -rotate-3 hover:rotate-0 transition-transform bg-white dark:bg-dark-100 text-h">#Shortlist</span>
          <span className="brutalist-badge rotate-1 hover:rotate-0 transition-transform bg-accent text-h">#Campaign</span>
        </div>
      </section>

      {/* Filter and Search Box */}
      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Stats Counter */}
      <div className="flex items-center justify-center gap-2 mb-8 font-mono text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        <Compass size={14} className="text-accent" />
        <span>
          SHOWING {filtered.length} OF {allProfiles.length} CREATORS
        </span>
      </div>

      {/* Grid List */}
      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={debouncedSearchQuery}
      />
    </Layout>
  );
}
