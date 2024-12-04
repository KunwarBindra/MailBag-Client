import React from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import { Message } from "../../common/interfaces";

interface MessageModalProps {
  open: boolean;
  handleClose: () => void;
  email: Message;
  loader: boolean;
  deleteBtnLoad: boolean;
  handleMessageDelete: (id: number) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  open,
  handleClose,
  email,
  loader,
  deleteBtnLoad,
  handleMessageDelete,
}) => {
  const formattedDate = email.date
    ? format(new Date(email.date), "eee, MMM d, yyyy h:mm a")
    : "";

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="email-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
        }}
      >
        {loader ? (
          <Box
            sx={{
              height: "300px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinearProgress sx={{ width: "300px" }} />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "10px",
              }}
            >
              <Typography variant="h6" id="email-modal">
                {email?.subject?.toUpperCase()}
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {formattedDate}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              From: {email.from}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {email.body}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                mt: "20px",
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                sx={{
                  flex: 1,
                }}
              >
                CLOSE
              </Button>
              <LoadingButton
                onClick={() => handleMessageDelete(email.id || 0)}
                loading={deleteBtnLoad}
                loadingPosition="start"
                startIcon={<Delete />}
                variant="contained"
                sx={{
                  flex: 1,
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "#FFFFFF",
                  },
                }}
              >
                DELETE
              </LoadingButton>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MessageModal;
