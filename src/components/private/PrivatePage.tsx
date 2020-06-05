import React from 'react'
import { IPrivatePageProps } from './IPrivatePageProps'
import PaquetesComponentUsuario from '../paquetes/PaquetesComponentUsuario';
import { Paquete } from '../../models/PaqueteModel';

export class PrivatePage extends React.Component<IPrivatePageProps, {}> {
  constructor(props: IPrivatePageProps) {
    super(props);
  }

  render(): React.ReactElement {
    return (
      <div>
        { //vista para usuario
          this.props.user.tipo == "usuario" &&
          <PaquetesComponentUsuario
            usuario={this.props.user}
            paquetes={this.props.paquetes}
          />
          //<AdminPage
          //  user={this.props.user}
          //  medico_service={this.props.servicios[1].servicio}
          //  paciente_service={this.props.servicios[2].servicio}
          //  centro_service={this.props.servicios[3].servicio}
          ///>
        }

        {
          this.props.user.tipo == "transportista" &&
          <div>vista para transportista</div>
        }
        {
          this.props.user.tipo == "repartidor" &&
          <div>vista para repartidor</div>
        }
        {
          this.props.user.tipo == "" &&
          <div>No tienes authorización para estar aquí</div>
        }
      </div>
    )
  }
}
