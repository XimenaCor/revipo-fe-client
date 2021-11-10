import { AnyAction } from 'redux';
import { call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { solicitudActions } from './actions';
import {
  createSolicitudTypes,
} from './constants'
import services from '../../services';


function* createSolicitud({ payload }) {
  try {
    const res = yield call([services.solicitud, 'createSolicitud'], payload.values);
    yield put(solicitudActions.createSolicitudSuccess(res.data));
    toast.success("LA SOLICITUD HA SIDO REGISTRADA!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
  } catch (err) {
    console.error('function*createSolicitud -> err', err);
    yield put(solicitudActions.createSolicitudFailure(err.message));
    toast.error("LA SOLICITUD NO HA POSIDO REGISTRARSE!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
  }
}


function* solicitudSaga() {
  yield takeLatest(createSolicitudTypes.REQUEST, createSolicitud);
}

export default solicitudSaga;