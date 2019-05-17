export interface CreateUserBody {
  email: string;
  firstName: string | null;
  lastName: string | null;
  password: string;
  companyName: string | null;
  type: string;
  roles: string[];
  nip: number | null;
}
