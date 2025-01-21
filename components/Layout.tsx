"use client";

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center py-10"
      style={{
        background: "linear-gradient(135deg, #4A148C, #1DE9B6)",
        color: "white",
      }}
    >
      <div className="container mx-auto px-6">{children}</div>
    </main>
  );
};
