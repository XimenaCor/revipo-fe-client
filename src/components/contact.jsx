import { useState } from 'react'
import emailjs from 'emailjs-com'

const initialState = {
  name: '',
  email: '',
  message: '',
}
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    emailjs
      .sendForm(
        'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID'
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }
  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-12'>
            <div className='row'>
              <div className='section-title'>
                <h2>Formulario de Solicitud</h2>
                <p>
                  Asegurese de llenar los campos tal y como se encuentran en los documentos originales.
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
              <h5>Solicitante</h5>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Nombres</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Apellido Paterno</label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Apellido Materno</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Numero de Cedula de Identidad </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Expedido</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Teléfono</label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Correo electrónico </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Dirección domiciliaria </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Departamento de la solicitud </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>

                <h5>Vehiculo</h5>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Color</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Año</label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Marca</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Tipo de vehículo</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Industria</label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor="">Placa </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          {/* <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {props.data ? props.data.phone : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div> */}
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
            Copyright © 2021 Ministerio de Gobierno - Tecnologia y Sistemas. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
