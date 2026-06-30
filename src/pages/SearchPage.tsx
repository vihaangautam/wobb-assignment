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
      <section className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-xs font-bold mb-4">
          <Sparkles size={12} />
          <span>Discover Top Creators</span>
        </div>
        <h1 className="text-4xl font-extrabold text-h tracking-tight mb-4 sm:text-5xl bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Find the Perfect Influencer
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Search, filter, and shortlist premium creators across Instagram, YouTube, and TikTok in a single click.
        </p>
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
      <div className="flex items-center justify-center gap-2 mb-6 text-sm font-semibold text-gray-500 dark:text-gray-400">
        <Compass size={16} className="text-purple-500" />
        <span>
          Showing {filtered.length} of {allProfiles.length} creators
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
