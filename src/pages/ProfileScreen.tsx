import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import StarRating from "@/components/StarRating";
import { mockProfile, mockReviews } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProfileScreen = () => {
  const p = mockProfile;
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [connectStatus, setConnectStatus] = useState<"none" | "pending" | "connected">("none");
  const [isFollowing, setIsFollowing] = useState(false);

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
                <img
                  key={i}
                  src={mc.avatar}
                  alt={mc.name}
                  className="h-6 w-6 rounded-full border-2 border-card object-cover"
                />
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
            {isFollowing ? (
              <><Users size={16} /> Following</>
            ) : (
              <><Plus size={16} /> Follow</>
            )}
          </Button>
        </div>
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

      {/* Reviews & Ratings */}
      <Section
        title="Reviews & Ratings"
        action={
          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-1 text-xs font-semibold text-primary"
          >
            <Plus size={14} /> Write Review
          </button>
        }
      >
        {/* Summary */}
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

        {/* Review Cards */}
        <div className="flex flex-col gap-3">
          {mockReviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border p-3 animate-fade-in">
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-9 w-9 rounded-full object-cover bg-muted"
                />
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
      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} />
      )}

      <BottomNav />
    </div>
  );
};

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
          <button onClick={onClose} className="text-sm font-medium text-muted-foreground">
            Cancel
          </button>
        </div>

        {/* Star selector */}
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-foreground">Your Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  size={28}
                  className={
                    star <= rating
                      ? "fill-star text-star"
                      : "text-border"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
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
