import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthState } from "../types/auth/types";

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
        setAuthStatus: (state, action: PayloadAction<AuthState['status']>) => {
            state.status = action.payload;

        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        } 

    }
})

export const { setCredentials, logout, setAuthStatus, setAuthError } = authSlice.actions;
export default authSlice.reducer;

// Selectores
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;   
