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
    <div className="border border-border rounded-lg p-4">
      <div className="flex gap-3 items-start">
        <img
          src={generateProfile(review.author_details?.avatar_path || "")}
          alt={`${review?.author}'s avatar`}
          className="w-12 h-12 object-cover rounded-full"
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">
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

      <div className="mt-3 text-muted-foreground text-sm leading-relaxed">
        {content}
        {review.content?.length > 400 && (
          <button
            onClick={toggleContentHandler}
            className="font-medium text-primary hover:underline ml-1"
          >
            {toggleBtnCaption}
          </button>
        )}
      </div>
    </div>
  );
};

export default MoviesReviewsItem;
