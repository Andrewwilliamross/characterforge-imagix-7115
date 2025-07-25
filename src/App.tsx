import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DealRoom from "./pages/DealRoom";
import Research from "./pages/Research";
import Workspace from "./pages/Workspace";
import AiConsultant from "./pages/AiConsultant";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-16 flex items-center border-b bg-background px-6">
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/6900b0fd-bb19-4a5d-a3ba-82984b8c5adf.png" 
                    alt="MediaLink" 
                    className="h-8 w-auto"
                  />
                  <h1 className="font-semibold text-foreground text-xl">MediaLink</h1>
                </div>
              </header>
              <main className="flex-1 bg-background">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/deal-room" element={<DealRoom />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/workspace" element={<Workspace />} />
                  <Route path="/ai-consultant" element={<AiConsultant />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
