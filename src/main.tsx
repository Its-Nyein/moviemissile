import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/movies/Movies";
import Shows from "./pages/shows/Shows";
import Search from "./pages/search/Search";
import DetailsPage from "./pages/DetailsPage";
import AuthForm from "./pages/auth/AuthForm";
import { AuthProvider } from "./context/authProvider";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import { PersonDetails } from "./pages/person/PersonDetails";

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
