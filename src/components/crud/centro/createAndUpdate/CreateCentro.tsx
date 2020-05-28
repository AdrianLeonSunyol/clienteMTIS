import React, { Component } from 'react'
import { ICreateCentroProps } from './ICreateCentroProps'
import { ICreateCentroState } from './ICreateCentroState'

declare var M: any;

export class CreateCentro extends Component<ICreateCentroProps, ICreateCentroState> {
    centro_init = {
        _id: "", 
        nombre: "",
        pacientes: [{
            _id: "",
            nombre: "",
            apellido: "",
            email: "",
            tipo: "",
            dni: "",
            centro: "",
            password: ""
        }],
        medicos: [{
            _id: "",
            nombre: "",
            apellido: "",
            email: "",
            tipo: "",
            centro: "",
            password: ""
        }] 
    }
    constructor(props: ICreateCentroProps) {
        super(props);

        this.state = {
            centro: this.props.centro
        }
    }
    componentDidMount() {
        M.AutoInit();
    }

    handleChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const centro = {
            ...this.state.centro,
            [name]: value
        }

        this.setState({
            centro: centro
        });
    }

    _isAmptyForm = (centro: any): boolean => {
        return (centro.nombre === "")
        ? true
        : false;
    }

    _onCreateCentro = (event: any) => {
        event.preventDefault();
        if (this._isAmptyForm(this.state.centro))
            M.toast({
                html: "El formulario ha de estar completo!"
            });
        else {
            this.props.onCreateCentro(this.state.centro);
            this.setState({
                centro: this.centro_init
            });
        }
    }

    _onCancelCreate = (event: any) => {
        event.preventDefault();
        this.setState({
            centro: this.centro_init
        })
    }

    render (): React.ReactElement {
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="card">
                    <br/>
                    <div className="card-title center">Crear Centro</div>
                    <div className="card-content center">
                        <form onSubmit={ this._onCreateCentro }>
                            <div className="row">
                                <div className="col s12 input-field">
                                    <input type="text" placeholder="Nombre" name="nombre" onChange={this.handleChange} value={ this.state.centro.nombre }/>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col s6">
                                    <button type="submit" className="btn light-blue darken-4">Create</button>
                                </div>
                                <div className="col s6">
                                    <li className="btn light-blue darken-4"><a href="#!" onClick={ this._onCancelCreate }>Cancelar</a></li>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
