import React, { Component } from 'react';
const estilo ={
    centerizable: {
        textAlign: "center",
      }
}
class TituloFormulario extends Component {
    constructor(){
        super();
        this.state = {
            titulo: ""
          };
    }

    render() {
        return (
            <div>
                <br/>
                <h1 style={estilo.centerizable}>{this.props.titulo}</h1>
            </div>
        );
    }
}

export default TituloFormulario;