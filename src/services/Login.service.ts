import { IUser, Usuario } from "../models";
import {
  handleError,
  handleResponse
} from "./api";

/**
 * Servicio para las clases de usuario
 */

export class LoginService {
  private HTTP_URI: string;

  constructor() {
    const api_host = process.env.HOSTAPI || "localhost";
    const api_port = process.env.PORTAPI || 5000;
    console.log(api_host);
    console.log(api_port);
    this.HTTP_URI = `http://${api_host}:${api_port}/v1.0/login`;
  }

  loginUser = (email: string, password: string) => {
    return new Promise<any>((resolve, reject) => {
      resolve({
        status: 200,
        token: "token",
        user: {
          _id: "hola",
          nombre: "adrian",
          apellido: "leon suñol",
          email: "adrian@gmail.com",
          tipo: "admin",
          password: "adrian"
        },
        tipo: "admin",
      })
    })
    //return fetch(`${this.HTTP_URI}`, {
    //  method: 'POST',
    //  body: JSON.stringify({
    //    email: email,
    //    password: password
    //  }),
    //  headers: {
    //    'Accept': 'application/json',
    //    'Content-Type': 'application/json'
    //  }
    //})
    //  .then(handleResponse)
    //  .catch(handleError);//handleError);
  }

  registroUser = (usuario: Usuario) => {
    return new Promise<any>((resolve, reject) => {
      resolve({
        status: 200,
        token: "token",
        user: {
          _id: "hola",
          nombre: "adrian",
          apellido: "leon suñol",
          email: "adrian@gmail.com",
          tipo: "admin",
          password: "adrian"
        },
        tipo: "admin",
      })
    })
  }
}