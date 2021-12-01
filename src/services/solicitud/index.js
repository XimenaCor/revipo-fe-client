import { AxiosInstance } from 'axios';

class Solicitud {
  axios;

  constructor(axios) {
    this.axios = axios
  }

  createSolicitud = async (data) => {
    try {
      return await this.axios.post('/solicitudes/', data);
    } catch (err) {
      console.error('Solicitud -> createSolicitud -> err', err);
      throw err;
    }
  };

  verifySolicitudState = async (solCod) => {
    try {
      const res = await this.axios.get(`/solicitudes/solicitud/verification/${solCod}`);
      return res;
    } catch (err) {
      console.error('Solicitud -> verifySolicitudState -> err', err);
      throw err;
    }
  };

  uploadFiles = async (data) => {
    try {
      const res = await this.axios.post(`/uploads/${data.solicitudId}/${data.solicitudCod}`, data.files, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    } catch (err) {
      console.error('Upload -> uploadFiles -> err', err);
      throw err;
    }
  };

}

export default Solicitud;