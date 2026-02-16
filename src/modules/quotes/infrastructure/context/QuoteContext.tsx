import { createContext } from "react";

export interface SelectedItem {
  id: string;
  name: string;
}

interface QuoteFormContextType {
  physio: SelectedItem | null;
  clients: SelectedItem[];
  date: string;
  addClient: (client: SelectedItem) => void;
  removeClient: (id: string) => void;
  addPhysio: (physio: SelectedItem) => void;
  setDate: (date: string) => void;
}

const QuoteFormContext = createContext<QuoteFormContextType | null>(null);
QuoteFormContext.displayName = "QuotesContext";

export default QuoteFormContext;