import { getMessages } from '@/api/ticket';
import {
  fetchComments,
  fetchCommentsError,
  fetchCommentsSuccess,
} from './commentSlice';
import { put, takeEvery } from 'redux-saga/effects';

function* handleFetchComments(action: ReturnType<typeof fetchComments>) {
  try {
    const { data } = yield getMessages(
      action.payload.projectId,
      action.payload.ticketId,
    );

    yield put(fetchCommentsSuccess(data));
  } catch (error) {
    yield put(fetchCommentsError());
  }
}

export default function* commentsWatcher() {
  yield takeEvery(fetchComments, handleFetchComments);
}
