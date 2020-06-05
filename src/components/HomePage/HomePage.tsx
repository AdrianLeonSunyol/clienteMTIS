import * as React from 'react';
import './style.scss';
import { PaqueteOperationCallback } from '../../models';
import { NavLink, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Paquete } from '../../models/PaqueteModel';
import { Estado } from '../../models/EstadoEnum';
import SeguimientoComponent from '../Seguimiento/SeguimientoComponent';
import { IService } from '../../services';
import { ApiServiceFactory } from '../../services/ApiServiceFactory';
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as paqueteActions from "../../redux/components/crudPaquetes/crudPaqueteActions";


export interface IHomeState {
  paqueteId: string;
}

export interface IHomeProps {

}

declare var M: any;


export class HomePage extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      paqueteId: "",
    };
  }

  localizarPaquete = async (event: any) => {
    event.preventDefault();
    if (this.state.paqueteId == "") {
      M.toast({
        html: "Por favor, introduce un ID de seguimiento válido!"
      });
    }
  }

  _onHandleChange = (event: any) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      paqueteId: value
    });
  }

  render(): React.ReactElement {
    return (
      <div id="image">
        <div className="row" id="search">
          <div className="s12">
            <div>
              <form onSubmit={this.localizarPaquete}>
                <div className="row">
                  <div className="input-field col s8">
                    <input id="seguimiento" type="text" className="validate" onChange={this._onHandleChange} />
                    <label htmlFor="seguimiento">ID Seguimiento</label>
                  </div>
                  <br />
                  <div className="col s4 center">
                    <button type="submit" className="btn waves-effect waves-light #1a237e indigo darken-4">
                      <Link to={`/seguimiento/${this.state.paqueteId}`}>Buscar</Link>
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
    );
  }
}
