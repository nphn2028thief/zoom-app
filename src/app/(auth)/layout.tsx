import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { startCase } from "lodash";

import siteConfig from "@/configs/site";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const pathname = headerList.get("x-pathname");

  return {
    title: startCase(pathname!.split("/")[1]),
    description: siteConfig.description,
    icons: {
      icon: "/icons/logo.svg",
    },
  };
}

function AuthLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}

export default AuthLayout;
