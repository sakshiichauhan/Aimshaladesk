import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// const URL_BASE = "https://a.aimshala.com/api/admin/login";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `/api/admin/login`,
        // URL_BASE,

         {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  user: null | Record<string, any>;
  token: string | null;
  loading: boolean;
  error: string | null;
  expiresAt: number | null;
}

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
        expiresAt: null,
      };
    }
    const state = JSON.parse(serializedState);

    // Check if token has expired
    if (state.expiresAt && Date.now() > state.expiresAt) {
      localStorage.removeItem("authState");
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
        expiresAt: null,
      };
    }

    return state;
  } catch (err) {
    return {
      user: null,
      token: null,
      loading: false,
      error: null,
      expiresAt: null,
    };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("authState");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now

        // Save to localStorage
        localStorage.setItem(
          "authState",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
            loading: false,
            error: null,
            expiresAt: state.expiresAt,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error =
          action.payload?.message || action.error?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
