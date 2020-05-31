import * as React from 'react';
import './style.scss';
import { PaqueteOperationCallback } from '../../models';


export interface IHomeState {
  paquete: string;
}

export interface IHomeProps {
  seguimiento: PaqueteOperationCallback;
}

declare var M: any;

export class HomePage extends React.Component<IHomeProps, IHomeState> {

  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      paquete: ""
    };
  }

  localizarPaquete = (event: any) => {
    event.preventDefault();
    if (this.state.paquete == "") {
      M.toast({
        html: "Por favor, introduce un ID de seguimiento válido!"
      });
    } else
      this.props.seguimiento(this.state.paquete)
  }

  _onHandleChange = (event: any) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      paquete: value
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
                    <button className="btn waves-effect waves-light #1a237e indigo darken-4">Buscar
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
    )
  }
}