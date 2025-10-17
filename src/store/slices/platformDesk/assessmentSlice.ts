import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// Note: Categories are now handled separately in their own slices
// - General categories: categoriesThunk.ts (for assessment management)
// - Question categories: QuestionCategory.ts (for question management)
import {
  fetchManageAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  type ManageAssessment,
} from "./ManageThunk";
import { fetchSegments, type Segment } from "./segmentThunk";

interface ApiAssessmentResponse {
  id: number;
  user_id: number;
  test_id: string;
  highlights: string;
  summary: string | null;
  career_clusters: string;
  top_careers: string;
  educational: string;
  skill_development: string;
  experiential: string;
  networking: string;
  pillars_img: string | null;
  riasec_img: string | null;
  cluster_img: string | null;
  updated_at: string;
  created_at: string;
  payment_details: {
    assesment_name: string;
    segment: string;
    source: "Direct" | "Partner";
    paid_amount: string;
    code: string;
    status: string;
  };
  user_data: {
    id: number;
    role_id: number;
    ip: string;
    user_type: string;
    user_active: string;
    referral_code: string | null;
    name: string;
    image: string;
    email_verified_at: string | null;
    notification_preference: string;
    username: string;
    email: string;
    email_verify: string;
    headline: string | null;
    phone: string;
    gender: string;
    dob: string;
    country: string;
    state: string | null;
    city: string | null;
    address: string | null;
    zip: string | null;
    about: string | null;
    short_details: string | null;
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    instagram: string | null;
    youtube: string | null;
    language_id: string;
    language_code: string;
    language_name: string;
    status: number;
    currency_id: number;
    referral_by: string | null;
    added_by: number;
    language_rtl: number;
    otp: string | null;
    come_by: string;
    token: string;
    razor_customer_id: string | null;
    web_token: string | null;
    google_token: string | null;
    last_activity_at: string;
    last_login_at: string;
    registration_at: string;
    personal_access_tokens: string | null;
    created_at: string;
    updated_at: string;
  };
}

interface ApiResponse {
  totalData: number;
  aceReportData: ApiAssessmentResponse[];
}

interface DirectSource {
  type: "Direct";
}

interface PartnerSource {
  type: "Partner";
  partnerName: string;
  commission: string;
  assessmentPrice: number;
  partnerShare: number;
  aimshalaShare: number;
  accessCode: string;
}

interface Assessment {
  id: string;
  assessmentName: string;
  userName: string;
  userId: string;
  segments: string;
  date: string;
  source: DirectSource | PartnerSource;
  amountPaid: number;
  amountCode: string;
  status: string;
  assignCoach: string | null;
  result: number | null;
  actions: string[];
  // Additional fields from API response
  test_id: string;
  highlights: string;
  summary: string | null;
  career_clusters: string;
  top_careers: string;
  educational: string;
  skill_development: string;
  experiential: string;
  networking: string;
  pillars_img: string | null;
  riasec_img: string | null;
  cluster_img: string | null;
  created_at: string;
  updated_at: string;
}

// Note: Category interface is now defined in their respective slices:
// - General categories: categoriesThunk.ts
// - Question categories: QuestionCategory.ts

interface AssessmentState {
  assessments: Assessment[];
  manageAssessments: ManageAssessment[];
  segments: Segment[];
  loading: boolean;
  manageAssessmentsLoading: boolean;
  segmentsLoading: boolean;
  error: string | null;
  manageAssessmentsError: string | null;
  segmentsError: string | null;
}

// Initial state
const initialState: AssessmentState = {
  assessments: [],
  manageAssessments: [],
  segments: [],
  loading: false,
  manageAssessmentsLoading: false,
  segmentsLoading: false,
  error: null,
  manageAssessmentsError: null,
  segmentsError: null,
};

