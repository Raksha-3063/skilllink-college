import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

const StarRating = ({ rating, size = 14, showValue = true, reviewCount }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? "fill-star text-star"
                : "text-border"
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-foreground ml-0.5">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
};

export default StarRating;
