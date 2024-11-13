import { Project } from '@/api';
import { put, takeEvery } from 'redux-saga/effects';
import {
  fetchProjectsError,
  fetchProjectsSuccess,
  fetchProjects as fetchProjectsAction,
} from './projectSlice';

function* fetchProjects() {
  try {
    const projects = yield Project.getProjectForUser();
    yield put(fetchProjectsSuccess(projects.data));
  } catch (error) {
    yield put(fetchProjectsError());
  }
}

export default function* projectWatcher() {
  yield takeEvery(fetchProjectsAction.type, fetchProjects);
}
