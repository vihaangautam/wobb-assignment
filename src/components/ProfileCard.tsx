import React from "react";
import { Link } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { AddToListButton } from "@/features/shortlist/components/AddToListButton";
import { Users, BarChart3 } from "lucide-react";
import clsx from "clsx";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
}

export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const platformRing = (p: Platform) => {
    switch (p) {
      case "instagram":
        return "ring-2 ring-pink-500/50 ring-offset-2 dark:ring-offset-dark-50";
      case "youtube":
        return "ring-2 ring-red-500/50 ring-offset-2 dark:ring-offset-dark-50";
      case "tiktok":
        return "ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-dark-50";
      default:
        return "";
    }
  };

  return (
    <Link
      to={`/profile/${profile.username}?platform=${platform}`}
      className={clsx(
        "flex flex-col sm:flex-row items-center gap-4 p-5 w-full bg-white dark:bg-dark-50 border border-gray-200/80 dark:border-dark-300 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-all duration-200 no-underline text-inherit group",
        "relative overflow-hidden"
      )}
    >
      {/* Platform background gradient subtle accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Avatar Container */}
      <div className="relative flex-shrink-0">
        <img
          src={profile.picture}
          alt={`${profile.fullname}'s profile photo`}
          className={clsx(
            "w-16 h-16 rounded-full object-cover border border-gray-100 dark:border-dark-200 shadow-inner transition-transform duration-300 group-hover:scale-105",
            platformRing(platform)
          )}
          loading="lazy"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-1 text-center sm:text-left min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1.5">
          <span className="font-bold text-h text-base truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            @{profile.username}
          </span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
          {profile.fullname}
        </div>

        {/* Stats Grid */}
        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-gray-400" />
            <span>{formatFollowers(profile.followers)} followers</span>
          </div>
          {profile.engagement_rate !== undefined && (
            <div className="flex items-center gap-1">
              <BarChart3 size={14} className="text-gray-400" />
              <span>{formatEngagementRate(profile.engagement_rate)} ER</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0 flex justify-center sm:justify-end">
        <AddToListButton
          profile={{
            username: profile.username,
            fullName: profile.fullname,
            platform,
            avatarUrl: profile.picture,
            followers: profile.followers,
            isVerified: profile.is_verified,
          }}
          size="sm"
        />
      </div>
    </Link>
  );
});
