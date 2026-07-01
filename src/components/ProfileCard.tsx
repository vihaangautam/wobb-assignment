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
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link
      to={`/profile/${profile.username}?platform=${platform}`}
      className={clsx(
        "brutalist-card flex flex-col sm:flex-row items-center gap-5 p-5 w-full no-underline text-inherit group",
        "relative overflow-hidden"
      )}
    >
      {/* Avatar Container */}
      <div className="relative flex-shrink-0 mb-2 sm:mb-0">
        {imgError ? (
          <div
            className="w-16 h-16 rounded-md bg-accent-light text-h flex items-center justify-center font-mono font-bold text-xl border-2 border-border shadow-sm transition-transform duration-300 group-hover:scale-105"
          >
            {profile.fullname ? profile.fullname.charAt(0) : profile.username.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img
            src={profile.picture}
            alt={`${profile.fullname}'s profile photo`}
            onError={() => setImgError(true)}
            className="w-16 h-16 rounded-md object-cover border-2 border-border transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 brutalist-badge text-[8px] scale-90 py-0.5 px-1.5 bg-accent text-h border-border font-bold">
          {platform}
        </span>
      </div>

      {/* Profile Details */}
      <div className="flex-1 text-center sm:text-left min-w-0 sm:pl-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
          <span className="font-mono font-bold text-h text-base truncate group-hover:text-accent transition-colors duration-100">
            @{profile.username}
          </span>
          <div className="flex justify-center sm:justify-start">
            <VerifiedBadge verified={profile.is_verified} />
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 tracking-wide">
          {profile.fullname}
        </div>

        {/* Stats Grid */}
        <div className="flex items-center justify-center sm:justify-start gap-3 text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-gray-400" />
            <span>{formatFollowers(profile.followers)}</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          {profile.engagement_rate !== undefined && (
            <div className="flex items-center gap-1.5">
              <BarChart3 size={12} className="text-gray-400" />
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
