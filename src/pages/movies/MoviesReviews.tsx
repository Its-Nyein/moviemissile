import MoviesReviewsItem from "./MoviesReviewsItem";
import type { Review } from "../../types";

interface MoviesReviewsProps {
  reviews: Review[];
}

const MoviesReviews = ({ reviews }: MoviesReviewsProps) => {
  return (
    <div className="container mx-auto max-w-7xl px-4">
      <h2 className="text-lg font-semibold text-[#353535] mb-3">Reviews</h2>

      {reviews?.length === 0 && (
        <div className="mb-3">
          <p className="text-gray-400 text-base italic">
            No reviews have been written yet.
          </p>
        </div>
      )}

      {reviews?.length > 0 && (
        <div className="my-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {reviews?.slice(0, 2).map((review) => (
              <MoviesReviewsItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesReviews;
