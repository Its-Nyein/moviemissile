import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/authProvider";
import "./index.css";
import AuthForm from "./pages/auth/AuthForm";
import DetailsPage from "./pages/DetailsPage";
import Home from "./pages/Home";
import Movies from "./pages/movies/Movies";
import NotFound from "./pages/NotFound";
import { PersonDetails } from "./pages/person/PersonDetails";
import Search from "./pages/search/Search";
import Shows from "./pages/shows/Shows";
import Watchlist from "./pages/Watchlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
      {
        path: "/person/:id",
        element: <PersonDetails />,
      },
      {
        path: "/login",
        element: <AuthForm />,
      },
      {
        path: "/watchlist",
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="moviemissile-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
