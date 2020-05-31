import { IUser } from "./interfaces";
import { Admin } from "./AdminModel";
import { Usuario } from "./UsuarioModel";

export class UserFactory {
  public static getInstance = (target: string, user): IUser => {
    switch (target) {
      case 'admin':
        return new Admin(
          user._id,
          user.nombre,
          user.apellido,
          user.email,
          user.string,
          user.direccion,
          user.tipo
        );
      case 'usuario': {
        if (user.password == undefined)
          return new Usuario(
            user._id,
            user.nombre,
            user.apellido,
            user.email,
            user.tipo,
            user.paquetes,
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
          );
        else
          return new Usuario(
            user._id,
            user.nombre,
            user.apellido,
            user.email,
            user.tipo,
            user.paquetes,
            user.password,
            user.direccion,
            user.fechaNacimiento,
            user.provincia,
            user.cp,
            user.localidad,
          );
      }

      case 'repartidor': {
        console.log("repartidor");
        return new Usuario();
      }

      case 'transportista': {
        console.log("transportista");
        return new Usuario();
      }

      default: {
        console.log("usuario sin registrar");
        return new Usuario();
      }
    }
  }
}