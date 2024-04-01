import { ReactNode } from "react";

import Navbar from "@/components/features/Navbar";
import Sidebar from "@/components/features/Sidebar";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="min-h-screen flex flex-col flex-1 ml-0 sm:ml-small-sidebar lg:ml-sidebar px-6 sm:px-12 pt-28 pb-6 max-md:pb-14">
          <main className="w-full text-white">{children}</main>
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
