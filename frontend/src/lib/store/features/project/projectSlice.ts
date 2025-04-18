import { ActiveProject, Project } from "@/model/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOrder } from "@/enums/SortOrder";
import { Filter } from "@/model/filter";
import { Ticket } from "@/model/tickets";
import { clearUserData } from "../session/session-slice";
import { Sprint } from "@/model/sprint";

type ProjectState = {
  projects: Project[] | null;
  activeProject: ActiveProject | null;
  isProjectsFetching: boolean;
  isActiveJobFetching: boolean;
  filter: Filter;
};

const initialState: ProjectState = {
  projects: null,
  activeProject: null,
  isProjectsFetching: false,
  isActiveJobFetching: false,
  filter: { sort: SortOrder.Ascending, q: "" },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    fetchProjects(state: ProjectState) {
      state.isProjectsFetching = true;
    },
    fetchProjectsSuccess(
      state: ProjectState,
      action: PayloadAction<Project[]>,
    ) {
      state.projects = action.payload;
      state.isProjectsFetching = false;
    },
    fetchProjectsError(state: ProjectState) {
      state.isProjectsFetching = false;
      state.projects = null;
    },

    fetchActiveProject(state: ProjectState, _: PayloadAction<string>) {
      state.isActiveJobFetching = true;
    },
    fetchActiveProjectSuccess(
      state: ProjectState,
      action: PayloadAction<ActiveProject>,
    ) {
      state.activeProject = action.payload;
      state.isActiveJobFetching = false;
    },
    fetchActiveProjectError(state: ProjectState) {
      state.activeProject = null;
      state.isActiveJobFetching = false;
    },
    setSortOrder(state: ProjectState, action: PayloadAction<SortOrder>) {
      state.filter.sort = action.payload;
    },
    setSearchValue(state: ProjectState, action: PayloadAction<string>) {
      state.filter.q = action.payload;
    },
    pinProjectSuccess(state: ProjectState, action: PayloadAction<Project>) {
      if (state.projects) {
        state.projects = state.projects.map((project) => {
          if (project.id === action.payload.id) {
            return action.payload;
          }
          return project;
        });
      }
    },
    updateTicketSuccess(state: ProjectState, action: PayloadAction<Ticket>) {
      if (!state.activeProject) {
        return;
      }

      state.activeProject.tickets = state.activeProject.tickets.map(
        (ticket) => {
          if (ticket.id === action.payload.id) {
            return action.payload;
          }
          return ticket;
        },
      );
    },
    updateSprint: (state: ProjectState, action: PayloadAction<Sprint>) => {
      if (!state.activeProject) return;
      const exists =
        state.activeProject?.sprints.some(
          (sprint) => sprint.id == action.payload.id,
        ) ?? false;

      if (!exists) {
        state.activeProject.sprints = [
          action.payload,
          ...(state.activeProject?.sprints ?? []),
        ];
      } else {
        state.activeProject.sprints = state.activeProject.sprints.map(
          (sprint) => {
            if (sprint.id == action.payload.id) {
              return action.payload;
            }
            return sprint;
          },
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearUserData, () => initialState);
  },
});

export const {
  fetchProjects,
  fetchProjectsSuccess,
  fetchProjectsError,
  fetchActiveProject,
  fetchActiveProjectSuccess,
  fetchActiveProjectError,
  setSortOrder,
  setSearchValue,
  pinProjectSuccess,
  updateTicketSuccess,
  updateSprint,
} = projectSlice.actions;

export default projectSlice.reducer;
