import {
  solicitudTypes,
  createSolicitudTypes,
} from './constants'

const initialState = {
  solicitudForm: {
    evento: null,
    latitud: null,
    longitud: null,
    departamento: null,
    municipio: null,
    denunciante: null,
    descripcion: null,
    observacion: null,
    tipo: null,
    responsable: null,
    actor: null,
    actorEspecifico: null,
    cantidadMovilizada: null,
    fechaInicioIncidente: null,
  },
  isLoading: false,
  error: ''
};

const solicitudReducer = (
  state = initialState,
  action,
) => {
  const { type, payload } = action;

  switch (type) {
    case createSolicitudTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createSolicitudTypes.SUCCESS:
      return {
        ...state,
        isLoading: false,
        solicitudForm: initialState.solicitudForm,
      };

    case createSolicitudTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case solicitudTypes.SET_SOLICITUD_FORM:
      return {
        ...state,
        solicitudForm: payload,
      };

    case solicitudTypes.CLEAR_SOLICITUD_FORM:
      return {
        ...state,
        solicitudForm: initialState.solicitudForm,
      };


    default:
      return state;
  }
};

export default solicitudReducer;