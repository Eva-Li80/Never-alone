import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, LogInRespons, Error, RegisterRespons } from "../utils/types";
import { loginRequest, registerRequest } from "../utils/api";
import { Alert } from "react-native";

export interface AuthState {
  user: User | null;
  token: string | null;
  expiration: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  expiration: null,
};

export const login = createAsyncThunk<
  LogInRespons | Error,
  { username: string; password: string }
>("authentication/login", async (data, { rejectWithValue }) => {
  try {
    const respons = await loginRequest(data.username, data.password);
    return respons;
  } catch (error) {
    Alert.alert(
      "Inloggning misslyckades",
      "Fel lösenord eller användarnaman. Försök igen!"
    );
    return rejectWithValue("Failed to fetch");
  }
});

export const register = createAsyncThunk<
  RegisterRespons | Error,
  { email: string; username: string; password: string }
>("authentication/register", async (data, { rejectWithValue }) => {
  try {
    const respons = await registerRequest(
      data.email,
      data.username,
      data.password
    );
    return respons;
  } catch (error) {
    Alert.alert(
      "Registrering misslyckades",
      "Användarnamnet är upptaget. Försök med ett annat!"
    );
    return rejectWithValue("Failed to fetch");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expiration = action.payload.expiration;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiration = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      const respons = action.payload as LogInRespons;
      state.user = respons.user;
      state.token = respons.token;
      state.expiration = respons.expiration;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      const respons = action.payload as RegisterRespons;
    });

    builder.addCase(register.rejected, (state, action) => {
      const respons = action.payload as Error;
    });
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
