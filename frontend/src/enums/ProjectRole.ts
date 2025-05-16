export enum ProjectRole {
  OWNER = "OWNER",
  DEVELOPER = "DEVELOPER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  QA = "QA",
}

export const projectRoleMap = {
  [ProjectRole.OWNER]: "Owner",
  [ProjectRole.DEVELOPER]: "Developer",
  [ProjectRole.PROJECT_MANAGER]: "Project Manager",
  [ProjectRole.QA]: "Quality Assurance",
};
