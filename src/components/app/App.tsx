import React from 'react';
import './App.css';
import { LoginService } from '../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActions from "../../redux/components/session/sessionActions";
import {
  Route,
  Switch,
  //Redirect
} from "react-router-dom";
import {
  HomePage,
  PageNotFound,
  NavBar,
  LoginPage,
  PrivatePage
} from '../';

import {
  IAppProps,
  IAppState
} from ".";
import { UserFactory } from '../../models';
import { RegisterPage } from '../RegisterPage';
import SeguimientoComponent from '../Seguimiento/SeguimientoComponent';
import { Estado } from '../../models/EstadoEnum';

declare var M: any;

class App extends React.Component<IAppProps, IAppState> {
  user_init = {
    _id: "",
    nombre: "",
    apellido: "",
    email: "",
    tipo: "",
    direccion: "",
    localidad: "",
    cp: "",
    fechaNacimiento: "",
    dni: "",
    password: "",
    provincia: "",
    paquetes: [],
  }

  paquete_init = {
    _id: "",
    usuario_id: "",
    direccion_origen: "",
    direccion_destino: "",
    zona: "",
    peso: 0,
    alto: 0,
    ancho: 0,
    profundo: 5,
    estado: Estado.SIN_ASIGNAR,
    asignado: false
  }

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      login: new LoginService(),
      user: this.user_init,
      paquete: this.paquete_init,
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
      window.location.href = "/";
    } else {
      M.toast({
        html: this.props.message
      });
    }
  }

  _onRegistro = async (user: any) => {
    await this.props.actions.registerUser(this.state.login, user)
    if (this.props.efectiveDone) {
      window.location.href = "/";
    } else {
      M.toast({
        html: this.props.message
      });
    }
  }

  _loadUser = async () => {
    //await this.props.actions.loadUser();
    var user = JSON.parse(localStorage.getItem('user') || "");
    this.setState({
      user: UserFactory.getInstance(localStorage.getItem('tipo') || "", user)
    });
  }

  _onSeguimiento = async (paquete: any) => {
    if (typeof paquete == "string") {
      console.log("es un id ");
      alert("vamos a trabajar aquí");
      //llamar a redux con una action de get paquete
      //actualizar el estado
      //y navegar al componente seguimeinto

    } else {
      console.log("es un paquete");
      this.setState({
        paquete: {
          _id: "4",
          usuario_id: "1",
          direccion_origen: "alicante",
          direccion_destino: "Valencia",
          zona: "centro",
          peso: 5,
          alto: 10,
          ancho: 10,
          profundo: 15,
          estado: Estado.SIN_ASIGNAR,
          asignado: true
        }
      });
    }
    //this._navigateTo("seguimiento");
  }

  _navigateTo = (destino: string) => {
    switch (destino) {
      case "seguimiento":
        window.location.href = "/seguimiento";
        break;

      default:
        break;
    }
  }

  public render() {
    return (
      <div>
        <NavBar
          isAuthenticated={this.props.isAuthenticated}
          onLogout={this._onLogout}
        />
        <div className="center">
          {
            this.props.isAuthenticated &&
            <Switch>
              <Route exact path="/" render={() => <HomePage seguimiento={this._onSeguimiento} />} />
              <Route exact path="/login" render={() => <LoginPage isAuthenticated={this.props.isAuthenticated} loginUser={this._onLogin} />} />
              <Route exact path="/registro" component={() => <RegisterPage isAuthenticated={this.props.isAuthenticated} registroUser={this._onRegistro} />} />
              <Route exact path="/private" render={() => <PrivatePage seguimiento={this._onSeguimiento} user={this.state.user} servicios={this.props.servicios} />} />
              <Route exact path="/seguimiento" render={() => <SeguimientoComponent paquete={this.state.paquete} />} />
              <Route exact component={PageNotFound} />
            </Switch>
          }
          {
            !this.props.isAuthenticated &&
            <Switch>
              <Route exact path="/" render={() => <HomePage seguimiento={this._onSeguimiento} />} />
              <Route exact path="/login" render={() => <LoginPage isAuthenticated={this.props.isAuthenticated} loginUser={this._onLogin} />} />
              <Route exact path="/registro" component={() => <RegisterPage isAuthenticated={this.props.isAuthenticated} registroUser={this._onRegistro} />} />
              <Route exact path="/seguimiento" render={() => <SeguimientoComponent paquete={this.state.paquete} />} />
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
    efectiveDone: state.sessionReducer.efectiveDone
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
