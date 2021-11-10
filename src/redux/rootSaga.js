import { all } from 'redux-saga/effects';
import solicitudSaga from './solicitud/saga';

export default function* rootSaga() {
  yield all([
    solicitudSaga(),
  ]);
}