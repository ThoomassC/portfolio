import React from "react";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Tu peux ajouter un Header ici si besoin */}
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
