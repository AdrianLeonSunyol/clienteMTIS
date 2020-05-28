import React from 'react'
import { IPrivatePageProps } from './IPrivatePageProps'
import AdminPage from '../Admin/AdminPage';

export class PrivatePage extends React.Component<IPrivatePageProps, {}> {
    constructor(props: IPrivatePageProps) {
        super(props);
    }

    render(): React.ReactElement {
        return (
            <div>
                {
                    this.props.user.tipo === "admin" &&
                    <AdminPage 
                    user={this.props.user}
                    medico_service={this.props.servicios[1].servicio}
                    paciente_service={this.props.servicios[2].servicio}
                    centro_service={this.props.servicios[3].servicio}
                    />
                } 
                
                {
                    this.props.user.tipo === "medico" &&
                    <div>vista para medico</div>
                }
                {
                    this.props.user.tipo === "paciente" &&
                    <div>vista para pacientes</div>
                }
                {
                    this.props.user.tipo === "" &&
                    <div>No tienes authorización para estar aquí</div>
                } 
            </div>
        )
    }
}
