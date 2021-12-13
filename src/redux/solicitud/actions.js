import {
  solicitudTypes,
  createSolicitudTypes,
  verifySolicitudStateTypes,
  uploadFilesTypes,
  updateSolicitudTypes
} from './constants';

export const solicitudActions = {
  setSolicitudForm: (payload) => ({
    type: solicitudTypes.SET_SOLICITUD_FORM,
    payload,
  }),
  clearSolicitudForm: () => ({
    type: solicitudTypes.CLEAR_SOLICITUD_FORM,
  }),

  createSolicitudRequest: (payload) => ({
    type: createSolicitudTypes.REQUEST,
    payload,
  }),
  createSolicitudSuccess: (payload) => ({
    type: createSolicitudTypes.SUCCESS,
    payload,
  }),
  createSolicitudFailure: (err) => ({
    type: createSolicitudTypes.FAILURE,
    payload: err,
  }),

  verifySolicitudStateRequest: (payload) => ({
    type: verifySolicitudStateTypes.REQUEST,
    payload,
  }),
  verifySolicitudStateSuccess: (payload) => ({
    type: verifySolicitudStateTypes.SUCCESS,
    payload,
  }),
  verifySolicitudStateFailure: (err) => ({
    type: verifySolicitudStateTypes.FAILURE,
    payload: err,
  }),

  uploadFilesRequest: (payload) => ({
    type: uploadFilesTypes.REQUEST,
    payload,
  }),
  uploadFilesSuccess: (payload) => ({
    type: uploadFilesTypes.SUCCESS,
    payload,
  }),
  uploadFilesFailure: (err) => ({
    type: uploadFilesTypes.FAILURE,
    payload: err,
  }),

  updateSolicitudRequest: (payload) => ({
    type: updateSolicitudTypes.REQUEST,
    payload,
  }),
  updateSolicitudSuccess: (payload) => ({
    type: updateSolicitudTypes.SUCCESS,
    payload,
  }),
  updateSolicitudFailure: (err) => ({
    type: updateSolicitudTypes.FAILURE,
    payload: err,
  }),

};