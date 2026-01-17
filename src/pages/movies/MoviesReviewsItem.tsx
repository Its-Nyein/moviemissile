import { Star } from "lucide-react";
import { useState } from "react";
import {
  generateDate,
  generateProfile,
  generateRating,
} from "../../helpers/helpers";
import type { Review } from "../../types";

interface MoviesReviewsItemProps {
  review: Review;
}

const MoviesReviewsItem = ({ review }: MoviesReviewsItemProps) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const content = showFullContent
    ? review?.content
    : `${review.content?.slice(0, 400)}${
        review.content?.length > 400 ? "..." : ""
      }`;
  const toggleContentHandler = () => {
    setShowFullContent((prev) => !prev);
  };

  const toggleBtnCaption = showFullContent ? "Show less" : "Show more";

  return (
    <div className="border-border rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <img
          src={generateProfile(review.author_details?.avatar_path || "")}
          alt={`${review?.author}'s avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-foreground font-semibold">
              {review?.author}
            </span>
            {review.author_details?.rating && (
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground">
                  {generateRating(review.author_details?.rating)}
                </span>
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-sm">
            {generateDate(review?.created_at)}
          </p>
        </div>
      </div>

      <div className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {content}
        {review.content?.length > 400 && (
          <button
            onClick={toggleContentHandler}
            className="text-primary ml-1 font-medium hover:underline"
          >
            {toggleBtnCaption}
          </button>
        )}
      </div>
    </div>
  );
};

export default MoviesReviewsItem;
