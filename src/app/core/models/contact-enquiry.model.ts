export interface ContactEnquiry {
  name: string;
  phone: string;
  altPhone?: string;
  email?: string;
  subject: string;
  message: string;
  createdAt?: string;
}
