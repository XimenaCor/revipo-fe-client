import { AxiosInstance } from 'axios';

class Solicitud {
  axios;

  constructor(axios) {
    this.axios = axios
  }

  createSolicitud = async (data) => {
    try {
      return await this.axios.post('/solicituds/', data);
    } catch (err) {
      console.error('Solicitud -> createSolicitud -> err', err);
      throw err;
    }
  };

}

export default Solicitud;