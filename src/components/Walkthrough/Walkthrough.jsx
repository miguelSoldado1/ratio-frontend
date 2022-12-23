import React from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import "./Walkthrough.css";

const steps = [{}, {}];

export const Walkthrough = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);

  useState(() => setTimeout(() => setShow(true), 1000), []);

  return (
    <Modal show={show}>
      <div className="walkthrough-modal">
        <div className="walkthrough-modal-header">
          <RatioLogo title="Ratio" />
          <span>
            {page}/{steps.length}
          </span>
        </div>
        <div className="walkthrough-modal-footer">
          <div className="walkthrough-modal-navigation">
            <button className={page <= 0 && "disabled"} onClick={() => setPage(page - 1)}>
              PREVIOUS
            </button>
            <button onClick={() => (page >= steps.length ? setShow(false) : setPage(page + 1))}>
              {page >= steps.length ? "FINISH" : "NEXT"}
            </button>
          </div>
          <button onClick={() => setShow(false)}>SKIP</button>
        </div>
      </div>
    </Modal>
  );
};
