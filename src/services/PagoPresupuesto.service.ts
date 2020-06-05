import { ApiService } from "./Api.service";
import { IPackage } from "../models/interfaces/IPackage";
import { ITarjeta } from "../components/paquetes/CreatePaquete";

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

export class PresupuestoPago extends ApiService {

  HTTP_pago: string = "http://localhost:8080/pago";
  HTTP_presupuesto: string = "http://localhost:8080/presupuesto";

  constructor(http_uri: string) {
    super(http_uri);
  }
  getPresupuesto = (paquete: IPackage): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      resolve({
        status: 200,
        message: "Ok",
        presupuesto: 105.06
      });
    })
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