import React, { Component } from 'react'
import { Estado } from '../../models/EstadoEnum';
import { UserFactory } from '../../models';
import { Paquete } from '../../models/PaqueteModel';
import { IService } from '../../services';

import * as paqueteActions from "../../redux/components/crudPaquetes/crudPaqueteActions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { ApiServiceFactory } from '../../services/ApiServiceFactory';



export interface ISeguimientoComponentProps {
  paquete;
  messagePaquete;
  estado;
  paqueteActions: {
    loadPaquete(service: IService, idPaquete: string);
  }
  match: any;
  ok;
}

export interface ISeguimientoComponentState {
  paqueteId: string;
  paquete: Paquete;
  estadoVisible: boolean;
  progressBar: number;
  estados: string[];
}

declare var M: any;

class SeguimientoComponent extends Component<ISeguimientoComponentProps, ISeguimientoComponentState> {
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

  estadosPaquete = [
    "sin_asignar",
    "cola_recogidas",
    "recogida",
    "cola_entrega_transporte",
    "en_transporte",
    "cola_entrega_reparto",
    "en_reparto",
    "entregado",
    "pendiente_pago"
  ]

  constructor(props: ISeguimientoComponentProps) {
    super(props);

    this.state = {
      paqueteId: this.props.match.params.idPaquete,
      paquete: this.paquete_init,
      estadoVisible: false,
      progressBar: 1000,
      estados: []
    }
  }

  componentWillMount() {
    this._getPaquete();
  }

  _getPaquete = async () => {
    var servicio: IService = ApiServiceFactory.createApiService("paquete");
    await this.props.paqueteActions.loadPaquete(servicio, this.state.paqueteId);
    this.setState({
      paquete: this.props.paquete
    });
    M.toast({
      html: this.props.messagePaquete
    });

    this._getProgressPackage();
  }

  _getProgressPackage = () => {
    var indexEstado = this.estadosPaquete.indexOf(this.state.paquete.estado);
    var estadosToShow = this.estadosPaquete.slice(0, indexEstado + 1);

    var lengthState = this.estadosPaquete.length;
    var lengthCurrentState = estadosToShow.length;
    var progress = lengthCurrentState * this.state.progressBar / lengthState;

    this.setState({
      estados: estadosToShow,
      progressBar: progress
    });
  }

  //esta vista es tanto pública como privada //puedo tener id o paquete
  //si me llega un id tengo que cargar el paquete
  //acceso pública (id de identificación único y privado)
  render() {
    return (
      <div>
        <div className="container">
          <br />
          <br />
          <div className="card">
            <div className="card-content">
              <form action="">
                <br />
                <br />
                <div className="row">
                  <div className="col s4 input-field col">
                    <label>ID: {`${this.state.paquete.origen}`}</label>
                  </div>
                  <div className="col s4 input-field col">
                    <label>Precio: {`${this.state.paquete.origen}`}</label>
                  </div>
                  <div className="col s4 input-field col">
                    <label>Destino: {`${this.state.paquete.origen}`}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s4 input-field col">
                    <label>Localiación actual: {`${this.state.paquete.origen}`}</label>
                  </div>
                  <div className="col s4 input-field col">
                    <label>Origen: {`${this.state.paquete.origen}`}</label>
                  </div>
                  <div className="col s4 input-field col">
                    <label>Destino: {`${this.state.paquete.destino}`}</label>
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col s12">
                    <button className="btn"
                      onClick={
                        (event: any) => {
                          event.preventDefault();
                          this.setState({
                            estadoVisible: this.state.estadoVisible ? false : true
                          });
                        }}
                    >
                      Ver Estado
                    </button>
                    <br />
                    <br />
                    {
                      this.state.estadoVisible &&
                      <div>
                        <div className="card">
                          <div className="card-content">
                            <div className="progress">
                              <div className="determinate" style={{ width: this.state.progressBar }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="row">

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    paquete: state.crudPaqueteReducer.paquete,
    messagePaquete: state.crudPaqueteReducer.messagePaquete,
    estado: state.crudPaqueteReducer.estado,
    ok: state.crudPaqueteReducer.ok
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
)(SeguimientoComponent);