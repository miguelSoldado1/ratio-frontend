import { useState, useRef, useReducer } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating } from "@/api/albumDetails";
import { ScrollDownButton, CircularSlider } from "@/components";
import "./SubmitRating.css";

const MAX_CHARS = 300;
const MIN_CHARS = 3;
const MAX_NUM_OF_LINES = 12;

interface SubmitRatingProps {
  albumId?: string;
}

type Rating = {
  value: number;
  comment: string;
};

export const SubmitRating: React.FC<SubmitRatingProps> = ({ albumId }) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useReducer((state: Rating, newState: Partial<Rating>) => ({ ...state, ...newState }), { value: -1, comment: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries(["ratings"]);
      queryClient.invalidateQueries(["albumRatings"]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { value, comment } = rating;
    e.preventDefault();

    if (comment.replace(/\s/g, "").length < MIN_CHARS) {
      return setErrorMessage("Make it longer...");
    }
    if (value <= -1) {
      return setErrorMessage("Give your review a rating!");
    }
    if (comment.split(/\r\n|\r|\n/).length >= MAX_NUM_OF_LINES) {
      return setErrorMessage("Way too many lines...");
    }
    if (!isLoading && albumId) {
      mutate({ album_id: albumId, rating: value, comment: comment });
    }
    setErrorMessage("");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setRating({ comment: inputValue });
    const numOfLines = inputValue.split(/\r\n|\r|\n/).length;
    if (numOfLines >= MAX_NUM_OF_LINES) {
      return setErrorMessage("Way too many lines...");
    }
    setErrorMessage("");
  };

  return (
    <>
      <div className="submit-rating" ref={formRef}>
        <form className="submit-rating-form" onSubmit={handleSubmit}>
          <div className="submit-rating-input-text">
            <textarea className="submit-rating-comment" placeholder="Leave a comment..." maxLength={MAX_CHARS} onChange={handleOnChange} rows={3} />
            <span className="submit-rating-form-error">{errorMessage}</span>
          </div>
          <input className="custom-button submit" type="submit" value="Submit" disabled={isLoading} />
        </form>
        <div className="submit-rating-cirlce">
          <CircularSlider value={rating.value} onChange={(value: number) => setRating({ value })} />
        </div>
      </div>
      <ScrollDownButton scrollRef={formRef} />
    </>
  );
};
