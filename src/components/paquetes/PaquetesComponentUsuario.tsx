import React, { Component } from 'react'
import { IPaqueteComponentProps } from './IPaqueteComponentProps'
import { IPaqueteComponentState } from './IPaqueteComponentState'
import { Paquete } from '../../models/PaqueteModel';
import { verify } from 'crypto';

export default class PaquetesComponentUsuario extends Component<IPaqueteComponentProps, IPaqueteComponentState> {
  constructor(props: IPaqueteComponentProps) {
    super(props);
    this.state = {
      paquetes: this.props.usuario.paquetes
    };
  }

  _onSeguimientoPaquete = async (paquete: Paquete) => {
    this.props.seguimiento(paquete);
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
                      <th>Fecha Creación</th>
                      <th>Fecha Entrega</th>
                      <th>Destino</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.paquetes.map((paquete: Paquete) => {
                        return (
                          <tr>
                            <td>{paquete._id}</td>
                            <td>"fechaCreación"</td>
                            <td>"fecha entrega estimada"</td>
                            <td>{paquete.direccion_destino}</td>
                            <td>{paquete.estado}</td>
                            <button className="btn" onClick={() => this._onSeguimientoPaquete(paquete)}>
                              ver detalle
                         </button>
                          </tr>
                        )
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
