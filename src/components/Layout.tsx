import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../UI/LoadingSpinner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { loading: authLoading } = useAuth();
  const isSearchPage = location.pathname === "/search";

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {!isSearchPage && <Footer />}
    </div>
  );
};

export default Layout;
