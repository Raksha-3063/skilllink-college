import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { mockInsights } from "@/data/mockData";

const InsightsScreen = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">Insights</h1>
        <p className="text-xs text-muted-foreground">Stories from fellow students</p>
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
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default InsightsScreen;
