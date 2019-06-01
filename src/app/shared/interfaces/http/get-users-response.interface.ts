import { User } from '@interfaces/user.interface';

export interface GetUsersResponse {
  data: User[];
  count: number;
}
