import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Response interfaces
interface Segment {
  id: number;
  title: string;
  parent_id: number;
  level: number;
  description: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  pivot?: {
    service_assesment_id: number;
    segment_id: number;
  };
}

interface Category {
  id: number;
  title: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface ApiManageAssessmentResponse {
  id: number;
  assesment_name: string;
  guid?: string | null;
  segments: Segment[];
  category: Category;
  price: string;
  discounted_price: string;
  gst_amount: string;
  gst_percentage: number;
  partner_share_std: number;
  partner_share_pre: number;
  status: number;
  updated_at: string | null;
  created_at: string;
}

interface ApiManageAssessmentsResponse {
  assesments: ApiManageAssessmentResponse[]; // Note: API has typo "assesments"
  // Add other fields if needed like pagination, etc.
}

// Transformed assessment interface to match ManageTable structure
export interface ManageAssessment {
  id: string;
  assessmentName: string;
  segments: string[]; // Segment titles for display
  segmentIds: string[]; // Segment IDs for editing
  category: string;
  price: number;
  partnerShare: string;
  enrollments: number;
  status: string;
  actions: string[];
  // Additional fields from API
  guid: string | null;
  discountedPrice: number;
  gstAmount: number;
  gstPercentage: number;
  partnerShareStd: number;
  partnerSharePre: number;
  updatedAt: string | null;
  createdAt: string;
}

// Async thunk to fetch manage assessments
export const fetchManageAssessments = createAsyncThunk(
  "assessment/fetchManageAssessments",
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

      const response = await axios.get<ApiManageAssessmentsResponse>(
         `https://a.aimshala.com/api/v1/services/assesment`,
        // `/api/v1/services/assesment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Manage Assessments API Response:", response.data);

      // Transform the API data to match ManageTable structure
      // Note: API returns 'assesments' (with typo) not 'assessments'
      if (!response.data || !Array.isArray(response.data.assesments)) {
        console.error("Invalid API response structure:", response.data);
        return [];
      }

      const transformedData: ManageAssessment[] = response.data.assesments
        .map((item) => {
          try {
            // Extract segment titles and IDs from the array of segment objects
            const segmentTitles = Array.isArray(item.segments)
              ? item.segments.map((segment) => segment.title)
              : [];
            
            const segmentIds = Array.isArray(item.segments)
              ? item.segments.map((segment) => segment.id.toString())
              : [];

            // Extract category title from category object
            const categoryTitle = item.category?.title || "General";

            // Convert status number to string
            const statusText = item.status === 1 ? "Active" : "Draft";

            // Parse numeric values
            const price = parseFloat(item.price) || 0;
            const discountedPrice = parseFloat(item.discounted_price) || 0;
            const gstAmount = parseFloat(item.gst_amount) || 0;
            const gstPercentage = typeof item.gst_percentage === 'number' 
              ? item.gst_percentage 
              : parseFloat(item.gst_percentage as any) || 0;
            const partnerShareStd = typeof item.partner_share_std === 'number'
              ? item.partner_share_std
              : parseFloat(item.partner_share_std as any) || 0;
            const partnerSharePre = typeof item.partner_share_pre === 'number'
              ? item.partner_share_pre
              : parseFloat(item.partner_share_pre as any) || 0;

            // Format partner share string to match existing format
            const partnerShare = `[S] ${partnerShareStd}% | [P] ${partnerSharePre}%`;

            return {
              id: item.id.toString(),
              assessmentName: item.assesment_name || "Untitled Assessment",
              segments: segmentTitles, // Titles for display
              segmentIds: segmentIds, // IDs for editing
              category: categoryTitle,
              price: price,
              partnerShare: partnerShare,
              enrollments: 0, // This field doesn't exist in API response, defaulting to 0
              status: statusText,
              actions: ["Questions", "Results", "Logs"],

              // Additional fields from API
              guid: item.guid || null,
              discountedPrice: discountedPrice,
              gstAmount: gstAmount,
              gstPercentage: gstPercentage,
              partnerShareStd: partnerShareStd,
              partnerSharePre: partnerSharePre,
              updatedAt: item.updated_at,
              createdAt: item.created_at,
            };
          } catch (error) {
            console.error("Error transforming manage assessment item:", error);
            return null;
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      return transformedData;
    } catch (error: any) {
      console.error("Error fetching manage assessments:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch manage assessments"
      );
    }
  }
);

// Create assessment thunk
export const createAssessment = createAsyncThunk(
  "assessment/createAssessment",
  async (
    assessmentData: {
      assesment_name: string;
      segment_id: string[];
      assesment_category_id: string;
      price: string;
      offer_price: string;
      gst_amount: string;
      gst_percentage: string;
      partner_share_std: string;
      partner_share_pre: string;
      status: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) {
        console.error("❌ No authentication state found in localStorage");
        throw new Error("No authentication state found");
      }

      const { token } = JSON.parse(authState);
      if (!token) {
        console.error("❌ No authentication token found in authState");
        throw new Error("No authentication token found");
      }

      console.log("✅ Token found, proceeding with API call");
      console.log("📤 Creating assessment with data:", JSON.stringify(assessmentData, null, 2));
      console.log("🔗 API Endpoint:", `/api/v1/services/assesment`);

      const response = await axios.post(
        `https://a.aimshala.com/api/v1/services/assesment`,
        // `/api/v1/services/assesment`,
        assessmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      
      console.log("✅ Create assessment SUCCESS - Response:", response.data);
      console.log("📊 Response status:", response.status);

      // Refresh the list after successful creation
      console.log("🔄 Refreshing assessment list...");
      await dispatch(fetchManageAssessments());
      
      // Return the created assessment data
      return response.data;
    } catch (error: any) {
      console.error("❌ Error creating assessment:");
      console.error("Error object:", error);
      console.error("Error message:", error?.message);
      console.error("Response data:", error?.response?.data);
      console.error("Response status:", error?.response?.status);
      console.error("Response headers:", error?.response?.headers);
      console.error("Request data:", error?.config?.data);
      
      // Check for specific error types
      if (error.code === 'ERR_NETWORK') {
        console.error("🌐 Network error - check if the server is running");
        return rejectWithValue("Network error: Unable to reach the server");
      }
      
      if (error.response?.status === 401) {
        console.error("🔒 Unauthorized - token might be invalid");
        return rejectWithValue("Unauthorized: Please log in again");
      }
      
      if (error.response?.status === 422) {
        console.error("⚠️ Validation error:", error.response.data);
        return rejectWithValue(
          error.response.data?.message || 
          "Validation error: Please check your input"
        );
      }
      
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create assessment"
      );
    }
  }
);

// Update assessment thunk
export const updateAssessment = createAsyncThunk(
  "assessment/updateAssessment",
  async (
    {
      id,
      ...assessmentData
    }: {
      id: string;
      assesment_name?: string;
      segment_id?: string[];
      assesment_category_id?: string;
      price?: string;
      discounted_price?: string;
      gst_amount?: string;
      gst_percentage?: string;
      partner_share_std?: string;
      partner_share_pre?: string;
      status?: number;
    },
    { rejectWithValue, dispatch }
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

      console.log("Updating assessment with ID:", id, "data:", assessmentData);

      const response = await axios.put(
        `https://a.aimshala.com/api/services/assesments-update/${id}`,
        // `/api/services/assesments-update/${id}`,
        assessmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      
      console.log("Update assessment response:", response.data);

      // Refresh the list after successful update
      await dispatch(fetchManageAssessments());
    } catch (error: any) {
      console.error("Error updating assessment:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error status:", error?.response?.status);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update assessment"
      );
    }
  }
);

// Delete assessment thunk
export const deleteAssessment = createAsyncThunk(
  "assessment/deleteAssessment",
  async (id: string, { rejectWithValue, dispatch }) => {
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
        `https://a.aimshala.com/api/services/assesments-delete/${id}`
        // `/api/services/assesments-delete/${id}`

        , {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      // Refresh the list after successful deletion
      await dispatch(fetchManageAssessments());
    } catch (error: any) {
      console.error("Error deleting assessment:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete assessment"
      );
    }
  }
);
