import { IUser } from "../models";
import {
  handleError,
  handleResponse
} from "./api";
import { IService } from ".";
import { Estado } from "../models/EstadoEnum";
import { IPackage } from "../models/interfaces/IPackage";

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
    var body = {
      "id_paquete": parseInt(id),
      "codigo_seguridad": localStorage.getItem('token') || ""
    }
    return new Promise<any>((resolve, reject) => {
    return fetch("http://localhost:9090/getpaquete", {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((res) => {
        return res.json();
      })
      .then((res: IPackage) => {
          resolve(res);
      })
      .catch((err) => {
        reject({
          status: 400,
          message: "Error cargando paquete"
        });
      });
    });
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