import { EntityState } from '@ngrx/entity';

import { User } from '@interfaces/user.interface';

export interface UsersState extends EntityState<User> {
  count: number;
  isLoading: boolean;
  error: string;
  updatingUsersId: string[];
}
