import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface SaveCategoryInput {
  title: string;
  status?: string | number; // defaults to "1"
}

interface UpdateCategoryInput {
  id: number;
  title: string;
  status: string | number;
}

interface GeneralCategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: GeneralCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching categories
export const fetchCategories = createAsyncThunk<Category[], void>(
  "generalCategories/fetchCategories",
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
        `https://a.aimshala.com/api/v1/assesment/category`, 
        // `/api/v1/assesment/category`, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      const raw = response.data as any;

      let items: any[] = [];
      if (Array.isArray(raw)) {
        items = raw;
      } else if (Array.isArray(raw?.categories)) {
        items = raw.categories;
      } else if (Array.isArray(raw?.data)) {
        items = raw.data;
      } else if (Array.isArray(raw?.data?.data)) {
        items = raw.data.data;
      }

      const normalized: Category[] = (items || [])
        .map((item: any, index: number) => {
          const name =
            item?.name ?? item?.category ?? item?.title ?? item?.label ?? "";
          if (!name) return null;
          const idRaw = item?.id ?? item?.category_id ?? index;
          const id = Number.isFinite(Number(idRaw)) ? Number(idRaw) : index;
          return { id, name: String(name) } as Category;
        })
        .filter(Boolean) as Category[];

      return normalized;
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch categories"
      );
    }
  }
);

// Create async thunk for saving a category
export const saveCategory = createAsyncThunk<void, SaveCategoryInput>(
  "generalCategories/saveCategory",
  async ({ title, status = "1" }, { rejectWithValue, dispatch }) => {
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
        `https://a.aimshala.com/api/v1/assesment/category`,
        // `/api/v1/assesment/category`,

        { title, status: String(status) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      // Refresh the list after successful save
      await dispatch(fetchCategories());
    } catch (error: any) {
      console.error("Error saving category:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save category"
      );
    }
  }
);

// Create async thunk for deleting a category
export const deleteCategory = createAsyncThunk<void, number>(
  "generalCategories/deleteCategory",
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
        `https://a.aimshala.com/api/v1assesment/category-delete/${categoryId}`,
        // `/api/v1/assesment/category-delete/${categoryId}`,

         {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      // Refresh the list after successful deletion
      await dispatch(fetchCategories());
    } catch (error: any) {
      console.error("Error deleting category:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete category"
      );
    }
  }
);

// Create async thunk for updating a category
export const updateCategory = createAsyncThunk<void, UpdateCategoryInput>(
  "generalCategories/updateCategory",
  async ({ id, title, status }, { rejectWithValue, dispatch }) => {
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
        `https://a.aimshala.com/api/v1/assesment/category/${id}`,
        // `/api/v1/assesment/category/${id}`,  

        { title, status: String(status) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      // Refresh the list after successful update
      await dispatch(fetchCategories());
    } catch (error: any) {
      console.error("Error updating category:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update category"
      );
    }
  }
);

// Create slice for general categories
const generalCategorySlice = createSlice({
  name: "generalCategories",
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

export const { clearCategories } = generalCategorySlice.actions;

// Selectors
export const selectGeneralCategories = (state: { generalCategories: GeneralCategoryState }) =>
  state.generalCategories.categories;
export const selectGeneralCategoriesLoading = (state: { generalCategories: GeneralCategoryState }) =>
  state.generalCategories.loading;
export const selectGeneralCategoriesError = (state: { generalCategories: GeneralCategoryState }) =>
  state.generalCategories.error;

export default generalCategorySlice.reducer;