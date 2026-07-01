import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform, ProfileDetailResponse, StatHistoryItem } from "@/types";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { AddToListButton } from "@/features/shortlist/components/AddToListButton";
import {
  ArrowLeft,
  ExternalLink,
  Users,
  BarChart3,
  FileText,
  Heart,
  MessageCircle,
  Eye,
  Activity,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import clsx from "clsx";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "instagram") as Platform;
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-16 bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 rounded-3xl p-8 shadow-sm">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2">Invalid Profile</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The profile username was missing or invalid.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to Search</span>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto flex flex-col gap-8 py-4">
          {/* Back link placeholder */}
          <div className="h-5 w-28 bg-gray-200 dark:bg-dark-300 rounded-lg animate-pulse" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left panel placeholder */}
            <div className="bg-white dark:bg-dark-50 border border-gray-200/80 dark:border-dark-300 rounded-3xl p-6 shadow-sm flex flex-col items-center gap-4 animate-pulse">
              <div className="w-28 h-28 bg-gray-200 dark:bg-dark-300 rounded-full" />
              <div className="h-6 w-36 bg-gray-200 dark:bg-dark-300 rounded-lg" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-dark-300 rounded-lg" />
              <div className="h-16 w-full bg-gray-100 dark:bg-dark-200 rounded-xl" />
              <div className="h-10 w-full bg-gray-200 dark:bg-dark-300 rounded-xl" />
              <div className="h-10 w-full bg-gray-200 dark:bg-dark-300 rounded-xl" />
            </div>
            
            {/* Right panel placeholder */}
            <div className="lg:col-span-2 flex flex-col gap-4 animate-pulse">
              <div className="h-6 w-48 bg-gray-200 dark:bg-dark-300 rounded-lg mb-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-dark-50 border border-gray-200/80 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-dark-300 rounded-xl flex-shrink-0" />
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-3 w-16 bg-gray-200 dark:bg-dark-300 rounded" />
                      <div className="h-6 w-24 bg-gray-200 dark:bg-dark-300 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-16 bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 rounded-3xl p-8 shadow-sm">
          <AlertTriangle className="mx-auto text-yellow-500 mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2 text-h">Profile Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We couldn't load details for user <span className="font-semibold text-h">@{username}</span>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to Search</span>
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const platformBadgeColor = (p: Platform) => {
    switch (p) {
      case "instagram":
        return "bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400";
      case "youtube":
        return "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400";
      case "tiktok":
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
      default:
        return "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400";
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Back navigation */}
        <Link
          to={`/?platform=${platform}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Search</span>
        </Link>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Panel: Creator Profile Info Card */}
          <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 rounded-3xl p-6 shadow-sm text-center flex flex-col items-center">
            
            {/* Avatar with Ring */}
            <div className="relative mb-6">
              <img
                src={user.picture}
                alt={`${user.fullname}'s profile photo`}
                className="w-28 h-28 rounded-full object-cover border-2 border-white dark:border-dark-50 shadow-md ring-4 ring-purple-500/20"
              />
              <span className={clsx(
                "absolute -bottom-1 -right-1 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm",
                platformBadgeColor(platform)
              )}>
                {platform}
              </span>
            </div>

            {/* Names */}
            <h2 className="text-2xl font-black text-h tracking-tight mb-1 flex items-center justify-center gap-1.5">
              <span>@{user.username}</span>
              <VerifiedBadge verified={user.is_verified} />
            </h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              {user.fullname}
            </p>

            {/* Description */}
            {user.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-b border-gray-100 dark:border-dark-200/50 py-4 mb-6 text-left w-full">
                {user.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <AddToListButton
                profile={{
                  username: user.username,
                  fullName: user.fullname,
                  platform,
                  avatarUrl: user.picture,
                  followers: user.followers,
                  isVerified: user.is_verified,
                }}
                size="md"
              />
              
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-200 text-h text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>View profile on platform</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Right Panel: Analytics & Stats Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-black text-h tracking-tight mb-4 flex items-center gap-2">
              <Activity size={18} className="text-purple-500" />
              <span>Performance Analytics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              
              {/* Stat card: Followers */}
              <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Followers</div>
                  <div className="text-2xl font-black text-h">{formatFollowers(user.followers)}</div>
                </div>
              </div>

              {/* Stat card: Engagement Rate */}
              <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Engagement Rate</div>
                  <div className="text-2xl font-black text-h">{formatEngagementRate(user.engagement_rate)}</div>
                </div>
              </div>

              {/* Stat card: Posts Count */}
              {user.posts_count !== undefined && (
                <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Posts</div>
                    <div className="text-2xl font-black text-h">{user.posts_count}</div>
                  </div>
                </div>
              )}

              {/* Stat card: Average Likes */}
              {user.avg_likes !== undefined && (
                <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400 rounded-xl">
                    <Heart size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Average Likes</div>
                    <div className="text-2xl font-black text-h">{formatFollowers(user.avg_likes)}</div>
                  </div>
                </div>
              )}

              {/* Stat card: Average Comments */}
              {user.avg_comments !== undefined && (
                <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Comments</div>
                    <div className="text-2xl font-black text-h">{formatFollowers(user.avg_comments)}</div>
                  </div>
                </div>
              )}

              {/* Stat card: Average Views */}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-300 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 rounded-xl">
                    <Eye size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Average Views</div>
                    <div className="text-2xl font-black text-h">{formatFollowers(user.avg_views)}</div>
                  </div>
                </div>
              )}

              {/* Stat card: Total Engagements */}
            </div>

            {/* Stat History section */}
            {user.stat_history && user.stat_history.length > 0 && (
              <div className="mt-8 bg-white dark:bg-dark-50 border border-gray-200/80 dark:border-dark-300 rounded-3xl p-6 shadow-sm text-left">
                <h3 className="text-lg font-black text-h tracking-tight mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-purple-500" />
                  <span>Growth History</span>
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse text-left">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-dark-300 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        <th className="pb-3 pr-4">Month</th>
                        <th className="pb-3 px-4">Followers</th>
                        <th className="pb-3 pl-4 text-right">Avg Likes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-dark-200/50">
                      {user.stat_history.map((h: StatHistoryItem, i: number) => (
                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-dark-100/30 transition-colors">
                          <td className="py-3 pr-4 font-semibold text-h">{h.month}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{formatFollowers(h.followers)}</td>
                          <td className="py-3 pl-4 text-right text-gray-600 dark:text-gray-300">{formatFollowers(h.avg_likes)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
