import { ActiveProject, Project } from '@/model/project';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type ProjectState = {
  projects: Project[];
  activeProject: ActiveProject | null;
  isProjectsFetching: boolean;
  isActiveJobFetching: boolean;
};

const initialState: ProjectState = {
  projects: [],
  activeProject: null,
  isProjectsFetching: false,
  isActiveJobFetching: false,
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
    fetchActiveProject(state: ProjectState, action: PayloadAction<string>) {
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
  },
});

export const {
  fetchProjects,
  fetchProjectsSuccess,
  fetchProjectsError,
  fetchActiveProject,
  fetchActiveProjectSuccess,
  fetchActiveProjectError,
} = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project;

export const selectActiveProject = (state: RootState) =>
  state.project.activeProject;

export default projectSlice.reducer;
