import * as React from 'react';
import './style.scss';


export interface IHomeState {
  paquete: string;
}

export class HomePage extends React.Component<{}, IHomeState> {

  constructor(props: any) {
    super(props);

    this.state = {
      paquete: ""
    };
  }

  localizarPaquete = (event: any) => {
    event.preventDefault();
    alert("tenemos en pasar a seguimiento")
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