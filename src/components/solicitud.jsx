import React from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Request } from './request';
import { Edition } from './edition';
import Swal from 'sweetalert2'

import { solicitudActions } from '../redux/solicitud/actions'

export const Solicitud = (props) => {
  const actualYear = new Date();
  const dispatch = useDispatch();

  const handleVerification = () => {
    Swal.fire({
      title: 'Introduzca su codigo de solicitud',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Buscar',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: (solCod) => {
        return dispatch(solicitudActions.verifySolicitudStateRequest(solCod))
      },
    })
  }

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-12'>
            <div className='row'>
              <Tabs>
                <TabList>
                  <Tab>NUEVO TRAMITE</Tab>
                  {/* <Tab>EDICIÓN</Tab> */}
                </TabList>

                <TabPanel>
                  <Request />
                </TabPanel>
                {/* <TabPanel>
                  <Edition />
                </TabPanel> */}
              </Tabs>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='contact-item'>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                <p>¿Ya realizó su solicitud?</p>
                <p className="text-decoration-underline fst-italic" onClick={handleVerification} style={{ cursor: 'pointer', color: '#D36FDD', textDecoration: 'underline', paddingLeft: '5px' }}>Realizar seguimiento a su solicitud.</p>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : '/'}>
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            Copyright © {actualYear.getFullYear()} Ministerio de Gobierno - Tecnologia y Sistemas. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
