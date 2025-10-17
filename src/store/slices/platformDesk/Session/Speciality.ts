import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const ICON_URL = "https://aimshalanewt3large.s3.ap-south-1.amazonaws.com/aims";

interface Speciality {
  id: number;
  coach_id: number;
  expertise_id: number | null;
  title: string;
  segment_id: number;
  status: number;
  icon?: File | string | null;
  created_at: string;
  updated_at: string;
  // Nested objects from API response
  coach?: {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
  expertise?: {
    id: number;
    name: string;
    sub_title?: string;
    icon?: string;
    coach_id: string;
    status: string;
    created_at: string;
    updated_at: string;
  } | null;
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

// Create async thunk for fetching specialities
export const fetchSpecialities = createAsyncThunk(
  "speciality/fetchSpecialities",
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
        // "https://a.aimshala.com/api/v1/speciality",
        `/api/v1/speciality`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Handle different response formats
      const payload = response.data;
      const list: any[] = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.specialities)
        ? payload.specialities
        : Array.isArray(payload?.data)
        ? payload.data
        : payload?.results && Array.isArray(payload.results)
        ? payload.results
        : null;

      if (!list) throw new Error("Invalid response format from server");

      // Normalize the data
      return list.map((s: any) => ({
        id: Number(s.id),
        coach_id: Number(s.coach_id),
        expertise_id: s.expertise_id ? Number(s.expertise_id) : null,
        title: String(s.title ?? ""),
        segment_id: Number(s.segment_id),
        status: Number(s.status ?? 1),
        icon: s.icon ? (typeof s.icon === 'string' ? 
          (s.icon.startsWith('http') ? s.icon : `${ICON_URL}${s.icon}`) : 
          s.icon) : null,
        created_at: String(s.created_at ?? ""),
        updated_at: String(s.updated_at ?? ""),
        // Include nested objects for easier access
        coach: s.coach,
        expertise: s.expertise,
      })) as Speciality[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const createSpeciality = createAsyncThunk(
  "speciality/createSpeciality",
  async (
    specialityData: {
      coach_id: number;
      expertise_id: number | null;
      title: string;
      segment_id: number;
      status: number;
      icon?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      const form = new FormData();
      form.append("coach_id", String(specialityData.coach_id));
      if (specialityData.expertise_id !== null) {
        form.append("expertise_id", String(specialityData.expertise_id));
      }
      form.append("title", String(specialityData.title));
      form.append("segment_id", String(specialityData.segment_id));
      form.append("status", String(specialityData.status));
      
      if (specialityData.icon instanceof File) {
        form.append("icon", specialityData.icon);
      }

      const response = await axios.post(
        // "https://a.aimshala.com/api/v1/speciality",
        `/api/v1/speciality`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Server response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      if (response.data) {
        if (Array.isArray(response.data?.specialities)) return response.data.specialities[0];
        if (Array.isArray(response.data?.data)) return response.data.data[0];
        if (response.data?.data && !Array.isArray(response.data.data)) return response.data.data;
        if (response.data.id && response.data.title) return response.data;
        if (Array.isArray(response.data) && response.data.length > 0) return response.data[0];
        console.error("Unexpected response format:", response.data);
      }

      throw new Error(
        "Invalid response format from server. Check console for details."
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const updateSpeciality = createAsyncThunk(
  "speciality/updateSpeciality",
  async (
    { id, data }: { id: number; data: Partial<Speciality> },
    { rejectWithValue }
  ) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      const form = new FormData();
      
      // Always append required fields
      form.append("coach_id", String(data.coach_id || ""));
      if (data.expertise_id !== null && data.expertise_id !== undefined) {
        form.append("expertise_id", String(data.expertise_id));
      }
      form.append("title", String(data.title || ""));
      form.append("segment_id", String(data.segment_id || ""));
      form.append("status", String(data.status || 1));
      
      // Handle icon - only append if it's a File
      const icon: any = (data as any).icon;
      if (icon instanceof File) {
        form.append("icon", icon);
      }
      
      // Debug: Log what we're sending
      console.log("PUT Request data:", {
        coach_id: data.coach_id,
        expertise_id: data.expertise_id,
        title: data.title,
        segment_id: data.segment_id,
        status: data.status,
        icon: icon instanceof File ? "File object" : icon
      });

      const response = await axios.put(
        // `https://a.aimshala.com/api/v1/speciality/${id}`,
        `/api/v1/speciality/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("PUT Server response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      if (response.data) {
        // Handle different response formats
        if (Array.isArray(response.data?.specialities)) return response.data.specialities[0];
        if (Array.isArray(response.data?.data)) return response.data.data[0];
        if (response.data?.data && !Array.isArray(response.data.data)) return response.data.data;
        if (response.data.id && response.data.title) return response.data;
        if (Array.isArray(response.data) && response.data.length > 0) return response.data[0];
        console.error("Unexpected PUT response format:", response.data);
      }
      throw new Error("Invalid response format from server. Check console for details.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const deleteSpeciality = createAsyncThunk(
  "speciality/deleteSpeciality",
  async (id: number, { rejectWithValue }) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        // `https://a.aimshala.com/api/v1/speciality/${id}`,
        `/api/v1/speciality/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const specialitySlice = createSlice({
  name: "speciality",
  initialState,
  reducers: {
    clearSpecialities: (state) => {
      state.specialities = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch specialities
      .addCase(fetchSpecialities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = action.payload as Speciality[];
        state.error = null;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch specialities";
      })
      // Create speciality
      .addCase(createSpeciality.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSpeciality.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.specialities.push(action.payload as unknown as Speciality);
        state.error = null;
      })
      .addCase(createSpeciality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create speciality";
      })
      // Update speciality
      .addCase(updateSpeciality.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpeciality.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = state.specialities.map((spec) => {
          const next = action.payload as unknown as Speciality;
          return spec.id === next.id ? next : spec;
        });
        state.error = null;
      })
      .addCase(updateSpeciality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update speciality";
      })
      // Delete speciality
      .addCase(deleteSpeciality.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSpeciality.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = state.specialities.filter(
          (spec) => spec.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteSpeciality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete speciality";
      });
  },
});

export const { clearSpecialities } = specialitySlice.actions;

export default specialitySlice.reducer;

export interface RootState {
  speciality: SpecialityState;
}

export const selectSpecialities = (state: RootState) => state.speciality.specialities;
export const selectSpecialityLoading = (state: RootState) =>
  state.speciality.loading;
export const selectSpecialityError = (state: RootState) => state.speciality.error;
