"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/components/commons/Logo";
import { CRoute } from "@/constants/route";
import { cn } from "@/lib/utils";

const MobileSidebar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="flex">
      <button
        className="flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="icons/menu.svg"
          alt="menu icon"
          width={28}
          height={28}
          className="sm:hidden"
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 z-[99]"
              onClick={handleClose}
            ></motion.div>
            <motion.div
              initial={{ transform: "translateX(100%)", opacity: 0 }}
              animate={{ transform: "translateX(0)", opacity: 1 }}
              exit={{ transform: "translateX(100%)", opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-3/4 fixed top-0 right-0 bottom-0 flex flex-col p-6 text-white bg-dark-1 z-[100]"
            >
              <Logo />
              <div className="h-[calc(100vh-72px)] flex flex-col justify-between overflow-y-auto">
                <section className="flex flex-col gap-6 pt-16 text-white">
                  {CRoute.map((item) => {
                    const isActive: boolean =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                        onClick={handleClose}
                      >
                        <Image
                          src={item.imgUrl}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold capitalize">{item.label}</p>
                      </Link>
                    );
                  })}
                </section>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default MobileSidebar;
