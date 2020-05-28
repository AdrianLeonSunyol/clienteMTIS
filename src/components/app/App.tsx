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
    provincia: ""
  }
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      login: new LoginService(),
      user: this.user_init
    }
  }

  componentDidMount() {
    M.AutoInit();

    if (this.props.isAuthenticated) { //need this check
      this._loadUser();
    }
  }

  _onLogout = () => {
    this.props.actions.logoutUser();
    this.setState({
      user: this.user_init
    });
    window.location.href = "/";
  }

  _onLogin = (user: any) => {
    this.props.actions.loginUser(this.state.login, user.email, user.password)
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err);
      })
  }

  _onRegistro = (user: any) => {
    this.props.actions.registerUser(this.state.login, user)
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _loadUser = async () => {
    await this.props.actions.loadUser();
    var user = JSON.parse(localStorage.getItem('user_data') || "");
    this.setState({
      user: UserFactory.getInstance(localStorage.getItem('tipo') || "", user)
    });
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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" render={() => <LoginPage isAuthenticated={this.props.isAuthenticated} loginUser={this._onLogin} />} />
              <Route exact path="/private" render={() => <PrivatePage user={this.state.user} servicios={this.props.servicios} />} />
              <Route exact component={PageNotFound} />
            </Switch>
          }
          {
            !this.props.isAuthenticated &&
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" render={() => <LoginPage isAuthenticated={this.props.isAuthenticated} loginUser={this._onLogin} />} />
              <Route exact path="/registro" component={() => <RegisterPage registroUser={this._onRegistro} />} />
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
    errorMessage: state.sessionReducer.errorMessage,
    servicios: state.sessionReducer.servicios
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
