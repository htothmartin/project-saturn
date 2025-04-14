import { RootState } from "../../store";

export const selectProjects = (state: RootState) => state.project;

export const selectActiveProject = (state: RootState) =>
  state.project.activeProject;

export const selectFilter = (state: RootState) => state.project.filter;

export const selectActiveProjectUsers = (state: RootState) =>
  state.project.activeProject?.users ?? [];

export const selectIsProjectOwner = (state: RootState) =>
  state.project.activeProject?.owner.id == state.session.currentUser?.id;

export const selectSprints = (state: RootState) =>
  state.project.activeProject?.sprints ?? null;

export const selectTicketById = (id: string) => (state: RootState) => {
  return (
    state.project.activeProject?.tickets.find(
      (ticket) => ticket.id.toString() == id,
    ) ?? null
  );
};
