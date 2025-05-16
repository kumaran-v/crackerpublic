
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import { logPageVisit } from "./lib/googleSheets";
import { PageVisitData } from "./lib/types";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

// Page visit logger component
const PageVisitLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    const pageVisitData: PageVisitData = {
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      referrer: document.referrer || null
    };
    
    logPageVisit(pageVisitData).catch(() => {
      // Silent catch for analytics
    });
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <PageVisitLogger />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
