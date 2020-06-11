
import React, { Component } from 'react'
import { IPaqueteComponentProps } from './IPaqueteComponentProps'
import { IPaqueteComponentState } from './IPaqueteComponentState'
import { Paquete } from '../../models/PaqueteModel';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as paqueteActions from "../../redux/components/crudPaquetes/crudPaqueteActions";
import { connect } from 'react-redux';
import { IService, ApiService } from '../../services';
import { ApiServiceFactory } from '../../services/ApiServiceFactory';
import { IPackage } from '../../models/interfaces/IPackage';
import { Estado } from '../../models/EstadoEnum';

declare var M: any;

class PaquetesComponentUsuario extends Component<IPaqueteComponentProps, IPaqueteComponentState> {
  constructor(props: IPaqueteComponentProps) {
    super(props);
    this.state = {
      usuario: this.props.usuario,
      paquetes: this.props.paquetes
    };
  }

  _onUpdateStatePaquete = async (event: React.MouseEvent<HTMLButtonElement>, paquete: IPackage) => {
    event.preventDefault();
    var servicio: IService = ApiServiceFactory.createApiService("paquete");

    await this.props.paqueteActions.updatePaquete(servicio, paquete.id, "enRecogerRepartidor");

    if (this.props.ok) {
      M.toast({
        html: "El paquete se ha actualizado y se procesará en central, espere por futuras notificaciones"
      });
      var indexof = this.state.paquetes.map(p => { return p.id }).indexOf(paquete.id);
      var paquetes = this.state.paquetes;
      paquetes.splice(indexof, 1);
      this.setState({
        paquetes: paquetes
      });
    }
  }

  _onUpdateStatePaqueteReparto = async (event: React.MouseEvent<HTMLButtonElement>, paquete: IPackage) => {
    event.preventDefault();
    var servicio: IService = ApiServiceFactory.createApiService("paquete");

    await this.props.paqueteActions.updatePaquete(servicio, paquete.id, "enRepartoRepartidor");

    if (this.props.ok) {
      M.toast({
        html: "El paquete se ha actualizado y se procesará en central, espere por futuras notificaciones"
      });
      var indexof = this.state.paquetes.map(p => { return p.id }).indexOf(paquete.id);
      var paquetes = this.state.paquetes;
      paquetes.splice(indexof, 1);
      this.setState({
        paquetes: paquetes
      });
    }
  }

  _onUpdateStatePaqueteTransporte = async (event: React.MouseEvent<HTMLButtonElement>, paquete: IPackage) => {
    event.preventDefault();
    var servicio: IService = ApiServiceFactory.createApiService("paquete");

    await this.props.paqueteActions.updatePaquete(servicio, paquete.id, "enTransporteTransportista");

    if (this.props.ok) {
      M.toast({
        html: "El paquete se ha actualizado y se procesará en central, espere por futuras notificaciones"
      });
      var indexof = this.state.paquetes.map(p => { return p.id }).indexOf(paquete.id);
      var paquetes = this.state.paquetes;
      paquetes.splice(indexof, 1);
      this.setState({
        paquetes: paquetes
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <br />
            <br />
            <br />
            <div className="card">
              <div className="card-content">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Precio</th>
                      <th>Destino</th>
                      <th>Estado</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.paquetes.map((paquete: Paquete) => {
                        return (
                          <tr>
                            <td>{paquete.id}</td>
                            <td>{paquete.precio}</td>
                            <td>{paquete.direccion_destino}</td>
                            <td>{paquete.estado}</td>
                            <div className="row">
                              <div className="col s6">
                                <button className="btn #283593 indigo darken-3">
                                  <Link to={`/seguimiento/${paquete.id}`}>ver detalle</Link>
                                </button>
                              </div>
                              <div className="col6">
                                {
                                  (this.props.usuario.tipo == "repartidor") &&
                                  <div className="row">
                                    <div className="row">
                                      <div className="col s12">
                                        {
                                          (paquete.estado == "en_recogidas") &&
                                          <button className="btn #d81b60 pink darken-1" onClick={(event: any) => { this._onUpdateStatePaquete(event, paquete) }}>Recoger</button>
                                        }
                                        {
                                          (paquete.estado == "en_reparto") &&
                                          <button className="btn #d81b60 pink darken-1" onClick={(event: any) => { this._onUpdateStatePaqueteReparto(event, paquete) }}>Entregar</button>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                              <div>
                                {
                                  (this.props.usuario.tipo == "transportista") &&
                                  <div className="">
                                    <div className="row">
                                      <div className="row">
                                        <div className="col s12">
                                          {
                                            (paquete.estado == "en_transporte") &&
                                            <button className="btn #d81b60 pink darken-1" onClick={(event: any) => { this._onUpdateStatePaqueteTransporte(event, paquete) }}>Entregar</button>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }
}

function mapStateToProps(state: any) {
  return {
    messagePaquete: state.crudPaqueteReducer.messagePaquete,
    ok: state.crudPaqueteReducer.ok,
    paquete: state.crudPaqueteReducer.paquete
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    paqueteActions: bindActionCreators(paqueteActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaquetesComponentUsuario)
