import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ServiceCard from "@/components/ServiceCard";
import { mockServices } from "@/data/mockData";

const filters = ["All", "Design", "Tutoring", "Coding", "Notes", "PPT"];

const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = mockServices.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.service.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 pb-3 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-foreground">SkillBridge</h1>
          <button className="rounded-full bg-muted p-2">
            <SlidersHorizontal size={18} className="text-muted-foreground" />
          </button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services, students, colleges..."
            className="h-10 rounded-xl pl-9 bg-muted border-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filters */}
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              college={service.college}
              avatar={service.avatar}
              service={service.service}
              price={service.price}
              onViewProfile={() => navigate("/profile")}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
