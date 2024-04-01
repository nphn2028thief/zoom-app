import { ReactNode } from "react";

import Navbar from "@/components/features/Navbar";
import Sidebar from "@/components/features/Sidebar";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="min-h-screen flex flex-col flex-1 px-6 sm:px-14 pt-28 pb-6 max-md:pb-14">
          <main className="w-full text-white">{children}</main>
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
