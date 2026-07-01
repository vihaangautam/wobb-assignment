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
      className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-100 dark:border-dark-200 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-all duration-200 group animate-fade-in"
    >
      {imgError ? (
        <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-base border border-purple-200 dark:border-purple-800 flex-shrink-0">
          {profile.fullName ? profile.fullName.charAt(0) : profile.username.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={profile.avatarUrl}
          alt={`${profile.fullName}'s profile photo`}
          onError={() => setImgError(true)}
          className="w-11 h-11 rounded-full object-cover border border-gray-100 dark:border-dark-300 flex-shrink-0"
          loading="lazy"
        />
      )}
      <div className="flex-1 min-w-0 text-left">
        <div className="font-bold text-sm text-h truncate mb-0.5">
          {profile.fullName}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5">
          <span className="font-medium">@{profile.username}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="capitalize">{profile.platform}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(profile.username)}
        className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
        aria-label={`Remove ${profile.fullName} from shortlist`}
      >
        <Trash2 size={16} />
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
          className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark-50 border-l border-gray-200 dark:border-dark-300 shadow-2xl z-50",
          "transform transition-transform duration-300 ease-in-out",
          "flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shortlisted profiles"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-dark-300">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-black text-h m-0 tracking-tight">
              Shortlist ({profiles.length})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {profiles.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                aria-label="Clear all shortlisted profiles"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
              aria-label="Close shortlist panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {profiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-100 rounded-full">
                <Users size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-h mb-1">
                  Your shortlist is empty
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[240px] mx-auto leading-relaxed">
                  Start adding creators from the dashboard or profile detail pages.
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3 list-none p-0 m-0">
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
