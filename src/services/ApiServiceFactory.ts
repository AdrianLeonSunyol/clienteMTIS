import { ApiService } from "."
import { IService } from ".";
import { PresupuestoPago } from "./PagoPresupuesto.service";

export class ApiServiceFactory {
  static createApiService = (target: string): IService => {
    switch (target) {
      case "admin":
        return new ApiService('http://localhost:9090/admin');
      case "paquete":
        return new PresupuestoPago('http://localhost:8080/paquete');
      case "usuario":
        return new ApiService('http://localhost:8080');
      default:
        return new ApiService("");
    }
  }
}