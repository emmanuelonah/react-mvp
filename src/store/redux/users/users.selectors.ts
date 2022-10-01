import { createSelector } from 'reselect';

import { RootState } from 'RootTypes';

const selectUsersState = (state: RootState) => state.users;

const selectUsersIsLoading = createSelector([selectUsersState], (users) => users.isLoading);

const selectUsersError = createSelector([selectUsersState], (users) => users.error);

const selectUsers = createSelector([selectUsersState], (users) => users.data);

export { selectUsersIsLoading, selectUsersError, selectUsers };
