"use client";

import { useState } from "react";
import QuoteFormContext, { SelectedItem } from "./QuoteContext";



export default function QuoteFormProvider({ children }: { children: React.ReactNode }) {
  const [physio, setPhysio] = useState<SelectedItem | null>(null);
  const [clients, setClients] = useState<SelectedItem[]>([]);
  const [date, setDate] = useState("");

  const addClient = (client: SelectedItem) => {
    setClients((prev) => [...prev, client]);
  };

  const removeClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const addPhysio = (physio: SelectedItem) => {
    setPhysio(physio);
  }

  return (
    <QuoteFormContext.Provider value={{ physio, clients, date, addPhysio, addClient, removeClient, setDate }}>
      {children}
    </QuoteFormContext.Provider>
  );
}
