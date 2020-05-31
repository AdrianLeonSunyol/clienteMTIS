import React, { Component } from 'react'
import { ISeguimientoComponentProps } from './ISeguimientoComponentProps'
import { ISeguimientoComponentState } from './ISeguimientoComponentState'
import { Estado } from '../../models/EstadoEnum';

export default class SeguimientoComponent extends Component<ISeguimientoComponentProps, ISeguimientoComponentState> {
  constructor(props: ISeguimientoComponentProps) {
    super(props);
  }
  //esta vista es tanto pública como privada //puedo tener id o paquete
  //si me llega un id tengo que cargar el paquete
  //acceso pública (id de identificación único y privado)
  render() {
    return (
      <div>
        <div className="container">
          <div className="card">
            <div className="card-content">
              vista de seguimiento
              </div>
          </div>
        </div>
      </div>
    )
  }
}
