import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {!isSearchPage && <Footer />}
    </div>
  );
};

export default Layout;
