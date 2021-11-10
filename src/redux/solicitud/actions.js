import {
  solicitudTypes,
  createSolicitudTypes
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

};