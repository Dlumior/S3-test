import React, { Component } from "react";
import { GET } from "../../../Conexion/Controller";
import JModal from "./JModal";
import InformacionRelevante from "../FormRegistroAlumno/InformacionRelevante";
import { Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import ListaComboBox from "../Tutorias/ListaComboBox";
import { getUser } from "../../../Sesion/Sesion";

class ListaAlumnos extends Component {
  constructor() {
    super();
    this.state = {
      open:false,
      currentID:0,
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
    this.renderToolbar = this.renderToolbar.bind(this);
    this.handleOnChangeFacultad = this.handleOnChangeFacultad.bind(this);

    this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
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
    this.setState({currentID:idAlumno,open:true});
    //alert("Selecciondao id: ", idAlumno);
  }
  handleOnChangePrograma = async (programa) => {
    console.log("proograma:", programa);
    this.setState({ programa });
    // let tutoria = Object.assign({}, this.state.tutoria);
    // tutoria.programa = programa[0];
    // this.setState({ tutoria: tutoria });
    // console.log("proograma:", this.state.tutoria.programa);
    // this.setState({ filtroFacultad: programa[0] });
    if (programa) {
      const listaAtlumnos = await GET({
        servicio: `/api/alumno/lista/${programa}`,
      });
      let datos = [];
      console.log("listaAtlumnos.alumnos", listaAtlumnos);

      if (listaAtlumnos.alumnos) {
        listaAtlumnos.alumnos.forEach((alumno, index) => {
          const { ID_USUARIO, USUARIO } = alumno;
          const { NOMBRE, APELLIDOS, CORREO, CODIGO } = USUARIO;
          datos.push({
            nro: index + 1,
            codigo: CODIGO,
            nombre: `${NOMBRE} ${APELLIDOS}`,
            correo: CORREO,
            agregarInfo: 
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                onClick={(e) => this.handleOnClick(e, ID_USUARIO)}
              >
                +
              </Button>
            ,
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
  };
  handleOnChangeFacultad(facultad) {
    console.log("HAAAAAAAAAA facu:", facultad);

    const usuario = getUser().usuario;
    const subrol = this.getSubRol(
      usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
    );
    const ID = usuario.ID_USUARIO;
    let enlace = usuario
      ? subrol === "facultad"
        ? `/api/programa/lista/${facultad[0]}`
        : subrol === "programa"
        ? `/api/programa/lista/${ID}/${facultad[0]}`
        : ""
      : "";

    this.setState({ filtroFacultad: enlace });
  }
  /**
   * Obtiene el subrol, util cuando se trarta de coordinador de programa o facultad
   * @param {string} fullRol
   */
  getSubRol(fullRol) {
    let subrol = fullRol?.split(" ");
    return subrol ? subrol[1].toLowerCase() : "";
  }
  /**
   * De acuerto al tipo de coordinador obtiene el enlace apropiado
   * @param {*} usuario
   */
  getEnlace(usuario) {
    //console.log("HAAAA",usuario);
    //usuarioLogueado?"/api/facultad//"
    //          "/api/facultad/lista/" + getUser().usuario.ID_USUARIO
    //"/api/facultad/coordinador/" + getUser().usuario.ID_USUARIO
    const subrol = this.getSubRol(
      usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
    );

    const ID = usuario.ID_USUARIO;
    let enlace = usuario
      ? subrol === "facultad"
        ? "/api/facultad/coordinador/" + ID
        : subrol === "programa"
        ? "/api/facultad/lista/" + ID
        : ""
      : "";

    return enlace;
  }
  async componentDidMount() {
    const { idPrograma } = this.props;

    //const facultades = await GET({servicio: `api/programa/lista/${idPrograma}`});
    // Tengo que buscar con este ID FACULTAD los programas
    console.log("idPrograma", this.props.prog);
  }
  renderToolbar=()=> {
    return (
      <></>
    );
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
          
        />
      );
    }
  }

  handleClose() {
    //this.props.hadleClose();
  }



  render() {
    return (
      <div>
        <JModal
          titulo={"Registro de Informacion historica"}
          body={<InformacionRelevante idAlumno={this.state.currentID}/>}
          open={this.state.open}
          hadleClose={()=>this.setState({open:false})}
          maxWidth={"lg"}
          botonDerecho
        />
        <Grid container spacing={2} style={{ textAlign: "center" }}>
        {/** eliminar data */}
        <Grid item md={4} xs={4}>
          <ListaComboBox
            mensaje="facultad"
            titulo={"Facultad"}
            enlace={this.getEnlace(getUser().usuario)}
            id={"ID_PROGRAMA"}
            nombre={"NOMBRE"}
            subnombre={
              this.getSubRol(
                getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
              ) === "programa"
                ? "FACULTAD"
                : undefined
            }
            keyServicio={"facultades"}
            escogerItem={this.handleOnChangeFacultad}
            small={true}
            inicial={true}
            placeholder={"Escoja la facultad"}
          />
        </Grid>
        <Grid item md={4} xs={4}>
          {this.state.filtroFacultad ? (
            <ListaComboBox
              mensaje="programa"
              titulo={"Programa"}
              enlace={this.state.filtroFacultad}
              id={"ID_PROGRAMA"}
              nombre={"NOMBRE"}
              keyServicio={
                this.getSubRol(
                  getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION
                ) === "programa"
                  ? "programas"
                  : "programa"
              }
              escogerItem={this.handleOnChangePrograma}
              small={true}
              inicial={true}
              placeholder={"Escoja el programa"}
            />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item md={2} xs={2} />
        {/** Boton registarr */}
        <Grid item md={2} xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("cliiick")}
            //startIcon={<CloudUploadIcon />}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
        {/* Lista  facultades */}

        {this.renderTabla(this.state.datosTabla)}
      </div>
    );
  }
}
export default ListaAlumnos;
