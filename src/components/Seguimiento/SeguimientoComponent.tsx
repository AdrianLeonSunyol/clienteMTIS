import React, { Component, MouseEvent } from 'react'
import { Estado } from '../../models/EstadoEnum';
import { UserFactory, IUser, Usuario } from '../../models';
import { Paquete } from '../../models/PaqueteModel';
import { IService } from '../../services';

import * as paqueteActions from "../../redux/components/crudPaquetes/crudPaqueteActions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { ApiServiceFactory } from '../../services/ApiServiceFactory';

import "./style.scss";


export interface ISeguimientoComponentProps {
  paquete;
  messagePaquete;
  estado;
  paqueteActions: {
    loadPaquete(service: IService, idPaquete: string);
    updatePaquete(service: IService, idPaquete: string, accion: string);
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
  currentUser: IUser;
  actualizar: boolean;
  nextEstado: string;
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
    "en_recogidas",
    "sin_asignar",
    "pendiente_pago",
    "cola_recogidas",
    "recogida",
    "cola_entrega_transporte",
    "en_transporte",
    "cola_entrega_reparto",
    "en_reparto",
    "entregado",
  ]

  constructor(props: ISeguimientoComponentProps) {
    super(props);

    this.state = {
      paqueteId: this.props.match.params.idPaquete,
      paquete: this.paquete_init,
      estadoVisible: false,
      progressBar: 100,
      estados: [],
      actualizar: true,
      nextEstado: "",
      currentUser: localStorage.getItem('user') ? UserFactory.getInstance(localStorage.getItem('tipo') || "", JSON.parse(localStorage.getItem('user') || "")) : new Usuario()
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
      estados: estadosToShow.filter((value, index: number, err) => (estadosToShow.length - index) <= 4),
      progressBar: progress,
      actualizar: progress == 100 ? false : true,
      nextEstado: this.estadosPaquete[indexEstado + 2]
    });
  }

  _onUpdateStatePaquete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert(`Actualizar el estado del paquete a ${this.state.nextEstado}`)
    var servicio: IService = ApiServiceFactory.createApiService("paquete");
    await this.props.paqueteActions.updatePaquete(servicio, this.state.paquete.id, this.state.nextEstado);
    M.toast({
      html: this.props.messagePaquete
    });
    if (this.props.ok) {
      this._getPaquete();
    }
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
            <br />
            <div className="card-title">Seguimiento</div>
            <div className="card-content">
              <form action="">
                <br />
                <br />
                <div className="row container">
                  <div className="container">
                    <div className="col s6 input-field col">
                      <label>ID: {`${this.state.paquete.id}`}</label>
                    </div>
                    <div className="col s6 input-field col">
                      <label>Precio: {`${this.state.paquete.precio}`}</label>
                    </div>
                    <div className="col s6 input-field col">
                      <label>Origen: {`${this.state.paquete.direccion_origen}`}</label>
                    </div>
                    <div className="col s6 input-field col">
                      <label>Destino: {`${this.state.paquete.direccion_destino}`}</label>
                    </div>
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
                      {
                        this.state.estadoVisible ? `Cerrar Estado` : `Ver estado del paquete`
                      }
                    </button>
                    <br />
                    <br />
                    {
                      this.state.estadoVisible &&
                      <div>
                        <div className="card">
                          <br />
                          <br />
                          <div className="card-content">
                            <div className="">
                              <div className="row">
                                <div className="col s12">
                                  <br />
                                  <div className="progress">
                                    <div className="determinate" id="progressBar" style={style(this.state.progressBar)}></div>
                                  </div>
                                </div>
                                <div className="col s12">
                                  <div className="row">
                                    {
                                      this.state.estados.map((estado: any): JSX.Element => {
                                        return (
                                          <div className="col s3">
                                            <div className="btn">{estado}</div>
                                          </div>
                                        );
                                      })
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <br />

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

const style = (width): React.CSSProperties => {
  return {
    width: `${width}%`
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