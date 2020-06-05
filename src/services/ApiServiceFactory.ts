import { ApiService } from "."
import { IService } from ".";

export class ApiServiceFactory {
  static createApiService = (target: string): IService => {
    const api_host = process.env.HOSTAPI || "localhost";
    const api_port = process.env.PORTAPI || 5000;
    var api_url = `http://${api_host}:${api_port}/v1.0`
    switch (target) {
      case "admin":
        return new ApiService(`${api_url}/admin`);
      case "paquete":
        return new ApiService(`${api_url}/paquete`);
      default:
        return new ApiService(`${api_url}/usuario`);
    }
  }
}