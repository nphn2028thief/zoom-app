import Image from "next/image";

import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed inset-0", className)}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading"
          width={48}
          height={48}
        />
      </div>
    </div>
  );
};

export default Loading;
