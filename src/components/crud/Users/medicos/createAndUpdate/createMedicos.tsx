import React from 'react'
import { ICreateMedicoProps } from './ICreateMedicoProps';
import { ICreateMedicoState } from './ICreateMedicoState';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudCentroActions from "../../../../../redux/components/crudCentro/crudCentroActions";


import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const stackTokens: IStackTokens = { childrenGap: 20};

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 }
  };
  
  

declare var M: any;

class CreateMedicos extends React.Component<ICreateMedicoProps, ICreateMedicoState> {
    init_user = {
        _id: "",
        nombre: "",
        apellido: "",
        email: "",
        tipo: "",
        password: "",
        centro: ""
    }
    
    constructor(props: any) {
        super(props);
        this.state = {
            user: this.init_user,
            centros: [],
            options: [],
            centro: {
                key: "",
                text: ""
            }
        }
    }

    componentWillMount() {
        M.AutoInit();
        this._loadCentros();  
    }

    _loadCentros = async () => {
        await this.props.centrosActions.loadCentros();
        this.setState({
            centros: this.props.centros
        });
        this._loadOptionsState();
    }

    _loadOptionsState = () => {
        var options : IDropdownOption[] = [];
        var key: any;
       
        this.props.centros.map(centro => {
            key = {
                key: centro._id,
                text: centro.nombre
            };
            options.push(key);
        });
        this.setState({
            options: options
        });
    }

    _onCentroChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined) => {
        if (option !== undefined) {
            this.setState({
                centro: option
            });
        }
    }

    handleChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const user = {
            ...this.state.user,
            [name]: value
        }

        user.tipo = "medico";
        this.setState({
            user: user
        });
    }

    _isAmptyForm = (user: any): boolean => {
        return (user.centro === "", user.nombre === "", user.direccion === "" || user.dni === "" || user.email === "" || user.apellido === "" || user.password === "")
        ? true
        : false;
    }

    _onCreateMedico = (event: any) => {
        event.preventDefault();
        if (this._isAmptyForm(this.state.user))
            M.toast({
                html: "El formulario ha de estar completo!"
            });
        else {
            //juntamos el usuario del formulario y el centro del dropdown
            const user = {
                ...this.state.user,
                centro: this.state.centro.key
            }
            this.setState({
                user: user
            }, () => {
                this.props.onCreateUser(this.state.user);
            });
        }
    }

    _onCancelCreate = (event: any) => {
        event.preventDefault();
        this.setState({
            user: this.init_user
        })
    }

    render (): React.ReactElement {
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="card">
                    <br/>
                    <div className="card-title center">Crear Medico</div>
                    <div className="card-content center">
                        <form onSubmit={ this._onCreateMedico }>
                            <div className="row">
                                <div className="col s12 m6 input-field">
                                    <input type="text" placeholder="Name" name="nombre" onChange={this.handleChange} value={ this.state.user.nombre }/>
                                </div>
                                <div className="col s12 m6 input-field">
                                    <input type="text" placeholder="Apellidos" name="apellido" onChange={this.handleChange} value={ this.state.user.apellido }/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s12 m6 input-field">
                                    <input type="email" placeholder="email" name="email" onChange={this.handleChange} value={ this.state.user.email || "" }/>
                                </div>
                                <div className="col s12 m6 input-field">
                                    <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={ this.state.user.password }/>
                                </div>
                            </div>

                            <Stack tokens={stackTokens}>
                                <Dropdown 
                                    placeholder="Selecciona un Centro" 
                                    options={this.state.options}
                                    styles={dropdownStyles} 
                                    onChange={this._onCentroChange}
                                />
                            </Stack>
                            <br/>
                            <br/>
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

function mapStateToProps(state: any) {
    return {
        centros: state.crudCentroReducer.centros,
    };
  }
  
  /**
  * What actions do i wont on props?
  * @param dispatch 
  */
  function mapDispatchToProps(dispatch: any) {
    return {
        centrosActions: bindActionCreators(crudCentroActions, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateMedicos);