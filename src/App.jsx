import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/Protected-route";
import { ThemeProvider } from "./components/ui/theme-provider";
import { SkeletonCard } from "./layout/SkeletonCard";

const Onboarding = lazy(() => import("./Pages/Onboarding"));
const JobListing = lazy(() => import("./Pages/JobListing"));
const Jobs = lazy(() => import("./Pages/Jobs"));
const PostJobs = lazy(() => import("./Pages/PostJobs"));
const LandingPage = lazy(() => import("./Pages/LandingPagge")); // Ensure the path is correct
const AppLayout = lazy(() => import("./layout/Layout"));
const MyJobs = lazy(() => import("./Pages/MyJobs"));
const SavedJobs = lazy(() => import("./Pages/SavedJobs"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/JobListing",
        element: (
          <ProtectedRoute>
            <JobListing />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Jobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/postjobs",
        element: (
          <ProtectedRoute>
            <PostJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <ProtectedRoute>
            <MyJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/savejob",
        element: (
          <ProtectedRoute>
            <SavedJobs />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense
        fallback={
          <SkeletonCard
            skeletonClassName="h-[90vh] w-[90vw] rounded-lg"
            titleSkeletonClassName="h-[90vh] w-[90vw] rounded-lg"
          />
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
