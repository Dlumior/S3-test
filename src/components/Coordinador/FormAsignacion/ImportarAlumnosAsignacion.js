import React, { Component } from "react";
import {
  Paper,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle, DialogContentText, DialogActions, Typography
} from "@material-ui/core";

import JMaterialCSVUploadSSJ from "jinssj-mat-table-drop-upload-csv";

import {
  parseMaterialJTable,
  validateMaterialJTableData,
} from "../FormRegistroAlumno/utilssj/UtilsSSJ.js";
import RestorePageTwoToneIcon from "@material-ui/icons/RestorePageTwoTone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { GET, POST } from "../../../Conexion/Controller.js";
import CampoDeTexto from "../Tutorias/CampoDeTexto.jsx";
import JModal from "../ListaAlumnos/JModal.jsx";
import Jloading from "../FormRegistroAlumno/Jloading.jsx";
import { getUser } from "../../../Sesion/Sesion.js";
import ImagenCircular from "../../Shared/ImagenCircular.js";
import TituloFormulario from "../Tutorias/TituloFormulario.jsx";
const estilos = {
  paper: {
    marginTop: "1%",
    marginLeft: "1%",
    marginRight: "1%",
  },

  divini: {
    width: "100%",
    height: "100%",
  },
  centerDialog: {
    marginLeft: "1%",
    marginRight: "1%",
    color: "#002D3D",
    textAlign: "center",
    minHeight: 550,
    maxHeight: 900,
  },
};
class FormularioImportarAlumnos extends Component {
  constructor() {
    super();
    this.state = {
      fileName: "",
      formato:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      maxTamanio: 100,
      errores: [],
      alert: {
        mensajeStrong: "",
        mensajeStrongError: "por favor revisalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Proceso de Tutoria registrado",
        mensaje: "",
      },
      severidad: "warning",
      usuario: null,
      loguedIn: false,
      alumnosTabla: {},
      numUpdates: 0,
      columnasLimpias: [],
      etiquetas: [],
      alumnosCargados: [],
      open: false,
    };
    this.handleOnSuccesLoad = this.handleOnSuccesLoad.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
    this.handleOnChangeTexto = this.handleOnChangeTexto.bind(this);
    this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.handleOnClickRegistroSSJ_masivo = this.handleOnClickRegistroSSJ_masivo.bind(
      this
    );
    this.removerDatos = this.removerDatos.bind(this);
    this.onUpdateDatos = this.onUpdateDatos.bind(this);
    this.handleClickOpenLoading = this.handleClickOpenLoading.bind(this);
    this.handleCloseLoading = this.handleCloseLoading.bind(this);
    this.handleOnSuccesLoad = this.handleOnSuccesLoad.bind(this);
  }

