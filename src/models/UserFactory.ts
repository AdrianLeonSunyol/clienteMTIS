import { IUser } from "./interfaces";
import { Admin } from "./AdminModel";
import { Usuario } from "./UsuarioModel";

export class UserFactory {
  public static getInstance = (target: string, user): IUser => {
    switch (target) {
      case 'admin':
        return new Admin(user._id, user.nombre, user.apellido, user.email, user.string, user.direccion, user.tipo);

      default: {
        if (user.password == undefined)
          return new Usuario(user._id, user.nombre, user.apellido, user.email, user.dni, user.tipo, user.direccion);
        else
          return new Usuario(user._id, user.nombre, user.apellido, user.email, user.dni, user.tipo, user.password, user.centro, user.direccion);
      }
    }
  }
}