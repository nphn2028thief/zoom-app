import Image from "next/image";
import Link from "next/link";

import { EPath } from "@/constants/path";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href={EPath.HOME}
      className={cn("w-fit inline-flex items-center gap-2", className)}
    >
      <Image src="/icons/logo.svg" alt="zoom logo" width={32} height={32} />
      <p className="text-2xl font-extrabold">Zoom</p>
    </Link>
  );
};

export default Logo;
