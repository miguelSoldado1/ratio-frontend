import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import "./Walkthrough.css";

const steps = [
  {
    description: "Hey, welcome to Ratio! This is a quick walkthrough of the functionalities so far.",
    className: "step-1",
  },
  {
    description:
      "This is your home page, here you can find some of your favourite albums and you can also use the search bar to find exactly what you're looking for. Click any of these to rate your first album!",
    className: "step-2",
  },
  { description: "This is the album page, ", className: "step-3" },
];

export const Walkthrough = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);

  useState(() => setTimeout(() => setShow(true), 1000), []);

  return (
    <Modal show={show}>
      <div className="walkthrough-modal">
        <div className="walkthrough-modal-header">
          <RatioLogo title="Ratio" />
        </div>
        <div className="walkthrough-modal-content">
          <div className={`walkthrough-image ${steps[page].className}`} />
          <span className="walkthrough-description">{steps[page].description}</span>
        </div>
        <div className="walkthrough-modal-footer">
          <div className="walkthrough-modal-navigation">
            <button className={page <= 0 && "disabled"} onClick={() => setPage(page - 1)}>
              PREVIOUS
            </button>
            <button onClick={() => (page >= steps.length - 1 ? setShow(false) : setPage(page + 1))}>
              {page >= steps.length - 1 ? "FINISH" : "NEXT"}
            </button>
          </div>
          <button onClick={() => setShow(false)}>SKIP</button>
        </div>
      </div>
    </Modal>
  );
};
