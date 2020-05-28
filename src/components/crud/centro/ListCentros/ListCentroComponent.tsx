import React, { Component } from 'react'

import { IListCentroProps } from '.';
import { CentroViewComponent } from "../";

export class ListCentroComponent extends Component<IListCentroProps, {}> {
    constructor(props: IListCentroProps) {
        super(props);
    }

    private _getUserUniqueId(centro): string {
        return (`${centro._id}`).toLowerCase();
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                             this.props.centros.map(centro => {
                                return (
                                    <CentroViewComponent
                                        onEditCentro= { this.props.onEditCentro }
                                        centro={centro}
                                        key= { this._getUserUniqueId(centro) } 
                                        onRemoveCentro={ this.props.onRemoveCentro }                                                                  
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
