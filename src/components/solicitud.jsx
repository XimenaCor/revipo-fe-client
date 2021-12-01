import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import Swal from 'sweetalert2'

import { solicitudActions } from '../redux/solicitud/actions'

export const Solicitud = (props) => {
  const dispatch = useDispatch();
  const actualYear = new Date();
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const solicitudForm = useSelector(
    (state) => state.solicitud.solicitudForm
  );

  const solicitudRes = useSelector(
    (state) => state.solicitud.solicitudRes
  )

  const isLoading = useSelector(
    (state) => state.solicitud.isLoading
  )

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  React.useEffect(() => {
    if (!props.updateForm) {
      dispatch(
        solicitudActions.setSolicitudForm({
          ...solicitudForm
        }),
      );
    }
  }, [dispatch])

  React.useEffect(() => {
    reset(solicitudForm)
  }, [solicitudForm, reset])

  const handleChange = (e) => dispatch(
    solicitudActions.setSolicitudForm({
      ...solicitudForm,
      [e.target.name]: e.target.value
    }),
  );

  React.useEffect(() => {
    if (acceptedFiles.length !== 0) {
      setUploadedFiles(acceptedFiles)
    }
  }, [acceptedFiles])
  
  React.useEffect(() => {
    if (solicitudRes && solicitudRes.codigo && uploadedFiles.length > 0) {
      const F = new FormData();
      for (let index = 0; index < uploadedFiles.length; index++) {
        F.append("files", uploadedFiles[index]);
      }
      dispatch(solicitudActions.uploadFilesRequest({ files: F, solicitudId: solicitudRes.ide, solicitudCod: solicitudRes.codigo }))
      setUploadedFiles([])
    }
  }, [dispatch, solicitudRes, uploadedFiles])

  const onSubmit = async (data, e) => {
    if (uploadedFiles.length < 1) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: `No ha seleccionado ningun archivo!`,
        showConfirmButton: false,
        timer: 5000
      })
    } else {
      const { name, ...info } = data;
      const fechaActual = new Date()
      const values = {
          ...info,
          fechaInicioSol: fechaActual
      }
      dispatch(solicitudActions.createSolicitudRequest({ values }));
    }
  }

  const filesList = acceptedFiles.map(file => (
    <li key={file.path}>
      * {file.path} - {file.size} bytes
    </li>
  ));

  if (isLoading) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: `Enviando solicitud...`,
      showConfirmButton: false,
    })
  }

  const handleVerification = () => {
    Swal.fire({
      title: 'Introduzca su codigo de solicitud',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Buscar',
      showLoaderOnConfirm: true,
      preConfirm: (solCod) => {
        return dispatch(solicitudActions.verifySolicitudStateRequest(solCod))
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-12'>
            <div className='row'>
              <div className='section-title'>
                <h2>Formulario de Solicitud</h2>
                <p style={{fontSize: '23px', marginBottom: '0px'}}>
                  Asegurese de llenar los campos tal y como se encuentran en los documentos originales.
                </p>
                <span style={{fontSize: '15px', paddingLeft: '30px', marginTop: '0px'}}>
                  Info: Procure llenar la solicitud con un número telefonico que tenga el servicio de whatsapp activado.
                </span>
              </div>
              <form
                onChange={handleChange}
                onSubmit={handleSubmit(onSubmit)}
              >
                <h5>Datos de la Solicitud</h5>
                <div className='row'>
                  <div className='col-md-8'>
                    <div className='form-group'>
                      <label>Tipo de Solicitud</label>
                      <select
                        name="tipoSolicitud" defaultValue={solicitudForm.tipoSolicitud} {...register('tipoSolicitud', { required: true })}
                        className='form-control'
                        >
                        <option value="PERSONA NATURAL">PERSONA NATURAL</option>
                        <option value="VEHICULO OFICIAL">VEHÍCULOS OFICIALES, DIPLOMÁTICOS, CONSULARES Y DE ORGANISMO INTERNACIONALES</option>
                        <option value="PERSONA JURIDICA">PERSONA JURÍDICA</option>
                      </select>
                      {
                        errors.tipoSolicitud && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Departamento de la solicitud </label>
                      <select name="departamento" defaultValue={solicitudForm.departamento} {...register('departamento', { required: true })}
                        className="form-control" type="select"
                      >
                        <option value="LA PAZ">LA PAZ</option>
                        <option value="COCHABAMBA">COCHABAMBA</option>
                        <option value="SANTA CRUZ">SANTA CRUZ</option>
                        <option value="TARIJA">TARIJA</option>
                        <option value="POTOSI">POTOSI</option>
                        <option value="CHUQUISACA">CHUQUISACA</option>
                        <option value="ORURO">ORURO</option>
                        <option value="PANDO">PANDO</option>
                        <option value="BENI">BENI</option>
                      </select>
                      {
                        errors.departamento && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <h5>Solicitante</h5>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Nombres</label>
                      <input
                        name="nombres" defaultValue={solicitudForm.nombres} {...register('nombres', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.nombres && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Apellido Paterno</label>
                      <input
                        name="primerApellido" defaultValue={solicitudForm.primerApellido} {...register('primerApellido', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.primerApellido && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Apellido Materno</label>
                      <input
                        name="segundoApellido" defaultValue={solicitudForm.segundoApellido} {...register('segundoApellido', { required: false })}
                        className='form-control'
                      />
                      {
                        errors.segundoApellido && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Número de Cedula de Identidad </label>
                      <input
                        name="numeroDocumento" defaultValue={solicitudForm.numeroDocumento} {...register('numeroDocumento', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.numeroDocumento && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-2'>
                    <div className='form-group'>
                      <label>Expedido</label>
                      <select name="expedido" defaultValue={solicitudForm.expedido} {...register('expedido', { required: true })}
                        className="form-control" type="select"
                      >
                        <option value="LP">LP</option>
                        <option value="CBB">CBB</option>
                        <option value="SC">SC</option>
                        <option value="TRJ">TRJ</option>
                        <option value="PTS">PTS</option>
                        <option value="CHU">CHU</option>
                        <option value="OR">OR</option>
                        <option value="PD">PD</option>
                        <option value="BE">BE</option>
                      </select>
                      {
                        errors.expedido && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Teléfono</label>
                      <input
                        name="telefono" defaultValue={solicitudForm.telefono} {...register('telefono', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.telefono && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Correo electrónico </label>
                      <input
                        name="email" defaultValue={solicitudForm.email} {...register('email', { required: true })}
                        className='form-control' type='email'
                      />
                      {
                        errors.email && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Fecha de Nacimiento </label>
                      <input
                        name="fechaNacimiento" defaultValue={solicitudForm.fechaNacimiento} {...register('fechaNacimiento', { required: true })}
                        type="date"
                        className='form-control'
                      />
                      {
                        errors.fechaNacimiento && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-8'>
                    <div className='form-group'>
                      <label>Dirección domiciliaria </label>
                      <input
                        name="domicilio" defaultValue={solicitudForm.domicilio} {...register('domicilio', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.domicilio && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>

                <h5>Vehiculo</h5>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Placa </label>
                      <input
                        name="placa" defaultValue={solicitudForm.placa} {...register('placa', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.placa && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Color</label>
                      <input
                        name="color" defaultValue={solicitudForm.color} {...register('color', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.color && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Año</label>
                      <input
                        name="anio" defaultValue={solicitudForm.anio} {...register('anio', { required: true })}
                        className='form-control' type="number" min="1900" max={actualYear.getFullYear()}
                      />
                      {
                        errors.anio && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Marca</label>
                      <input
                        name="marca" defaultValue={solicitudForm.marca} {...register('marca', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.marca && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Tipo de vehículo</label>
                      <input
                        name="tipoVehiculo" defaultValue={solicitudForm.tipoVehiculo} {...register('tipoVehiculo', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.tipoVehiculo && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Industria</label>
                      <input
                        name="industria" defaultValue={solicitudForm.industria} {...register('industria', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.industria && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Modelo </label>
                      <input
                        name="modelo" defaultValue={solicitudForm.modelo} {...register('modelo', { required: true })}
                        className='form-control'
                      />
                      {
                        errors.modelo && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row' style={{ borderColor: '#EEF4F6' }}>
                  <div className='col-md-12'>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '25px', color: 'white', textDecoration: 'underline' }}>Selecione los archivos que desea agregar.</p>
                    </div>
                    <aside>
                      <h5>Archivos</h5>
                      <ul>{filesList}</ul>
                    </aside>
                  </div>
                </div>

                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='contact-item'>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                <p>¿Ya realizo su solicitud?</p>
                <p className="text-decoration-underline fst-italic" onClick={handleVerification} style={{ cursor: 'pointer', color: '#D36FDD', textDecoration: 'underline', paddingLeft: '5px' }}>Verifique aqui el estado de la misma.</p>
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
