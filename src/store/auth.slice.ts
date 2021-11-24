import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import * as auth from "../auth-provider";
import { AuthForm, initUser } from "../context/auth-context";
import { User } from "../screens/project-list/SearchPanel";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

export const init = () => (dispatch: AppDispatch) =>
  initUser().then((user) => dispatch(setUser(user)));

export const selectUser = (state: RootState) => state.auth.user;
