import { IUser } from "../models";
import { 
    handleError,
    handleResponse    
 } from "./api";

/**
 * Servicio para las clases de usuario
 */

export class LoginService {
    private HTTP_URI: string;

    constructor () {
        const api_host = process.env.HOSTAPI || "localhost";
        const api_port = process.env.PORTAPI || 5000;
        console.log(api_host);
        console.log(api_port);
        this.HTTP_URI = `http://${api_host}:${api_port}/v1.0/login`;
    }

    loginUser = (email: string, password: string) => {
        return fetch(`${this.HTTP_URI}`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
        .catch(handleError);
    }
}