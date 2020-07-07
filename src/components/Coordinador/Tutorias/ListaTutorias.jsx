import React, { Component } from "react";
import { GET } from "../../../Conexion/Controller";
import InformacionRelevante from "../FormRegistroAlumno/InformacionRelevante";
import { Button, Grid, Fab, IconButton, Chip } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import ListaComboBox from "../Tutorias/ListaComboBox";
import { getUser } from "../../../Sesion/Sesion";
import AddIcon from "@material-ui/icons/Add";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import FormularioRegistrarAlumno from "../FormRegistroAlumno/FormularioRegistrarAlumno";
import FormularioImportarAlumnos from "../FormRegistroAlumno/FormularioImportarAlumnos";
import JModal from "../ListaAlumnos/JModal";
import FormularioNuevaTutoria from "./FormularioNuevaTutoria";

const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
  logo: {
    backgorundSize: "cover",
    width: "100%",
    height:800,
  },
};
const tutoriaOpciones={
  vigencia: ["Semestral","Permanente"],
  tipoasignacion: ["Solicitado","Asignado"],
  asignacion: ["Obligatorio","Opcional"],
  naturaleza: ["Semestral","Permanente"],
  tipotutor: ["Variable","Fijo Semestral","Fijo Permanente"],
  agrupacion: ["Grupal","Individual"],
}
class ListaTutorias extends Component {
  constructor() {
    super();
    // tipo de dialogo: 0 carga individual
    //                  1 carga masiva
    //                  2 carga informacion relevante
    //                  3 mantenimiento editar
    //                  4 mantenimiento eliminar
    this.state = {
      tipoDialogo: 0,
      open: false,
      currentID: 0,
      alumno: {},
      title1: "Resultados historicos del alumno",
      title2: `al ${new Date().toISOString().split("T")[0]}`,
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Nro", field: "nro" },
          { title: "Nombre", field: "nombre" },
          { title: "Descripcion", field: "descripcion" },
          { title: "Vigencia", field: "vigencia" },
          { title: "Duracion sesión (min)", field: "duracion" },
          { title: "Etiquetas", field: "etiquetas" },
          { title: "Tipo Asignacion de tutor", field: "asignacion" },
          { title: "Naturaleza", field: "naturaleza" },
          { title: "Tipo de tutor", field: "tipotutor" },
          { title: "Agrupacion de alumnos", field: "agrupacion" },
          { title: "Mantenimiento", field: "mantenimiento" },
        ],
        data: [],
      },
    };
    //this.renderToolbar = this.renderToolbar.bind(this);
    this.handleOnChangeFacultad = this.handleOnChangeFacultad.bind(this);

    this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
    this.handleEliminar = this.handleEliminar.bind(this);
    this.handleEditar = this.handleEditar.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }
  async handleOpenDialog(e, tipoDialogo, idAlumno) {
    await this.setState({ cuerpoDialogo: tipoDialogo });
    if (idAlumno) {
      this.setState({ currentID: idAlumno });
    }
    this.setState({ open: true });
  }
  handleOnClick(e, idAlumno) {
    this.setState({ currentID: idAlumno, open: true });
    //alert("Selecciondao id: ", idAlumno);
  }
  handleEliminar(id) {
    console.log("Eliminar a : ", id);
  }
  handleEditar(id) {
    console.log("Editar a : ", id);
  }
  handleOnChangePrograma = async (programa) => {
    console.log("proograma:", programa);
    this.setState({ programa });
    // let tutoria = Object.assign({}, this.state.tutoria);
    // tutoria.programa = programa[0];
    // this.setState({ tutoria: tutoria });
    // console.log("proograma:", this.state.tutoria.programa);
    // this.setState({ filtroFacultad: programa[0] });



    //   
    if (programa) {
      const listaTutorias = await GET({
        servicio: `/api/tutoria/lista/${programa}`,
      });
      let datos = [];
      console.log("listaTutorias.tutoria", listaTutorias);

      if (listaTutorias.tutoria) {
        listaTutorias.tutoria.forEach((tutoria, index) => {
         
          const {ID_PROCESO_TUTORIA, NOMBRE, DESCRIPCION, OBLIGATORIO, TUTOR_FIJO,GRUPAL ,TUTOR_ASIGNADO,PERMANENTE,ETIQUETA } = tutoria;
          let listaEtiquetas =[];
          ETIQUETA.forEach(etiqueta => {
            listaEtiquetas.push(etiqueta.DESCRIPCION);
          });
           
           datos.push({
            nro: index + 1,
            nombre: NOMBRE,
            descripcion: DESCRIPCION,
            vigencia: tutoriaOpciones.vigencia[PERMANENTE],
            duracion:"90 min",
           etiquetas:<>{listaEtiquetas.map((etiqueta)=>(
            <Chip label={etiqueta} color="primary" style={{marginRight: 5}}/>
           ))}</>,
            asignacion:tutoriaOpciones.asignacion[TUTOR_ASIGNADO],
            naturaleza:tutoriaOpciones.naturaleza[OBLIGATORIO],
            tipotutor:tutoriaOpciones.tipotutor[TUTOR_FIJO],
            agrupacion:tutoriaOpciones.agrupacion[GRUPAL],
           
            mantenimiento: (
              <>
                <IconButton color="primary">
                  <EditRoundedIcon
                    color="secondary"
                    fontsize="large"
                    onClick={(e) => this.handleOpenDialog(e, 2, ID_PROCESO_TUTORIA)}
                  />
                </IconButton>
                <IconButton color="primary">
                  <DeleteRoundedIcon
                    color="error"
                    fontsize="large"
                    onClick={(e) => this.handleOpenDialog(e, 3, ID_PROCESO_TUTORIA)}
                  />
                </IconButton>{" "}
              </>
            ),
          });
          console.log("listaTutorias.alumnos push", datos);
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
    // const { idPrograma } = this.props;
    // console.log("idPrograma", this.props.prog);
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
          title={`Listado de Tutorias`}
          
        />
      );
    }
  }

  handleClose() {
    //this.props.hadleClose();
  }

  render() {
    const titulos= [
      "Registro de Procesos de Tutoria",
      "Importar Alumnos desde un CSV",
      "Registro de Informacion historica",
      "Actualizar alumno",
      "Eliminar alumno",
    ];
    return (
      <div style={{ backgroundColor: "#ffffff" }}>
        {/** Multidialog con logo */}
        <JModal
          titulo={titulos[this.state.cuerpoDialogo]}
          body={
            this.state.cuerpoDialogo === 0 ? (
              <FormularioNuevaTutoria />
            ) : this.state.cuerpoDialogo === 1 ? (
              <FormularioImportarAlumnos usuario={getUser().usuario}/>
            ) : this.state.cuerpoDialogo === 2 ? (
              <h2>Actualizar Alumno con ID : {this.state.currentID}</h2>
            ) : this.state.cuerpoDialogo === 3 ? (
            <h2>Eliminar Alumno con ID : {this.state.currentID}</h2>
            ) : (
              <InformacionRelevante usuario={getUser().usuario} idAlumno={this.state.currentID} />

            )
          }
          open={this.state.open}
          hadleClose={() => {
            this.setState({ open: false });
            //window.location.replace(this.props.ruta);
          }}
          maxWidth={"lg"}
          botonDerecho={"Cerrar"}
        />
        <Grid container spacing={2} style={{ textAlign: "center" }}>
          {/** Combobox facultad */}
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
          
          {/** Combobox programa */}
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
                    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL
                      .DESCRIPCION
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
          {/** Botones toolbar */}
          
          {/**Boton importar */}
          <Grid item md={2} xs={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => this.handleOpenDialog(e, 1)}
              startIcon={<BackupTwoToneIcon />}
            >
              Importar de archivo CSV
            </Button>
          </Grid>
          {/** Boton registarr */}
          <Grid item md={2} xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => this.handleOpenDialog(e, 0)}
            >
              Registrar Nueva Tutoria
            </Button>
          </Grid>
        </Grid>

        {/* Lista tutorias */}
        {this.renderTabla(this.state.datosTabla)}
      </div>
    );
  }
}

export default ListaTutorias;
