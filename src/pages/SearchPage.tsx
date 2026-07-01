import { useState, useMemo } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useDebounce } from "@/hooks/useDebounce";
import { Sparkles } from "lucide-react";

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
      <section className="text-center max-w-4xl mx-auto mb-10 mt-6 animate-fade-in px-4">
        <div className="gofundme-badge mb-4">
          <Sparkles size={12} />
          <span>Discover Top Creators</span>
        </div>
        <h1 className="text-3xl font-black text-h tracking-tight mb-4 sm:text-4xl md:text-5xl leading-tight">
          Successful collaborations start here
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Search, filter, and shortlist premium creators across Instagram, YouTube, and TikTok in just a few clicks.
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
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="gofundme-badge bg-accent-light text-accent text-xs">
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
