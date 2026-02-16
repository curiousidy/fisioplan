'use client'
import QuoteFormProvider from "@/modules/quotes/infrastructure/context/QuoteProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QuoteFormProvider>
        {children}
    </QuoteFormProvider>
    
  );
}