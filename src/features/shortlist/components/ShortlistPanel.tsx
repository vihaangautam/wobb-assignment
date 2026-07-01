import { useState } from "react";
import { X, Trash2, Users } from "lucide-react";
import { useShortlistStore } from "../store/useShortlistStore";
import type { ShortlistedProfile } from "../store/useShortlistStore";
import clsx from "clsx";

interface ShortlistItemProps {
  profile: ShortlistedProfile;
  onRemove: (username: string) => void;
}

function ShortlistItem({ profile, onRemove }: ShortlistItemProps) {
  const [imgError, setImgError] = useState(false);
  return (
    <li
      className="flex items-center gap-3.5 p-3 bg-white dark:bg-dark-100 border-2 border-border rounded-md shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-100 group animate-fade-in"
    >
      {imgError ? (
        <div className="w-10 h-10 rounded-md bg-accent-light text-h flex items-center justify-center font-mono font-bold text-sm border-2 border-border flex-shrink-0">
          {profile.fullName ? profile.fullName.charAt(0) : profile.username.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={profile.avatarUrl}
          alt={`${profile.fullName}'s profile photo`}
          onError={() => setImgError(true)}
          className="w-10 h-10 rounded-md object-cover border-2 border-border flex-shrink-0"
          loading="lazy"
        />
      )}
      <div className="flex-1 min-w-0 text-left">
        <div className="font-bold text-sm text-h truncate mb-0.5">
          {profile.fullName}
        </div>
        <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5 uppercase font-semibold">
          <span>@{profile.username}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-accent">{profile.platform}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(profile.username)}
        className="brutalist-btn p-1.5 flex items-center justify-center rounded-sm text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 active:translate-y-0.5 active:shadow-none"
        aria-label={`Remove ${profile.fullName} from shortlist`}
      >
        <Trash2 size={14} />
      </button>
    </li>
  );
}

interface ShortlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortlistPanel({ isOpen, onClose }: ShortlistPanelProps) {
  const profiles = useShortlistStore((s) => s.profiles);
  const removeProfile = useShortlistStore((s) => s.removeProfile);
  const clearAll = useShortlistStore((s) => s.clearAll);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-md bg-bg dark:bg-dark-50 border-l-3 border-border shadow-2xl z-50",
          "transform transition-transform duration-250 ease-in-out",
          "flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shortlisted profiles"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-border bg-bg">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-accent" />
            <h2 className="text-sm font-mono font-bold text-h m-0 tracking-wider uppercase">
              SHORTLIST ({profiles.length})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {profiles.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="font-mono font-bold text-xs uppercase text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:underline tracking-wider bg-transparent border-0 cursor-pointer"
                aria-label="Clear all shortlisted profiles"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="brutalist-btn p-1.5 flex items-center justify-center"
              aria-label="Close shortlist panel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {profiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500 gap-5">
              <div className="p-4 bg-white dark:bg-dark-100 border-2 border-border rounded-md shadow-sm">
                <Users size={28} className="text-accent" strokeWidth={2} />
              </div>
              <div className="max-w-[260px]">
                <p className="font-mono text-xs font-bold text-h uppercase tracking-wider mb-2">
                  SHORTLIST IS EMPTY
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-mono uppercase tracking-wide">
                  ADD CREATORS FROM THE DASHBOARD TO START YOUR CAMPAIGN.
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3.5 list-none p-0 m-0">
              {profiles.map((profile) => (
                <ShortlistItem
                  key={profile.username}
                  profile={profile}
                  onRemove={removeProfile}
                />
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
