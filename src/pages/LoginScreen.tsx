import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/skillbridge-logo.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-8 flex flex-col items-center gap-3">
            <img src={logo} alt="Nexora" className="h-16 w-16 rounded-xl" />
            <h1 className="text-2xl font-bold text-foreground">Welcome to Nexora</h1>
            <p className="text-sm text-muted-foreground">The Student Growth Network</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <Input
                placeholder="you@college.edu"
                type="email"
                className="h-12 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  className="h-12 rounded-xl pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              className="h-12 rounded-xl text-base font-semibold"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
