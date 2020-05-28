import { Paciente } from "./PacienteModel";
import { Medico } from "./MedicoModel";
import { IModel } from "./interfaces";

export class Centro implements IModel{
    _id: string;
    nombre: string;
    pacientes: Paciente[];
    medicos: Medico[];

    constructor(
        _id: string = "", nombre: string = "",
        pacientes: Paciente[] = [{
            _id: "",
            nombre: "",
            apellido: "",
            email: "",
            tipo: "",
            dni: "",
            centro: "",
            password: ""
        }], medicos: Medico[] = [{
            _id: "",
            nombre: "",
            apellido: "",
            email: "",
            tipo: "",
            centro: "",
            password: ""
        }] 
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.pacientes = pacientes;
        this.medicos = medicos;
    }
}