"use client";

import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
