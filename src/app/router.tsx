import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import { SignupPage } from "../features/auth/SignupPage";
import { JamsListPage } from "../features/jams/JamsListPage";
import { JamPage } from "../features/jams/JamPage";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import LandingPage from "../features/landing/LandingPage";
import HomePage from "../features/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/me",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/me/jamslist",
    element: (
      <ProtectedRoute>
        <JamsListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jams/:jamId",
    element: (
      <ProtectedRoute>
        <JamPage />
      </ProtectedRoute>
    ),
  },
]);
