import React, { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import CircularSlider from "@fseehawer/react-circular-slider";
import { ScrollDownButton } from "../../../components";
import { createRating } from "../../../api/albumDetails";
import "./SubmitRating.css";

const SLIDER_WIDTH = window.innerWidth > window.innerHeight ? window.innerWidth / 13 : window.innerHeight / 6.5;
const SLIDER_PROGRESS = window.innerWidth > window.innerHeight ? window.innerWidth / 100 : window.innerHeight / 50;
const SLIDER_KNOB = window.innerWidth > window.innerHeight ? window.innerWidth / 50 : window.innerHeight / 25;
const VALUE_SIZE = window.innerWidth > window.innerHeight ? window.innerWidth / 38 : window.innerWidth / 13;
const MAX_CHARS = 300;
const MIN_CHARS = 3;
const MAX_NUM_OF_LINES = 12;

export const SubmitRating = ({ albumId }) => {
  const queryClient = useQueryClient();
  const [{ access_token }] = useCookies();
  const [rating, setRating] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [numOfLines, setNumOfLines] = useState(0);
  const textAreaRef = useRef(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries(["ratings"]);
      queryClient.invalidateQueries(["personalRating"]);
      queryClient.invalidateQueries(["averageRating"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textAreaRef.current.value.replace(/\s/g, "").length < MIN_CHARS) {
      setErrorMessage("Make it longer...");
      return;
    }
    if (rating <= -1) {
      setErrorMessage("Give your ratio a rating!");
      return;
    }
    if (numOfLines >= MAX_NUM_OF_LINES) {
      setErrorMessage("Way too many lines...");
      return;
    }
    if (!isLoading) {
      setErrorMessage(null);
      mutate({ data: { album_id: albumId, rating: rating, comment: textAreaRef.current.value }, access_token });
    }
  };

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    setNumOfLines(inputValue.split(/\r\n|\r|\n/).length);
    if (numOfLines >= MAX_NUM_OF_LINES) {
      setErrorMessage("Way too many lines...");
      return;
    }
    setErrorMessage(null);
  };

  return (
    <>
      <div className="submit-rating">
        <form className="submit-rating-form" onSubmit={handleSubmit}>
          <div className="submit-rating-input-text">
            <textarea
              className="submit-rating-comment"
              type="text"
              placeholder="Leave a comment..."
              maxLength={MAX_CHARS}
              onChange={handleOnChange}
              rows={3}
              ref={textAreaRef}
            />
            <span className="submit-rating-form-error">{errorMessage}</span>
          </div>
          <input className="custom-button submit" type="submit" value="Submit" disabled={isLoading} />
        </form>
        <div className="submit-rating-cirlce">
          <CircularSlider
            //hidden character because it was breaking on mobile
            label="&#8192;"
            width={SLIDER_WIDTH}
            labelColor={rating >= 0 ? "white" : "gray"}
            knobColor={rating >= 0 ? "white" : "gray"}
            progressColorFrom={rating >= 0 ? "white" : "gray"}
            progressColorTo={rating >= 0 ? "white" : "gray"}
            progressSize={SLIDER_PROGRESS}
            knobSize={SLIDER_KNOB}
            trackSize={0}
            min={0}
            max={10}
            valueFontSize={`${VALUE_SIZE}px`}
            progressLineCap="flat"
            knobPosition="top"
            onChange={(value) => setRating(value)}
            autoFocus
          />
        </div>
      </div>
      {textAreaRef && <ScrollDownButton textAreaRef={textAreaRef} />}
    </>
  );
};
