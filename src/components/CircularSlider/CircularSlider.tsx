import React from "react";
import Slider from "@fseehawer/react-circular-slider";

interface CircularSliderProps {
  value: number;
  onChange?: (value: number) => void;
}

const isWideScreen = window.innerWidth > window.innerHeight;
const SLIDER_WIDTH = isWideScreen ? window.innerWidth / 13 : window.innerHeight / 6.5;
const SLIDER_PROGRESS = isWideScreen ? window.innerWidth / 100 : window.innerHeight / 50;
const SLIDER_KNOB = isWideScreen ? window.innerWidth / 50 : window.innerHeight / 25;
const VALUE_SIZE = isWideScreen ? window.innerWidth / 38 : window.innerWidth / 13;

export const CircularSlider: React.FC<CircularSliderProps> = ({ value, onChange }) => {
  return (
    <Slider
      //hidden character because it was breaking on mobile
      label="&#8192;"
      width={SLIDER_WIDTH}
      labelColor={value >= 0 ? "white" : "gray"}
      knobColor={value >= 0 ? "white" : "gray"}
      progressColorFrom={value >= 0 ? "white" : "gray"}
      progressColorTo={value >= 0 ? "white" : "gray"}
      progressSize={SLIDER_PROGRESS}
      knobSize={SLIDER_KNOB}
      trackSize={0}
      min={0}
      max={10}
      valueFontSize={`${VALUE_SIZE}px`}
      progressLineCap="flat"
      knobPosition="top"
      onChange={onChange}
    />
  );
};
