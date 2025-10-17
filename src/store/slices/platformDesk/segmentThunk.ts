import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Tree segment type used across UI (compatible with SegmentStaticPicker)
export type Segment = {
  id: string;
  label: string;
  children?: Segment[];
};

type ApiSegment = {
  id: number;
  title: string;
  parent_id: number;
  level: number;
  description: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  all_children?: ApiSegment[];
};

type ApiResponse = {
  segments: ApiSegment[];
};

function mapApiToTree(input: ApiSegment[]): Segment[] {
  const mapNode = (n: ApiSegment): Segment => {
    const children: Segment[] = [];
    
    // Process all_children recursively
    if (Array.isArray(n.all_children)) {
      n.all_children.forEach(child => {
        const childSegment = mapNode(child);
        children.push(childSegment);
      });
    }
    
    const seg: Segment = { 
      id: String(n.id), 
      label: String(n.title) 
    };
    
    if (children.length > 0) {
      seg.children = children;
    }
    
    return seg;
  };
  
  return (input || []).map(mapNode);
}

export const fetchSegments = createAsyncThunk(
  "segments/fetchSegments",
  async (_, { rejectWithValue }) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) throw new Error("No authentication state found");
      const { token } = JSON.parse(authState);
      if (!token) throw new Error("No authentication token found");

      const res = await axios.get(
        "https://a.aimshala.com/api/v1/segment",
        // `/api/v1/segment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const payload: ApiResponse = res.data;
      const list: ApiSegment[] = Array.isArray(payload?.segments)
        ? payload.segments
        : [];
      
      return mapApiToTree(list);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error?.message || "Failed to fetch segments");
    }
  }
);

export const createSegment = createAsyncThunk(
  "segments/createSegment",
  async (
    data: { title: string; parent_id?: string | number | null; status: number },
    { rejectWithValue }
  ) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) throw new Error("No authentication state found");
      const { token } = JSON.parse(authState);
      if (!token) throw new Error("No authentication token found");

      const body: Record<string, any> = { title: data.title, status: data.status };
      if (data.parent_id !== undefined && data.parent_id !== null && data.parent_id !== "" && data.parent_id !== 0) {
        body.parent_id = String(data.parent_id); // Convert to string as API expects
      }

      const res = await axios.post(
      
        `https://a.aimshala.com/api/v1/segment`,
        // `/api/v1/segment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error?.message || "Failed to create segment");
    }
  }
);

export const updateSegment = createAsyncThunk(
  "segments/updateSegment",
  async (
    { id, title, status, parent_id }: { id: string | number; title: string; status: number; parent_id?: string | number },
    { rejectWithValue }
  ) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) throw new Error("No authentication state found");
      const { token } = JSON.parse(authState);
      if (!token) throw new Error("No authentication token found");

      const body: Record<string, any> = { title, status };
      if (parent_id !== undefined) body.parent_id = parent_id;

      const res = await axios.put(
        `https://a.aimshala.com/api/v1/segment/${id}`,
        // `/api/v1/segment/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error?.message || "Failed to update segment");
    }
  }
);

export const moveSegment = createAsyncThunk(
  "segments/moveSegment",
  async (
    { id, parent_id }: { id: string | number; parent_id: string | number | null },
    { rejectWithValue }
  ) => {
    try {
      const authState = localStorage.getItem("authState");
      if (!authState) throw new Error("No authentication state found");
      const { token } = JSON.parse(authState);
      if (!token) throw new Error("No authentication token found");

      const body: Record<string, any> = {};
      // If parent_id is null or 0, it becomes a root segment
      if (parent_id === null || parent_id === 0 || parent_id === "0") {
        body.parent_id = null;
      } else {
        body.parent_id = String(parent_id);
      }

      const res = await axios.patch(
        `https://a.aimshala.com/api/v1/segment/move/${id}`,
        // `/api/v1/segment/move/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(error?.message || "Failed to move segment");
    }
  }
);