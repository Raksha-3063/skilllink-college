import { useState } from "react";
import { ArrowLeft, TrendingUp, IndianRupee, Users, Trophy, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import BottomNav from "@/components/BottomNav";
import { mockGrowthData } from "@/data/mockData";

const periods = ["Weekly", "Monthly", "Yearly"];

const GrowthAnalyticsScreen = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState("Monthly");
  const { monthly, stats } = mockGrowthData;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card border-b border-border px-4 py-3">
        <button onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Growth Analytics</h1>
      </div>

      <div className="px-4 py-4">
        {/* Period Toggle */}
        <div className="flex gap-1 rounded-xl bg-muted p-1 mb-4">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                activePeriod === p ? "bg-card text-foreground card-shadow" : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard icon={<TrendingUp size={18} className="text-primary" />} label="Services Completed" value={stats.servicesCompleted.toString()} />
          <StatCard icon={<IndianRupee size={18} className="text-success" />} label="Total Earnings" value={`₹${stats.totalEarnings.toLocaleString()}`} />
          <StatCard icon={<Users size={18} className="text-primary" />} label="New Connections" value={stats.newConnections.toString()} />
          <StatCard icon={<Trophy size={18} className="text-warning" />} label="Hackathons Joined" value={stats.hackathonsJoined.toString()} />
        </div>

        {/* Monthly Goal */}
        <div className="rounded-xl bg-card p-4 card-shadow mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">Monthly Goal</h3>
            </div>
            <span className="text-sm font-bold text-primary">{stats.goalProgress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${stats.goalProgress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Keep going! You're almost at your monthly target.</p>
        </div>

        {/* Growth Score Line Chart */}
        <div className="rounded-xl bg-card p-4 card-shadow mb-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Growth Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(214, 32%, 91%)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(217, 91%, 53%)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "hsl(217, 91%, 53%)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Projects vs Hackathons Bar Chart */}
        <div className="rounded-xl bg-card p-4 card-shadow">
          <h3 className="text-sm font-bold text-foreground mb-3">Projects vs Hackathons</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(214, 32%, 91%)",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="projects" fill="hsl(217, 91%, 53%)" radius={[4, 4, 0, 0]} name="Projects" />
              <Bar dataKey="hackathons" fill="hsl(217, 91%, 75%)" radius={[4, 4, 0, 0]} name="Hackathons" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl bg-card p-3.5 card-shadow">
    <div className="mb-2">{icon}</div>
    <p className="text-lg font-bold text-foreground">{value}</p>
    <p className="text-[11px] text-muted-foreground">{label}</p>
  </div>
);

export default GrowthAnalyticsScreen;
