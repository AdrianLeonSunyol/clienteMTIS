import * as React from 'react';
import { 
    ICentroViewComponentProps
 } from '.';


export class CentroViewComponent extends React.Component<ICentroViewComponentProps, {}> {

    constructor(props: ICentroViewComponentProps) {
        super(props);
    }

    public render(): React.ReactElement {
        return (
            <tr>
                <td>{this.props.centro.nombre}</td>
                <td>
                    <a className="btn light-blue darken-4" onClick={this._onDeleteCentro }>
                        <i className="material-icons">delete</i>
                    </a>
                </td>
                <td>
                    <a className="btn light-blue darken-4" style={{margin: '4px'}} onClick={this._onEditCentro }>
                        <i className="material-icons">edit</i>
                    </a>
                </td>
            </tr>
        )
    }

    private _onDeleteCentro = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (window.confirm('Estás seguro de querer eliminar este médico?') === true) {       
            this.props.onRemoveCentro(this.props.centro);
        }   
    }

    private _onEditCentro = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        if (window.confirm('Estás seguro de querer editar este médico') === true) {       
            this.props.onEditCentro(this.props.centro);
        } 
    }
}