import { IUser } from "../models";
import {
  handleError,
  handleResponse
} from "./api";
import { IService } from ".";

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