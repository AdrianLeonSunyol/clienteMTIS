import React from 'react'
import {
  IAdminPageProps,
  IAdminPageState
} from '.'
import {
  CreateCentro,
  ListUsers,
  ListCentroComponent,
  //CreateMedicos
} from '../crud';

import CreateMedicos from "../crud/Users/medicos/createAndUpdate/createMedicos";
import CreatePaciente from "../crud/Users/pacientes/createAndUpdate/createPaciente";


import { UserFactory, Medico, Usuario, Centro, Admin } from '../../models';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudMedicoActions from "../../redux/components/crudMedico/crudMedicoActions";
import * as crudCentroActions from "../../redux/components/crudCentro/crudCentroActions";
import * as crudPacienteActions from "../../redux/components/crudPaciente/crudPacienteActions";

declare var M: any;

class AdminPage extends React.Component<IAdminPageProps, IAdminPageState> {
  init_paciente: Usuario = {
    _id: "",
    nombre: "",
    apellido: "",
    email: "",
    tipo: "",
    dni: "",
    password: "",
    direccion: ""
  }
  init_medico: Medico = {
    _id: "",
    nombre: "",
    apellido: "",
    email: "",
    tipo: "",
    centro: "",
    password: "",
    direccion: ""
  }

  init_centro: Centro = {
    _id: "",
    medicos: [this.init_medico],
    pacientes: [this.init_paciente],
    nombre: ""
  }

  constructor(props: IAdminPageProps) {
    super(props);
    this._loadData();
    this.state = {
      medicos: this.props.medicos,
      pacientes: this.props.pacientes,
      centros: this.props.centros,
      usuario: this.init_medico,
      centro: this.init_centro,
      loadCentros: false
    }
  }

  /*componentWillMount() {
      this._loadData();
  }*/

  _loadData = async () => {
    this._loadCentros();
    this._loadMedicos();
    this._loadPacientes();
  }

  _loadPacientes = async () => {
    await this.props.pacientesActions.loadPacientes();
    this.setState({
      pacientes: this.props.pacientes
    });
  }

  _loadMedicos = async () => {
    await this.props.medicosActions.loadMedicos();
    this.setState({
      medicos: this.props.medicos
    });
  }

  _loadCentros = async () => {
    await this.props.centrosActions.loadCentros();
    this.setState({
      centros: this.props.centros
    });
  }

  //medicos
  _onCreateMedico = async (user: any) => {
    await this.props.medicosActions.createMedico(UserFactory.getInstance("medico", user));
    M.toast({
      html: this.props.message_medico
    });
    this._loadMedicos();
  }

  _onDeleteMedico = async user => {
    await this.props.medicosActions.deleteMedico(user._id);
    M.toast({
      html: this.props.message_medico
    });
    this._loadMedicos();
  }

  _onDeleteAllMedicos = async () => {
    if (this.props.medicos.length == 0) {
      M.toast({
        html: 'No hay usuarios para borrar'
      })
    } else {
      if (window.confirm("Estas seguro de querer borrar todos los medicos?") === true) {
        await this.props.medicosActions.deleteAllMedicos();
        M.toast({
          html: this.props.message_medico
        });
        this._loadMedicos();
      }
    }
  }

  //comun
  _onEditMedico = async (user) => {
    this.setState({
      usuario: user
    });
  }

  //pacientes
  _onCreatePaciente = async (paciente) => {
    await this.props.pacientesActions.createPaciente(UserFactory.getInstance("paciente", paciente));
    M.toast({
      html: this.props.message_paciente
    });
    this._loadPacientes();
  }

  _onEditPaciente = async (paciente) => {
    console.log("vamos a editar un paciente");
  }

  _onDeletePaciente = async (paciente) => {
    await this.props.pacientesActions.deletePaciente(paciente._id);
    M.toast({
      html: this.props.message_paciente
    });
    this._loadPacientes();
  }

  _onDeleteAllPacientes = async () => {
    if (this.props.pacientes.length == 0) {
      M.toast({
        html: 'No hay pacientes para borrar'
      })
    } else {
      if (window.confirm("Estas seguro de querer borrar todos los pacientes?") === true) {
        await this.props.pacientesActions.deleteAllPacientes();
        M.toast({
          html: this.props.message_paciente
        });
        this._loadPacientes();
      }
    }
  }

  //centros

  _onCreateCentro = async (centro) => {
    await this.props.centrosActions.createCentro(UserFactory.getInstance("centro", centro));
    M.toast({
      html: this.props.message_centro
    });
    this._loadCentros();
  }

  _onEditCentro = async (centro) => {
    console.log("vamos a editar un centro");
  }

  _onDeleteCentro = async (centro) => {
    await this.props.centrosActions.deleteCentro(centro._id);
    M.toast({
      html: this.props.message_centro
    });
    this._loadCentros();
  }

  _onDeleteAllCentros = async () => {
    if (this.props.centros.length == 0) {
      M.toast({
        html: 'No hay centros para borrar'
      })
    } else {
      if (window.confirm("Estas seguro de querer borrar todos los centros?") === true) {
        await this.props.centrosActions.deleteAllCentros();
        M.toast({
          html: this.props.message_centro
        })
        this._loadCentros();
      }
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <br />
            <br />
            <div className="header center">Medico Center</div>
            <div className="row">
              <div className="col s6">
                <CreateMedicos
                  usuario={this.state.usuario}
                  onCreateUser={this._onCreateMedico}
                />
              </div>
              <div className="col s6">
                <ListUsers
                  onRemoveUser={this._onDeleteMedico}
                  usuarios={this.state.medicos}
                  onEditUser={this._onEditMedico}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 ">
                <button className="btn" onClick={this._onDeleteAllMedicos}>Borrar Todo</button>
              </div>
            </div>
          </div>
          <div className="col s12">
            <div className="header center">Paciente Center</div>
            <div className="row">
              <div className="col s6">
                <CreatePaciente
                  usuario={this.state.usuario}
                  onCreatePaciente={this._onCreatePaciente}
                />
              </div>
              <div className="col s6">
                <ListUsers
                  onRemoveUser={this._onDeletePaciente}
                  usuarios={this.state.pacientes}
                  onEditUser={this._onEditPaciente}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 ">
                <button className="btn" onClick={this._onDeleteAllPacientes}>Borrar Todo</button>
              </div>
            </div>
          </div>
          <div className="col s12">
            <div className="header center">Centros Center</div>
            <div className="row">
              <div className="col s6">
                <CreateCentro
                  onCreateCentro={this._onCreateCentro}
                  centro={this.state.centro}
                />
              </div>
              <div className="col s6">
                <ListCentroComponent
                  centros={this.state.centros}
                  onEditCentro={this._onEditCentro}
                  onRemoveCentro={this._onDeleteCentro}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 ">
                <button className="btn" onClick={this._onDeleteAllCentros}>Borrar Todo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * What state should i expose as props?
 * @param state 
 */
function mapStateToProps(state: any) {
  return {
    medicos: state.crudMedicoReducer.medicos,
    message_medico: state.crudMedicoReducer.message,
    pacientes: state.crudPacienteReducer.pacientes,
    message_paciente: state.crudPacienteReducer.message,
    centros: state.crudCentroReducer.centros,
    message_centro: state.crudCentroReducer.message,
  };
}

/**
* What actions do i wont on props?
* @param dispatch 
*/
function mapDispatchToProps(dispatch: any) {
  return {
    medicosActions: bindActionCreators(crudMedicoActions, dispatch),
    pacientesActions: bindActionCreators(crudPacienteActions, dispatch),
    centrosActions: bindActionCreators(crudCentroActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);