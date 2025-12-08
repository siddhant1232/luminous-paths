import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";
import NotFound from "./NotFound";
import Gallary from "./gallary";
import Documentaion from "./doucmentaion";
import Gallery from "./gallary";


const queryClient = new QueryClient();

const Background = () => (
  <div
    style={{
      backgroundImage: `url('/background.jpg')`,     // CHANGE THIS PATH
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",                 // makes it FIXED
      minHeight: "100vh",
      width: "100%",
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallary" element={<Gallery/>} />
            <Route path="/docs" element={<Documentaion />} />
            {/* Add all routes above this */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default Background;
