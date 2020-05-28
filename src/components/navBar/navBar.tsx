import * as React from 'react';
import {
  NavLink
} from "react-router-dom";
import { INavBarProps } from './INavBarProps';


declare var M: any;

export class NavBar extends React.Component<INavBarProps, {}> {
  constructor(props: INavBarProps) {
    super(props);
  }

  componentDidMount(): void {
    M.AutoInit();
  }

  logout = () => {
    if (window.confirm("Seguro que deseas cerrar sessión") === true) {
      this.props.onLogout();
    }
  }

  render(): React.ReactElement {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo">
              {<NavLink to="/" exact>
                <div className="container">
                  LOGÍSTICA
              </div>
              </NavLink>}
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {
              !this.props.isAuthenticated &&
              <ul className="right hide-on-med-and-down">
                <li>{<NavLink to="/" exact>Home</NavLink>}</li>
                <li>{<NavLink to="/about" exact>About</NavLink>}</li>
                <li>{<NavLink to="/login" exact>Login</NavLink>}</li>
                <li>{<NavLink to="/registro" exact>Registro</NavLink>}</li>
              </ul>
            }
            {
              this.props.isAuthenticated &&
              <ul className="right hide-on-med-and-down">
                <li>{<NavLink to="/" exact>Home</NavLink>}</li>
                <li>{<NavLink to="/private" exact>Mi Sección</NavLink>}</li>
                <li>{<NavLink to="/about" exact>About</NavLink>}</li>

                <li>
                  <button onClick={this.logout} className="btn btn-primary">
                    Logout
                  </button>
                </li>
              </ul>
            }
          </div>
        </nav>
      </div>
    )
  }
}
