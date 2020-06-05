import React, { Component, HtmlHTMLAttributes } from 'react'
import { IPackage } from '../../models/interfaces/IPackage'
import { Usuario } from '../../models'
import { Estado } from '../../models/EstadoEnum';
import { Paquete } from '../../models/PaqueteModel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as paqueteActions from "../../redux/components/crudPaquetes/crudPaqueteActions";
import { ApiService, IService } from '../../services';
import { PaqueteService } from '../../services/PaqueteService.service';
import { Link } from 'react-router-dom';


export interface ICreatePaqueteProps {
  usuario: Usuario;
  servicios: { servicio: IService, tipo: string }[];
  presupuesto;
  messagePaquete;
  ok;
  pagado;
  identificador;
  paqueteActions: {
    generatePresupuesto(servicio: ApiService, paquete: IPackage);
    pagarPresupuesto(servicio: ApiService, presupuesto: number, tarjeta: ITarjeta);
  };
}

export interface ICreatePaqueteState {
  vistas: IFormularioState;
  paquete: Paquete;
  tarjeta: ITarjeta;
}

export interface IFormularioState {
  vistaDatosRecogida: boolean;
  vistaDatosEntrega: boolean;
  vistaDatosPaquete: boolean;
  vistaResumen: boolean;
  vistaPresupuesto: boolean;
  vistaPago: boolean;
  vistaPagoRealizado: boolean;
}

export interface ITarjeta {
  titularCuenta: string;
  numeroCuenta: string;
  fechaCaducidad: string;
  numeroSecreto: string;
}

declare var M: any;

