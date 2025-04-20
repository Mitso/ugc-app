import React from "react";
import { GlobalProvider } from "./context/GlobalContext";
import { Index } from "./Index";

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export default function App({ children }: GlobalContextProviderProps) {
  return (
    <GlobalProvider>
      {children}
      <Index />
    </GlobalProvider>
  );
}