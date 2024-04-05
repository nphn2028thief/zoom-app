import { headers } from "next/headers";
import { ReactNode } from "react";
import { startCase } from "lodash";

import Navbar from "@/components/features/Navbar";
import Sidebar from "@/components/features/Sidebar";

export async function generateMetadata() {
  const headerList = headers();
  const pathname = headerList.get("x-pathname");

  return {
    title: startCase(pathname!.split("/")[1])
      ? `| ${startCase(pathname!.split("/")[1])}`
      : "",
  };
}

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="min-h-screen flex flex-col flex-1 ml-0 sm:ml-small-sidebar lg:ml-sidebar px-6 sm:px-12 pt-28 pb-6 max-md:pb-14">
          <main className="size-full text-white">{children}</main>
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
