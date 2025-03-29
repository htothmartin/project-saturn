import { Project as ProjectApi } from "@/api";
import { put, select, takeEvery } from "redux-saga/effects";
import {
  fetchProjectsError,
  fetchProjectsSuccess,
  fetchProjects as fetchProjectsAction,
  fetchActiveProject as fetchActiveProjectAction,
  fetchActiveProjectSuccess,
  fetchActiveProjectError,
} from "./projectSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import type { ActiveProject, Project } from "@/model/project";
import { Filter } from "@/model/filter";
import { selectFilter } from "./projectSelectors";

function* fetchProjects() {
  try {
    const filter: Filter = yield select(selectFilter);
    const projects: AxiosResponse<Project[]> =
      yield ProjectApi.getProjectForUser(filter);
    yield put(fetchProjectsSuccess(projects.data));
  } catch (error) {
    console.error(error);
    yield put(fetchProjectsError());
  }
}

function* fetchActiveProject(action: PayloadAction<string>) {
  const id = action.payload;
  try {
    const activeProject: AxiosResponse<ActiveProject> =
      yield ProjectApi.getActiveProject(id);
    yield put(fetchActiveProjectSuccess(activeProject.data));
  } catch (error) {
    console.error(error);
    yield put(fetchActiveProjectError());
  }
}

export default function* projectWatcher() {
  yield takeEvery(fetchProjectsAction, fetchProjects);
  yield takeEvery(fetchActiveProjectAction, fetchActiveProject);
}
