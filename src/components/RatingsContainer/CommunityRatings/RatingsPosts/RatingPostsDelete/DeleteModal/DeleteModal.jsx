import React from "react";
import { ReactComponent as RatioLogo } from "../../../../../../icons/ratio-logo.svg";
import { Button, Modal } from "../../../../..";
import "./DeleteModal.css";

export const DeleteModal = ({ handleDelete, onClose, show }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="modal-content delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title delete-modal-title">
          <RatioLogo title="Ratio" />
          <span className="delete-modal-text">Are you sure you want to delete this rating?</span>
        </div>
        <div className="delete-modal-buttons">
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};
