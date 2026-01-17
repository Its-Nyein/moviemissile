import type { Review } from "../../types";
import MoviesReviewsItem from "./MoviesReviewsItem";

interface MoviesReviewsProps {
  reviews: Review[];
}

const MoviesReviews = ({ reviews }: MoviesReviewsProps) => {
  return (
    <div className="container mx-auto my-5 max-w-7xl px-4">
      <h2 className="text-foreground mb-3 text-lg font-semibold">Reviews</h2>

      {reviews?.length === 0 && (
        <p className="text-muted-foreground italic">
          No reviews have been written yet.
        </p>
      )}

      {reviews?.length > 0 && (
        <div className="space-y-4">
          {reviews?.slice(0, 2).map((review) => (
            <MoviesReviewsItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesReviews;
