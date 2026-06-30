import { Heart } from "lucide-react";
import { useShortlistStore } from "../store/useShortlistStore";
import type { ShortlistedProfile } from "../store/useShortlistStore";
import clsx from "clsx";

interface AddToListButtonProps {
  profile: ShortlistedProfile;
  size?: "sm" | "md";
}

export function AddToListButton({ profile, size = "sm" }: AddToListButtonProps) {
  const addProfile = useShortlistStore((s) => s.addProfile);
  const removeProfile = useShortlistStore((s) => s.removeProfile);
  const isInList = useShortlistStore((s) => s.isShortlisted(profile.username));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInList) {
      removeProfile(profile.username);
    } else {
      addProfile(profile);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isInList ? `Remove ${profile.fullName} from shortlist` : `Add ${profile.fullName} to shortlist`}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        isInList
          ? "bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200"
          : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
      )}
    >
      <Heart
        size={size === "sm" ? 14 : 16}
        className={clsx(
          "transition-all duration-200",
          isInList ? "fill-purple-600 text-purple-600" : "text-gray-500"
        )}
      />
      {isInList ? "Shortlisted" : "Add to List"}
    </button>
  );
}
