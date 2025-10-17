import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
// import { fetchSpecialities, createSpeciality } from "./SpecialityThunk";

// Default icon URL
export const DEFAULT_ICON_URL = "https://aimshalanewt3large.s3.ap-south-1.amazonaws.com/aims";

export interface Speciality {
  id: number;
  coach_id: number;
  expertise_id: number;
  icon: File | string | null;
  title: string;
  segment_id: number;
  status: number;
}

interface SpecialityState {
  specialities: Speciality[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecialityState = {
  specialities: [],
  loading: false,
  error: null,
};

const specialitySlice = createSlice({
  name: "speciality",
  initialState,
  reducers: {},
  extraReducers: () => {
    // TODO: Add thunk cases when SpecialityThunk is implemented
    // builder
    //   .addCase(fetchSpecialities.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchSpecialities.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.specialities = action.payload;
    //   })
    //   .addCase(fetchSpecialities.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(createSpeciality.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(createSpeciality.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(createSpeciality.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

// Selectors
export const selectSpecialities = (state: RootState) => state.speciality.specialities;
export const selectSpecialityLoading = (state: RootState) => state.speciality.loading;
export const selectSpecialityError = (state: RootState) => state.speciality.error;

export default specialitySlice.reducer;