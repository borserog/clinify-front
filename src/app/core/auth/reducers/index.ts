import { PermissionsEnum } from './../../../main/model/permissions.enum';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { UserLogin } from 'src/app/login/login.component';
import { User } from 'src/app/main/model/user.model';
import { authActions } from '../actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  username: string;
}

export const initialAuthState: AuthState = {
  username: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.loginAttempt, (state, action) => {
    return {
      username: action.username,
    };
  }),
  on(authActions.logout, (state, action) => {
    return {
      username: undefined
    }
  })
);


