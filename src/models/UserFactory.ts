import { IUser } from "./interfaces";
import { Admin } from "./AdminModel";
import { Usuario } from "./UsuarioModel";

export class UserFactory {
  public static getInstance = (target: string, user: IUser): IUser => {
    switch (target) {
      case 'admin':
        return new Admin(
          user.id,
          user.nombre,
          user.apellidos,
          user.email,
          user.direccion,
          user.tipo,
          user.password,
          user.localidad,
          user.provincia,
          user.fechaNacimiento,
          user.cp,
          user.disponible
        );
      case 'usuario': {
        if (user.password === undefined) {
          return new Usuario(
            user.id,
            user.nombre,
            user.apellidos,
            user.email,
            user.tipo,
            "",
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
            user.disponible
          );
        } else {
          return new Usuario(
            user.id,
            user.nombre,
            user.apellidos,
            user.email,
            user.tipo,
            user.password,
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
            user.disponible
          );
        }
      }

      case 'repartidor': {
        if (user.password === undefined) {
          return new Usuario(
            user.id,
            user.nombre,
            user.apellidos,
            user.email,
            "repartidor",
            "",
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
            user.disponible
          );
        } else {
          return new Usuario(
            user.id,
            user.nombre,
            user.apellidos,
            user.email,
            "repartidor",
            user.password,
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
            user.disponible
          );
        }
      }

      case 'transportista': {
        if (user.password === undefined) {
          return new Usuario(
            user.id,
            user.nombre,
            user.apellidos,
            user.email,
            "transportista",
            "",
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
            user.disponible
          );
        } else {
          return new Usuario(
            user.id,
            user.nombre,
            user.apellidos,
            user.email,
            "transportista",
            user.password,
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
            user.disponible
          );
        }
      }

      default: {
        console.log("usuario sin registrar");
        return new Usuario();
      }
    }
  }
}