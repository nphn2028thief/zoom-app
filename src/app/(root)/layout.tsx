import { Metadata } from "next";
import { ReactNode } from "react";

import StreamClientProvider from "@/providers/StreamClientProvider";

export const metadata: Metadata = {
  title: "Zoom App",
  description: "Video Conferencing App",
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
