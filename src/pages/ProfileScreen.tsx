import {
  MapPin,
  GraduationCap,
  Briefcase,
  IndianRupee,
  Edit,
  Plus,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { mockProfile } from "@/data/mockData";

const ProfileScreen = () => {
  const p = mockProfile;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Cover + Avatar */}
      <div className="relative">
        <div className="h-28 splash-gradient" />
        <div className="px-4">
          <img
            src={p.avatar}
            alt={p.name}
            className="-mt-14 h-24 w-24 rounded-full border-4 border-card object-cover bg-muted"
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{p.name}</h1>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} /> {p.college}
            </p>
            <p className="text-xs text-muted-foreground">{p.course}</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full gap-1.5">
            <Edit size={14} /> Edit
          </Button>
        </div>
        <p className="mt-2 text-sm text-foreground leading-relaxed">{p.bio}</p>
      </div>

      {/* About */}
      <Section title="About">
        <p className="text-sm text-foreground leading-relaxed">{p.about}</p>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-primary-soft p-2">
            <GraduationCap size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{p.education.college}</h3>
            <p className="text-xs text-muted-foreground">{p.education.degree}</p>
            <p className="text-xs text-muted-foreground">{p.education.year}</p>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section
        title="Experience"
        action={
          <button className="flex items-center gap-1 text-xs font-semibold text-primary">
            <Plus size={14} /> Add
          </button>
        }
      >
        <div className="flex flex-col gap-3">
          {p.experience.map((exp, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary-soft p-2">
                <Briefcase size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                <p className="text-xs text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {p.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section title="Services">
        <div className="flex flex-col gap-3">
          {p.services.map((svc, i) => (
            <div key={i} className="rounded-xl border border-border p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{svc.title}</h3>
                <div className="flex items-center gap-0.5 text-primary font-bold text-sm">
                  <IndianRupee size={13} />
                  {svc.price}
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{svc.description}</p>
              <Button size="sm" className="mt-2.5 rounded-lg gap-1.5 text-xs">
                <MessageCircle size={14} /> Contact
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <BottomNav />
    </div>
  );
};

const Section = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="border-t border-border px-4 py-4">
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

export default ProfileScreen;
