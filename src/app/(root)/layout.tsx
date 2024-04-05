import { Metadata } from "next";
import { ReactNode } from "react";

import siteConfig from "@/configs/site";
import StreamClientProvider from "@/providers/StreamClientProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} %s`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icons/logo.svg",
  },
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full">
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
}

export default RootLayout;
