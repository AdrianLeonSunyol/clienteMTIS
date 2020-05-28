import * as React from 'react';
import {
  ILoginPageState,
  ILoginPageProps
} from ".";
declare var M: any;

export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = {
      session: {
        email: "",
        password: ""
      }
    };
  }

  _isAmptyForm = (login: { email: String, password: String }): boolean => {
    return (login.email === "" || login.password === "")
      ? true
      : false;
  }

  _onLoginUser = (event: any) => {
    event.preventDefault();
    if (!this._isAmptyForm(this.state.session)) {
      this.props.loginUser(this.state.session);
    }
    else {
      M.toast({
        html: "El formulario ha de estar completo"
      });
    }
  }

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const login = {
      ...this.state.session,
      [name]: value
    }

    this.setState({
      session: login
    });
  }


  render(): React.ReactElement {
    return (
      <div id="image">
        {!this.props.isAuthenticated &&
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
              <div className="row container container center">
                <div className="card">
                  <br />
                  <div className="card-title">Login</div>
                  <br />
                  <div className="card-content">
                    <div className="row">
                      <form className="col s12" onSubmit={this._onLoginUser}>
                        <div className="row">
                          <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input name="email" id="email" type="email" className="validate" onChange={this.handleChange} />
                            <label htmlFor="email">Email</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input name="password" id="password" type="password" className="validate" onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s6">
                            <p>
                              <label>
                                <input type="checkbox" defaultChecked={true} />
                                <span>Remember me</span>
                              </label>
                            </p>
                          </div>
                          <div className="col s6">
                            <button className="btn waves-effect waves-light">Log In
                                                    <i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {
          this.props.isAuthenticated &&
          <div></div>
        }
      </div>
    )
  }
}