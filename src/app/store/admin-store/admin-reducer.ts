import { adminInitialState } from './admin-state';
import { AdminState } from '@interfaces/ngrx/admin/admin-state';
import { AdminAction } from '@interfaces/ngrx/admin/admin-actions';

export function adminReducer(state = adminInitialState, action: AdminAction): AdminState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