// Create async thunk for fetching assessments
export const fetchAssessments = createAsyncThunk(
  "assessment/fetchAssessments",
  async (_, { rejectWithValue }) => {
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

      const response = await axios.get<ApiResponse>(
        `https://a.aimshala.com/api/assesment/attempted`,
        // `/api/assesment/attempted`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      // Transform the API data
      const transformedData = response.data.aceReportData
        .map((item) => {
          try {
            return {
              id: item.id.toString(),
              assessmentName:
                item.payment_details.assesment_name || "Untitled Assessment",
              userName: item.user_data.name || "Unknown User",
              userId: item.user_data.id.toString(),
              segments: item.payment_details.segment || "N/A",
              date: new Date(item.created_at).toLocaleDateString(),
              source:
                item.payment_details.source === "Direct"
                  ? { type: "Direct" as const }
                  : {
                      type: "Partner" as const,
                      partnerName: "Partner Name", // Update if available in API
                      commission: item.payment_details.code || "",
                      assessmentPrice:
                        parseInt(item.payment_details.paid_amount) || 0,
                      partnerShare: 0, // Update if available in API
                      aimshalaShare: 0, // Update if available in API
                      accessCode: item.payment_details.code || "",
                    },
              amountPaid: parseInt(item.payment_details.paid_amount) || 0,
              amountCode: item.payment_details.code || "",
              status: item.payment_details.status || "Unknown",
              assignCoach: null,
              result: null,
              actions: [],

              // Additional fields
              test_id: item.test_id,
              highlights: item.highlights,
              summary: item.summary,
              career_clusters: item.career_clusters,
              top_careers: item.top_careers,
              educational: item.educational,
              skill_development: item.skill_development,
              experiential: item.experiential,
              networking: item.networking,
              pillars_img: item.pillars_img,
              riasec_img: item.riasec_img,
              cluster_img: item.cluster_img,
              created_at: item.created_at,
              updated_at: item.updated_at,
            };
          } catch (error) {
            console.error("Error transforming item:", error);
            return null;
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      return transformedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - possible expired token");
          // You might want to dispatch a logout action here
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred while fetching assessments");
    }
  }
);

// Create the assessment slice
const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    clearAssessments: (state) => {
      state.assessments = [];
      state.error = null;
    },
    clearManageAssessments: (state) => {
      state.manageAssessments = [];
      state.manageAssessmentsError = null;
    },
    clearError: (state) => {
      state.error = null;
      state.manageAssessmentsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing assessments (attempted)
      .addCase(fetchAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAssessments.fulfilled,
        (state, action: PayloadAction<Assessment[]>) => {
          state.loading = false;
          state.assessments = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Manage assessments (services/assessments)
      .addCase(fetchManageAssessments.pending, (state) => {
        state.manageAssessmentsLoading = true;
        state.manageAssessmentsError = null;
      })
      .addCase(
        fetchManageAssessments.fulfilled,
        (state, action: PayloadAction<ManageAssessment[]>) => {
          state.manageAssessmentsLoading = false;
          state.manageAssessments = action.payload;
          state.manageAssessmentsError = null;
        }
      )
      .addCase(fetchManageAssessments.rejected, (state, action) => {
        state.manageAssessmentsLoading = false;
        state.manageAssessmentsError = action.payload as string;
      })

      // Create assessment
      .addCase(createAssessment.pending, (state) => {
        state.manageAssessmentsLoading = true;
        state.manageAssessmentsError = null;
      })
      .addCase(createAssessment.fulfilled, (state) => {
        state.manageAssessmentsLoading = false;
        // Optionally refetch data or add the new assessment to the list
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.manageAssessmentsLoading = false;
        state.manageAssessmentsError = action.payload as string;
      })

      // Update assessment
      .addCase(updateAssessment.pending, (state) => {
        state.manageAssessmentsLoading = true;
        state.manageAssessmentsError = null;
      })
      .addCase(updateAssessment.fulfilled, (state) => {
        state.manageAssessmentsLoading = false;
        // Optionally refetch data or update the specific assessment
      })
      .addCase(updateAssessment.rejected, (state, action) => {
        state.manageAssessmentsLoading = false;
        state.manageAssessmentsError = action.payload as string;
      })

      // Delete assessment
      .addCase(deleteAssessment.pending, (state) => {
        state.manageAssessmentsLoading = true;
        state.manageAssessmentsError = null;
      })
      // .addCase(deleteAssessment.fulfilled, (state, action) => {
      //   state.manageAssessmentsLoading = false;
      //   // Remove the deleted assessment from the list
      //   state.manageAssessments = state.manageAssessments.filter(
      //     (assessment) => assessment.id !== action.payload.id
      //   );
      // })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.manageAssessmentsLoading = false;
        state.manageAssessmentsError = action.payload as string;
      })

      // Note: Category operations are now handled in their respective slices:
      // - General categories: categoriesThunk.ts
      // - Question categories: QuestionCategory.ts

      // Segments
      .addCase(fetchSegments.pending, (state) => {
        state.segmentsLoading = true;
        state.segmentsError = null;
      })
      .addCase(
        fetchSegments.fulfilled,
        (state, action: PayloadAction<Segment[]>) => {
          state.segmentsLoading = false;
          state.segments = action.payload;
          state.segmentsError = null;
        }
      )
      .addCase(fetchSegments.rejected, (state, action) => {
        state.segmentsLoading = false;
        state.segmentsError = action.payload as string;
      });
  },
});

export const { clearAssessments, clearManageAssessments, clearError } =
  assessmentSlice.actions;
export default assessmentSlice.reducer;

// Selectors
export const selectAssessments = (state: { assessment: AssessmentState }) =>
  state.assessment.assessments;
export const selectAssessmentLoading = (state: {
  assessment: AssessmentState;
}) => state.assessment.loading;
export const selectAssessmentError = (state: { assessment: AssessmentState }) =>
  state.assessment.error;

// Manage assessments selectors
export const selectManageAssessments = (state: {
  assessment: AssessmentState;
}) => state.assessment.manageAssessments;
export const selectManageAssessmentsLoading = (state: {
  assessment: AssessmentState;
}) => state.assessment.manageAssessmentsLoading;
export const selectManageAssessmentsError = (state: {
  assessment: AssessmentState;
}) => state.assessment.manageAssessmentsError;

// Additional selectors for specific data
export const selectAssessmentById =
  (id: string) => (state: { assessment: AssessmentState }) =>
    state.assessment.assessments.find((assessment) => assessment.id === id);

export const selectAssessmentsByUserId =
  (userId: string) => (state: { assessment: AssessmentState }) =>
    state.assessment.assessments.filter(
      (assessment) => assessment.userId === userId
    );

export const selectInProgressAssessments = (state: {
  assessment: AssessmentState;
}) =>
  state.assessment.assessments.filter((assessment) =>
    assessment.status.toLowerCase().includes("in progress")
  );

export const selectCompletedAssessments = (state: {
  assessment: AssessmentState;
}) =>
  state.assessment.assessments.filter(
    (assessment) => assessment.status.toLowerCase() === "completed"
  );

export const selectAssessmentsBySegment =
  (segment: string) => (state: { assessment: AssessmentState }) =>
    state.assessment.assessments.filter(
      (assessment) => assessment.segments === segment
    );

export const selectDirectAssessments = (state: {
  assessment: AssessmentState;
}) =>
  state.assessment.assessments.filter(
    (assessment) => assessment.source.type === "Direct"
  );

export const selectPartnerAssessments = (state: {
  assessment: AssessmentState;
}) =>
  state.assessment.assessments.filter(
    (assessment) => assessment.source.type === "Partner"
  );

// Manage assessments selectors by status/category
export const selectActiveManageAssessments = (state: {
  assessment: AssessmentState;
}) =>
  state.assessment.manageAssessments.filter(
    (assessment) => assessment.status === "Active"
  );

export const selectDraftManageAssessments = (state: {
  assessment: AssessmentState;
}) =>
  state.assessment.manageAssessments.filter(
    (assessment) => assessment.status === "Draft"
  );

export const selectManageAssessmentsByCategory =
  (category: string) => (state: { assessment: AssessmentState }) =>
    state.assessment.manageAssessments.filter(
      (assessment) => assessment.category === category
    );

// Note: Category selectors have been moved to their respective slices:
// - General categories: selectGeneralCategories from categoriesThunk.ts
// - Question categories: selectQuestionCategories from QuestionCategory.ts

// Add segments selectors
export const selectSegments = (state: { assessment: AssessmentState }) =>
  state.assessment.segments;
export const selectSegmentsLoading = (state: { assessment: AssessmentState }) =>
  state.assessment.segmentsLoading;
export const selectSegmentsError = (state: { assessment: AssessmentState }) =>
  state.assessment.segmentsError;
