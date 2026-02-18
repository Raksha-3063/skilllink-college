import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ServiceCard from "@/components/ServiceCard";
import { mockServices } from "@/data/mockData";

const categories = ["All", "Design", "Tutoring", "Coding", "Notes", "PPT"];
const colleges = ["All Colleges", "IIT Delhi", "BITS Pilani", "NIT Trichy", "VIT Vellore", "IIIT Hyderabad", "DTU"];

const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState(1000);
  const navigate = useNavigate();

  const filtered = mockServices.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.service.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeFilter === "All" || s.service.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesCollege = selectedCollege === "All Colleges" || s.college === selectedCollege;
    const matchesRating = s.rating >= minRating;
    const matchesPrice = s.price <= priceRange;
    return matchesSearch && matchesCategory && matchesCollege && matchesRating && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 pb-3 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-foreground">SkillBridge</h1>
          <button
            className={`rounded-full p-2 transition-colors ${showFilters ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} className={showFilters ? "" : "text-muted-foreground"} />
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
        {/* Category Chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((f) => (
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

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="border-b border-border bg-card px-4 py-3 animate-fade-in">
          <div className="flex flex-col gap-3">
            {/* College Dropdown */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">College</label>
              <div className="relative">
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full h-9 rounded-lg bg-muted px-3 text-xs text-foreground appearance-none border-0 focus:ring-1 focus:ring-primary"
                >
                  {colleges.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            {/* Price Range */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Max Price: ₹{priceRange}
              </label>
              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary h-1.5"
              />
            </div>
            {/* Rating Filter */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Min Rating</label>
              <div className="flex gap-1.5">
                {[0, 3, 3.5, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                      minRating === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r === 0 ? "All" : <><Star size={10} className={minRating === r ? "fill-primary-foreground" : ""} />{r}+</>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
              rating={service.rating}
              reviewCount={service.reviewCount}
              onViewProfile={() => navigate("/profile")}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-8">No services found matching your filters.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
