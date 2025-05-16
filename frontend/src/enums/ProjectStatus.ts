export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export const ProjectStatusMap = {
  [ProjectStatus.ACTIVE]: "Active",
  [ProjectStatus.COMPLETED]: "Completed",
  [ProjectStatus.FINISHED]: "Finsihed",
  [ProjectStatus.IN_PROGRESS]: "In Progress",
};
