import { Toaster } from "@/components/ui/toaster";
import { lazy } from "react";
const Header = lazy(() => import("../components/Header"));
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="ml-10 mr-10">
        <Header />
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default AppLayout;
