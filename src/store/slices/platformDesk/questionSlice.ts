import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

// API Response interfaces based on the actual API structure
interface QuestionCategory {
  id: number;
  title: string;
}

interface ApiQuestionResponse {
  id: number;
  assessment_question_category_id: number | null;
  qualification_id: number | null;
  title: string | null;
  answers: string[]; // Array of answer options
  correct_answer: string | null;
  added_by: number | null;
  status: number;
  created_at: string;
  updated_at: string;
  category: QuestionCategory | null;
}

interface ApiQuestionsResponse {
  success: boolean;
  data: ApiQuestionResponse[];
  meta: {
    per_page: number;
    has_more: boolean;
    next_cursor: string | null;
    prev_cursor: string | null;
  };
  links: {
    next: string | null;
    prev: string | null;
  };
}

// Transformed question interface to match the component structure
export interface Question {
  id: string;
  assessment: string;
  qCategory: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  ans: string[]; // Correct answers
  status: string;
  // Additional fields from API
  assessmentQuestionCategoryId: number | null;
  qualificationId: number | null;
  addedBy: number | null;
  categoryTitle: string | null;
  createdAt: string;
  updatedAt: string;
}

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
  currentAssessmentGuid: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  currentAssessmentGuid: null,
};

// Async thunk to fetch questions by GUID
export const fetchQuestionsByGuid = createAsyncThunk(
  "questions/fetchQuestionsByGuid",
  async (guid: string, { rejectWithValue }) => {
    try {
      // Get auth state from localStorage
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get<ApiQuestionsResponse>(
       
        `https://a.aimshala.com/api/v1/assesment/question`,
        // `/api/v1/assesment/question`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Questions API Response:", response.data);

      // Handle different response structures
      let dataArray: ApiQuestionResponse[] = [];
      
      if (Array.isArray(response.data)) {
        // Response is directly an array
        dataArray = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        // Response has a data property with array
        dataArray = response.data.data;
      } else if (response.data && response.data.success !== false && Array.isArray(response.data.data)) {
        // Response has success flag and data array
        dataArray = response.data.data;
      } else {
        console.error("Invalid API response structure:", response.data);
        return { questions: [], guid };
      }

      // Transform the API data to match the component structure
      const transformedData: Question[] = dataArray
        .map((item) => {
          try {
            // Answers is now an array from the API
            const answerArray = Array.isArray(item.answers) 
              ? [...item.answers] 
              : [];

            // Pad with empty strings to ensure we have 5 options
            while (answerArray.length < 5) {
              answerArray.push("");
            }

            // Correct answer is a single value (can be null)
            const correctAnswers = item.correct_answer ? [item.correct_answer] : [];

            // Convert status number to string
            const statusText = item.status === 1 ? "Active" : "Draft";

            // Get category title from category object or use a default
            const categoryTitle = item.category?.title || null;
            const qCategory = categoryTitle || 
              (item.assessment_question_category_id 
                ? `Category ${item.assessment_question_category_id}` 
                : "Uncategorized");

            return {
              id: item.id.toString(),
              assessment: "Assessment", 
              qCategory: qCategory,
              question: item.title || "",
              option1: answerArray[0] || "",
              option2: answerArray[1] || "",
              option3: answerArray[2] || "",
              option4: answerArray[3] || "",
              option5: answerArray[4] || "",
              ans: correctAnswers,
              status: statusText,

              // Additional fields from API
              assessmentQuestionCategoryId: item.assessment_question_category_id,
              qualificationId: item.qualification_id,
              addedBy: item.added_by,
              categoryTitle: categoryTitle,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
            };
          } catch (error) {
            console.error("Error transforming question item:", error);
            return null;
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      return { questions: transformedData, guid };
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch questions"
      );
    }
  }
);

// Async thunk to create a new question
export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (
    questionData: {
      assessment_question_category_id: number;
      qualification_id: number;
      title: string;
      answers: string[];
      correct_answer: string;
      added_by: number;
      status: number;
    },
    { rejectWithValue, dispatch, getState }
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

      const response = await axios.post(
        `https://a.aimshala.com/api/v1/assesment/question`,
     
        // "/api/v1/assesment/question",
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Create question response:", response.data);

      // Refresh the questions list after successful creation
      const state = getState() as any;
      const currentGuid = state.questions.currentAssessmentGuid;
      if (currentGuid) {
        await dispatch(fetchQuestionsByGuid(currentGuid));
      }

      return response.data;
    } catch (error: any) {
      console.error("Error creating question:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create question"
      );
    }
  }
);

// Async thunk to update a question
export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (
    {
      id,
      ...questionData
    }: {
      id: string;
      assessment_question_category_id?: number;
      qualification_id?: number;
      title?: string;
      answers?: string[];
      correct_answer?: string;
      status?: number;
    },
    { rejectWithValue, dispatch, getState }
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

      const response = await axios.put(
         `https://a.aimshala.com/api/v1/assesment/question/${id}`,
        // `/api/v1/assesment/question/${id}`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update question response:", response.data);

      // Refresh the questions list after successful update
      const state = getState() as any;
      const currentGuid = state.questions.currentAssessmentGuid;
      if (currentGuid) {
        await dispatch(fetchQuestionsByGuid(currentGuid));
      }

      return response.data;
    } catch (error: any) {
      console.error("Error updating question:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update question"
      );
    }
  }
);

// Async thunk to delete a question
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.delete(
       
        `https://a.aimshala.com/api/v1/assesment/question/${id}`,
        // `/api/v1/assesment/question/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Delete question response:", response.data);

      // Refresh the questions list after successful deletion
      const state = getState() as any;
      const currentGuid = state.questions.currentAssessmentGuid;
      if (currentGuid) {
        await dispatch(fetchQuestionsByGuid(currentGuid));
      }

      return response.data;
    } catch (error: any) {
      console.error("Error deleting question:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete question"
      );
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    clearQuestions: (state) => {
      state.questions = [];
      state.currentAssessmentGuid = null;
      state.error = null;
    },
    setCurrentAssessmentGuid: (state, action: PayloadAction<string>) => {
      state.currentAssessmentGuid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch questions
      .addCase(fetchQuestionsByGuid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsByGuid.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.questions = action.payload;
        } else {
          state.questions = action.payload.questions;
          state.currentAssessmentGuid = action.payload.guid;
        }
        state.error = null;
      })
      .addCase(fetchQuestionsByGuid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create question
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update question
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete question
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQuestions, setCurrentAssessmentGuid } =
  questionSlice.actions;

// Selectors
export const selectQuestions = (state: { questions: QuestionState }) =>
  state.questions.questions;
export const selectQuestionsLoading = (state: { questions: QuestionState }) =>
  state.questions.loading;
export const selectQuestionsError = (state: { questions: QuestionState }) =>
  state.questions.error;
export const selectCurrentAssessmentGuid = (state: {
  questions: QuestionState;
}) => state.questions.currentAssessmentGuid;

export default questionSlice.reducer;