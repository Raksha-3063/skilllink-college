import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/skillbridge-logo.png";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      toast.error("Please fill in required fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, college, course },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your email to verify.");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-6 flex flex-col items-center gap-2">
            <img src={logo} alt="Nexora" className="h-14 w-14 rounded-xl" />
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">Join Nexora – The Student Growth Network</p>
          </div>

          <div className="flex flex-col gap-3.5">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
              <Input placeholder="John Doe" className="h-11 rounded-xl" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
              <Input placeholder="you@college.edu" type="email" className="h-11 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">College Name</label>
              <Input placeholder="IIT Delhi" className="h-11 rounded-xl" value={college} onChange={(e) => setCollege(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Course / Year</label>
              <Input placeholder="B.Tech CSE, 3rd Year" className="h-11 rounded-xl" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  placeholder="Create password"
                  type={showPassword ? "text" : "password"}
                  className="h-11 rounded-xl pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              className="mt-1 h-12 rounded-xl text-base font-semibold"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
