import React, { Component } from "react";
import { GET } from "../../../Conexion/Controller";
import JModal from "./JModal";
import { withRouter } from 'react-router-dom';    
import InformacionRelevante from "../FormRegistroAlumno/InformacionRelevante";
import { Button, Grid, Fab, IconButton } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import ListaComboBox from "../Tutorias/ListaComboBox";
import { getUser } from "../../../Sesion/Sesion";
import AddIcon from "@material-ui/icons/Add";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import FormularioRegistrarAlumno from "../FormRegistroAlumno/FormularioRegistrarAlumno";
import FormularioImportarAlumnos from "../FormRegistroAlumno/FormularioImportarAlumnos";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
class ListaAlumnos extends Component {
  constructor(props) {
    super();
    // tipo de dialogo: 0 carga individual
    //                  1 carga masiva
    //                  4 carga informacion relevante
    //                  4 ver informacion relevante
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
          { title: "Codigo", field: "codigo" },
          { title: "Nombre", field: "nombre" },
          { title: "Correo", field: "correo" },
          { title: "Información Historica", field: "agregarInfo" },
          { title: "Historial de Asistencias", field: "perfil" },
          { title: "Mantenimiento", field: "mantenimiento" },
        ],
        data: [],
      },
    };
    this.renderToolbar = this.renderToolbar.bind(this);
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
            perfil:
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={()=>this.props.history.push("/coordinador/alumno/"+
                ID_USUARIO+"/"+JSON.stringify(APELLIDOS+", "+NOMBRE))}
              >
                Asistencias
              </Button>
            </div>,
            agregarInfo: (
              <>
                <Grid container spacing={2} style={{ textAlign: "center" }}>
                  {/** eliminar data */}
                  <Grid item md={6} xs={6}><Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  onClick={(e) => this.handleOpenDialog(e, 4, ID_USUARIO)}
                >
                  <AddIcon />
                </Fab></Grid>
                  <Grid item md={6} xs={6}><IconButton color="primary">
                  <FileCopyTwoToneIcon
                    color="primary"
                    fontsize="large"
                    onClick={(e) => this.handleOpenDialog(e, 5, ID_USUARIO)}
                  />
                </IconButton></Grid>
                </Grid>
                
                
              </>
            ),
            mantenimiento: (
              <>
                <IconButton color="primary">
                  <EditRoundedIcon
                    color="secondary"
                    fontsize="large"
                    onClick={(e) => this.handleOpenDialog(e, 2, ID_USUARIO)}
                  />
                </IconButton>
                <IconButton color="primary">
                  <DeleteRoundedIcon
                    color="error"
                    fontsize="large"
                    onClick={(e) => this.handleOpenDialog(e, 3, ID_USUARIO)}
                  />
                </IconButton>{" "}
              </>
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
  renderToolbar = () => {
    return <></>;
  };
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
    const titulos = [
      "Registro de Nuevo Alumno",
      "Importar Alumnos desde un CSV",
      "Registro de Informacion historica",
      "Actualizar alumno: ",
      "Eliminar alumno: ",
      "Informacion relevante de ",
    ];
    return (
      <div style={{ backgroundColor: "#ffffff" }}>
        <JModal
          titulo={titulos[this.state.cuerpoDialogo]}
          body={
            this.state.cuerpoDialogo === 0 ? (
              <FormularioRegistrarAlumno />
            ) : this.state.cuerpoDialogo === 1 ? (
              <FormularioImportarAlumnos usuario={getUser().usuario} />
            ) : this.state.cuerpoDialogo === 2 ? (
              <h2>Actualizar Alumno con ID : {this.state.currentID}</h2>
            ) : this.state.cuerpoDialogo === 3 ? (
              <h2>Eliminar Alumno con ID : {this.state.currentID}</h2>
            ) : (
              <InformacionRelevante
                usuario={getUser().usuario}
                idAlumno={this.state.currentID}
              />
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
              Registrar Nuevo Alumno
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
