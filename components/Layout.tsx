import React from "react";
import Nav from "./Nav";
import SideNav from "./SideNav";

interface LayoutProps {
  children: React.ReactNode;
  onSelectCategory: (category: string) => void;
}

export default function Layout({ children, onSelectCategory }: LayoutProps) {
  return (
    <div>
      <Nav onSelectCategory={onSelectCategory} />
      <SideNav onSelectCategory={onSelectCategory} />
      <div className="p-4 sm:ml-64 mt-20">{children}</div>
    </div>
  );
}
