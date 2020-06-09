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
        <PaquetesComponentUsuario
          usuario={this.props.user}
          paquetes={this.props.paquetes}
        />
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
)(PrivatePage)