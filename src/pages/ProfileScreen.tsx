import { useState, useEffect } from "react";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  IndianRupee,
  Edit,
  Plus,
  MessageCircle,
  Star,
  UserPlus,
  UserCheck,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  Camera,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import StarRating from "@/components/StarRating";
import { mockReviews, mockProfile } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const PASSION_OPTIONS = ["AI", "Web Dev", "Flutter", "Data Science", "Entrepreneurship", "UI/UX", "ML", "Design Systems", "Blockchain", "Cloud"];

interface ProfileData {
  name: string;
  college: string;
  course: string;
  avatar: string;
  bio: string;
  passionTags: string[];
  currentlyWorkingOn: string;
  personalDescription: string;
  skills: string[];
}

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [connectStatus, setConnectStatus] = useState<"none" | "pending" | "connected">("none");
  const [isFollowing, setIsFollowing] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<Record<number, "none" | "requested" | "accepted" | "completed">>({});
  const [profileLoading, setProfileLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    college: "",
    course: "",
    avatar: "",
    bio: "",
    passionTags: [],
    currentlyWorkingOn: "",
    personalDescription: "",
    skills: [],
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  // Fetch profile from DB
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setProfileLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        toast.error("Failed to load profile");
        setProfileLoading(false);
        return;
      }

      if (!data) {
        // Fallback: create profile if it doesn't exist
        const { data: created, error: createError } = await supabase
          .from("profiles")
          .insert({ user_id: user.id, full_name: user.user_metadata?.full_name || "" })
          .select()
          .single();
        if (createError) {
          toast.error("Failed to create profile");
          setProfileLoading(false);
          return;
        }
        mapDbToState(created);
      } else {
        mapDbToState(data);
      }
      setProfileLoading(false);
    };

    const mapDbToState = (row: any) => {
      setProfile({
        name: row.full_name || "",
        college: row.college || "",
        course: row.course || "",
        avatar: row.avatar_url || `https://i.pravatar.cc/150?u=${user!.id}`,
        bio: row.bio || "",
        passionTags: row.passion_tags || [],
        currentlyWorkingOn: row.currently_working_on || "",
        personalDescription: row.personal_description || "",
        skills: row.skills || [],
      });
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleConnect = () => {
    if (connectStatus === "none") {
      setConnectStatus("pending");
      toast.success("Connection request sent!");
    } else if (connectStatus === "pending") {
      setConnectStatus("none");
      toast("Connection request withdrawn");
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed" : "Now following!");
  };

  const handleRequestService = (idx: number) => {
    setServiceRequests((prev) => ({ ...prev, [idx]: "requested" }));
    toast.success("Service requested!");
    setTimeout(() => {
      setServiceRequests((prev) => ({ ...prev, [idx]: "accepted" }));
      toast.success("Service request accepted!");
    }, 1500);
  };

  const handleMarkCompleted = (idx: number) => {
    setServiceRequests((prev) => ({ ...prev, [idx]: "completed" }));
    setShowReviewModal(true);
  };

  const handleSaveProfile = async (updated: ProfileData) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: updated.name,
        college: updated.college,
        course: updated.course,
        avatar_url: updated.avatar,
        bio: updated.bio,
        passion_tags: updated.passionTags,
        currently_working_on: updated.currentlyWorkingOn,
        personal_description: updated.personalDescription,
        skills: updated.skills,
      })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile");
      return;
    }

    setProfile(updated);
    setShowEditModal(false);
    toast.success("Profile Updated Successfully");
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading profile...</div>
      </div>
    );
  }

  // Use static data for sections we haven't moved to DB yet
  const p = {
    ...mockProfile,
    name: profile.name,
    college: profile.college,
    course: profile.course,
    avatar: profile.avatar,
    bio: profile.bio,
    passionTags: profile.passionTags,
    currentlyWorkingOn: profile.currentlyWorkingOn,
    personalDescription: profile.personalDescription,
    skills: profile.skills.length > 0 ? profile.skills : mockProfile.skills,
  };

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
            <h1 className="text-xl font-bold text-foreground">{p.name || "Set up your profile"}</h1>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} /> {p.college || "Add your college"}
            </p>
            <p className="text-xs text-muted-foreground">{p.course}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => navigate("/growth-analytics")}>
              <TrendingUp size={14} />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => setShowEditModal(true)}>
              <Edit size={14} /> Edit
            </Button>
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={handleLogout}>
              <LogOut size={14} />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-foreground leading-relaxed">{p.bio}</p>

        {/* Passion Tags */}
        {p.passionTags && p.passionTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.passionTags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Network Stats */}
        <div className="mt-3 flex items-center gap-4">
          <button className="text-center">
            <span className="block text-sm font-bold text-foreground">{p.connections}</span>
            <span className="text-[11px] text-muted-foreground">Connections</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <button className="text-center">
            <span className="block text-sm font-bold text-foreground">{p.followers + (isFollowing ? 1 : 0)}</span>
            <span className="text-[11px] text-muted-foreground">Followers</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <button className="text-center">
            <span className="block text-sm font-bold text-foreground">{p.following}</span>
            <span className="text-[11px] text-muted-foreground">Following</span>
          </button>
        </div>

        {/* Mutual Connections */}
        {p.mutualConnections.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              {p.mutualConnections.slice(0, 3).map((mc, i) => (
                <img key={i} src={mc.avatar} alt={mc.name} className="h-6 w-6 rounded-full border-2 border-card object-cover" />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {p.mutualConnections[0].name} and {p.mutualConnections.length - 1} other mutual connections
            </p>
          </div>
        )}

        {/* Connect & Follow Buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            onClick={handleConnect}
            className={`flex-1 h-10 rounded-full gap-1.5 text-sm font-semibold ${
              connectStatus === "connected"
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : connectStatus === "pending"
                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                : ""
            }`}
            variant={connectStatus === "none" ? "default" : "outline"}
          >
            {connectStatus === "none" && <><UserPlus size={16} /> Connect</>}
            {connectStatus === "pending" && <><Clock size={16} /> Pending</>}
            {connectStatus === "connected" && <><UserCheck size={16} /> Connected</>}
          </Button>
          <Button
            onClick={handleFollow}
            variant={isFollowing ? "outline" : "secondary"}
            className={`flex-1 h-10 rounded-full gap-1.5 text-sm font-semibold ${
              isFollowing ? "border-primary text-primary" : ""
            }`}
          >
            {isFollowing ? <><Users size={16} /> Following</> : <><Plus size={16} /> Follow</>}
          </Button>
        </div>
      </div>

      {/* Currently Working On */}
      {p.currentlyWorkingOn && (
        <Section title="🔥 Currently Working On">
          <p className="text-sm text-foreground leading-relaxed">{p.currentlyWorkingOn}</p>
        </Section>
      )}

      {/* About Me */}
      {p.personalDescription && (
        <Section title="About Me">
          <p className="text-sm text-foreground leading-relaxed">{p.personalDescription}</p>
        </Section>
      )}

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
            <span key={skill} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground">
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* Services with Request Flow */}
      <Section title="Services">
        <div className="flex flex-col gap-3">
          {p.services.map((svc, i) => {
            const status = serviceRequests[i] || "none";
            return (
              <div key={i} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{svc.title}</h3>
                  <div className="flex items-center gap-0.5 text-primary font-bold text-sm">
                    <IndianRupee size={13} />
                    {svc.price}
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{svc.description}</p>
                <div className="mt-2.5 flex gap-2">
                  {status === "none" && (
                    <>
                      <Button size="sm" className="rounded-lg gap-1.5 text-xs flex-1" onClick={() => handleRequestService(i)}>
                        Request Service
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg gap-1.5 text-xs">
                        <MessageCircle size={14} />
                      </Button>
                    </>
                  )}
                  {status === "requested" && (
                    <Button size="sm" variant="secondary" className="rounded-lg text-xs flex-1" disabled>
                      <Clock size={14} className="mr-1.5" /> Requested
                    </Button>
                  )}
                  {status === "accepted" && (
                    <Button size="sm" className="rounded-lg gap-1.5 text-xs flex-1 bg-success hover:bg-success/90" onClick={() => handleMarkCompleted(i)}>
                      <CheckCircle size={14} /> Mark as Completed
                    </Button>
                  )}
                  {status === "completed" && (
                    <Button size="sm" variant="outline" className="rounded-lg text-xs flex-1 text-success border-success" disabled>
                      <CheckCircle size={14} className="mr-1.5" /> Completed
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Reviews & Ratings */}
      <Section
        title="Reviews & Ratings"
        action={
          <button onClick={() => setShowReviewModal(true)} className="flex items-center gap-1 text-xs font-semibold text-primary">
            <Plus size={14} /> Write Review
          </button>
        }
      >
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-primary-soft p-3">
          <div className="text-center">
            <span className="text-2xl font-bold text-foreground">{p.rating}</span>
            <div className="mt-0.5">
              <StarRating rating={p.rating} size={14} showValue={false} />
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{p.reviewCount}</span> Reviews
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {mockReviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border p-3 animate-fade-in">
              <div className="flex items-center gap-2.5 mb-2">
                <img src={review.avatar} alt={review.name} className="h-9 w-9 rounded-full object-cover bg-muted" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{review.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{review.college}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{review.date}</span>
              </div>
              <StarRating rating={review.rating} size={12} showValue={false} />
              <p className="mt-1.5 text-xs text-foreground leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Review Modal */}
      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <BottomNav />
    </div>
  );
};

/* ── Edit Profile Modal ── */
const EditProfileModal = ({
  profile,
  onSave,
  onClose,
}: {
  profile: ProfileData;
  onSave: (p: ProfileData) => void;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<ProfileData>({ ...profile });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof ProfileData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (t && !form.passionTags.includes(t) && form.passionTags.length < 6) {
      setForm((prev) => ({ ...prev, passionTags: [...prev.passionTags, t] }));
    }
  };

  const removeTag = (tag: string) =>
    setForm((prev) => ({ ...prev, passionTags: prev.passionTags.filter((t) => t !== tag) }));

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name cannot be empty";
    if (form.bio.length > 120) errs.bio = "Bio must be 120 characters or less";
    if (form.personalDescription.length > 300) errs.personalDescription = "About must be 300 characters or less";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40">
      <div className="w-full max-w-md animate-slide-up rounded-t-2xl bg-card max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Edit Profile</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-5 pt-4 flex flex-col gap-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={form.avatar} alt="Profile" className="h-20 w-20 rounded-full object-cover bg-muted" />
              <button className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-md">
                <Camera size={14} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Tap camera to change photo</p>
          </div>

          {/* Full Name */}
          <Field label="Full Name" error={errors.name}>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="h-11 rounded-xl"
              placeholder="Your full name"
            />
          </Field>

          {/* College */}
          <Field label="College Name">
            <Input
              value={form.college}
              onChange={(e) => set("college", e.target.value)}
              className="h-11 rounded-xl"
              placeholder="e.g. IIT Delhi"
            />
          </Field>

          {/* Course */}
          <Field label="Course / Year">
            <Input
              value={form.course}
              onChange={(e) => set("course", e.target.value)}
              className="h-11 rounded-xl"
              placeholder="e.g. B.Tech CSE, 3rd Year"
            />
          </Field>

          {/* Short Bio */}
          <Field label="Short Bio" counter={`${form.bio.length}/120`} error={errors.bio}>
            <Textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value.slice(0, 120))}
              maxLength={120}
              className="min-h-[70px] rounded-xl resize-none"
              placeholder="A short intro about yourself"
            />
          </Field>

          {/* Passion Tags */}
          <Field label="Passion Areas">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.passionTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PASSION_OPTIONS.filter((o) => !form.passionTags.includes(o)).map((opt) => (
                <button
                  key={opt}
                  onClick={() => addTag(opt)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  + {opt}
                </button>
              ))}
            </div>
          </Field>

          {/* Currently Working On */}
          <Field label="What I'm Currently Working On" counter={`${form.currentlyWorkingOn.length}/150`}>
            <Textarea
              value={form.currentlyWorkingOn}
              onChange={(e) => set("currentlyWorkingOn", e.target.value.slice(0, 150))}
              maxLength={150}
              className="min-h-[70px] rounded-xl resize-none"
              placeholder="Describe your current project or focus"
            />
          </Field>

          {/* Personal Description */}
          <Field label="About Me" counter={`${form.personalDescription.length}/300`} error={errors.personalDescription}>
            <Textarea
              value={form.personalDescription}
              onChange={(e) => set("personalDescription", e.target.value.slice(0, 300))}
              maxLength={300}
              className="min-h-[90px] rounded-xl resize-none"
              placeholder="Tell others more about yourself"
            />
          </Field>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 p-5 pt-3 border-t border-border">
          <Button variant="outline" className="flex-1 h-11 rounded-xl font-semibold" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1 h-11 rounded-xl font-semibold" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, counter, error, children }: { label: string; counter?: string; error?: string; children: React.ReactNode }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {counter && <span className="text-[11px] text-muted-foreground">{counter}</span>}
    </div>
    {children}
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

/* ── Review Modal ── */
const ReviewModal = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    toast.success("Review submitted!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40">
      <div className="w-full max-w-md animate-slide-up rounded-t-2xl bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">Write a Review</h3>
          <button onClick={onClose} className="text-sm font-medium text-muted-foreground">Cancel</button>
        </div>
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-foreground">Your Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star size={28} className={star <= rating ? "fill-star text-star" : "text-border"} />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-1.5 text-sm font-medium text-foreground">Your Review</p>
          <Textarea
            placeholder="Share your experience... (max 200 characters)"
            maxLength={200}
            className="min-h-[80px] rounded-xl resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p className="mt-1 text-right text-[11px] text-muted-foreground">{comment.length}/200</p>
        </div>
        <Button className="h-11 w-full rounded-xl font-semibold" onClick={handleSubmit}>
          Submit Review
        </Button>
      </div>
    </div>
  );
};

const Section = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="border-t border-border px-4 py-4">
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

export default ProfileScreen;
