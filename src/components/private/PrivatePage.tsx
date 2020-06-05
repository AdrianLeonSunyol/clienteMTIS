import React from 'react'
import { IPrivatePageProps } from './IPrivatePageProps'
import PaquetesComponentUsuario from '../paquetes/PaquetesComponentUsuario';
import { Paquete } from '../../models/PaqueteModel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sessionActions from "../../redux/components/session/sessionActions";

export interface IPrivateState {
}

class PrivatePage extends React.Component<IPrivatePageProps, IPrivateState> {
  constructor(props: IPrivatePageProps) {
    super(props);
    this._onLoadPropsPaquetes();
  }

  _onLoadPropsPaquetes = async () => {
    await this.props.actions.loadUser();
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

function mapStateToProps(state: any) {
  return {
    paquetes: state.sessionReducer.paquetes
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (PrivatePage)