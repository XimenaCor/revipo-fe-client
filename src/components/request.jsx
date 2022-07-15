import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import SweetAlert from 'sweetalert2';
import Swal from 'sweetalert2';
import { Top } from './top';

import { solicitudActions } from '../redux/solicitud/actions'

export const Request = (props) => {
  const dispatch = useDispatch();
  const actualYear = new Date();
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [values, setValues] = React.useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf'
  });

  const solicitudForm = useSelector(
    (state) => state.solicitud.solicitudForm
  );
  const estadoSelect = useSelector((state) => state.solicitud.solicitudForm.tipoSolicitud)

console.log(estadoSelect);

  const solicitudRes = useSelector(
    (state) => state.solicitud.solicitudRes
  )

  const whatsappCode = useSelector(
    (state) => state.solicitud.whatsappCode
  )

  const isLoading = useSelector(
    (state) => state.solicitud.isLoading
  )

  const isLoadingWhatsappCode = useSelector(
    (state) => state.solicitud.isLoadingWhatsappCode
  )

  const error = useSelector(
    (state) => state.solicitud.error
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

  const handleChange = (e) => {
    if (e.target.name !== 'email') {
      dispatch(solicitudActions.setSolicitudForm({
        ...solicitudForm,
        [e.target.name]: e.target.value.toUpperCase()
      }),
      )
    } else {
      dispatch(solicitudActions.setSolicitudForm({
        ...solicitudForm,
        [e.target.name]: e.target.value
      }),
      )
    }
  }

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
      acceptedFiles.splice(0, 10);
    }
  }, [dispatch, solicitudRes, uploadedFiles, acceptedFiles])

  const onSubmit = async (data, e) => {
    if (uploadedFiles.length < 1) {
      SweetAlert.fire({
        icon: 'warning',
        title: `No ha seleccionado ningun archivo!`,
        showConfirmButton: false,
        timer: 5000
      })
    } else {
      const { name, ...info } = data;
      const fechaActual = new Date()
      const dataObj = {
        ...info,
        fechaSolicitud: fechaActual
      }
      setValues(dataObj)
      SweetAlert.fire({
        title: '¿Esta seguro de enviar la solicitud?',
        text: "Tenga en cuenta que esta información se considerara una declaracion jurada, con efecto legal y pasible de investigacion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      })
        .then(async (result) => {
          if (result.value) {
            dispatch(solicitudActions.sendWhatsappCodeRequest({ email: dataObj.email, telefono: dataObj.telefono }))
          }
        }
        )
    }
  }

  React.useEffect(() => {
    if (!isLoadingWhatsappCode && !error && whatsappCode && values) {
      Swal.fire({
        title: 'Se le ha enviado un codigo de verificación al whatsapp de su teléfono.',
        text: 'Introduzca el código recibido para concluir con el registro',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        }, 
        showCancelButton: true,
        cancelButtonText: 'Cancelar Todo',
        confirmButtonText: 'Comparar',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: (whatcode) => {
          if (whatsappCode === whatcode) {
            dispatch(solicitudActions.createSolicitudRequest({ values }));
          }
        }
      })
    }
  }, [isLoadingWhatsappCode, error, values, whatsappCode, dispatch])

  const filesList = acceptedFiles.map(file => (
    <li key={file.path}>
      * {file.path} - {file.size} bytes
    </li>
  ));

  React.useEffect(() => {
    if (whatsappCode !== null) {
      setTimeout(() => {
        dispatch(solicitudActions.clearWhatsappCode())
      }, 20000);
      
    }
  }, [whatsappCode, dispatch])

  if (isLoading || isLoadingWhatsappCode) {
    SweetAlert.fire({
      icon: 'warning',
      text: `Enviando solicitud...`,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }

  return (
    <div>
      <div id='request'>
        <div className='container'>
          <div className='col-md-12'>
            <div className='row'>
              <div className='section-title'>
                <Top
                  header='FORMULARIO DE NUEVA SOLICITUD'
                  note='Asegurese de llenar los campos tal y como se encuentran en los documentos originales.'
                  info='Info: Procure llenar la solicitud con un número telefonico que tenga el servicio de whatsapp activado.' />
              </div>
              <form
                onChange={handleChange}
                onSubmit={handleSubmit(onSubmit)}
              >
                <h5>Datos de la Solicitud de Autorización</h5>
                <div className='row'>
                  <div className='col-md-8'>
                    <div className='form-group'>
                      <label>Tipo de Autorización</label>
                      <select
                        onChange={()=> dispatch()} name="tipoSolicitud" defaultValue={solicitudForm.tipoSolicitud} {...register('tipoSolicitud', { required: true })}
                        className='form-control text-uppercase'
                      >
                          <option defaultValue = 'blanco' value="blanco">Por favor seleccione una de las opciones de esta lista...</option>
                          <option value="AMBULANCIAS">AMBULANCIAS</option>
                          <option value="VEHICULOS OFICIALES">VEHÍCULOS OFICIALES</option>
                          <option value="VEHICULOS PARTICULARES AUTORIDADES">VEHÍCULOS PARTICULARES DE AUTORIDADES Y EX AUTORIDADES</option>
                          <option value="VEHICULOS CON VIDRIOS OSCURECIDOS DE FABRICA">VEHÍCULOS CON VIDRIOS OSCURECIDOS DE FÁBRICA</option>
                          <option value="VEHICULOS POR ORDEN JUDICIAL">VEHÍCULOS POR ORDEN JUDICIAL</option>
                          <option value="VEHICULOS POR RAZONES DE SALUD">VEHÍCULOS POR RAZONES DE SALUD</option>
                          <option value="PUBLICO">REGISTRO DE VIDRIOS OSCURECIDOS PARA VEHÍCULOS DEL TRANSPORTE PÚBLICO</option>
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
                        className="form-control text-uppercase" type="select"
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
                        className='form-control text-uppercase'
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
                        className='form-control text-uppercase'
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
                        className='form-control text-uppercase'
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
                        className='form-control text-uppercase'
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
                        className="form-control text-uppercase" type="select"
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
                        className='form-control text-uppercase'
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
                        className='form-control text-uppercase'
                      />
                      {
                        errors.fechaNacimiento && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label>Dirección domiciliaria </label>
                      <input
                        name="domicilio" defaultValue={solicitudForm.domicilio} {...register('domicilio', { required: true })}
                        className='form-control text-uppercase'
                      />
                      {
                        errors.domicilio && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
  {/* SWITCH PARA CAMPOS EXTRAS */}
  {(() => {
        switch (estadoSelect){
        case 'AMBULANCIAS':
            return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-4'>
      <div className='form-group'>
      <label>Nro. Roseta o Resolución </label>
      <input
      name="roseta" defaultValue={solicitudForm.roseta} {...register('roseta', { required: true })}
      className='form-control text-uppercase'
      />
      {
      errors.roseta && (
      <span style={{ color: "tomato" }}>Este campo es requerido!</span>
      )
            }
      <p className='help-block text-danger'></p>
      </div>
    </div>
    </div>

    </div>
		)
        case 'VEHICULOS OFICIALES':
          return (
            <div className='container'>
            <div className='row'>
            <div className='col-md-6'>
            <div className='form-group'>
            <label>Institución</label>
            <input
            name="institucion" defaultValue={solicitudForm.institucion} {...register('institucion', { required: true })}
            className='form-control text-uppercase'
            />
            {
            errors.institucion && (
            <span style={{ color: "tomato" }}>Este campo es requerido!</span>
            )
                  }
            <p className='help-block text-danger'></p>
            </div>
            </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Cargo </label>
                      <select name="cargo" defaultValue={solicitudForm.cargo} {...register('cargo', { required: true })}
                        className="form-control text-uppercase" type="select"
                      >
                        <option value="PRESIDENTE DEL ESTADO PLURINACIONAL">PRESIDENTE DEL ESTADO PLURINACIONAL</option>
                        <option value="VICEPRESIDENTE DEL ESTADO PLURINACIONAL">VICEPRESIDENTE DEL ESTADO PLURINACIONAL</option>
                        <option value="MINISTROS DE ESTADO">MINISTROS DE ESTADO</option>
                        <option value="PRESIDENTE DE LA CÁMARA DE SENADORES">PRESIDENTE DE LA CÁMARA DE SENADORES</option>
                        <option value="PRESIDENTE DE LA CÁMARA DE DIPUTADOS">PRESIDENTE DE LA CÁMARA DE DIPUTADOS</option>
                        <option value="SENADORES">SENADORES</option>
                        <option value="DIPUTADOS">DIPUTADOS</option>
                        <option value="MAGISTRADOS DEL TRIBUNAL CONSTITUCIONAL PLURINACIONAL">MAGISTRADOS DEL TRIBUNAL CONSTITUCIONAL PLURINACIONAL</option>
                        <option value="MAGISTRADOS DEL TRIBUNAL SUPREMO DE JUSTICIA">MAGISTRADOS DEL TRIBUNAL SUPREMO DE JUSTICIA</option>
                        <option value="PRESIDENTES DE LOS TRIBUNALES DEPARTAMENTALES DE JUSTICIA">PRESIDENTES DE LOS TRIBUNALES DEPARTAMENTALES DE JUSTICIA</option>
                        <option value="MAGISTRADOS DEL TRIBUNAL AGROAMBIENTAL">MAGISTRADOS DEL TRIBUNAL AGROAMBIENTAL</option>
                        <option value="CONSEJEROS DEL CONSEJO DE LA MAGISTRATURA">CONSEJEROS DEL CONSEJO DE LA MAGISTRATURA</option>
                        <option value="VOCALES DEL TRIBUNAL SUPREMO ELECTORAL">VOCALES DEL TRIBUNAL SUPREMO ELECTORAL</option>
                        <option value="PRESIDENTES DE LOS TRIBUNALES ELECTORALES DEPARTAMENTALES">PRESIDENTES DE LOS TRIBUNALES ELECTORALES DEPARTAMENTALES</option>
                        <option value="CONTRALOR GENERAL DEL ESTADO">CONTRALOR GENERAL DEL ESTADO</option>
                        <option value="FISCAL GENERAL DEL ESTADO">FISCAL GENERAL DEL ESTADO</option>
                        <option value="FISCALES DEPARTAMENTALES">FISCALES DEPARTAMENTALES</option>
                        <option value="PROCURADOR GENERAL DEL ESTADO">PROCURADOR GENERAL DEL ESTADO</option>
                        <option value="DEFENSOR DEL PUEBLO">DEFENSOR DEL PUEBLO</option>
                        <option value="GOBERNADORES DE LOS GOBIERNOS AUTÓNOMOS DEPARTAMENTALES">GOBERNADORES DE LOS GOBIERNOS AUTÓNOMOS DEPARTAMENTALES</option>
                        <option value="PRESIDENTES DE LAS ASAMBLEAS LEGISLATIVAS DEPARTAMENTALES">PRESIDENTES DE LAS ASAMBLEAS LEGISLATIVAS DEPARTAMENTALES</option>
                        <option value="ALCALDES DE LOS GOBIERNOS AUTÓNOMOS MUNICIPALES">ALCALDES DE LOS GOBIERNOS AUTÓNOMOS MUNICIPALES</option>
                        <option value="PRESIDENTES DE LOS CONCEJOS MUNICIPALES">PRESIDENTES DE LOS CONCEJOS MUNICIPALES</option>
                      </select>
                      {
                        errors.cargo && (
                          <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                        )
                      }
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  </div>
            </div>
    )
        case 'VEHICULOS PARTICULARES AUTORIDADES':
          return (
            <div className='container'>
            <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Institución</label>
                <input
                  name="institucion" defaultValue={solicitudForm.institucion} {...register('institucion', { required: true })}
                  className='form-control text-uppercase'
                />
                {
                  errors.institucion && (
                    <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                  )
                }
                <p className='help-block text-danger'></p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Cargo </label>
                <select name="cargo" defaultValue={solicitudForm.cargo} {...register('cargo', { required: true })}
                  className="form-control text-uppercase" type="select"
                >
                  <option value="PRESIDENTE DEL ESTADO PLURINACIONAL">PRESIDENTE DEL ESTADO PLURINACIONAL</option>
                  <option value="VICEPRESIDENTE DEL ESTADO PLURINACIONAL">VICEPRESIDENTE DEL ESTADO PLURINACIONAL</option>
                  <option value="MINISTROS DE ESTADO">MINISTROS DE ESTADO</option>
                  <option value="PRESIDENTE DE LA CÁMARA DE SENADORES">PRESIDENTE DE LA CÁMARA DE SENADORES</option>
                  <option value="PRESIDENTE DE LA CÁMARA DE DIPUTADOS">PRESIDENTE DE LA CÁMARA DE DIPUTADOS</option>
                </select>
                {
                  errors.cargo && (
                    <span style={{ color: "tomato" }}>Este campo es requerido!</span>
                  )
                }
                <p className='help-block text-danger'></p>
              </div>
            </div>
            </div>
      </div>
    )
        case 'VEHICULOS CON VIDRIOS OSCURECIDOS DE FABRICA':
          return (
    <div className='row'>
    <div className='col-md-4'>
      <div className='form-group'>
        <label>Nro. Informe IITCUP </label>
        <input
        name="iitcup" defaultValue={solicitudForm.iitcup} {...register('iitcup', { required: true })}
        className='form-control text-uppercase'
        />
        {
          errors.iitcup && (
            <span style={{ color: "tomato" }}>Este campo es requerido!</span>
          )
        }
        <p className='help-block text-danger'></p>
      </div>
    </div>
    </div>
    )
        case 'VEHICULOS POR ORDEN JUDICIAL':
          return (
    <div className='row'>
    <div className='col-md-4'>
      <div className='form-group'>
        <label>Nro. Orden Judicial </label>
        <input
        name="judicial" defaultValue={solicitudForm.judicial} {...register('judicial', { required: true })}
          className='form-control text-uppercase'
        />
        {
          errors.judicial && (
            <span style={{ color: "tomato" }}>Este campo es requerido!</span>
          )
        }
        <p className='help-block text-danger'></p>
      </div>
    </div>
    </div>
    )
        case 'VEHICULOS POR RAZONES DE SALUD':
          return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-12'>
    <div className="form-group">
    <label>Justificación</label>
    <textarea name="justificacion" className="form-control text-uppercase" 
    defaultValue={solicitudForm.justificacion} {...register('justificacion', { required: true })} rows="3"></textarea>
          </div>
    </div>
    </div>
    </div>
    )
        case 'PUBLICO':
          return (
    <div className='row'>
    <div className='col-md-4'>
      <div className='form-group'>
        <label>Nro. Informe IITCUP </label>
        <input
          name="iitcup" defaultValue={solicitudForm.iitcup} {...register('iitcup', { required: true })}
          className='form-control text-uppercase'
        />
        {
          errors.iitcup && (
            <span style={{ color: "tomato" }}>Este campo es requerido!</span>
          )
        }
        <p className='help-block text-danger'></p>
      </div>
    </div>
    </div>
    )    
    default:
            return null
            }
        })()}
                
                </div>
<h5>Vehículo</h5>
{/* sexta fila */}
<div className='row'>
  <div className='col-md-3'>
    <div className='form-group'>
      <label>Placa </label>
      <input
        name="placa" defaultValue={solicitudForm.placa} {...register('placa', { required: true })}
        className='form-control text-uppercase'
        pattern="[0-9]{4}[A-Z]{3}"
        placeholder='EJEM: 4321ABC'
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
        className='form-control text-uppercase'
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
        className='form-control text-uppercase' type="number" min="1900" max={actualYear.getFullYear()}
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
        className='form-control text-uppercase'
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
{/* SWITCH PARA REQUISITOS */}
    {(() => {
        switch (estadoSelect){
        case 'AMBULANCIAS':
            return (
<div className='container'>
<div className='text-center'>
              <div className='col-md-12' >
              <table className="Table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requisitos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Certificación emitida por el Ministerio de Salud, que acredite la otorgación del Código Único Nacional a la ambulancia o Resolución de habilitación de la ambulancia emitida por el Servicio Departamental de Salud - SEDES correspondiente.</td>
                    {/* <div style={{ borderColor: '#EEF4F6' }}> */}
                    <td> 
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                    </div>
                    </td>
                    {/* </div> */}
                </tr>
                <tr>
                  <td>2</td>
                  <td>Documento que acredite la representación del solicitante, para personas jurídicas.</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Documento que acredite la representación del solicitante, para personas jurídicas.</td>
                </tr>
                <tr>
                <td></td>
                  <td colSpan={3}> {filesList}</td>
                </tr>
              </tbody>
              </table>

              </div>
              </div>
              </div>
              // </div>
        )
        case 'VEHICULOS OFICIALES':
          return (
        <div className='container'>
        <div className='text-center'>
        {/* <div className='row'> */}
            <div className='col-md-12' >
            <table className="Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Requisitos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Documento que acredite la representación legal de la entidad solicitante.</td>
                  {/* <div style={{ borderColor: '#EEF4F6' }}> */}
                  <td> 
                  <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                  </div>
                  </td>
                  {/* </div> */}
              </tr>
              <tr>
                <td>2</td>
                <td>Certificado de Registro de Propiedad Vehicular Automotor - CRPVA, o documentación que acredite la tenencia legal del vehículo.</td>
              </tr>
              <tr>
              <td></td>
                <td colSpan={3}> {filesList}</td>
              </tr>
            </tbody>
            </table>

            </div>
            </div>
            </div>
            // </div>
        )
        case 'VEHICULOS PARTICULARES AUTORIDADES':
            return (
<div className='container'>
<div className='text-center'>
    {/* <div className='row'> */}
              <div className='col-md-12' >
              <table className="Table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requisitos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Documento que acredite la designación como autoridad o ex autoridad según corresponda.</td>
                    {/* <div style={{ borderColor: '#EEF4F6' }}> */}
                    <td> 
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                    </div>
                    </td>
                    {/* </div> */}
                </tr>
                <tr>
                  <td>2</td>
                  <td>Poder de representación vigente y especifico, si corresponde.</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Certificado de Registro de Propiedad Vehicular Automotor - CRPVA, o documentación que acredite la tenencia legal del vehículo.</td>
                </tr>
                <tr>
                <td></td>
                  <td colSpan={3}> {filesList}</td>
                </tr>
              </tbody>
              </table>

              </div>
              </div>
              </div>
              // </div>
        )
        case 'VEHICULOS CON VIDRIOS OSCURECIDOS DE FABRICA':
            return (
<div className='container'>
<div className='text-center'>
    {/* <div className='row'> */}
              <div className='col-md-12' >
              <table className="Table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requisitos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Documento que acredite la representación del solicitante, en caso de personas jurídicas.</td>
                    {/* <div style={{ borderColor: '#EEF4F6' }}> */}
                    <td> 
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                    </div>
                    </td>
                    {/* </div> */}
                </tr>
                <tr>
                  <td>2</td>
                  <td>Poder de representación vigente y especifico, si corresponde.</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Certificado de Antecedentes Policiales de la Fuerza Especial de Lucha Contra el Crimen - FELCC, Fuerza Especial de Lucha Contra el Narcotráfico - FELCN y Transito.</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Certificado de Registro de Propiedad Vehicular Automotor - CRPVA, o documentación que acredite la tenencia legal del vehículo.</td>
                </tr>

                <tr>
                <td></td>
                  <td colSpan={3}> {filesList}</td>
                </tr>
              </tbody>
              </table>

              </div>
              </div>
              </div>
              // </div>
        )
        case 'VEHICULOS POR ORDEN JUDICIAL':
            return (
<div className='container'>
<div className='text-center'>
    {/* <div className='row'> */}
              <div className='col-md-12' >
              <table className="Table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requisitos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Orden Judicial en los procesos donde se investiguen hechos de violencia, en la cual se ordene el uso de vidrios oscurecidos o polarizados, identificando la placa de circulación del vehículo al que se otorgará la autorización.</td>
                    {/* <div style={{ borderColor: '#EEF4F6' }}> */}
                    <td> 
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                    </div>
                    </td>
                    {/* </div> */}
                </tr>
                <tr>
                  <td>2</td>
                  <td>Certificado de Registro de Propiedad Vehicular Automotor - CRPVA, o documentación que acredite la tenencia legal del vehículo.</td>
                </tr>
                <tr>
                <td></td>
                  <td colSpan={3}> {filesList}</td>
                </tr>
              </tbody>
              </table>

              </div>
              </div>
              </div>
              // </div>
        )
        case 'VEHICULOS POR RAZONES DE SALUD':
            return (
<div className='container'>
<div className='text-center'>
    {/* <div className='row'> */}
              <div className='col-md-12 row' >
              <div className='col-md-10' >
              <table className="Table ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requisitos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Certificado médico emitido por un médico del ente Gestor de Salud o por los establecimientos públicos de salud, que expresamente contenga la recomendación al paciente de evitar la exposición a la luz solar, debido a una condición médica de acuerdo a la patología presentada.</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Cuando el paciente no sea el propietario del vehículo, se deberá llenar un formulario de declaración jurada identificando el vehículo que el paciente utiliza.</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Certificado de Registro de Propiedad Vehicular Automotor - CRPVA, o documentación que acredite la tenencia legal del vehículo.</td>
                </tr>
                <tr>
                <td></td>
                  <td colSpan={3}> {filesList}</td>
                </tr>
              </tbody>
              </table>
              </div>
              <div className='col-md-2 align-self-center'>
              <div className='bg-primary' {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                    </div>
              </div>

              </div>
              </div>
              </div>
              // </div>
        )
        case 'PUBLICO':
          return (
        <div className='container'>
        <div className='text-center'>
        {/* <div className='row'> */}
            <div className='col-md-12' >
            <table className="Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Requisitos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Licencia de Conducir vigente.</td>
                  {/* <div style={{ borderColor: '#EEF4F6' }}> */}
                  <td> 
                  <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p className="text-decoration-underline fst-italic" style={{ cursor: 'pointer', fontSize: '20px', color: 'black', textDecoration: 'underline' }}>AGREGAR ARCHIVOS ESCANEADOS</p>
                  </div>
                  </td>
                  {/* </div> */}
              </tr>
              <tr>
                <td>2</td>
                <td>Certificado de Registro de Propiedad Vehicular Automotor - CRPVA, o documentación que acredite la tenencia legal del vehículo.</td>
              </tr>
              <tr>
              <td></td>
                <td colSpan={3}> {filesList}</td>
              </tr>
            </tbody>
            </table>

            </div>
            </div>
            </div>
            // </div>
        )
        default:
          return null
          }
          })()}






                {/* </div> */}

                {/* <div className='row' style={{ borderColor: '#EEF4F6' }}>
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
                </div> */}

                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
