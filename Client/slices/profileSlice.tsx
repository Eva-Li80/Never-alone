import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../utils/types";
import {
  updateProfileRequest,
  createProfileRequest,
  getProfileRequest,
} from "../utils/api";

export interface ProfileState {
  profile: Profile;
}

const initialState: ProfileState = {
  profile: {
    id: 0,
    name: "Test",
    image: "test",
    userId: 0,
    user: { id: 0, username: "test", password: "test", email: "test" },
  },
};

export const getProfile = createAsyncThunk<Profile, { id: string }>(
  "profile/GetProfile",
  async (data, { rejectWithValue }) => {
    try {
      const respons = await getProfileRequest(data.id);
      return respons;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch");
    }
  }
);

export const updateProfile = createAsyncThunk<
  Profile,
  { id: string; name: string }
>("profile/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const respons = await updateProfileRequest(data.id, data.name);
    return respons;
  } catch (error) {
    return rejectWithValue("Failed to fetch");
  }
});
export const createProfile = createAsyncThunk<
  Profile,
  { id: string; name: string }
>("profile/createProfile", async (data, { rejectWithValue }) => {
  try {
    const respons = await createProfileRequest(data.id, data.name);
    return respons;
  } catch (error) {
    return rejectWithValue("Failed to fetch");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCurrentProfile: (state, action) => {
      state = action.payload.profile;
    },
  },

  extraReducers(builder) {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { setCurrentProfile } = profileSlice.actions;
export default profileSlice.reducer;