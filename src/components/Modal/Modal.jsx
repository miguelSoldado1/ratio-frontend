import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import { Button } from "../../components";
import "./Modal.css";

export const Modal = (props) => {
  const closeOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        props.onClose();
      }
    },
    [props]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-title">
            <RatioLogo title="Ratio" />
            <span className="modal-text">Are you sure you want to delete this rating?</span>
          </div>
          <div className="modal-buttons">
            <Button onClick={props.onSave}>Delete</Button>
            <Button className="cancel-button" onClick={props.onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};
