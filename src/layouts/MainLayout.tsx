import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
