import { X, Trash2, Users } from "lucide-react";
import { useShortlistStore } from "../store/useShortlistStore";
import clsx from "clsx";

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
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50",
          "transform transition-transform duration-300 ease-in-out",
          "flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shortlisted profiles"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-purple-600" />
            <h2 className="text-lg font-semibold m-0">
              Shortlist ({profiles.length})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {profiles.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                aria-label="Clear all shortlisted profiles"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close shortlist panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {profiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-3">
              <Users size={48} strokeWidth={1} />
              <p className="text-sm">
                No profiles shortlisted yet.
                <br />
                Click "Add to List" on any profile to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-2 list-none p-0 m-0">
              {profiles.map((profile) => (
                <li
                  key={profile.username}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.fullName}'s profile photo`}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-medium text-sm truncate">
                      {profile.fullName}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      @{profile.username} · {profile.platform}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProfile(profile.username)}
                    className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label={`Remove ${profile.fullName} from shortlist`}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