export class CreatePaquete extends Component<ICreatePaqueteProps, ICreatePaqueteState> {
  paquete_init = {
    id: "",
    usuario_id: this.props.usuario.id,
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

  tarjeta_init = {
    titularCuenta: "",
    numeroCuenta: "",
    fechaCaducidad: "",
    numeroSecreto: ""
  }

  constructor(props: ICreatePaqueteProps) {
    super(props);

    this.state = {
      paquete: this.paquete_init,
      vistas: {
        vistaDatosRecogida: true,
        vistaDatosPaquete: false,
        vistaDatosEntrega: false,
        vistaResumen: false,
        vistaPresupuesto: false,
        vistaPago: false,
        vistaPagoRealizado: false
      },
      tarjeta: this.tarjeta_init
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const paquete = {
      ...this.state.paquete,
      [name]: value
    }

    this.setState({
      paquete: paquete
    });
  }

  handleTarjetaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const tarjeta = {
      ...this.state.tarjeta,
      [name]: value
    }

    this.setState({
      tarjeta: tarjeta
    });
  }

  _onCreatePaqueteToProcess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.checkFromsValue()) {
      this.setState({
        vistas: {
          vistaDatosEntrega: false,
          vistaDatosRecogida: false,
          vistaDatosPaquete: false,
          vistaResumen: true,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    }
  }

  checkFromsValue = (): boolean => {
    var response: boolean = true;
    if (this.state.vistas.vistaDatosRecogida) {
      if (
        this.state.paquete.origen === "" ||
        this.state.paquete.provincia_origen === "" ||
        this.state.paquete.direccion_origen === ""
      ) {
        M.toast({
          html: "Por favor, introduce los datos requeridos!"
        });
        response = false;
      }
    } else if (this.state.vistas.vistaDatosEntrega) {
      if (
        this.state.paquete.destino === "" ||
        this.state.paquete.provincia_destino === "" ||
        this.state.paquete.direccion_destino === ""
      ) {
        M.toast({
          html: "Por favor, introduce los datos requeridos!"
        });
        response = false;
      }
    } else if (this.state.vistas.vistaDatosPaquete) {
      if (
        this.state.paquete.alto === 0 ||
        this.state.paquete.ancho === 0 ||
        this.state.paquete.profundo === 0 ||
        this.state.paquete.peso === 0
      ) {
        M.toast({
          html: "Por favor, introduce los datos requeridos!"
        });
        response = false;
      }
    } else {
      if (
        this.state.tarjeta.titularCuenta === "" ||
        this.state.tarjeta.numeroCuenta === "" ||
        this.state.tarjeta.fechaCaducidad === "" ||
        this.state.tarjeta.numeroSecreto === ""
      ) {
        M.toast({
          html: "Por favor, introduce los datos requeridos!"
        });
        response = false;
      }
    }

    return response;
  }

  _onNextDatosRecogida = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.checkFromsValue()) {
      this.setState({
        vistas: {
          vistaDatosRecogida: false,
          vistaDatosEntrega: true,
          vistaDatosPaquete: false,
          vistaResumen: false,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      });
    }
  }

  _onNextDatosEntrega = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.checkFromsValue()) {
      if (this.state.paquete.direccion_origen === this.state.paquete.direccion_destino) {
        M.toast({
          html: "La dirección de destino no puede ser igual que la del origen"
        });
        const paquete = {
          ...this.state.paquete,
          direccion_destino: ""
        }
        this.setState({
          paquete: paquete
        });
      } else {
        this.setState({
          vistas: {
            vistaDatosRecogida: false,
            vistaDatosEntrega: false,
            vistaDatosPaquete: true,
            vistaResumen: false,
            vistaPresupuesto: false,
            vistaPago: false,
            vistaPagoRealizado: false
          }
        });
      }
    }
  }

  _onNextGeneratePresupuesto = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.paqueteActions.generatePresupuesto(
      this.props.servicios[1].servicio as PaqueteService,
      this.state.paquete
    )
    this.setState({
      vistas: {
        vistaDatosRecogida: false,
        vistaDatosEntrega: false,
        vistaDatosPaquete: false,
        vistaResumen: false,
        vistaPresupuesto: true,
        vistaPago: false,
        vistaPagoRealizado: false
      }
    });
  }

  _onPagarPresupuesto = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      vistas: {
        vistaDatosRecogida: false,
        vistaDatosEntrega: false,
        vistaDatosPaquete: false,
        vistaResumen: false,
        vistaPresupuesto: false,
        vistaPago: true,
        vistaPagoRealizado: false
      }
    })
  }

  _onCancelForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    alert("Aquí debería de salir un confirm y a poder ser un modal, bonito");
    this.setState({
      vistas: {
        vistaDatosRecogida: true,
        vistaDatosEntrega: false,
        vistaDatosPaquete: false,
        vistaResumen: false,
        vistaPresupuesto: false,
        vistaPago: false,
        vistaPagoRealizado: false
      },
      paquete: this.paquete_init
    });
  }

  _onPreviousForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (this.state.vistas.vistaDatosEntrega) {
      this.setState({
        vistas: {
          vistaDatosRecogida: true,
          vistaDatosEntrega: false,
          vistaDatosPaquete: false,
          vistaResumen: false,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    } else if (this.state.vistas.vistaDatosRecogida) {
      this.setState({
        vistas: {
          vistaDatosEntrega: true,
          vistaDatosRecogida: false,
          vistaDatosPaquete: false,
          vistaResumen: false,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    } else if (this.state.vistas.vistaDatosPaquete) {
      this.setState({
        vistas: {
          vistaDatosEntrega: false,
          vistaDatosRecogida: true,
          vistaDatosPaquete: false,
          vistaResumen: false,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    } else if (this.state.vistas.vistaResumen) {
      this.setState({
        vistas: {
          vistaDatosEntrega: false,
          vistaDatosRecogida: false,
          vistaDatosPaquete: true,
          vistaResumen: false,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    } else if (this.state.vistas.vistaPresupuesto) {
      this.setState({
        vistas: {
          vistaDatosEntrega: false,
          vistaDatosRecogida: false,
          vistaDatosPaquete: true,
          vistaResumen: false,
          vistaPresupuesto: false,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    } else {
      this.setState({
        vistas: {
          vistaDatosEntrega: false,
          vistaDatosRecogida: false,
          vistaDatosPaquete: false,
          vistaResumen: false,
          vistaPresupuesto: true,
          vistaPago: false,
          vistaPagoRealizado: false
        }
      })
    }
  }

  _onPagar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.checkFromsValue()) {
      await this.props.paqueteActions.pagarPresupuesto(
        this.props.servicios[1].servicio as ApiService,
        this.props.presupuesto,
        this.state.tarjeta
      );

      if (this.props.pagado) {
        M.toast({
          html: this.props.messagePaquete
        });
        this.setState({
          vistas: {
            vistaDatosEntrega: false,
            vistaDatosRecogida: false,
            vistaDatosPaquete: false,
            vistaResumen: false,
            vistaPresupuesto: false,
            vistaPago: false,
            vistaPagoRealizado: true
          },
          paquete: this.paquete_init,
          tarjeta: this.tarjeta_init
        });
      } else {
        M.toast({
          html: "El pago no se ha podido realizar correctamente"
        });
        this.setState({
          vistas: {
            vistaDatosEntrega: false,
            vistaDatosRecogida: false,
            vistaDatosPaquete: false,
            vistaResumen: false,
            vistaPresupuesto: true,
            vistaPago: false,
            vistaPagoRealizado: false
          }
        });
      }
    }
  }

  render() {
    return (
      <div>
        {
          (this.state.vistas.vistaDatosRecogida) &&
          <div className="container">
            <br />
            <br />
            <div className="container">
              <div className="card">
                <br />
                <div className="card-title">
                  Datos de Recogida
              </div>
                <div className="card-content">
                  <form onSubmit={this._onNextDatosRecogida}>
                    <div className="row">
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Localidad de recogida" name="origen" onChange={this.handleChange} value={this.state.paquete.origen} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Provincia de recogida" name="provincia_origen" onChange={this.handleChange} value={this.state.paquete.provincia_origen} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Dirección de recogida" name="direccion_origen" onChange={this.handleChange} value={this.state.paquete.direccion_origen} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s6">
                        <button className="btn light-blue darken-4" onClick={this._onCancelForm}>Cancelar</button>
                      </div>
                      <div className="col s6">
                        <button type="submit" className="btn light-blue darken-4">Siguiente</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        {
          (this.state.vistas.vistaDatosEntrega) &&
          <div className="container">
            <br />
            <br />
            <div className="container">
              <div className="card">
                <br />
                <div className="card-title">
                  Datos de Entrega
              </div>
                <div className="card-content">
                  <form onSubmit={this._onNextDatosEntrega}>
                    <div className="row">
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Localidad de entrega" name="destino" onChange={this.handleChange} value={this.state.paquete.destino} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Provincia de entrega" name="provincia_destino" onChange={this.handleChange} value={this.state.paquete.provincia_destino} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Dirección de entrega" name="direccion_destino" onChange={this.handleChange} value={this.state.paquete.direccion_destino} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s4">
                        <button className="btn light-blue darken-4" onClick={this._onPreviousForm}>Anterior</button>
                      </div>
                      <div className="col s4">
                        <button className="btn light-blue darken-4" onClick={this._onCancelForm}>Cancelar</button>
                      </div>
                      <div className="col s4">
                        <button type="submit" className="btn light-blue darken-4">Siguiente</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        {
          (this.state.vistas.vistaDatosPaquete) &&
          <div className="container">
            <br />
            <br />
            <div className="container">
              <div className="card">
                <br />
                <div className="card-title">
                  Datos de Paquete
              </div>
                <div className="card-content">
                  <form onSubmit={this._onCreatePaqueteToProcess}>
                    <div className="row">
                      <div className="col s12 input-field">
                        <input type="number" placeholder="Altura (cm)" name="alto" onChange={this.handleChange} value={this.state.paquete.alto || ""} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="number" placeholder="Ancho (cm)" name="ancho" onChange={this.handleChange} value={this.state.paquete.ancho || ""} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="number" placeholder="Profundida (cm)" name="profundo" onChange={this.handleChange} value={this.state.paquete.profundo || ""} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="number" placeholder="Peso (kg)" name="peso" onChange={this.handleChange} value={this.state.paquete.peso || ""} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s4">
                        <button className="btn light-blue darken-4" onClick={this._onPreviousForm}>Anterior</button>
                      </div>
                      <div className="col s4">
                        <button className="btn light-blue darken-4" onClick={this._onCancelForm}>Cancelar</button>
                      </div>
                      <div className="col s4">
                        <button type="submit" className="btn light-blue darken-4">Siguiente</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        {
          (this.state.vistas.vistaResumen || this.state.vistas.vistaPresupuesto) &&
          <div className="container">
            <br />
            <br />
            <div className="container">
              <div className="card">
                <br />
                <div className="card-title">
                  Resumen de Orden
              </div>
                <div className="card-content">
                  <form onSubmit={this._onPagarPresupuesto}>
                    <div className="row">
                      <header className="center">Datos de Recogida</header>
                      <div className="col s12 input-field">
                        <label>Localidad de recogida: {`${this.state.paquete.origen}`}</label>
                      </div>
                      <div className="col s12 input-field">
                        <label>Provincia de recogida: {`${this.state.paquete.provincia_origen}`}</label>
                      </div>
                      <div className="col s12 input-field">
                        <label>Dirección de recogida: {`${this.state.paquete.direccion_origen}`}</label>
                      </div>
                    </div>
                    <br />
                    <hr />
                    <div className="row">
                      <header className="center">Datos de Entrega</header>

                      <div className="col s12 input-field">
                        <label>Localidad de entrega: {`${this.state.paquete.destino}`}</label>
                      </div>
                      <div className="col s12 input-field">
                        <label>Provincia de entrega: {`${this.state.paquete.provincia_destino}`}</label>
                      </div>
                      <div className="col s12 input-field">
                        <label>Dirección de entrega: {`${this.state.paquete.direccion_destino}`}</label>
                      </div>
                    </div>
                    <br />
                    <hr />
                    <div className="row">
                      <header className="center">Detalles del paquete</header>
                      <div className="col s6 input-field">
                        <label>Alto (cm): {`${this.state.paquete.alto}`}</label>
                      </div>
                      <div className="col s6 input-field">
                        <label>Ancho (cm): {`${this.state.paquete.ancho}`}</label>
                      </div>
                      <div className="col s6 input-field">
                        <label>Profundidad (cm): {`${this.state.paquete.profundo}`}</label>
                      </div>
                      <div className="col s6 input-field">
                        <label>Peso (kg): {`${this.state.paquete.peso}`}</label>
                      </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <br />

                    {
                      (this.state.vistas.vistaPresupuesto) &&
                      <div className="header">
                        <div className="container">
                          <div className="row">
                            <div className="col s12">
                              <h4>PRESUPUESTO: {`${this.props.presupuesto}`}$</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <div className="row">
                      <div className="col s4">
                        <button className="btn light-blue darken-4" onClick={this._onPreviousForm}>Anterior</button>
                      </div>
                      <div className="col s4">
                        <button className="btn light-blue darken-4" onClick={this._onCancelForm}>Cancelar</button>
                      </div>
                      {
                        (this.state.vistas.vistaResumen) &&
                        <div className="col s4">
                          <button className="btn light-blue darken-4" onClick={this._onNextGeneratePresupuesto}>Calcular Presupuesto</button>
                        </div>
                      }
                      {
                        (this.state.vistas.vistaPresupuesto) &&
                        <div className="col s4">
                          <button type="submit" className="btn light-blue darken-4">Proceder con el Pago</button>
                        </div>
                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        {
          (this.state.vistas.vistaPago) &&
          <div className="container">
            <br />
            <br />
            <div className="container">
              <div className="card">
                <br />
                <div className="card-title">
                  Pago
              </div>
                <div className="card-content">
                  <form onSubmit={this._onPagar}>
                    <div className="row">
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Titular" name="titularCuenta" onChange={this.handleTarjetaChange} value={this.state.tarjeta.titularCuenta} />
                      </div>
                      <div className="col s12 input-field">
                        <input type="text" placeholder="Número de cuenta" name="numeroCuenta" onChange={this.handleTarjetaChange} value={this.state.tarjeta.numeroCuenta} />
                      </div>
                      <div className="row">
                        <div className="col s6 input-field">
                          <input type="text" placeholder="Fecha de Caducidad" name="fechaCaducidad" onChange={this.handleTarjetaChange} value={this.state.tarjeta.fechaCaducidad} />
                        </div>
                        <div className="col s6 input-field">
                          <input type="text" placeholder="Número secreto" name="numeroSecreto" onChange={this.handleTarjetaChange} value={this.state.tarjeta.numeroSecreto} />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col s6">
                        <button className="btn light-blue darken-4" onClick={this._onCancelForm}>Cancelar</button>
                      </div>
                      <div className="col s6">
                        <button type="submit" className="btn light-blue darken-4">Pagar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        {
          (this.state.vistas.vistaPagoRealizado) &&
          <div className="container">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container">
              <div className="header">
                El pago se ha realizado correctamente
              </div>
              <p>Hemos podido realizar el pago correctamente y ya estamos procesando el pedido. En breves minutos le notificaremos
              sobre la recogida del paquete para su posterior traslado.
              Utilize el siguiente Identificador
              <a><Link to={`/seguimiento/${this.props.identificador}`}> {`${this.props.identificador}`} </Link></a>
              para localizar su paquete en cualquier momento así como el estado en el que se encuetre. Además hemos enviado un recibo del pago a su
              correo electrónico. Pongase en contacto con nosotros si le surge cualquier duda acerca del proceso
              de entrega.

              Un saludo y muchas gracias.
              </p>
            </div>
          </div>
        }
      </div>
    )
  }
}


function mapStateToProps(state: any) {
  return {
    presupuesto: state.crudPaqueteReducer.presupuesto,
    messagePaquete: state.crudPaqueteReducer.messagePaquete,
    ok: state.crudPaqueteReducer.ok,
    pagado: state.crudPaqueteReducer.pagado,
    identificador: state.crudPaqueteReducer.identificador
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    paqueteActions: bindActionCreators(paqueteActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePaquete)
