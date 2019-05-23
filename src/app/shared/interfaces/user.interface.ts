export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  nip: number;
  roles: string[];
  type: string;
  createdDate: Date;
  updatedDate: Date;
  phone: string;
  websiteUrl: string;
}
