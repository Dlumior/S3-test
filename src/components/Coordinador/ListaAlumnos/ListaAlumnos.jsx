import React, { Component } from "react";
import { GET } from "../../../Conexion/Controller";
import JModal from "./JModal";
import InformacionRelevante from "../FormRegistroAlumno/InformacionRelevante";
import { Button } from "@material-ui/core";
import MaterialTable from "material-table";

class ListaAlumnos extends Component {
  constructor() {
    super();
    this.state = {
      alumno: {},
      title1: "Resultados historicos del alumno",
      title2: `al ${new Date().toISOString().split("T")[0]}`,
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Nro", field: "nro" },
          { title: "Codigo", field: "codigo" },
          { title: "Nombre", field: "nombre" },
          { title: "Correo", field: "correo" },
          { title: "Agregar Información Historica", field: "agregarInfo" },
        ],
        data: [],
      },
    };
  }
  /*
       {
    "alumnos": [
        {
            "ESTADO": 1,
            "ID_PROGRAMA": 2,
            "ID_ROL": 4,
            "ID_USUARIO": 239,
            "ROL": {
                "ID_ROL": 4,
                "DESCRIPCION": "Alumno"
            },
            "USUARIO": {
                "ID_USUARIO": 239,
                "USUARIO": "dios",
                "CONTRASENHA": "$2b$10$sUt2ARYee0kJ.bkv1VzuY.R8uGuev45CaNBSXIJRK6BrrlJlaWeIm",
                "NOMBRE": "ruebc",
                "APELLIDOS": "jfuispfd",
                "CORREO": "tupia@pucp.edu.pe",
                "CODIGO": "212798567",
                "TELEFONO": "965567843",
                "DIRECCION": "Av. Las Flores 2331",
                "IMAGEN": null
            }
        }
    ]
}
       
       */
  handleOnClick(e, idAlumno) {
    alert("Selecciondao id: ", idAlumno);
  }
  async componentDidMount() {
    const { idPrograma } = this.props;
    // Tengo que buscar con este ID FACULTAD los programas
    console.log("idPrograma", this.props.prog);
    const listaAtlumnos = await GET({
      servicio: `/api/alumno/lista/${idPrograma}`,
    });
    let datos = [];
    console.log("listaAtlumnos.alumnos", listaAtlumnos);

    if (listaAtlumnos.alumnos) {
      listaAtlumnos.alumnos.forEach((alumno, index) => {
        const { ID_USUARIO, USUARIO } = listaAtlumnos.alumnos;
        const { NOMBRE, APELLIDOS, CORREO, CODIGO } = USUARIO;
        datos.push({
          nro: index + 1,
          codigo: CODIGO,
          nombre: `${NOMBRE} ${APELLIDOS}`,
          correo: CORREO,
          agregarInfo: () => (
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={(e) => this.handleOnClick(e, ID_USUARIO)}
            >
              Guardar
            </Button>
          ),
        });
    console.log("listaAtlumnos.alumnos push", datos);

      });
      /*
       { title: "Nro", field: "nro" },
          { title: "Codigo", field: "codigo" },
          { title: "Nombre", field: "nombre" },
          { title: "Correo", field: "correo" },
          { title: "Agregar Información Historica", field: "agregarInfo" },
      */
      await this.setState({
        datosTabla: {
          columns: this.state.datosTablaOffline.columns,
          data: datos,
        },
      });
      console.log("=> ", this.state.datosTabla);
    }
  }
  renderTabla(datosNuevos) {
    console.log("***", datosNuevos);
    if (datosNuevos !== this.state.datosNuevos) {
      //asegurarme de no renderizar si no vale la pena
      return (
        <MaterialTable
          columns={this.state.datosTabla.columns}
          data={this.state.datosTabla.data}
          options={{
            //selection: true,
            rowStyle: {
              backgroundColor: "#FFF",
            },
            headerStyle: {
              backgroundColor: "#3AAFA9",
              color: "#ffffff",
              fontSize: 14,
            },
          }}
          title={`Listado de Alumnos`}
          // lo de pasar a español si te lo dejo de tarea XDDDDD
        />
      );
    }
  }
  render() {
    return (
      <div>
        <JModal
          titulo={"Mensaje de uTutor.com"}
          body={<InformacionRelevante />}
          open={this.state.open}
          hadleClose={this.handleCloseLoading}
        />
        {this.renderTabla(this.state.datosTabla)}
      </div>
    );
  }
}
export default ListaAlumnos;
