import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QrReader } from 'react-qr-reader';

import { solicitudActions } from '../redux/solicitud/actions'

export const Header = (props) => {
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
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1 style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                  {/* {props.data ? props.data.title : 'Loading'} */}
                  {/* <span></span> */}
                </h1>
                {/* <p>{props.data ? props.data.paragraph : 'Loading'}</p> */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={handleVerification}>
                  VERIFICAR ROSETA
                </button>
              </div>
            </div>
          </div>
        </div>
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
    </header>
  )
}
