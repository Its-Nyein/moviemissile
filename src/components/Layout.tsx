import React from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useAuth } from "../context/useAuth";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { loading: authLoading } = useAuth();
  const isSearchPage = location.pathname === "/search";

  if (authLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!isSearchPage && <Footer />}
    </div>
  );
};

export default Layout;
