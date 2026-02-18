import { useState } from "react";
import { Search, Plus, Users, MessageCircle, Calendar, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { mockTeams } from "@/data/mockData";
import { toast } from "sonner";

const domains = ["All", "AI", "Web", "App", "ML", "Design"];

const TeamFinderScreen = () => {
  const [search, setSearch] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinedTeams, setJoinedTeams] = useState<number[]>([]);

  const filtered = mockTeams.filter((t) => {
    const matchSearch =
      t.hackathon.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchDomain = activeDomain === "All" || t.domain === activeDomain;
    return matchSearch && matchDomain;
  });

  const handleJoin = (id: number) => {
    if (joinedTeams.includes(id)) return;
    setJoinedTeams([...joinedTeams, id]);
    toast.success("Join request sent!");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 pb-3 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Team Finder</h1>
            <p className="text-xs text-muted-foreground">Find your dream hackathon team</p>
          </div>
          <Button size="sm" className="rounded-full gap-1.5" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Create
          </Button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teams or skills..."
            className="h-10 rounded-xl pl-9 bg-muted border-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDomain(d)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeDomain === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {filtered.map((team) => {
          const joined = joinedTeams.includes(team.id);
          return (
            <div key={team.id} className="rounded-xl bg-card p-4 card-shadow animate-fade-in">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-foreground leading-tight">{team.hackathon}</h3>
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                  {team.domain}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <img src={team.avatar} alt={team.createdBy} className="h-6 w-6 rounded-full object-cover bg-muted" />
                <span className="text-xs text-muted-foreground">
                  {team.createdBy} · {team.college}
                </span>
              </div>
              <p className="text-xs text-foreground leading-relaxed mb-3">{team.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {team.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users size={14} />
                    <span className="font-semibold text-foreground">{team.joined}</span>/{team.teamSize}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={14} />
                    {team.deadline}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full h-8 px-3 gap-1 text-xs">
                    <MessageCircle size={14} /> Chat
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full h-8 px-3 text-xs"
                    disabled={joined || team.joined >= team.teamSize}
                    onClick={() => handleJoin(team.id)}
                  >
                    {joined ? "Requested" : team.joined >= team.teamSize ? "Full" : "Join"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showCreateModal && <CreateTeamModal onClose={() => setShowCreateModal(false)} />}
      <BottomNav />
    </div>
  );
};

const CreateTeamModal = ({ onClose }: { onClose: () => void }) => {
  const handleCreate = () => {
    toast.success("Team post created!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40">
      <div className="w-full max-w-md animate-slide-up rounded-t-2xl bg-card p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-foreground">Create Team Post</h3>
          <button onClick={onClose}>
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Hackathon Name</label>
            <Input placeholder="e.g. Smart India Hackathon 2026" className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Required Skills</label>
            <Input placeholder="e.g. React, Python, ML (comma separated)" className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Team Size</label>
            <Input placeholder="e.g. 5" type="number" className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
            <Textarea placeholder="What are you building?" className="min-h-[80px] rounded-xl resize-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Deadline</label>
            <Input type="date" className="h-11 rounded-xl" />
          </div>
          <Button className="h-11 rounded-xl font-semibold" onClick={handleCreate}>
            Create Team Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamFinderScreen;
