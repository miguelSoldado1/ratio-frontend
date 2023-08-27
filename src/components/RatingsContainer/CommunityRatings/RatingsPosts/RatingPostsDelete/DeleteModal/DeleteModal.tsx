import { ReactComponent as RatioLogo } from "@/icons/ratio-logo.svg";
import { Button, Modal } from "@/components";
import "./DeleteModal.css";

interface DeleteModalProps {
  handleDelete: () => void;
  onClose: () => void;
  show: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ handleDelete, onClose, show }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="modal-content delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title delete-modal-title">
          <RatioLogo />
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
