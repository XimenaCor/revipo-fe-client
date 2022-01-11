import { AnyAction } from 'redux';
import { call, takeLatest, put } from 'redux-saga/effects';
import Swal from 'sweetalert2'

import { solicitudActions } from './actions';
import {
  createSolicitudTypes,
  uploadFilesTypes,
  verifySolicitudStateTypes,
  updateSolicitudTypes,
  renewalSolicitudTypes
} from './constants'
import services from '../../services';


function* createSolicitud({ payload }) {
  try {
    const res = yield call([services.solicitud, 'createSolicitud'], payload.values);
    yield put(solicitudActions.createSolicitudSuccess(res.data));
  } catch (err) {
    console.error('function*createSolicitud -> err', err);
    yield put(solicitudActions.createSolicitudFailure(err.message));
    Swal.fire({
      icon: 'error',
      title: `Solicitud no registrada, la placa: ${payload.values.placa} ya cuenta con un proceso activo!`,
      showConfirmButton: false,
      timer: 5000
    })
  }
}

function* verifySolicitudState({ payload }) {
  try {
    const res = yield call(
      [services.solicitud, 'verifySolicitudState'],
      payload,
    );
    yield put(solicitudActions.verifySolicitudStateSuccess(res.data));
    Swal.fire({
      icon: 'success',
      title: `${res.data}`,
      showConfirmButton: false,
    })
  } catch (err) {
    console.error('function*verifySolicitudState -> err', err);
    yield put(
      solicitudActions.verifySolicitudStateFailure(err.message),
    );
    Swal.fire({
      icon: 'error',
      title: `Ha habido un error en la solicitud.`,
      showConfirmButton: false,
      timer: 5000
    })
  }
}

function* uploadFiles({ payload }) {
  try {
    const res = yield call([services.solicitud, 'uploadFiles'], payload);
    yield put(solicitudActions.uploadFilesSuccess(res.data));
    Swal.fire({
      icon: 'success',
      title: `Atención, su codigo de solicitud es: ${payload.solicitudCod}`,
      text: 'La accion se ha registrado exitosamente!',
      showConfirmButton: true,
    })
  } catch (err) {
    console.error('function*uploadFiles -> err', err);
    yield put(solicitudActions.uploadFilesFailure(err.message));
  }
}

function* updateSolicitud({ payload }) {
  try {
    const res = yield call([services.solicitud, 'updateSolicitud'], payload);
    yield put(solicitudActions.updateSolicitudSuccess(res.data));
  } catch (err) {
    console.error('function updateSolicitud -> err', err);
    yield put(solicitudActions.updateSolicitudFailure(err.message));
    Swal.fire({
      icon: 'error',
      title: `Ha habido un error en la solicitud.`,
      showConfirmButton: false,
      timer: 5000
    })
  }
}

function* renewalSolicitud({ payload }) {
  try {
    const res = yield call([services.solicitud, 'renewalSolicitud'], payload.values);
    yield put(solicitudActions.renewalSolicitudSuccess(res.data));
  } catch (err) {
    console.error('function*renewalSolicitud -> err', err);
    yield put(solicitudActions.renewalSolicitudFailure(err.message));
    Swal.fire({
      icon: 'error',
      title: `Ha habido un error!`,
      showConfirmButton: false,
      timer: 5000
    })
  }
}

function* solicitudSaga() {
  yield takeLatest(createSolicitudTypes.REQUEST, createSolicitud);
  yield takeLatest(verifySolicitudStateTypes.REQUEST, verifySolicitudState);
  yield takeLatest(uploadFilesTypes.REQUEST, uploadFiles);
  yield takeLatest(updateSolicitudTypes.REQUEST, updateSolicitud);
  yield takeLatest(renewalSolicitudTypes.REQUEST, renewalSolicitud);
}

export default solicitudSaga;