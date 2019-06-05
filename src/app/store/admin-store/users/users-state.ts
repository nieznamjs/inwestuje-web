import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { User } from '@interfaces/user.interface';
import { UsersState } from '@interfaces/ngrx/admin/users/users-state';

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: model => model.id,
  sortComparer: (a: User, b: User): number => b.id.toString().localeCompare(a.id.toString()),
});

export const usersInitialState: UsersState = usersAdapter.getInitialState({
  isLoading: false,
  error: null,
  count: 0,
});
