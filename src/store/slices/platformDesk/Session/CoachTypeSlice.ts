// import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Coach {
  id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface CoachTypeState {
  coaches: Coach[];
  loading: boolean;
  error: string | null;
}

const initialState: CoachTypeState = {
  coaches: [],
  loading: false,
  error: null,
};

export const fetchCoachTypes = createAsyncThunk(
  "coachType/fetchCoachTypes",
  async (_, { rejectWithValue }) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        // "https://a.aimshala.com/api/v1/coaches",
        "/api/v1/coaches",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Ensure we're returning the correct data structure
      if (response.data && response.data.coaches) {
        return response.data.coaches;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      console.log("API Response:", response.data);
      throw new Error("Invalid response format from server");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred while fetching coach types");
    }
  }
);

// Create the coach type slice
const coachTypeSlice = createSlice({
  name: "coachType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoachTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoachTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.coaches = action.payload;
        state.error = null;
      })
      .addCase(fetchCoachTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coach types";
      });
  },
});

export default coachTypeSlice.reducer;

export interface RootState {
  coachType: CoachTypeState;
}

export const selectCoachTypes = (state: RootState) => state.coachType.coaches;
export const selectCoachTypesLoading = (state: RootState) =>
  state.coachType.loading;
export const selectCoachTypesError = (state: RootState) =>
  state.coachType.error;
