import { useState } from "react";
import {
  generateDate,
  generateProfile,
  generateRating,
} from "../../helpers/helpers";
import { FaStar } from "react-icons/fa6";
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
  const toogleContentHandler = () => {
    setShowFullContent((prev) => !prev);
  };

  const toogleBtnCaption = showFullContent ? "Show less" : "Show More";

  return (
    <div className="shadow-lg border border-gray-400 rounded p-5">
      <div className="flex gap-3 items-center">
        <img
          src={generateProfile(review.author_details?.avatar_path || "")}
          alt="Reviewer Avatar"
          className="object-cover w-16 h-16 rounded-full shadow-md border border-gray-400"
        />

        <div>
          <p className="flex gap-2 mb-1">
            Reviewed by
            <span className="font-semibold text-[#353535]">
              {review?.author}
            </span>
            {review.author_details?.rating && (
              <span className="flex gap-2 font-semibold opacity-70">
                <FaStar className="text-yellow-400" />
                {generateRating(review.author_details?.rating)}
              </span>
            )}
          </p>

          <p className="text-gray-400 text-sm">
            {generateDate(review?.created_at)}
          </p>
        </div>
      </div>

      <div className="mt-5" style={{ lineHeight: "1.25rem" }}>
        {content}
        {review.content?.length > 400 && (
          <span
            onClick={toogleContentHandler}
            className="font-semibold underline cursor-pointer text-[#353535] hover:text-gray-500 transition-colors duration-100 ml-2"
          >
            {toogleBtnCaption}
          </span>
        )}
      </div>
    </div>
  );
};

export default MoviesReviewsItem;
