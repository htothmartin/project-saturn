import { RootState } from '../../store';

export const selectProjects = (state: RootState) => state.project;

export const selectActiveProject = (state: RootState) =>
  state.project.activeProject;

export const selectFilter = (state: RootState) => state.project.filter;
