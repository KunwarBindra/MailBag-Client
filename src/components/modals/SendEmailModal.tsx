import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, InputLabel } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Contact, EmailInfo } from "../../common/interfaces";

interface SendEmailModalProps {
  open: boolean;
  handleClose: () => void;
  contacts: Contact[];
  onSendEmail: () => void;
  emailInfo: EmailInfo;
  setEmailInfo: React.Dispatch<React.SetStateAction<EmailInfo>>;
  isSending: boolean;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  open,
  handleClose,
  contacts,
  onSendEmail,
  emailInfo,
  setEmailInfo,
  isSending,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h1"
          textAlign="center"
          sx={{
            mb: "15px",
          }}
        >
          Send Email
        </Typography>
        <TextField
          fullWidth
          id="subject"
          label="Subject"
          value={emailInfo.subject}
          onChange={(e) =>
            setEmailInfo({ ...emailInfo, subject: e.target.value })
          }
          sx={{
            mb: "15px",
          }}
        />
        <FormControl sx={{ width: "100%", mb: "15px" }}>
          <InputLabel id="recipient-label">To</InputLabel>
          <Select
            labelId="recipient-label"
            id="recipient"
            value={emailInfo.to}
            label="To"
            onChange={(e) => setEmailInfo({ ...emailInfo, to: e.target.value })}
          >
            {contacts.map((contact) => (
              <MenuItem key={contact.email} value={contact.email}>
                {contact.name} ({contact.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="body"
          label="Body"
          multiline
          rows={4}
          value={emailInfo.text}
          onChange={(e) => setEmailInfo({ ...emailInfo, text: e.target.value })}
          sx={{
            mb: "20px",
          }}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={onSendEmail}
          loadingPosition="start"
          startIcon={<Send />}
          loading={isSending}
          sx={{
            "&:hover": {
              backgroundColor: "primary.main",
              color: "#FFFFFF",
            },
          }}
        >
          Send
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default SendEmailModal;
