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
        "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-50",
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-3 text-sm w-full",
        isInList
          ? "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          : "bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-300 hover:bg-gray-200 dark:hover:bg-dark-300"
      )}
    >
      <Heart
        size={size === "sm" ? 14 : 16}
        className={clsx(
          "transition-all duration-200",
          isInList
            ? "fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400 scale-110"
            : "text-gray-500 dark:text-gray-400"
        )}
      />
      <span>{isInList ? "Shortlisted" : "Add to List"}</span>
    </button>
  );
}
