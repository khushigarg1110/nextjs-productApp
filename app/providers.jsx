"use client";

import { Provider } from "react-redux";
import { store } from "@/features/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer /> 
      </QueryClientProvider>
    </Provider>
  );
}