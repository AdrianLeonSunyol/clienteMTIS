import { IUser, Usuario } from "../models";
import {
  handleError,
  handleResponse
} from "./api";
import { Paquete } from "../models/PaqueteModel";
import { Estado } from "../models/EstadoEnum";

/**
 * Servicio para las clases de usuario
 */

export interface ILoginResponse {
  status: number;
  message: string;
  usuario: Usuario;
  paquetes: Paquete[];
  codigo_seguridad: string;
}

export class LoginService {
  private HTTP_URI: string;

  constructor() {
    const api_host = process.env.HOSTAPI || "localhost";
    const api_port = process.env.PORTAPI || 9090;
    this.HTTP_URI = `http://${api_host}:${api_port}`;
  }

  loginUser = (email: string, password: string) => {
    return new Promise<any>((resolve, reject) => {
      /*fetch(`${this.HTTP_URI}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((response: ILoginResponse) => {
          console.log(response);
          if (response.status == 200) {
            resolve({
              status: response.status,
              message: response.message,
              paquetes: response.paquetes,
              token: response.codigo_seguridad,
              user: response.usuario,
              tipo: "usuario" //esto me lo tiene que decir response.usuario.tipo
            });
          } else {
            reject({
              status: 400,
              message: response.message
            });
          }
        })
        .catch(err => {
          reject({
            status: 400,
            message: "Error intentando hacer login!"
          });
        });*/
      resolve({
        status: 200,
        message: "Usuario logueado correctamente",
        paquetes: [
          {
            id: "1",
            usuario_id: "1",
            precio: 1,
            peso: 1,
            alto: 1,
            ancho: 1,
            profundo: 1,
            origen: "alicante",
            destino: "barcelona",
            provincia_origen: "alicante",
            provincia_destino: "barcelona",
            localizacion_actual: "alicante",
            direccion_origen: "reyes católicos",
            direccion_destino: "el raval #17",
            zona: "zona1",
            estado: Estado.ENTREGADO,
            asignado: false,
            id_repartidor: ""
          }
        ],
        token: "token",
        user: {
          id: "1",
          nombre: "adrian",
          apellidos: "leon",
          tipo: "repartidor",
          email: "adrian@gmail.com",
          fechaNacimiento: "26/07/1996",
          localidad: "Alicante",
          provincia: "Alicante",
          cp: "03003",
          direccion: "Alicante, Reyes católicos #17 piso 5ºi",
          disponible: "false"
        },
        tipo: "repartidor"
      });
    });
  }

  registroUser = (usuario: Usuario) => {
    return new Promise<any>((resolve, reject) => {
      fetch(`${this.HTTP_URI}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "nombre": usuario.nombre,
          "apellidos": usuario.apellidos,
          "email": usuario.email,
          "password": usuario.password,
          "fechaNacimiento": usuario.fechaNacimiento,
          "localidad": usuario.localidad,
          "provincia": usuario.provincia,
          "cp": usuario.cp,
          "direccion": usuario.direccion
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((response: ILoginResponse) => {
          console.log(response);
          if (response.status == 200) {
            resolve({
              status: response.status,
              message: response.message,
              paquetes: response.paquetes,
              token: response.codigo_seguridad,
              user: response.usuario,
              tipo: "usuario"
            });
          } else {
            reject({
              status: 400,
              message: response.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          reject({
            status: 400,
            message: "Error intentando hacer registro!"
          });
        });
    });
  }
}