import * as React from 'react';
import { IRegisterPageProps } from './IRegisterPageProps';
import { IRegisterPageState } from './IRegisterPageState';
import { Paciente, } from '../../models';

declare var M: any;

export class RegisterPage extends React.Component<IRegisterPageProps, IRegisterPageState> {
  constructor(props: IRegisterPageProps) {
    super(props);

    this.state = {
      paciente: {
        _id: "",
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        password: "",
        direccion: "",
        tipo: ""
      }
    }
  }

  _isAmptyForm = (user: any): boolean => {
    return (user.nombre === "", user.direccion === "" || user.dni === "" || user.email === "" || user.apellido === "" || user.password === "")
      ? true
      : false;
  }

  _onCreateUser = (event: any) => {
    event.preventDefault();
    if (this._isAmptyForm(this.state.paciente))
      M.toast({
        html: "El formulario ha de estar completo!"
      });
    else {
      //registro solo para usaurios
      console.log("create user");
    }
  }

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const user = {
      ...this.state.paciente,
      [name]: value
    }
    this.setState({
      paciente: user
    });
  }

  render(): React.ReactElement {
    return (
      <div id="image">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="container">
            <div className="card">
              <br />
              <div className="card-title center">Register</div>
              <div className="card-content center">
                <form onSubmit={this._onCreateUser}>
                  <div className="row">
                    <div className="col s12 m6 input-field">
                      <input type="text" placeholder="Name" name="nombre" onChange={this.handleChange} value={this.state.paciente.nombre} />
                    </div>
                    <div className="col s12 m6 input-field">
                      <input type="text" placeholder="Apellidos" name="apellido" onChange={this.handleChange} value={this.state.paciente.apellido} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12 m6 input-field">
                      <input type="email" placeholder="email" name="email" onChange={this.handleChange} value={this.state.paciente.email} />
                    </div>
                    <div className="col s12 m6 input-field">
                      <input type="text" placeholder="dni" name="dni" onChange={this.handleChange} value={this.state.paciente.dni} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12 m6 input-field">
                      <input type="text" placeholder="direccion" name="direccion" onChange={this.handleChange} value={this.state.paciente.direccion} />
                    </div>
                    <div className="col s12 m6 input-field">
                      <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.paciente.password} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6">
                      <button type="submit" className="btn light-blue darken-4">Registro</button>
                    </div>
                    <div className="col s6">
                      <li className="btn light-blue darken-4"><a href="/">Cancelar</a></li>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}