  handleOnClickRegistroSSJ_masivo = async () => {
    alert("Cargando Alumnos espere...");
    this.handleClickOpenLoading();
    const { data } = this.state.alumnosTabla;
    const tags = this.state.columnasLimpias;
    console.log("Registrando ", data);
    if (!data || data?.length === 0) {
      alert("aun no hay datos sorry man XD");
      return;
    }
    data.forEach(async (registro) => {
      let ALUMNO = { alumno: {} };
      tags.forEach((tag) => {
        ALUMNO.alumno[tag.toUpperCase()] = registro[tag.toLowerCase()];
      });
      //valida que exista el alumno
      let alu = await GET({
        servicio: "/api/alumno/buscar/" + ALUMNO.alumno.CODIGO,
      });
      console.log("programaa:", alu);

      if (alu.alumno) {
        //valida que pertenezca al mismo programa
        let programs = [];
        programs = await GET({
          servicio: "/api/programa/alumno/" + alu.alumno.ID_ALUMNO,
        });
        console.log("programaa:", programs.programas);

        for (let el of programs.programas) {
          if (el.ID_PROGRAMA === this.props.programa) {
            //validamos que el alumno no tenga asignado a nadie en ese proceso de tutoria
            let asig = await GET({
              servicio:
                "/api/tutoriaasignada/" +
                el.ID_PROGRAMA +
                "/" +
                alu.alumno.ID_ALUMNO,
            });
            console.log("programaa:", asig.tutoria);
            for (let ele of asig.tutoria) {
              if (ele.ID_PROCESO_TUTORIA === this.props.proceso) {
                return;
              }
            }

            this.state.alumnosCargados.push(alu.alumno.ID_ALUMNO);
            console.log("programaa", this.state.alumnosCargados);
          }
        }
      }
      //AQUI IRIA LA VALIDACION SI EL ALUMNO EXISTE Y SI PERTENECE AL PROGRAMA
      this.handleCloseLoading();
      console.log("programaa", this.state.alumnosCargados);
      this.props.escogerAlumnos(this.state.alumnosCargados);
      console.log("programaa", this.state.alumnosCargados);
    });
  };
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
    const subrol = this.getSubRol(getUser().rol);

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
  /**
   * buffer array read as text
   * @param {Buffer} file
   */
  handleOnSuccesLoad = async (alumnosFromCSV, fileName) => {
    await this.setState({ fileName: fileName });
    console.log("TAAAGS: alumnosFromCSV[0]", alumnosFromCSV);
    console.log("TAAAGS: fileName", fileName);

    const alumnosTabla = await parseMaterialJTable(
      alumnosFromCSV,
      "alumnos",
      "Estado"
    );
    console.log("TAAAGS: alumnosFromCSV[0]", alumnosFromCSV.alumnos[0]);
    this.setState({ columnasLimpias: alumnosFromCSV.alumnos[0] });
    await this.setState({ alumnosTabla: alumnosTabla });
  };
  validarEntrada(error) {
    console.log("errores:", error);
    let encontrado = undefined;
    let nuevo = false;
    let eliminar = this.state.errores.forEach((element) => {
      if (element.llave === error.llave) {
        encontrado = element;
      }
    });
    if (encontrado) {
      if (error.error.length === 0) {
        //lo borro
        eliminar = true;
      }
    } else {
      if (error.error.length !== 0) {
        nuevo = true;
      }
    }
    console.log("nuevo: ", nuevo);
    if (nuevo) {
      let newErrores = this.state.errores;
      newErrores.push(error);
      this.setState({ errores: newErrores });
      return;
    }
    if (eliminar) {
      let newErrores = [];
      this.state.errores.forEach((element) => {
        if (element.llave !== error.llave) {
          newErrores.push(element);
        }
      });
      this.setState({ errores: newErrores });
    }
  }
  handleOnChangeTexto = (e) => {
    // nombre y descripcion
    let tutoria = Object.assign({}, this.state.tutoria);
    console.log(e);
    tutoria[e.name] = e.value;
    this.setState({ tutoria: tutoria });
  };
  async componentDidMount() {
    console.log("*** ", this.props);
    const { usuario } = this.props;
    if (!usuario) {
      return;
    }
    await this.setState({ loguedIn: true, usuario: usuario });
  }
  removerDatos() {
    this.setState({ alumnosTabla: [] });
  }
  /**
   * MANEJOS DE CRUD EN LA JMATERIAL TABLE
   * @param {*} operacion
   * @param {*} index
   * @param {*} registro
   */
  onUpdateDatos = async (operacion, index, registro) => {
    return new Promise(async (resolve, reject) => {
      let newData = this.state.alumnosTabla.data;
      switch (operacion) {
        case "agregar":
          registro.key = newData.length + 1;
          newData.push(registro);
          break;
        case "eliminar":
          console.log("eliminaDO index: ", index);
          console.log("eliminaDO antes: ", newData);
          newData.splice(index, 1);
          console.log("eliminaDO: ", newData);
          break;
        case "actualizar":
          newData[index] = registro;
          console.log("Actualize: ", newData[index]);
          break;
        default:
          break;
      }
      // aqui deberia validar denuevo el registro
      const tablaFinal = await validateMaterialJTableData(
        newData,
        this.state.columnasLimpias,
        "Estado"
      );
      console.log("DATANUEVA: ", tablaFinal.data);
      //reasiganr valores de la tabla
      await this.setState({
        alumnosTabla: {
          data: tablaFinal.data,
          columns: tablaFinal.columns,
          huboErrores: tablaFinal.huboErrores,
        },
        numUpdates: this.state.numUpdates ? undefined : 1,
      });

      resolve();
    });
  };
  renderToolbar() {
    return (
      <Grid container spacing={2} style={{ textAlign: "center" }}>
        {/** eliminar data */}
        <Grid item md={2} xs={2}>
          <Button
            color="primary"
            onClick={() => this.removerDatos()}
            startIcon={<RestorePageTwoToneIcon />}
          >
            Deshacer Carga
          </Button>
        </Grid>
        <Grid container md={7} xs={2} justify="center" style={{marginTop:"1%"}}>
          <Typography variant="subtitle2" >
            Los códigos a importar deben ser de alumnos pertenecientes al programa seleccionado y no
            tener asignado a un tutor en el proceso de tutoria seleccionado
          </Typography>
        </Grid>
        {/** Boton registarr */}
        <Grid item md={3} xs={2} justify="flex-end" >
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOnClickRegistroSSJ_masivo}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    );
  }
  renderTable(datosNuevos) {
    console.log("TABLAAAA", datosNuevos);
    if (datosNuevos !== this.state.datosNuevos) {
      return (
        <JMaterialCSVUploadSSJ
          toolbar={() => this.renderToolbar()}
          title="Vista Previa (solo archivos .CSV)"
          agrupar={datosNuevos.huboErrores}
          other={this.state.numUpdates}
          data={datosNuevos.data}
          columns={datosNuevos.columns}
          onUpdateDatos={this.onUpdateDatos}
          superPlaceHolder={true}
          //Uploading
          embebed={false}
          handleOnSuccesLoad={this.handleOnSuccesLoad}
          formato={this.state.formato}
          maxTamanio={this.state.maxTamanio}
        />
      );
    }
  }
  handleClickOpenLoading() {
    this.setState({ open: true });
  }
  handleCloseLoading() {
    this.setState({ open: false });
  }
  render() {
    if (this.state.loguedIn) {
      return (
        <>
          <Dialog
            open={this.props.open}
            onClose={this.props.close}
            scroll={"paper"}
            fullWidth
            maxWidth
            aria-describedby="scroll-dialog-description"
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title">
              <Grid container spacing={2}>
                <Grid item md={2} xs={2}>
                  <ImagenCircular
                    src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted.png"
                    square
                  />
                </Grid>
                <Grid item md={10} xs={10}>
                  <TituloFormulario titulo={"Importar Alumnos"} />
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent dividers={"paper"}>
              <DialogContentText
                style={estilos.centerDialog}
                id="scroll-dialog-description"
                //ref={descriptionElementRef}
                tabIndex={-1}
              >
                {this.renderTable(this.state.alumnosTabla)}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <JModal
            titulo={"Mensaje de uTutor.com"}
            body={<Jloading mensaje={"Cargando Alumnos"} />}
            open={this.state.open}
            handleClose={this.handleCloseLoading}
          />
        </>
      );
    } else {
      return <h1>Algo paso reintente en un momento</h1>;
    }
  }
}

export default FormularioImportarAlumnos;
