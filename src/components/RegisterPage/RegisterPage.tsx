import * as React from 'react';
import { IRegisterPageProps } from './IRegisterPageProps';
import { IRegisterPageState } from './IRegisterPageState';
import { Usuario } from '../../models';

declare var M: any;

export class RegisterPage extends React.Component<IRegisterPageProps, IRegisterPageState> {
  constructor(props: IRegisterPageProps) {
    super(props);

    this.state = {
      usuario: {
        id: "",
        nombre: "",
        apellidos: "",
        email: "",
        tipo: "",
        direccion: "",
        localidad: "",
        cp: "",
        fechaNacimiento: "",
        password: "",
        provincia: "",
        disponible: false
      }
    }
  }

  _isAmptyForm = (user: any): boolean => {
    return (
      user.nombre === "" ||
      user.direccion === "" ||
      user.localidad === "" ||
      user.fechaNacimiento === "" ||
      user.cp === "" ||
      user.localidad === "" ||
      user.provincia === "" ||
      user.email === "" ||
      user.apellidos === "" ||
      user.password === ""
    )
      ? true
      : false;
  }

  _onCreateUser = (event: any) => {
    event.preventDefault();
    if (this._isAmptyForm(this.state.usuario))
      M.toast({
        html: "El formulario ha de estar completo!"
      });
    else {
      this.props.registroUser(this.state.usuario)
    }
  }

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const user = {
      ...this.state.usuario,
      [name]: value
    }
    this.setState({
      usuario: user
    });
  }

  render(): React.ReactElement {
    return (
      <div id="image">
        {
          !this.props.isAuthenticated &&
          <div className="container">
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
                        <input type="text" placeholder="Name" name="nombre" onChange={this.handleChange} value={this.state.usuario.nombre} />
                      </div>
                      <div className="col s12 m6 input-field">
                        <input type="text" placeholder="Apellidos" name="apellidos" onChange={this.handleChange} value={this.state.usuario.apellidos} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12 m6 input-field">
                        <input type="email" placeholder="email" name="email" onChange={this.handleChange} value={this.state.usuario.email} />
                      </div>
                      <div className="col s12 m6 input-field">
                        <input type="password" placeholder="Contraseña" name="password" onChange={this.handleChange} value={this.state.usuario.password} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12 m6 input-field">
                        <input type="text" placeholder="direccion" name="direccion" onChange={this.handleChange} value={this.state.usuario.direccion} />
                      </div>
                      <div className="col s12 m6 input-field">
                        <input type="text" placeholder="localidad" name="localidad" onChange={this.handleChange} value={this.state.usuario.localidad} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12 m6 input-field">
                        <input type="text" placeholder="provincia" name="provincia" onChange={this.handleChange} value={this.state.usuario.provincia} />
                      </div>
                      <div className="col s12 m6 input-field">
                        <input type="text" placeholder="cp" name="cp" onChange={this.handleChange} value={this.state.usuario.cp} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12 m12 input-field">
                        <input type="text" placeholder="fecha de Nacimiento" name="fechaNacimiento" onChange={this.handleChange} value={this.state.usuario.fechaNacimiento} />
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
        }
      </div>
    )
  }
}