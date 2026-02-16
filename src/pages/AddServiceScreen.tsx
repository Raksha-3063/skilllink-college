import { useState } from "react";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const categories = ["Notes", "Tutoring", "Design", "Coding", "PPT"];

const AddServiceScreen = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    toast.success("Service added successfully!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card border-b border-border px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Add Service</h1>
      </div>

      <div className="px-4 py-5">
        <div className="flex flex-col gap-4 animate-fade-in">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Service Title</label>
            <Input placeholder="e.g. UI/UX Design" className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
            <Textarea placeholder="Describe your service..." className="min-h-[100px] rounded-xl resize-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Price (₹)</label>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="200" type="number" className="h-11 rounded-xl pl-9" />
            </div>
          </div>
          <Button className="mt-2 h-12 rounded-xl text-base font-semibold" onClick={handleSubmit}>
            Add Service
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AddServiceScreen;
