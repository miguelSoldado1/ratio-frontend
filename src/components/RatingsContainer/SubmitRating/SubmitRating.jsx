import React, { useState } from "react";
import { useCookies } from "react-cookie";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useRatingsStore } from "../../../stores";
import "./SubmitRating.css";
import { useRef } from "react";
import { ScrollDownButton } from "../../../components";

const SLIDER_WIDTH = window.innerWidth > window.innerHeight ? window.innerWidth / 13 : window.innerHeight / 6.5;
const SLIDER_PROGRESS = window.innerWidth > window.innerHeight ? window.innerWidth / 100 : window.innerHeight / 50;
const SLIDER_KNOB = window.innerWidth > window.innerHeight ? window.innerWidth / 50 : window.innerHeight / 25;
const VALUE_SIZE = window.innerWidth > window.innerHeight ? window.innerWidth / 38 : window.innerWidth / 13;
const MAX_CHARS = 300;
const MIN_CHARS = 3;
const MAX_NUM_OF_LINES = 12;

export const SubmitRating = ({ albumId }) => {
  const [createRating, personalRating] = useRatingsStore((state) => [state.createRating, state.personalRating]);
  const [cookies] = useCookies();
  // const [description, setDescription] = useState("");
  const [rating, setRating] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [numOfLines, setNumOfLines] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const textAreaRef = useRef(null);

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
    if (!submitting) {
      setErrorMessage(null);
      setSubmitting(true);
      createRating({ album_id: albumId, rating: rating, comment: textAreaRef.current.value }, cookies.access_token);
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
          <input className="custom-button submit" type="submit" value="Submit" disabled={submitting} />
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
      {textAreaRef && personalRating === null && <ScrollDownButton textAreaRef={textAreaRef} />}
    </>
  );
};
