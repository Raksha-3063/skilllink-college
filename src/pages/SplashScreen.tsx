import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/skillbridge-logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      navigate(session ? "/home" : "/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center splash-gradient">
      <div className="animate-scale-in flex flex-col items-center gap-4">
        <img src={logo} alt="Nexora" className="h-24 w-24 rounded-2xl" />
        <h1 className="text-3xl font-bold text-primary-foreground tracking-tight">
          Nexora
        </h1>
        <p className="text-primary-foreground/70 text-sm font-medium">
          Grow Beyond Limits
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
