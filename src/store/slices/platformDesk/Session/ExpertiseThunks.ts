import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Default icon URL - using global constant
const IMAGE_BASE_URL = "https://aimshalanewt3large.s3.ap-south-1.amazonaws.com/aims/uploads-dev";


interface Expertise {
  id: number;
  name: string;
  sub_title?: string | null;
  icon?: File | string | null; // Can be File for uploads or string URL for display
  coach_id: number | string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ExpertiseState {
  expertise: Expertise[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpertiseState = {
  expertise: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching expertise
export const fetchExpertise = createAsyncThunk(
  "expertise/fetchExpertise",
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
        // "https://a.aimshala.com/api/v1/expertise",
        "/api/v1/expertise",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Accept a few shapes and normalize
      const payload = response.data;
      const list: any[] = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.expertise)
        ? payload.expertise
        : Array.isArray(payload?.data)
        ? payload.data
        : payload?.results && Array.isArray(payload.results)
        ? payload.results
        : null;

      if (!list) throw new Error("Invalid response format from server");

      // Light normalization (coach_id may be string)
      return list.map((e: any) => ({
        id: Number(e.id),
        name: String(e.name ?? ""),
        sub_title: e.sub_title ?? null,
        icon: e.icon ? (typeof e.icon === 'string' ? 
          (e.icon.startsWith('http') ? e.icon : `${IMAGE_BASE_URL}${e.icon}`) : 
          e.icon) : null,
        coach_id: e.coach_id,
        status: String(e.status ?? "active"),
        created_at: String(e.created_at ?? ""),
        updated_at: String(e.updated_at ?? ""),
      })) as Expertise[];
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

export const createExpertise = createAsyncThunk(
  "expertise/createExpertise",
  async (
    expertiseData: {
      name: string;
      coach_id: number | string;
      status: string;
      sub_title?: string | null;
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
      form.append("name", String(expertiseData.name));
      form.append("coach_id", String(expertiseData.coach_id));
      form.append("status", String(expertiseData.status));
      
      // Only append sub_title if it has a value
      if (expertiseData.sub_title && expertiseData.sub_title.trim()) {
        form.append("sub_title", String(expertiseData.sub_title));
      }
      
      // Only append icon if it's a File
      if (expertiseData.icon instanceof File) {
        form.append("icon", expertiseData.icon);
      }

      const response = await axios.post(
        // "https://a.aimshala.com/api/v1/expertise",
        `/api/v1/expertise`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            // Let browser set multipart boundary
          },
        }
      );

      console.log("Server response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      if (response.data) {
        let expertiseData;
        if (Array.isArray(response.data?.expertise)) expertiseData = response.data.expertise[0];
        else if (Array.isArray(response.data?.data)) expertiseData = response.data.data[0];
        else if (response.data?.data && !Array.isArray(response.data.data)) expertiseData = response.data.data;
        else if (response.data.id && response.data.name) expertiseData = response.data;
        else if (Array.isArray(response.data) && response.data.length > 0) expertiseData = response.data[0];
        else {
          console.error("Unexpected response format:", response.data);
          throw new Error("Invalid response format from server. Check console for details.");
        }

        // Normalize the icon URL if it exists
        if (expertiseData && expertiseData.icon && typeof expertiseData.icon === 'string') {
          expertiseData.icon = expertiseData.icon.startsWith('http') ? 
            expertiseData.icon : 
            `${IMAGE_BASE_URL}${expertiseData.icon}`;
        }

        return expertiseData;
      }

      throw new Error(
        "Invalid response format from server. Check console for details."
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        
        // Log detailed error information for 422 errors
        if (error.response?.status === 422) {
          console.error("Validation Error (422) in createExpertise:", {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message || error.message,
            errors: error.response.data?.errors || "No detailed errors provided",
            url: error.config?.url,
            method: error.config?.method
          });
        }
        
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const updateExpertise = createAsyncThunk(
  "expertise/updateExpertise",
  async (
    { id, data }: { id: number; data: Partial<Expertise> },
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
      
      // Validate required fields before sending
      if (!data.name || !data.coach_id) {
        throw new Error("Missing required fields: name and coach_id are required");
      }
      
      // Always append required fields
      form.append("name", String(data.name));
      form.append("coach_id", String(data.coach_id));
      form.append("status", String(data.status || "active"));
      
      // Append optional fields only if they have values
      if (data.sub_title && data.sub_title.trim()) {
        form.append("sub_title", String(data.sub_title));
      }
      
      // Handle icon - only append if it's a File
      const icon: any = (data as any).icon;
      if (icon instanceof File) {
        form.append("icon", icon);
      }

      // Debug: Log what we're sending
      console.log("PUT Request data:", {
        id,
        name: data.name,
        coach_id: data.coach_id,
        status: data.status,
        sub_title: data.sub_title,
        icon: icon instanceof File ? "File object" : icon
      });
      
      // Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.put(
        // `https://a.aimshala.com/api/v1/expertise/${id}`,
        `/api/v1/expertise/${id}`,
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
        let expertiseData;
        if (Array.isArray(response.data?.expertise)) expertiseData = response.data.expertise[0];
        else if (Array.isArray(response.data?.data)) expertiseData = response.data.data[0];
        else if (response.data?.data && !Array.isArray(response.data.data)) expertiseData = response.data.data;
        else if (response.data.id && response.data.name) expertiseData = response.data;
        else if (Array.isArray(response.data) && response.data.length > 0) expertiseData = response.data[0];
        else {
          console.error("Unexpected PUT response format:", response.data);
          throw new Error("Invalid response format from server. Check console for details.");
        }

        // Normalize the icon URL if it exists
        if (expertiseData && expertiseData.icon && typeof expertiseData.icon === 'string') {
          expertiseData.icon = expertiseData.icon.startsWith('http') ? 
            expertiseData.icon : 
            `${IMAGE_BASE_URL}${expertiseData.icon}`;
        }

        return expertiseData;
      }
      throw new Error("Invalid response format from server. Check console for details.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
        }
        
        // Log detailed error information for 422 errors
        if (error.response?.status === 422) {
          console.error("Validation Error (422):", {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message || error.message,
            errors: error.response.data?.errors || "No detailed errors provided",
            url: error.config?.url,
            method: error.config?.method
          });
        }
        
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const expertiseSlice = createSlice({
  name: "expertise",
  initialState,
  reducers: {
    clearExpertise: (state) => {
      state.expertise = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expertise
      .addCase(fetchExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.expertise = action.payload as Expertise[];
        state.error = null;
      })
      .addCase(fetchExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch expertise";
      })
      // Create expertise
      .addCase(createExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpertise.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.expertise.push(action.payload as unknown as Expertise);
        state.error = null;
      })
      .addCase(createExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create expertise";
      })
      // Update expertise
      .addCase(updateExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.expertise = state.expertise.map((exp) => {
          const next = action.payload as unknown as Expertise;
          return exp.id === next.id ? next : exp;
        });
        state.error = null;
      })
      .addCase(updateExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update expertise";
      });
  
  },
});

export const { clearExpertise } = expertiseSlice.actions;

export default expertiseSlice.reducer;

export interface RootState {
  expertise: ExpertiseState;
}

export const selectExpertise = (state: RootState) => state.expertise.expertise;
export const selectExpertiseLoading = (state: RootState) =>
  state.expertise.loading;
export const selectExpertiseError = (state: RootState) => state.expertise.error;
