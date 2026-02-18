import { useState } from "react";
import { Heart, MessageCircle, Share2, Plus, X, Image, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { mockInsights } from "@/data/mockData";
import { toast } from "sonner";

const tagOptions = ["hackathon", "tips", "internship", "project", "campus"];

const InsightsScreen = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Insights</h1>
          <p className="text-xs text-muted-foreground">Stories from fellow students</p>
        </div>
        <Button size="sm" className="rounded-full gap-1.5" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} /> Post
        </Button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {mockInsights.map((post) => {
          const liked = likedPosts.includes(post.id);
          return (
            <div key={post.id} className="rounded-xl bg-card p-4 card-shadow animate-fade-in">
              <div className="flex items-center gap-3 mb-3">
                <img src={post.avatar} alt={post.name} className="h-10 w-10 rounded-full object-cover bg-muted" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{post.name}</h3>
                  <p className="text-xs text-muted-foreground">{post.college} · {post.time}</p>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex items-center gap-5 border-t border-border pt-3">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1.5 text-sm transition-colors"
                >
                  <Heart
                    size={18}
                    className={liked ? "fill-destructive text-destructive" : "text-muted-foreground"}
                  />
                  <span className={liked ? "text-destructive font-medium" : "text-muted-foreground"}>
                    {post.likes + (liked ? 1 : 0)}
                  </span>
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
                <button
                  className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto"
                  onClick={() => toast.success("Link copied!")}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showCreateModal && <CreateInsightModal onClose={() => setShowCreateModal(false)} />}
      <BottomNav />
    </div>
  );
};

const CreateInsightModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = () => {
    if (!content.trim()) {
      toast.error("Please write something!");
      return;
    }
    toast.success("Insight posted!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40">
      <div className="w-full max-w-md animate-slide-up rounded-t-2xl bg-card p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-foreground">Create Insight</h3>
          <button onClick={onClose}>
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Title (optional)</label>
            <Input
              placeholder="Give your post a title"
              className="h-11 rounded-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">What's on your mind?</label>
            <Textarea
              placeholder="Share your experience, tips, or story..."
              className="min-h-[100px] rounded-xl resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" className="h-11 rounded-xl gap-2 text-muted-foreground">
            <Image size={18} /> Add Photo
          </Button>
          <Button className="h-11 rounded-xl font-semibold gap-2" onClick={handlePost}>
            <Send size={16} /> Post Insight
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsightsScreen;
