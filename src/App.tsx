import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import { useThemeStore } from "./store/useThemeStore";

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useThemeStore(); // get from zustand

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Tasks />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
