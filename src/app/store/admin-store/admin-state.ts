import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { AdminState } from '@interfaces/ngrx/admin/admin-state';

export const adminAdapter: EntityAdapter<any> = createEntityAdapter({});

export const adminInitialState: AdminState = adminAdapter.getInitialState({});
