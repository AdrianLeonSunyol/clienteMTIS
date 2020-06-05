import { ApiService } from "./Api.service";
import { IPackage } from "../models/interfaces/IPackage";
import { ITarjeta } from "../components/paquetes/CreatePaquete";

export class PaqueteService extends ApiService {

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

  pagoPresupuesto = (presupuesto: number, tarjeta: ITarjeta): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      resolve({
        status: 200,
        message: "Ok",
        identificador: 1010100
      });
    });
  }
}