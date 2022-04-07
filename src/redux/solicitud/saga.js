import { AnyAction } from 'redux';
import { call, takeLatest, put } from 'redux-saga/effects';
import SweetAlert from 'sweetalert2'

import { solicitudActions } from './actions';
import {
  createSolicitudTypes,
  uploadFilesTypes,
  verifySolicitudStateTypes,
  updateSolicitudTypes,
  renewalSolicitudTypes,
  sendWhatsappCodeTypes
} from './constants'
import services from '../../services';


function* createSolicitud({ payload }) {
  try {
    const res = yield call([services.solicitud, 'createSolicitud'], payload.values);
    if (res.status === 201) {
      SweetAlert.fire({
        icon: 'error',
        title: `${res.data}`,
        showConfirmButton: false,
        timer: 5000
      })
    }
    if (res.status === 200) {
      yield put(solicitudActions.createSolicitudSuccess(res.data));
    }
  } catch (err) {
    console.error('function*createSolicitud -> err', err);
    yield put(solicitudActions.createSolicitudFailure(err.message));
    SweetAlert.fire({
      icon: 'error',
      title: `Solicitud no registrada, ha habido un error!`,
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
    SweetAlert.fire({
      icon: 'success',
      title: `${res.data}`,
      showConfirmButton: false,
    })
  } catch (err) {
    console.error('function*verifySolicitudState -> err', err);
    yield put(
      solicitudActions.verifySolicitudStateFailure(err.message),
    );
    SweetAlert.fire({
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
    SweetAlert.fire({
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
    if (res.status === 200) {
      yield put(solicitudActions.updateSolicitudSuccess(res.data));
    }
    if (res.status === 201) {
      SweetAlert.fire({
        icon: 'error',
        title: `${res.data}`,
        showConfirmButton: false,
        timer: 5000
      })
    }
  } catch (err) {
    console.error('function updateSolicitud -> err', err);
    yield put(solicitudActions.updateSolicitudFailure(err.message));
    SweetAlert.fire({
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
    if (res.status === 201) {
      SweetAlert.fire({
        icon: 'error',
        title: `${res.data}`,
        showConfirmButton: false,
        timer: 5000
      })
    }
    if (res.status === 200) {
      yield put(solicitudActions.renewalSolicitudSuccess(res.data));
    }
  } catch (err) {
    console.error('function*renewalSolicitud -> err', err);
    yield put(solicitudActions.renewalSolicitudFailure(err.message));
    SweetAlert.fire({
      icon: 'error',
      title: `Ha habido un error!`,
      showConfirmButton: false,
      timer: 5000
    })
  }
}

function* sendWhatsappCode({ payload }) {
  try {
    const res = yield call(
      [services.solicitud, 'sendWhatsappCode'],
      payload,
    );
    yield put(solicitudActions.sendWhatsappCodeSuccess(res.data));
  } catch (err) {
    console.error('function*sendWhatsappCode -> err', err);
    yield put(
      solicitudActions.sendWhatsappCodeFailure(err.message),
    );
    SweetAlert.fire({
      icon: 'error',
      title: `Ha habido un error en la solicitud.`,
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
  yield takeLatest(sendWhatsappCodeTypes.REQUEST, sendWhatsappCode);
}

export default solicitudSaga;