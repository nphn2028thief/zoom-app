import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import QueryClientProvider from "@/providers/QueryClientProvider";

import { Toaster } from "@/components/ui/toaster";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
        },
        elements: {
          logoBox: {
            justifyContent: "center",
          },
          headerTitle: {
            textAlign: "center",
          },
          headerSubtitle: {
            textAlign: "center",
          },
          footer: {
            justifyContent: "center",
          },
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
          <QueryClientProvider>
            <main>{children}</main>
            <Toaster />
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
