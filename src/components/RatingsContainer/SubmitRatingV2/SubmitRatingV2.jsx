import React, { useState } from "react";
import { createPost } from "../../../api";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useCookies } from "react-cookie";
import "./SubmitRatingV2.css";

const SLIDER_WIDTH = window.innerWidth > window.innerHeight ? window.innerWidth / 13 : window.innerHeight / 6.5;
const SLIDER_PROGRESS = window.innerWidth > window.innerHeight ? window.innerWidth / 100 : window.innerHeight / 50;
const SLIDER_KNOB = window.innerWidth > window.innerHeight ? window.innerWidth / 50 : window.innerHeight / 25;
const VALUE_SIZE = window.innerWidth > window.innerHeight ? window.innerWidth / 38 : window.innerWidth / 13;
const MAX_CHARS = 300;
const MIN_CHARS = 3;

export const SubmitRatingV2 = ({ albumId }) => {
  const [cookies] = useCookies();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.length < MIN_CHARS) {
      setErrorMessage("Make it longer...");
      return;
    }
    if (rating <= -1) {
      setErrorMessage("Give your ratio a rating!");
      return;
    }
    if (!submitting) {
      setErrorMessage(null);
      setSubmitting(true);
      createPost({ album_id: albumId, rating: rating, comment: description }, cookies.access_token).then(() => window.location.reload(true));
    }
  };

  return (
    <div className="submit-rating">
      <form className="submit-rating-form" onSubmit={handleSubmit}>
        <div className="submit-rating-input-text">
          <textarea
            className="submit-rating-comment"
            type="text"
            placeholder="Leave a comment..."
            value={description}
            maxLength={MAX_CHARS}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
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
          knobPosition={"right"}
          onChange={(value) => setRating(value)}
        />
      </div>
    </div>
  );
};
