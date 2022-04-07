import {
  solicitudTypes,
  createSolicitudTypes,
  verifySolicitudStateTypes,
  uploadFilesTypes,
  updateSolicitudTypes,
  renewalSolicitudTypes,
  sendWhatsappCodeTypes
} from './constants'

const initialState = {
  uploads: {},
  solicitudForm: {
    codigoSolicitud: null,
    numeroDocumento: null,
    expedido: null,
    nombres: null,
    primerApellido: null,
    segundoApellido: null,
    fechaNacimiento: null,
    domicilio: null,
    telefono: null,
    email: null,
    placa: null,
    color: null,
    anio: null,
    marca: null,
    modelo: null,
    tipoVehiculo: null,
    industria: null,
    tipoSolicitud: null,
    departamento: null,
    fechaSolicitud: null
  },
  solicitudRes: null,
  solicitudState: null,
  whatsappCode: null,
  isLoadingWhatsappCode: false,
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
        solicitudRes: payload,
        whatsappCode: null
      };
    case createSolicitudTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        whatsappCode: null
      };

    case verifySolicitudStateTypes.REQUEST:
      return {
        ...state,
        solicitudState: {},
        isLoading: true,
        error: '',
      };
    case verifySolicitudStateTypes.SUCCESS:
      return {
        ...state,
        solicitudState: payload,
        isLoading: false,
      };
    case verifySolicitudStateTypes.FAILURE:
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
    case solicitudTypes.CLEAR_WHATSAPP_CODE:
      return {
        ...state,
        whatsappCode: initialState.whatsappCode,
      };

    case uploadFilesTypes.REQUEST:
      return {
        ...state,
      };
    case uploadFilesTypes.SUCCESS:
      return {
        ...state,
        uploads: payload,
        isLoading: false,
        solicitudForm: initialState.solicitudForm,
        solicitudRes: initialState.solicitudRes,
        whatsappCode: null
      };
    case uploadFilesTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateSolicitudTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case updateSolicitudTypes.SUCCESS:
      return {
        ...initialState,
        isLoading: false,
        solicitudRes: payload,
      };
    case updateSolicitudTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case renewalSolicitudTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case renewalSolicitudTypes.SUCCESS:
      return {
        ...state,
        isLoading: false,
        solicitudRes: payload
      };
    case renewalSolicitudTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case sendWhatsappCodeTypes.REQUEST:
      return {
        ...state,
        isLoadingWhatsappCode: true,
      };
    case sendWhatsappCodeTypes.SUCCESS:
      return {
        ...state,
        whatsappCode: payload,
        isLoadingWhatsappCode: false,
      };
    case sendWhatsappCodeTypes.FAILURE:
      return {
        ...state,
        isLoadingWhatsappCode: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default solicitudReducer;