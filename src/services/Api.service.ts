import { IUser } from "../models";
import {
  handleError,
  handleResponse
} from "./api";
import { IService } from ".";
import { Estado } from "../models/EstadoEnum";

/**
 * Servicio para las clases de usuario
 */

export class ApiService implements IService {
  //users: IUser[] = [];

  constructor(private HTTP_URI: string) {
    this.HTTP_URI = HTTP_URI;
  }

  get = () => {
    return fetch(this.HTTP_URI, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(handleResponse)
      .catch(handleError);
  }

  getOne = (id: string) => {
    return new Promise<any>((resolve, reject) => {
      resolve({
        status: 200,
        token: "token",
        user: {
          id: "1",
          nombre: "adrian",
          apellidos: "leon suñol",
          email: "adrian@gmail.com",
          tipo: "usuario",
          password: "adrian",
          cp: "03003",
          fechaNacimiento: "fechaNacimiento",
          provincia: "provincia",
          localidad: "licalidad",
        },
        paquete: {
          id: "1",
          usuario_id: "1",
          precio: 100,
          peso: 5,
          alto: 5,
          ancho: 5,
          profundo: 5,
          origen: "alicante",
          destino: "barcelona",
          provincia_origen: "alicante",
          provincia_destino: "barcelona",
          localizacion_actual: "alicante",
          direccion_origen: "alicante",
          direccion_destino: "barcelona",
          zona: "alicante",
          estado: Estado.PENDIENTE_RECOGER,
          asignado: true,
          id_repartidor: "1",
        },
        tipo: "usuario",
      })
    })
    //return fetch(`${this.HTTP_URI}/${id}`, {
    //  method: 'GET',
    //  headers: {
    //    'Accept': 'application/json',
    //    'Content-Type': 'application/json',
    //    'Authorization': 'Bearer ' + localStorage.getItem('token')
    //  },
    //})
    //  .then(res => {
    //    return res.json();
    //  })
    //  .catch(handleError);
  }

  post = (object: any) => {
    return fetch(this.HTTP_URI, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(handleResponse)
      .catch(handleError);

  }

  delete = (id: string) => {
    return fetch(`${this.HTTP_URI}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')

      }
    })
      .then(handleResponse)
      .catch(handleError);

  }

  deleteAll = () => {
    return fetch(`${this.HTTP_URI}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(handleResponse)
      .catch(handleError);
  }
}