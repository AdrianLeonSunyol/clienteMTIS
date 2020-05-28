import React, { Component } from 'react'
import { IListMedicosProps } from './IListMedicosProps'
import { UserViewComponent } from '../UserView';
import { IUser } from '../../../../models';

export class ListUsers extends Component<IListMedicosProps, {}> {
    constructor(props: IListMedicosProps) {
        super(props);
    }

    private _getUserUniqueId(user: IUser): string {
        return (`${user._id}`).toLowerCase();
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                             this.props.usuarios.map(user => {
                                return (
                                    <UserViewComponent
                                        onEditUser= { this.props.onEditUser }
                                        user= { user }
                                        key= { this._getUserUniqueId(user) } 
                                        onRemoveUser={ this.props.onRemoveUser }                                                                  
                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>   
        )
    }
}
