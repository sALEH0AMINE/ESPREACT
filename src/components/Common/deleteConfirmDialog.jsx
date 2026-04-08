import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmText = "نعم", cancelText = "إلغاء" }) {
  return (
    <Dialog open={open} onClose={onCancel} dir="rtl">
      {title && <DialogTitle>{title}</DialogTitle>}
      {message && (
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onCancel} color="secondary" variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
