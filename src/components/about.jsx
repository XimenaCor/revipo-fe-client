import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QrReader } from 'react-qr-reader';

import { solicitudActions } from '../redux/solicitud/actions'

export const About = (props) => {

  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false)
  const [visibleButton, setVisibleButton] = React.useState(false)
  const [data, setData] = React.useState('');

  const rosetaInfo = useSelector(
    (state) => state.solicitud.rosetaInfo
  );

  const handleVerification = () => {
    setVisible(true)
  }

  const handleScanner = () => {
    setVisibleButton(true);
    setData('')
  }

  const handleCancel = () => {
    setVisible(false);
    dispatch(solicitudActions.clearRosetaInfo());
  }

  React.useEffect(() => {
    if (data.length > 0) {
      dispatch(solicitudActions.readRosetaRequest(data))
      setVisibleButton(false);
    }
  }, [data, dispatch])

  return (
    <div id="about">
      <div className="container">
        <div style={{ textAlign: 'center', paddingBottom: '50px'}} >
          <h1 style={{ paddingTop: '0px', paddingBottom: '0px' }}> </h1>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={handleVerification}>
                  VERIFICAR ROSETA
            </button>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Verificación de Roseta</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancel}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div>
                {
                  !visibleButton ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '269px', backgroundColor: '#e0e0e0' }}>
                      <button style={{ fontSize: '20px' }} onClick={handleScanner}>Scannear QR</button>
                    </div>
                  ) : (
                    <div>
                      <QrReader
                        scanDelay={300}
                        onResult={(result, error) => {
                          if (!!result) {
                            setData(result?.text)
                            // setVisibleButton(false)
                          }
                          // if (!!error) {
                          //   console.info(error);
                          // }
                        }}
                        style={{ width: '100%' }}
                      />
                    </div>
                  )
                }
              </div>
              <br />
              {rosetaInfo && !rosetaInfo.message ? (
                <div>
                  <p><b>Placa: </b>{rosetaInfo.placa}</p>
                  <p><b>Carnet: </b>{rosetaInfo.numeroDocumento}</p>
                  <p><b>Nombre: </b>{rosetaInfo.nombres}</p>
                  <p><b>Apellido: </b>{rosetaInfo.primerApellido}</p>
                  <p><b>Estado: </b>{rosetaInfo.estado}</p>
                  <p><b>Roseta: </b>{rosetaInfo.nroRoseta}</p>
                </div>
              ) : null}
              {rosetaInfo && rosetaInfo.message ? (
                <div>
                  <p><b>{rosetaInfo.message}</b></p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/aboutNew.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
            <h2>Propósito</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              {/* <p>{props.data ? props.data.paragraph2 : "loading..."}</p> */}
              <h3>Objetivos Específicos</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
