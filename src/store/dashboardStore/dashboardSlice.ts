import type { DashboardList } from "@/components/teamDashboard/schema/Schema";
import type { DashboardType } from "@/features/dashboard/DashBoardCard";
import type { Team } from "@/pages/team/Project";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "team" | "collaborator" | string;
interface DashboardState {
  businessName: string;
  image: string;
  dashboard: DashboardType | null;
  team: Team | null;
  role: Role;
  dashboardList: DashboardList[];
}

const initialState: DashboardState = {
  image: "",
  businessName: "",
  dashboard: null,
  team: null,
  role: "",
  dashboardList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setBusinessName(state, action: PayloadAction<string>) {
      state.businessName = action.payload;
    },
    setDashboard(state, action: PayloadAction<DashboardType | null>) {
      state.dashboard = action.payload;
    },
    setTeam(state, action: PayloadAction<Team | null>) {
      state.team = action.payload;
    },
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },

    setDashboardList(state, action: PayloadAction<DashboardList>) {
      state.dashboardList.unshift(action.payload);
    },
    deleteDashboard(state, action: PayloadAction<number>) {
      state.dashboardList = state.dashboardList.filter(
        (_, index) => index !== action.payload,
      );
    },
  },
});

export const {
  setImage,
  setBusinessName,
  setDashboard,
  setTeam,
  setRole,
  setDashboardList,
  deleteDashboard,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
