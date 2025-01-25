import { ActiveProject, Project } from '@/model/project';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOrder } from '@/enums/SortOrder';
import { Filter } from '@/model/filter';

type ProjectState = {
  projects: Project[];
  activeProject: ActiveProject | null;
  isProjectsFetching: boolean;
  isActiveJobFetching: boolean;
  filter: Filter;
};

const initialState: ProjectState = {
  projects: [],
  activeProject: null,
  isProjectsFetching: false,
  isActiveJobFetching: false,
  filter: { sort: SortOrder.Ascending, q: '' },
};

const projectSlice = createSlice({
  name: 'project',
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
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      state.isActiveJobFetching = false;
    },
    setSortOrder(state: ProjectState, action: PayloadAction<SortOrder>) {
      state.filter.sort = action.payload;
    },
    setSearchValue(state: ProjectState, action: PayloadAction<string>) {
      state.filter.q = action.payload;
    },
    pinProjectSuccess(state: ProjectState, action: PayloadAction<Project>) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.id) {
          return action.payload;
        }
        return project;
      });
    },
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
} = projectSlice.actions;

export default projectSlice.reducer;
