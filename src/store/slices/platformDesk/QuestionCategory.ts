

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface QuestionCategoryResponse {
  data: {
    id: number;
    title: string;
    status: number;
    service_assesment_id: number;
    updated_at: string;
  }[];
  next_cursor: string | null;
  prev_cursor: string | null;
  has_more: boolean;
}

interface SaveCategoryInput {
  title: string;
  status?: number; // defaults to 1
  service_assesment_id?: number; // defaults to 1
}

interface UpdateCategoryInput {
  id: number;
  title: string;
  status: number;
  service_assesment_id?: number;
}

interface QuestionCategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching question categories
export const fetchCategories = createAsyncThunk<Category[], void>(
  "questionCategory/fetchCategories",
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

      const response = await axios.get<QuestionCategoryResponse>(
        // `/api/v1/assesment/question-category`,
        `https://a.aimshala.com/api/v1/assesment/question-category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
          },
        }
      );

      const raw = response.data;

      // Handle the response structure
      let items: any[] = [];
      if (Array.isArray(raw)) {
        items = raw;
      } else if (Array.isArray(raw?.data)) {
        items = raw.data;
      }

      const normalized: Category[] = (items || [])
        .map((item: any) => {
          const name = item?.title ?? item?.name ?? item?.category ?? item?.label ?? "";
          if (!name) return null;
          const id = item?.id;
          if (!id) return null;
          return { id: Number(id), name: String(name) } as Category;
        })
        .filter(Boolean) as Category[];

      return normalized;
    } catch (error: any) {
      console.error("Error fetching question categories:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch question categories"
      );
    }
  }
);

// Create async thunk for saving a question category
export const saveCategory = createAsyncThunk<void, SaveCategoryInput>(
  "questionCategory/saveCategory",
  async ({ title, status = 1, service_assesment_id = 1 }, { rejectWithValue, dispatch }) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "https://a.aimshala.com/api/v1/assesment/question-category",
        // `/api/v1/assesment/question-category`,
        { 
          title, 
          status: Number(status), 
          service_assesment_id: Number(service_assesment_id) 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
          },
        }
      );

      // Refresh the list after successful save
      await dispatch(fetchCategories());
    } catch (error: any) {
      console.error("Error saving question category:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save question category"
      );
    }
  }
);

// Create async thunk for deleting a question category
export const deleteCategory = createAsyncThunk<void, number>(
  "questionCategory/deleteCategory",
  async (categoryId, { rejectWithValue, dispatch }) => {
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
        `https://a.aimshala.com/api/v1/assesment/question-category/${categoryId}`,
        // `/api/v1/assesment/question-category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
          },
        }
      );

      // Refresh the list after successful deletion
      await dispatch(fetchCategories());
    } catch (error: any) {
      console.error("Error deleting question category:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete question category"
      );
    }
  }
);

// Create async thunk for updating a question category
export const updateCategory = createAsyncThunk<void, UpdateCategoryInput>(
  "questionCategory/updateCategory",
  async ({ id, title, status, service_assesment_id = 1 }, { rejectWithValue, dispatch }) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.put(
        // `/api/v1/assesment/question-category/${id}`,
        `https://a.aimshala.com/api/v1/assesment/question-category/${id}`,
        { 
          title, 
          status: Number(status), 
          service_assesment_id: Number(service_assesment_id) 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
          },
        }
      );

      // Refresh the list after successful update
      await dispatch(fetchCategories());
    } catch (error: any) {
      console.error("Error updating question category:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update question category"
      );
    }
  }
);

// Create slice
const questionCategorySlice = createSlice({
  name: "questionCategory",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Save category
      .addCase(saveCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategories } = questionCategorySlice.actions;

// Selectors
export const selectQuestionCategories = (state: { questionCategories: QuestionCategoryState }) =>
  state.questionCategories.categories;
export const selectQuestionCategoriesLoading = (state: { questionCategories: QuestionCategoryState }) =>
  state.questionCategories.loading;
export const selectQuestionCategoriesError = (state: { questionCategories: QuestionCategoryState }) =>
  state.questionCategories.error;

export default questionCategorySlice.reducer;