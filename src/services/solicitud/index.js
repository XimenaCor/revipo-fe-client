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

  updateSolicitud = async (data) => {
    try {
      return await this.axios.put(`/solicitudes`, data.values);
    } catch (err) {
      console.error('Property -> updateSolicitud -> err', err);
      throw err;
    }
  };

  renewalSolicitud = async (data) => {
    try {
      return await this.axios.post('/solicitudes/renewal', data);
    } catch (err) {
      console.error('Solicitud -> renewalSolicitud -> err', err);
      throw err;
    }
  };

  //This service should have its own folder, no time enough so, let's improve it later.
  sendWhatsappCode = async (data) => {
    try {
      const res = await this.axios.get(`/externals/message/${data.email}/${data.telefono}`);
      return res;
    } catch (err) {
      console.error('Solicitud -> sendWhatsappCode -> err', err);
      throw err;
    }
  };

  readRoseta = async (codRoseta) => {
    try {
      const res = await this.axios.get(`/solicitudes/solicitud/verification/roseta/vigente/byCode/${codRoseta}`);
      return res;
    } catch (err) {
      console.error('Solicitud -> readRoseta -> err', err);
      throw err;
    }
  };

}

export default Solicitud;