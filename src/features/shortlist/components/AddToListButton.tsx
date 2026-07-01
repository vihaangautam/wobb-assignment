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
        "inline-flex items-center justify-center gap-2 font-mono font-bold rounded-md transition-all duration-150 cursor-pointer active:translate-y-0.5 active:shadow-sm",
        "focus:outline-none focus:ring-3 focus:ring-accent",
        size === "sm" && "px-4 py-2 text-xs border-2 border-border shadow-sm hover:-translate-y-0.5 hover:shadow-md",
        size === "md" && "px-6 py-3 text-sm w-full border-2 border-border shadow-md hover:-translate-y-0.5 hover:shadow-lg",
        isInList
          ? "bg-accent text-h"
          : "bg-white dark:bg-dark-100 text-h hover:bg-bg-secondary"
      )}
    >
      <Heart
        size={size === "sm" ? 12 : 14}
        className={clsx(
          "transition-all duration-150",
          isInList
            ? "fill-h text-h scale-110"
            : "text-gray-500 dark:text-gray-400"
        )}
      />
      <span className="uppercase tracking-wider">{isInList ? "SHORTLISTED" : "ADD TO LIST"}</span>
    </button>
  );
}
