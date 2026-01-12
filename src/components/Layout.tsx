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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!isSearchPage && <Footer />}
    </div>
  );
};

export default Layout;
