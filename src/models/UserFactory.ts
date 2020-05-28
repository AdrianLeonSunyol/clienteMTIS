import { IUser } from "./interfaces";
import { Admin } from "./AdminModel";
import { Medico } from "./MedicoModel";
import { Paciente } from "./PacienteModel";

export class UserFactory {
    public static getInstance = (target: string, user): IUser => {
        switch(target) {
            case 'admin':
                return new Admin(user._id, user.nombre, user.apellido, user.email, user.string, user.direccion, user.tipo);
            case 'medico': {
                if (user.password == undefined)
                    return new Medico(user._id, user.nombre, user.apellido, user.email, user.tipo);
                else
                return new Medico(user._id, user.nombre, user.apellido, user.email, user.tipo, user.centro, user.password);
            }
                
            default: {
                if (user.password == undefined)
                    return new Paciente(user._id, user.nombre, user.apellido, user.email, user.dni, user.tipo);
                else   
                    return new Paciente(user._id, user.nombre, user.apellido, user.email, user.dni, user.tipo, user.password, user.centro);
            }
               
        }
    }
}