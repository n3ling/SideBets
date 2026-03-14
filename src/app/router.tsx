import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";

const LandingPage = lazy(() =>
  import("../features/landing/LandingPage").then((m) => ({ default: m.default }))
);
const LoginPage = lazy(() => import("../features/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import("../features/auth/SignupPage").then((m) => ({ default: m.SignupPage })));
const HomePage = lazy(() => import("../features/home/HomePage").then((m) => ({ default: m.default })));
const JamsListPage = lazy(() => import("../features/jams/JamsListPage").then((m) => ({ default: m.JamsListPage })));
const JamPage = lazy(() => import("../features/jams/JamPage").then((m) => ({ default: m.JamPage })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
      <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden />
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(<LandingPage />) },
  { path: "/login", element: withSuspense(<LoginPage />) },
  { path: "/signup", element: withSuspense(<SignupPage />) },
  {
    path: "/me",
    element: withSuspense(
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/me/jamslist",
    element: withSuspense(
      <ProtectedRoute>
        <JamsListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jams/:jamId",
    element: withSuspense(
      <ProtectedRoute>
        <JamPage />
      </ProtectedRoute>
    ),
  },
]);
