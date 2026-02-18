import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import AddServiceScreen from "./pages/AddServiceScreen";
import InsightsScreen from "./pages/InsightsScreen";
import ChatScreen from "./pages/ChatScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ProfileSetupScreen from "./pages/ProfileSetupScreen";
import TeamFinderScreen from "./pages/TeamFinderScreen";
import EventsScreen from "./pages/EventsScreen";
import GrowthAnalyticsScreen from "./pages/GrowthAnalyticsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mx-auto max-w-md min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile-setup" element={<ProfileSetupScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/add-service" element={<AddServiceScreen />} />
            <Route path="/teams" element={<TeamFinderScreen />} />
            <Route path="/events" element={<EventsScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/growth-analytics" element={<GrowthAnalyticsScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
