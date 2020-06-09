import React from 'react';
import './App.css';
import { LoginService, IService } from '../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActions from "../../redux/components/session/sessionActions";
import * as paqueteActions from "../../redux/components/crudPaquetes/crudPaqueteActions";

import {
  Route,
  Switch,
  //Redirect
} from "react-router-dom";
import {
  PageNotFound,
  NavBar,
  LoginPage,
  HomePage
} from '../';


import {
  IAppProps,
  IAppState
} from ".";

import { RegisterPage } from '../RegisterPage';
import PrivatePage from "../private/PrivatePage";
import SeguimientoComponent from '../Seguimiento/SeguimientoComponent';
import { Estado } from '../../models/EstadoEnum';
import { Paquete } from '../../models/PaqueteModel';
import CreatePaquete from '../paquetes/CreatePaquete';

declare var M: any;

class App extends React.Component<IAppProps, IAppState> {
  user_init = {
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

  paquete_init = {
    id: "",
    usuario_id: "",
    precio: 0,
    peso: 0,
    alto: 0,
    ancho: 0,
    profundo: 0,
    origen: "",
    destino: "",
    provincia_origen: "",
    provincia_destino: "",
    localizacion_actual: "",
    direccion_origen: "",
    direccion_destino: "",
    zona: "",
    estado: Estado.SIN_ASIGNAR,
    asignado: false,
    id_repartidor: "",
  }

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      login: new LoginService(),
      user: this.user_init,
      paquete: this.paquete_init,
      servicios: [],
      paquetes: []
    }
  }

  componentDidMount() {
    M.AutoInit();

    if (this.props.isAuthenticated) { //need this check
      this._loadUser();
    }
  }

  _onLogout = async () => {
    await this.props.actions.logoutUser();
    if (this.props.efectiveDone) {
      this.setState({
        user: this.user_init
      });
      window.location.href = "/";
    } else {
      M.toast({
        html: this.props.message
      });
    }
  }

  _onLogin = async (user: any) => {
    await this.props.actions.loginUser(this.state.login, user.email, user.password);
    if (this.props.efectiveDone) {
      window.location.href = "/"; //link
    } else {
      M.toast({
        html: this.props.message
      });
    }
  }

  _onRegistro = async (user: any) => {
    await this.props.actions.registerUser(this.state.login, user)
    if (this.props.efectiveDone) {
      window.location.href = "/"; //link en el boton del formulario
    } else {
      M.toast({
        html: this.props.message
      });
    }
  }

  _loadUser = async () => {
    await this.props.actions.loadUser();
    this.setState({
      user: this.props.user,
      servicios: this.props.servicios,
      paquetes: this.props.paquetes
    });
  }

  public render() {
    return (
      <div>
        <NavBar
          tipo={this.state.user.tipo}
          isAuthenticated={this.props.isAuthenticated}
          onLogout={this._onLogout}
        />
        <div className="center">
          {
            this.props.isAuthenticated &&
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" render={() => <LoginPage isAuthenticated={this.props.isAuthenticated} loginUser={this._onLogin} />} />
              <Route exact path="/registro" render={() => <RegisterPage isAuthenticated={this.props.isAuthenticated} registroUser={this._onRegistro} />} />
              <Route exact path="/private" render={() => <PrivatePage user={this.state.user} servicios={this.props.servicios} />} />
              <Route exact path="/seguimiento/:idPaquete" component={SeguimientoComponent} />
              <Route exact path="/crear" render={() => <CreatePaquete servicios={this.props.servicios} />} />
              <Route exact component={PageNotFound} />
            </Switch>
          }
          {
            !this.props.isAuthenticated &&
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" render={() => <LoginPage isAuthenticated={this.props.isAuthenticated} loginUser={this._onLogin} />} />
              <Route exact path="/registro" render={() => <RegisterPage isAuthenticated={this.props.isAuthenticated} registroUser={this._onRegistro} />} />
              <Route exact path="/seguimiento/:idPaquete" component={SeguimientoComponent} />
              <Route exact component={PageNotFound} />
            </Switch>
          }
        </div>
      </div>
    );
  }
}

/**
 * What state should i expose as props?
 * @param state
 */
function mapStateToProps(state: any) {
  return {
    user: state.sessionReducer.user,
    isFetching: state.sessionReducer.isFetching,
    isAuthenticated: state.sessionReducer.isAuthenticated,
    message: state.sessionReducer.message,
    servicios: state.sessionReducer.servicios,
    efectiveDone: state.sessionReducer.efectiveDone,
    paquetes: state.sessionReducer.paquetes
  };
}

/**
* What actions do i wont on props?
* @param dispatch
*/
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
