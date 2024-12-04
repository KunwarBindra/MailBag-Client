export interface Message {
  id: number | null;
  from: string | null;
  date: string | null;
  subject: string | null;
  body: string | null;
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface NewContact {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface EmailInfo {
  from?: string;
  to: string;
  subject: string;
  text: string;
}

export interface Mailbox {
  name: string;
}
