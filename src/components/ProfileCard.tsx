import { Link } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
}

export function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  return (
    <Link
      to={`/profile/${profile.username}?platform=${platform}`}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-full max-w-[700px] no-underline text-inherit"
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname}'s profile photo`}
        className="w-12 h-12 rounded-full"
      />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      {/* TODO: Add to List button will be implemented in Part 2 */}
      <button
        disabled
        className="px-3 py-1 bg-gray-300 text-gray-500 text-sm rounded cursor-not-allowed"
        onClick={(e) => e.stopPropagation()}
      >
        Add to List
      </button>
    </Link>
  );
}
