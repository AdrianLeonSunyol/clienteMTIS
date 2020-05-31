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

export class LoginService {
  private HTTP_URI: string;
  private usuarios: Usuario[];

  private paquetes: Paquete[] = [
    {
      _id: "1",
      usuario_id: "1",
      direccion_origen: "alicante",
      direccion_destino: "madrid",
      zona: "centro",
      peso: 5,
      alto: 10,
      ancho: 10,
      profundo: 15,
      estado: Estado.DESPLAZAMIENTO,
      asignado: true
    },
    {
      _id: "2",
      usuario_id: "1",
      direccion_origen: "alicante",
      direccion_destino: "Barcelona",
      zona: "centro",
      peso: 5,
      alto: 10,
      ancho: 10,
      profundo: 15,
      estado: Estado.EN_CENTRAL,
      asignado: true
    },
    {
      _id: "3",
      usuario_id: "1",
      direccion_origen: "alicante",
      direccion_destino: "Baleares",
      zona: "centro",
      peso: 5,
      alto: 10,
      ancho: 10,
      profundo: 15,
      estado: Estado.PENDIENTE_RECOGER,
      asignado: true
    },
    {
      _id: "4",
      usuario_id: "1",
      direccion_origen: "alicante",
      direccion_destino: "Valencia",
      zona: "centro",
      peso: 5,
      alto: 10,
      ancho: 10,
      profundo: 15,
      estado: Estado.SIN_ASIGNAR,
      asignado: true
    }
  ]

  constructor() {
    const api_host = process.env.HOSTAPI || "localhost";
    const api_port = process.env.PORTAPI || 5000;
    console.log(api_host);
    console.log(api_port);
    this.HTTP_URI = `http://${api_host}:${api_port}/v1.0/login`;
    this.usuarios = [];
  }

  loginUser = (email: string, password: string) => {

    return new Promise<any>((resolve, reject) => {
      if (email != "") {
        if (password == "adrian" && email == "adrian@gmail.com") {
          resolve({
            status: 200,
            token: "token",
            user: {
              _id: "1",
              nombre: "adrian",
              apellido: "leon suño.",
              email: email,
              tipo: "usuario",
              direccion: "Reyes católicos #17 piso 5ºi",
              fechaNacimiento: "26/07/1996",
              provincia: "alicante",
              localidad: "alicante",
              cp: "03003",
              paquetes: this.paquetes,
            },
            tipo: "usuario",
          })
        } else {
          reject({
            status: 401,
            message: 'Datos incorrectos!'
          })
        }
      } else {
        reject({
          status: 400,
          message: 'Por favor, introduce un correo válido!'
        });
      }
    });
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
      var newUser: Usuario = {
        _id: "",
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        tipo: "usuario",
        password: usuario.password,
        direccion: usuario.direccion,
        fechaNacimiento: usuario.fechaNacimiento,
        provincia: usuario.provincia,
        localidad: usuario.localidad,
        cp: usuario.cp,
        paquetes: this.paquetes
      }
      this.usuarios.push(usuario);
      resolve({
        status: 200,
        token: "token",
        user: newUser,
        tipo: "usuario",
      });
    });
  }
}