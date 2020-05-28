import * as React from 'react';
import { 
    IUserViewComponentProps
 } from '.';


export class UserViewComponent extends React.Component<IUserViewComponentProps, {}> {

    constructor(props: IUserViewComponentProps) {
        super(props);
    }

    public render(): React.ReactElement {
        return (
            <tr>
                <td>{this.props.user.nombre}</td>
                <td>{this.props.user.apellido}</td>
                <td>{this.props.user.email}</td>
                <td>
                    <a className="btn light-blue darken-4" onClick={this._onDeleteUser }>
                        <i className="material-icons">delete</i>
                    </a>
                </td>
                <td>
                    <a className="btn light-blue darken-4" style={{margin: '4px'}} onClick={this._onEditUser }>
                        <i className="material-icons">edit</i>
                    </a>
                </td>
            </tr>
        )
    }

    private _onDeleteUser = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (window.confirm('Estás seguro de querer eliminar este médico?') === true) {       
            this.props.onRemoveUser(this.props.user);
        }   
    }

    private _onEditUser = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        if (window.confirm('Estás seguro de querer editar este médico') === true) {       
            this.props.onEditUser(this.props.user);
        } 
    }
}