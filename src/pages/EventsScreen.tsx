import { useState } from "react";
import { Calendar, MapPin, Clock, Bookmark, BookmarkCheck, Share2, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { mockEvents } from "@/data/mockData";
import { toast } from "sonner";

const filters = ["All", "Online", "Offline"];
const domainFilters = ["All", "Tech", "MBA", "Creative"];
const priceFilters = ["All", "Free", "Paid"];

const EventsScreen = () => {
  const [modeFilter, setModeFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [savedEvents, setSavedEvents] = useState<number[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  const filtered = mockEvents.filter((e) => {
    const matchMode = modeFilter === "All" || e.mode === modeFilter;
    const matchDomain = domainFilter === "All" || e.domain === domainFilter;
    const matchPrice = priceFilter === "All" || (priceFilter === "Free" ? e.price === "Free" : e.price !== "Free");
    return matchMode && matchDomain && matchPrice;
  });

  const toggleSave = (id: number) => {
    setSavedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
    toast.success(savedEvents.includes(id) ? "Removed from saved" : "Event saved!");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 pb-3 pt-4">
        <h1 className="text-lg font-semibold text-foreground">Events & Workshops</h1>
        <p className="text-xs text-muted-foreground mb-3">Discover opportunities near you</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setModeFilter(f)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                modeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="w-px bg-border" />
          {domainFilters.map((f) => (
            <button
              key={f}
              onClick={() => setDomainFilter(f)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                domainFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="w-px bg-border" />
          {priceFilters.map((f) => (
            <button
              key={f}
              onClick={() => setPriceFilter(f)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                priceFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {filtered.map((event) => {
          const saved = savedEvents.includes(event.id);
          return (
            <div
              key={event.id}
              className="rounded-xl bg-card overflow-hidden card-shadow animate-fade-in cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <img src={event.banner} alt={event.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-bold text-foreground leading-tight flex-1">{event.title}</h3>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(event.id); }}
                    className="ml-2"
                  >
                    {saved ? (
                      <BookmarkCheck size={18} className="text-primary fill-primary" />
                    ) : (
                      <Bookmark size={18} className="text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{event.organizer}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    event.mode === "Online" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {event.mode}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    event.price === "Free" ? "bg-success/10 text-success" : "bg-primary-soft text-accent-foreground"
                  }`}>
                    {event.price}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={12} />{event.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{event.time}</span>
                </div>
                {event.location && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />{event.location}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Register by {event.registrationDeadline}</span>
                  <Button size="sm" className="rounded-full h-8 px-4 text-xs" onClick={(e) => { e.stopPropagation(); toast.success("Registered!"); }}>
                    Register
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} saved={savedEvents.includes(selectedEvent.id)} onToggleSave={() => toggleSave(selectedEvent.id)} />}
      <BottomNav />
    </div>
  );
};

const EventDetailModal = ({
  event,
  onClose,
  saved,
  onToggleSave,
}: {
  event: typeof mockEvents[0];
  onClose: () => void;
  saved: boolean;
  onToggleSave: () => void;
}) => (
  <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
    <div className="max-w-md mx-auto">
      <div className="relative">
        <img src={event.banner} alt={event.title} className="w-full h-48 object-cover" />
        <button onClick={onClose} className="absolute top-3 left-3 rounded-full bg-foreground/50 p-2">
          <X size={18} className="text-primary-foreground" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-foreground mb-1">{event.title}</h2>
        <p className="text-sm text-muted-foreground mb-3">{event.organizer}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            event.mode === "Online" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
          }`}>{event.mode}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            event.price === "Free" ? "bg-success/10 text-success" : "bg-primary-soft text-accent-foreground"
          }`}>{event.price}</span>
        </div>
        <div className="flex flex-col gap-2 mb-4 text-sm text-foreground">
          <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" />{event.date} · {event.time}</span>
          {event.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" />{event.location}</span>}
          <span className="flex items-center gap-2"><Clock size={16} className="text-primary" />Register by {event.registrationDeadline}</span>
        </div>
        <div className="border-t border-border pt-4 mb-4">
          <h3 className="text-sm font-bold text-foreground mb-2">About this Event</h3>
          <p className="text-sm text-foreground leading-relaxed">{event.description}</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 h-11 rounded-xl font-semibold" onClick={() => toast.success("Registered!")}>
            <ExternalLink size={16} className="mr-1.5" /> Register Now
          </Button>
          <Button variant="outline" className="h-11 rounded-xl px-4" onClick={onToggleSave}>
            {saved ? <BookmarkCheck size={18} className="text-primary" /> : <Bookmark size={18} />}
          </Button>
          <Button variant="outline" className="h-11 rounded-xl px-4" onClick={() => toast.success("Link copied!")}>
            <Share2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default EventsScreen;
