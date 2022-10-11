import { Dialog } from "@mui/material";
import { DialogBox } from "./style";

function Modal({ open, handleModalClose }) {
  return (
    <Dialog open={open} onClose={handleModalClose}>
      <DialogBox>{open}</DialogBox>
    </Dialog>
  );
}

export default Modal;
