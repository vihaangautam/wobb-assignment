import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";

// Lazy load ProfileDetailPage for code-splitting and better initial load performance
const ProfileDetailPage = lazy(() =>
  import("@/pages/ProfileDetailPage").then((module) => ({
    default: module.ProfileDetailPage,
  }))
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-secondary">
            <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-600 rounded-full animate-spin" />
            <p className="text-sm font-semibold text-gray-500 animate-pulse">
              Loading...
            </p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
