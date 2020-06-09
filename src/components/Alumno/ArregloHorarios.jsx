import React, { Component } from 'react';

class ArregloHorarios extends Component {
    constructor() {
        super();
        this.state = {
          fecha: "",
          horarios: [],
        };
        this.renderHorarios = this.renderHorarios.bind(this);
      }

    renderHorarios = (horarios) =>{
        if(horarios.data){
          return <div>{horarios.data.map((element)=>(
            <DisponibilidadCard disponibilidad={element}/>
          ))}</div>
        }
          console.log("long mayor a cero",horarios.data);
    
      //return <div>{horarios.map((element)=>(<h1>HAAAA</h1>))}</div>
        
      }
      async componentDidMount() {
        if (!this.props.fecha) return;
        const servicio =
        this.props.servicio ;//+ fechaRecibida.toISOString().split("T")[0];
        let horarios = await GET({ servicio: servicio });
        this.setState({ horarios: horarios });
        console.log("horariooos: ", this.state.horarios);
        //console.log("fecha: ", fechaRecibida.toISOString().split('T')[0]);
      }
    render() {
        return (
            <div>
                {this.renderHorarios(this.state.horarios)}
            </div>
        );
    }
}

export default ArregloHorarios;