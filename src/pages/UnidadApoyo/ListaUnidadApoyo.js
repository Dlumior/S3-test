import React from "react";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import * as Controller from "../../Conexion/Controller"

const style = {
    paper: {
        marginTop: "3%",
        marginLeft: "3%",
        marginRight:"3%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundImage: "",
    }
};

class ListaUnidadApoyo extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: "Nombre",
                    field: "NOMBRE",
                },
                {
                    title: "Telefono",
                    field: "TELEFONO",
                },
                {
                    title:"Correo",
                    field:"CORREO"
                },
                {
                    title:"Contacto",
                    field:"CONTACTO"
                }
            ],
            data: []
        };
    }

    async componentDidMount(){
        let areasApoyo = await Controller.GET({servicio:"/api/areaapoyo"});
        this.setState({data: areasApoyo.areasApoyo});
    }

    render(){
        return (
            <div>
            <Paper elevation={0} style={style.paper}>
                <MaterialTable 
                    //className={classes.table} 
                    title=""
                    columns={this.state.columns}
                    data={this.state.data}

                    options={{
                    rowStyle: {
                        backgroundColor: '#FFF',
                    },
                    headerStyle: {
                        backgroundColor: '#3AAFA9',
                        color: '#FFF',
                        fontSize: 16
                    },
                    }}
                
                />
            </Paper>
            </div>
        );
    }
}

export default ListaUnidadApoyo;