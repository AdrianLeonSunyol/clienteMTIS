import * as React from 'react';

export class HomePage extends React.Component {
    render(): React.ReactElement {
        return (
               <div className="row">
                   <div className="col s12">
                        <div className="parallax-container">
                            <div className="parallax"><img src="https://www.sinhumo-sevilla.net/img/cms/1_7.jpg"/></div>
                        </div>
                        <div className="section white">
                            <div className="container">
                                <h2 className="header">Centro Médico</h2>
                                <p className="grey-text text-darken-3 lighten-3">En nuestro centro médico contamos con los mejores profiesionales y la mejor asistencia técnica!</p>
                            </div>
                        </div>
                        <div className="parallax-container">
                            <div className="parallax"><img src="https://www.sinhumo-sevilla.net/img/cms/1_7.jpg"/></div>
                        </div>
                   </div>
               </div>
        )
    }
}