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
        "gofundme-btn font-bold rounded-full transition-all duration-200 cursor-pointer active:scale-98",
        "focus:outline-none focus:ring-2 focus:ring-accent",
        size === "sm" && "px-4 py-1.5 h-8 text-xs",
        size === "md" && "px-6 py-2.5 text-sm w-full",
        isInList
          ? "gofundme-btn-primary"
          : "bg-white dark:bg-dark-100 text-gray-700 dark:text-gray-300 hover:border-accent hover:text-accent"
      )}
    >
      <Heart
        size={size === "sm" ? 12 : 14}
        className={clsx(
          "transition-all duration-200",
          isInList
            ? "fill-white text-white scale-110"
            : "text-gray-400 dark:text-gray-500"
        )}
      />
      <span className="tracking-wide">{isInList ? "Shortlisted" : "Shortlist"}</span>
    </button>
  );
}
