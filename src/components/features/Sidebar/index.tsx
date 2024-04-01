"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { CRoute } from "@/constants/route";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-fit lg:w-sidebar fixed top-0 left-0 bottom-0 flex max-sm:hidden flex-col justify-between bg-dark-1 text-white px-4 pb-6 pt-28">
      <div className="flex flex-col gap-4">
        {CRoute.map((item) => {
          const isActive: boolean =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex justify-start items-center gap-4 p-3.5 rounded-lg",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={item.imgUrl}
                alt={item.label}
                width={22}
                height={22}
              />
              <p className="max-lg:hidden text-lg font-semibold capitalize">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
