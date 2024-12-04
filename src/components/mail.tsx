import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  LinearProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useRef, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ContactsIcon from "@mui/icons-material/Contacts";
import axios from "axios";
import { format } from "date-fns";
import MessageModal from "./modals/MessageModal";
import ContactsModal from "./modals/Contacts";
import SendEmailModal from "./modals/SendEmailModal";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OutboxIcon from "@mui/icons-material/Outbox";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { Message, Contact, EmailInfo, Mailbox } from "../common/interfaces";

const Mail: React.FC = () => {
  const isInitialMount = useRef(true);

  const [mailLoading, setMailLoading] = useState<boolean>(false);
  const [mailbox, setMailbox] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>({
    id: null,
    from: null,
    date: null,
    subject: null,
    body: null,
  });
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const [messageModalLoader, setMessageModalLoader] = useState<boolean>(false);
  const [deleteBtnLoad, setDeleteBtnLoad] = useState<boolean>(false);
  const [contactsModal, setContactsModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Contact>({
    name: "",
    email: "",
    phoneNumber: ""
  });
  const [addContactBtn, setAddContactBtn] = useState<boolean>(false);
  const [sendEmailModal, setSendEmailModal] = useState<boolean>(false);
  const [emailInfo, setEmailInfo] = useState<EmailInfo>({
    from: "zoila.lockman33@ethereal.email",
    to: "",
    subject: "",
    text: "",
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [contactError, setContactError] = useState<any>(null);

  const fetchMailboxes = async () => {
    setMailLoading(true);
    try {
      const response = await axios.get<Mailbox[]>(
        "http://localhost:3000/mailboxes"
      );
      setMailboxes(response.data);
      setMailLoading(false);
      fetchMailboxMessages(response?.data[0]?.name || "");
    } catch (err) {
      console.log(err);
      setMailLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get<Contact[]>(
        "http://localhost:3000/contacts"
      );
      setContacts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMailboxMessages = async (mailbox: string) => {
    setMailbox(mailbox);
    setMessagesLoading(true);
    try {
      const response = await axios.get<Message[]>(
        `http://localhost:3000/mailboxes/${mailbox}`
      );
      setMessages(response.data);
      setMessagesLoading(false);
    } catch (err) {
      console.log(err);
      setMessagesLoading(false);
    }
  };

  const formatDate = (dateString: string | null): string => {
    return dateString ? format(new Date(dateString), "MMM dd") : "";
  };

  const formatTime = (dateString: string | null): string => {
    return dateString ? format(new Date(dateString), "hh:mm a") : "";
  };

  const fetchMessage = async (id: number) => {
    setMessageModal(true);
    setMessageModalLoader(true);
    try {
      const response = await axios.get<string>(
        `http://localhost:3000/messages/${mailbox}/${id}`
      );
      const filteredMessage = messages.find((item) => item.id === id);
      if (filteredMessage) {
        setMessage({
          id: id,
          from: filteredMessage.from,
          date: filteredMessage.date,
          subject: filteredMessage.subject,
          body: response.data,
        });
      }
      setMessageModalLoader(false);
    } catch (err) {
      console.log(err);
      setMessageModalLoader(false);
    }
  };

  const handleMessageDelete = async (id: number) => {
    setDeleteBtnLoad(true);
    try {
      const response = await axios.delete<string>(
        `http://localhost:3000/messages/${mailbox}/${id}`
      );
      if (response.data === "ok") {
        setMessages(messages.filter((item) => item.id !== id));
        setDeleteBtnLoad(false);
        setMessageModal(false);
      }
    } catch (err) {
      console.log(err);
      setDeleteBtnLoad(false);
    }
  };

  const handleAddContact = async () => {
    if (newContact.name && newContact.email) {
      setAddContactBtn(true);
      try {
        const response = await axios.post<Contact>(
          "http://localhost:3000/contacts",
          newContact
        );
        if (response?.data?._id) {
          setContacts([...contacts, response.data]);
          setAddContactBtn(false);
          setNewContact({ name: "", email: "", phoneNumber: "" });
        }
      } catch (err: any) {
        console.log(err);
        setContactError(err.response.data);
        setAddContactBtn(false);
      }
    }
  };

  const handleDeleteContact = async (id: string | null) => {
    try {
      const response = await axios.delete<string>(
        `http://localhost:3000/contacts/${id}`
      );
      if (response.data === "ok") {
        setContacts(contacts.filter((contact) => contact._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const response = await axios.post<string>(
        "http://localhost:3000/messages",
        emailInfo
      );
      if (response.data === "ok") {
        setIsSending(false);
        setSendEmailModal(false);
        setEmailInfo({
          from: "gerard.kulas49@ethereal.email",
          to: "",
          subject: "",
          text: "",
        });
      }
    } catch (err) {
      console.log(err);
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchMailboxes();
      fetchContacts();
    }
  }, []);

  return (
    <>
      {mailLoading ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="3.5rem" />
        </Box>
      ) : (
        <Box
          sx={{
            padding: "0px 30px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontSize="3.5rem">
                {mailbox.charAt(0).toUpperCase() +
                  mailbox.slice(1).toLowerCase()}
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon sx={{ fontSize: "3rem", color: "black" }} />
              </Button>
            </Box>
          </Box>
          <Box sx={{ height: "90%" }}>
            {messagesLoading ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinearProgress sx={{ width: "300px" }} />
              </Box>
            ) : (
              <>
                {messages.length ? (
                  <List>
                    {messages.map((email, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "5px",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                            },
                          }}
                          onClick={() => {
                            fetchMessage(email.id || 0);
                          }}
                        >
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              {email.from}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {email.subject}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Typography variant="body2" fontWeight="bold">
                              {formatDate(email.date)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatTime(email.date)}
                            </Typography>
                          </Box>
                        </ListItem>
                        {index < messages.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography fontSize="2rem">Mailbox Empty!</Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box
              sx={{ width: 300 }}
              role="presentation"
              onClick={() => setIsDrawerOpen(false)}
              onKeyDown={() => setIsDrawerOpen(false)}
            >
              <List>
                {mailboxes.map((mailbox, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => fetchMailboxMessages(mailbox.name)}
                    >
                      <ListItemIcon>
                        {mailbox.name == "Drafts" ? (
                          <DraftsIcon />
                        ) : mailbox.name == "Junk" ? (
                          <RecyclingIcon />
                        ) : mailbox.name == "Sent Mail" ? (
                          <OutboxIcon />
                        ) : mailbox.name == "Trash" ? (
                          <DeleteForeverIcon />
                        ) : (
                          <InboxIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          mailbox?.name?.charAt(0)?.toUpperCase() +
                          mailbox?.name?.slice(1)?.toLowerCase()
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {["Send Email", "Contacts"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (index == 1) {
                          setContactsModal(true);
                        } else {
                          setSendEmailModal(true);
                        }
                      }}
                    >
                      <ListItemIcon>
                        {index % 2 === 0 ? <SendIcon /> : <ContactsIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Box>
      )}
      {messageModal && (
        <MessageModal
          open={messageModal}
          handleClose={() => setMessageModal(false)}
          email={message}
          loader={messageModalLoader}
          deleteBtnLoad={deleteBtnLoad}
          handleMessageDelete={handleMessageDelete}
        />
      )}
      {contactsModal && (
        <ContactsModal
          open={contactsModal}
          handleClose={() => setContactsModal(false)}
          contacts={contacts}
          newContact={newContact}
          setNewContact={setNewContact}
          handleAddContact={handleAddContact}
          handleDeleteContact={handleDeleteContact}
          addContactBtn={addContactBtn}
          contactError={contactError}
        />
      )}
      {sendEmailModal && (
        <SendEmailModal
          open={sendEmailModal}
          handleClose={() => setSendEmailModal(false)}
          contacts={contacts}
          onSendEmail={handleSendEmail}
          emailInfo={emailInfo}
          setEmailInfo={setEmailInfo}
          isSending={isSending}
        />
      )}
    </>
  );
};

export default Mail;
