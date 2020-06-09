import React, { Component } from 'react';
import ListaAlumnos from '../ListaAlumnos';
import TituloFormulario from '../Tutorias/TituloFormulario';

class ListadoDeAlumnos extends Component {
    constructor() {
        super();
        this.state = {
            alumnoSeleccionado:[]
        }
        this.handleOnChangeAlumnos=this.handleOnChangeAlumnos.bind(this);
    }

    handleOnChangeAlumnos(alumnosSeleccionados) {
        console.log("ALUMNOS:", alumnosSeleccionados);
        this.setState({alumnoSeleccionado: alumnosSeleccionados});
        console.log("ALUMNOS:", this.state.alumnoSeleccionado);
      }
    render() {
        return (
            <div>
                <ListaAlumnos escogerAlumnos={this.handleOnChangeAlumnos}/>
            </div>
        );
    }
}

export default ListadoDeAlumnos;