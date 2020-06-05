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
      fetch(`${this.HTTP_URI}/login`, {
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
          reject({
            status: 400,
            message: "Error intentando hacer login!"
          });
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