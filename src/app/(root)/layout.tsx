import { ReactNode } from "react";

import StreamClientProvider from "@/providers/StreamClientProvider";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
}

export default RootLayout;
