import { ApiService } from "./Api.service";
import { IPackage } from "../models/interfaces/IPackage";
import { ITarjeta } from "../components/paquetes/CreatePaquete";
import { parse } from "path";

export interface IPagoRequest {
  tarjeta: string;
  cvv: string;
  fecha_caducidad: string;
  usuario_id: string;
  id_paquete: string;
  token: string;
  precio: number;
  destino: string; //correo usuario
}

export interface IPagoResponse {
  status: number;
  message: string;
}

export interface IPresupuestoRequest {
  Paquete: {
    peso: string;
    alto: string;
    ancho: string;
    profundo: string;
    origen: string;
    destino: string;
    provincia_origen: string;
    provincia_destino: string;
    direccion_origen: string;
    direccion_destino: string;
    zona: string;
  },
  id_usuario: number;
  codigo_seguridad: string;
}

export interface IPresupuestoResponse {
  message: string;
  status: number;
  presupuesto: string;
  id_usuario: string;
  id_paquete: string;
}

export class PresupuestoPago extends ApiService {

  HTTP_pago: string = "http://localhost:8080/pago";
  HTTP_presupuesto: string = "http://localhost:9090/presupuesto";

  constructor(http_uri: string) {
    super(http_uri);
  }

  getPresupuesto = (paquete: IPackage): Promise<any> => {
    var request: IPresupuestoRequest = {
      Paquete: {
        peso: paquete.peso.toString(),
        alto: (paquete.alto / 100).toString(),
        ancho: (paquete.ancho / 100).toString(),
        profundo: (paquete.profundo / 100).toString(),
        origen: paquete.origen,
        destino: paquete.destino,
        provincia_origen: paquete.provincia_origen,
        provincia_destino: paquete.provincia_destino,
        direccion_origen: paquete.direccion_origen,
        direccion_destino: paquete.direccion_destino,
        zona: paquete.zona,
      },
      id_usuario: parseInt(paquete.usuario_id),
      codigo_seguridad: localStorage.getItem('token') || ""
    }

    return new Promise<any>((resolve, reject) => {
      fetch(this.HTTP_presupuesto, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })
        .then((res) => {
          return res.json();
        })
        .then((response: IPresupuestoResponse) => {
          if (response.status == 200) {
            resolve({
              status: 200,
              message: response.message,
              presupuesto: response.presupuesto,
              id_usuario: response.id_usuario,
              id_paquete: response.id_paquete
            })
          } else {
            reject({
              status: response.status,
              message: response.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          reject({
            status: 400,
            message: "Error intentando hacer login!"
          });
        });
    });
  }

  pagoPresupuesto = (pago: IPagoRequest): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      fetch(
        this.HTTP_pago,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pago)
        }
      )
        .then((response: any) => {
          console.log(response);
          return response.json();
        })
        .then((res: IPagoResponse) => {
          if (res.status == 200) {
            resolve({
              status: 200,
              message: "El pago se ha realizado correctamente",
              identificador: pago.id_paquete
            });
          } else if (res.status == 201) {
            reject({
              status: 201,
              message: "Error del sistema"
            });
          } else {
            reject({
              status: 202,
              message: "Error intentando realizar el pago"
            });
          }
        })
        .catch(err => {
          console.log(err);
          reject({
            status: 400,
            message: "Error intentando realizar el pago"
          });
        })
    });
  }
}