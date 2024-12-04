import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Contact, NewContact } from "../../common/interfaces";

interface ContactsModalProps {
  open: boolean;
  handleClose: () => void;
  contacts: Contact[];
  newContact: NewContact;
  setNewContact: Dispatch<SetStateAction<NewContact>>;
  handleAddContact: () => void;
  handleDeleteContact: (id: string | null) => void;
  addContactBtn: boolean;
  contactError: any;
}

const ContactsModal: React.FC<ContactsModalProps> = ({
  open,
  handleClose,
  contacts,
  newContact,
  setNewContact,
  handleAddContact,
  handleDeleteContact,
  addContactBtn,
  contactError
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="contacts-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="contacts-modal-title"
          variant="h4"
          component="h1"
          textAlign="center"
        >
          Contacts
        </Typography>

        {/* Contacts List */}
        {contacts.length ? (
          <List
            sx={{
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            {contacts.map((contact) => (
              <ListItem key={contact._id} divider>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.email}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteContact(contact._id || null)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No contacts added!</Typography>
        )}

        {/* New Contact Form */}
        <Box mt={3} display="flex" flexDirection="column" gap={2} mb={3}>
          <TextField
            label="Name"
            variant="outlined"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            value={newContact.phoneNumber}
            onChange={(e) =>
              setNewContact({ ...newContact, phoneNumber: e.target.value })
            }
          />
          <LoadingButton
            onClick={handleAddContact}
            loading={addContactBtn}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#FFFFFF",
              },
            }}
          >
            ADD CONTACT
          </LoadingButton>
        </Box>
        <Typography color="red">{contactError}</Typography>
      </Box>
    </Modal>
  );
};

export default ContactsModal;
