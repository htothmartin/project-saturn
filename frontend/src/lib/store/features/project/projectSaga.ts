import { Project } from '@/api';
import { put, takeEvery } from 'redux-saga/effects';
import {
  fetchProjectsError,
  fetchProjectsSuccess,
  fetchProjects as fetchProjectsAction,
  fetchActiveProject as fetchActiveProjectAction,
  fetchActiveProjectSuccess,
  fetchActiveProjectError,
} from './projectSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchProjects() {
  try {
    const projects = yield Project.getProjectForUser();
    yield put(fetchProjectsSuccess(projects.data));
  } catch (error) {
    yield put(fetchProjectsError());
  }
}

function* fetchActiveProject(action: PayloadAction<string>) {
  const id = action.payload;
  try {
    const activeProject = yield Project.getActiveProject(id);
    yield put(fetchActiveProjectSuccess(activeProject.data));
  } catch (error) {
    yield put(fetchActiveProjectError());
  }
}

export default function* projectWatcher() {
  yield takeEvery(fetchProjectsAction.type, fetchProjects);
  yield takeEvery(fetchActiveProjectAction.type, fetchActiveProject);
}
