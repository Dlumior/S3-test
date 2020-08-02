import React, { Component } from "react";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";
import JUploadSSJ from "jin-upload-ssj2";
import { GET, POST } from "../../../Conexion/Controller";
import { IconButton, Grid, Paper, Button } from "@material-ui/core";
//import MaterialTable from "material-table";
import JMaterialTableSpanishSSJ from "jinssj-mat-table-spanish-noeditable";

import CampoDeTexto from "../Tutorias/CampoDeTexto";
//import JDownloadButtonIcon from "downloadssj";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RestorePageTwoToneIcon from "@material-ui/icons/RestorePageTwoTone";
import { getUser } from "../../../Sesion/Sesion";
import JModal from "../ListaAlumnos/JModal";
import Jloading from "./Jloading";
import ImagenCircular from "../../Shared/ImagenCircular";
import EnConstruccion from "../../Shared/EnConstruccion";
import { DialogContext } from "../../../Sesion/dialog";
import { openMensajePantalla } from "../../../Sesion/actions/dialogAction";

const estilos = {
  paper: {
    marginTop: "1%",
    marginLeft: "1%",
    marginRight: "1%",
  },
  margen: {
    marginTop: "1%",
    marginLeft: "4%",
    marginRight: "4%",
  },
  divini: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    marginRight: "4%",
  },
  // sos pirataaaaaaaa xddd
  fa: {
    fontSize: "1.3rem",
    color: "#2E908A",
  },
};
class VerInformacionRelevante extends Component {
  static contextType = DialogContext;

  constructor() {
    super();
    this.state = {
      open: false,
      mensajesResultado: [],
      botonRegistrar: false,

      idArchivo: 0,
      descripcion: "",
      fileName: "",
      PDFURL: undefined,
      extension: "",
      archivo: undefined,
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
          { title: "Nombre del archivo", field: "nombreArchivo" },
          { title: "Vista Previa", field: "vistaPrevia" },
          { title: "Descargar", field: "descargar" },
        ],
        data: [],
      },
    };
    this.handleOnSuccesLoad = this.handleOnSuccesLoad.bind(this);

    this.removerDatos = this.removerDatos.bind(this);
    this.handleOnClickRegistroSSJ_masivo = this.handleOnClickRegistroSSJ_masivo.bind(
      this
    );
    this.handleVistaPrevia = this.handleVistaPrevia.bind(this);
    this.handleDescargar = this.handleDescargar.bind(this);
    this.getArchivo = this.getArchivo.bind(this);

    this.renderBodyLoading = this.renderBodyLoading.bind(this);
    this.handleClickOpenLoading = this.handleClickOpenLoading.bind(this);
    this.handleCloseLoading = this.handleCloseLoading.bind(this);
  }
  handleOnChangeTexto = (e) => {
    // nombre y descripcion
    this.setState({ descripcion: e.value });
  };
  renderTabla(datosNuevos) {
    //console.log("***", datosNuevos);
    if (datosNuevos !== this.state.datosNuevos) {
      //asegurarme de no renderizar si no vale la pena
      return (

        <JMaterialTableSpanishSSJ
            columns={this.state.datosTabla.columns}
            data={this.state.datosTabla.data}
            title={`Archivos del Alumno`}
          />);
          
          { /**
             * <MaterialTable
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
          title={`Archivos del Alumno`}
        />
             */ }
        
      
    }
  }
  async getArchivo(idArchivo) {
    const archivoOutput = await GET({
      servicio: `/api/alumno/informacionrelevante/descargar/${idArchivo}`,
    });
    if(!archivoOutput.informacionRelevante){
      let [{ openMensaje, mensaje }, dispatchDialog] = this.context;

      openMensajePantalla(dispatchDialog, {
        open: true,
        mensaje:
          "W>Disculpe las molestias, el archivo seleccionado no es accesible en este momento. Si el problema persiste, comuníquese con el administrador del sistema. Gracias.",
      });
      return;
    }
    await this.setState({
      filename: archivoOutput.informacionRelevante.DESCRIPCION,
      extension: archivoOutput.informacionRelevante.DESCRIPCION.split(".")[1],
    });
    //console.log("KAMEEEEE: ", archivoOutput.informacionRelevante.ARCHIVO);
    //console.log("KAMEEEEE: ", this.state.extension);
    return this.state.extension === "pdf"
      ? `data:application/pdf;base64,${archivoOutput.informacionRelevante.ARCHIVO}`
      : `data:application/octet-stream;base64,${archivoOutput.informacionRelevante.ARCHIVO}`;
  }

  async handleVistaPrevia(e, id_archivo) {
    const { archivo, idArchivo } = this.state;
    if (archivo) {
      //console.log("ARCH: ", idArchivo);
      //console.log("ARCH: ", id_archivo);
      if (idArchivo !== id_archivo) {
        // si hay archivo i los id son dif,pide al back y muestra
        this.setState({ archivo: undefined });
        const archivo = await this.getArchivo(id_archivo);

        await this.setState({ archivo, idArchivo: id_archivo });
      } else {
        //ya esta cargado, so, no hagas nada
      }
    } else {
      //no hay archivos, lo cargo en memoria
      const archivo = await this.getArchivo(id_archivo);
      await this.setState({ archivo, idArchivo: id_archivo });
    }
    if (this.state.extension.toLowerCase() !== "pdf") {
      this.clickInput();
    } else {
      this.setState({ botonRegistrar: false });
    }
  }
  async handleDescargar(e, id_archivo) {
    const { archivo, idArchivo } = this.state;
    if (archivo) {
      if (idArchivo !== id_archivo) {
        this.setState({ archivo: undefined });
        const archivo = await this.getArchivo(id_archivo);

        await this.setState({ archivo, idArchivo: id_archivo });

        this.clickInput();
      } else {
        this.clickInput();
      }
    } else {
      const archivo = await this.getArchivo(id_archivo);

      await this.setState({ archivo, idArchivo: id_archivo });

      this.clickInput();
    }
  }
  async componentDidMount() {
    if (!this.props.idAlumno) return;
    let listaResultados = await GET({
      servicio: `/api/alumno/informacionrelevante/${this.props.idAlumno}`,
    });
    let datos = [];
    if (!listaResultados) return;
    if (listaResultados.informacionRelevante) {
      listaResultados.informacionRelevante.forEach((archivo, index) => {
        const { ID_INFORMACION_RELEVANTE, DESCRIPCION } = archivo;
        const EXT = DESCRIPCION.split(".")[1];
        datos.push({
          nro: index + 1,
          nombreArchivo: `${DESCRIPCION}`,
          vistaPrevia: (
            <IconButton
              color="primary"
              aria-label="add"
              name="view"
              onClick={(e) =>
                this.handleVistaPrevia(e, ID_INFORMACION_RELEVANTE)
              }
            >
              <i
                style={estilos.fa}
                className={`fa fa-file${
                  "-" + EXT
                    ? "-" +
                      (EXT === "pdf"
                        ? "pdf"
                        : EXT === "docx" || EXT === "docx"
                        ? "word"
                        : "excel") +
                      "-o"
                    : ""
                }`}
                aria-hidden="true"
              ></i>
            </IconButton>
          ),
          descargar: (
            <IconButton>
              <GetAppSharpIcon
                fontSize="large"
                name="download"
                color="primary"
                aria-label="add"
                onClick={(e) =>
                  this.handleDescargar(e, ID_INFORMACION_RELEVANTE)
                }
              />
            </IconButton>
          ),
        });
      });
      await this.setState({
        datosTabla: {
          columns: this.state.datosTablaOffline.columns,
          data: datos,
        },
      });
    }
  }

  /**
   * buffer array read as text
   * @param {Buffer} file
   */
  handleOnSuccesLoad = async (file, fileName, ext) => {
    const tamanio = file.length;

    await this.setState({
      archivo: file,
      fileName: fileName,
      ext: ext,
      extension: ext,
      botonRegistrar: true,
    });
  };
  handleOnClickRegistroSSJ_masivo = async () => {
    this.handleClickOpenLoading();

    new Promise(async (resolve, reject) => {
      await setTimeout(async () => {
        //await this.state.FILE.forEach(async (pedazo, index) => {
        const ARCHIVO = {
          archivo: {
            ID_ALUMNO: this.props.idAlumno,
            ARCHIVO: this.state.archivo,
            EXTENSION: this.state.ext,
            DESCRIPCION: `${this.state.descripcion}`,
            // PARTES: this.state.Npartes,
          },
        };
        let response = await POST({
          servicio: "/api/alumno/informacionrelevante",
          request: ARCHIVO,
        });

        if (!response) {
          //console.log("Algo paso en el upload");
          let mensaje = this.state.mensajesResultado;
          mensaje.push(
            <>
              {`Se registró satisfactoriamente:`}
              <ul>
                <li>{`${this.state.fileName}`}</li>
              </ul>
            </>
          );
          this.setState({ mensajesResultado: mensaje });
          this.handleCloseLoading();
          resolve();
        } else if (response.informacionRelevante.ID_INFORMACION_RELEVANTE) {
          //alert("Se registro la informacion: ", response);
          let mensaje = this.state.mensajesResultado;
          mensaje.push(
            <>
              {`Se registró satisfactoriamente:`}
              <ul>
                <li>{`${this.state.fileName}`}</li>
              </ul>
            </>
          );
          this.setState({ mensajesResultado: mensaje });
          this.handleCloseLoading();
        }
        // });
      }, 1000);
      resolve();
    });
  };
  clickInput() {
    const inputElement = document.getElementById("superDownload");
    inputElement.click();
  }
  removerDatos() {
    this.setState({ archivo: undefined });
  }
  handleClickOpenLoading() {
    this.setState({ open: true });
  }
  handleCloseLoading() {
    new Promise(async (resolve, reject) => {
      await setTimeout(async () => {
        this.setState({ open: false, mensajesResultado: [], peticiones: 0 });
      }, 5000);
      this.removerDatos();
      resolve();
    });
  }
  renderBodyLoading(mensajesResultado) {
    return (
      <>
        <h5>Registrando Archivo: {this.state.fileName}</h5>

        {mensajesResultado}
      </>
    );
  }
  render() {
    const enMantenimiento = false;
    if (enMantenimiento) {
      return <EnConstruccion src="https://ututor-recursos.s3.amazonaws.com/EnMantenimientoKND.jpg"
       />;
    } else {
      return (
        <>
          <JModal
            titulo={"Mensaje de uTutor.com"}
            body={
              <Jloading
                size={"xs"}
                mensaje={this.renderBodyLoading(this.state.mensajesResultado)}
              />
            }
            open={this.state.open}
            hadleClose={this.handleCloseLoading}
            //botonIzquierdo={"Cancelar"}
            //botonDerecho={"Continuar"}
          />
          <Grid container spacing={2} style={{ textAlign: "center" }}>
            {/**tabla de informacuion historica */}
            <Grid item md={4} xs={12}>
              {this.renderTabla(this.state.datosTabla)}
            </Grid>
            {/** vista previa y opcion de descarga */}

            <Grid item md={8} xs={12}>
              <Grid container spacing={0}>
                {this.state.archivo ? (
                  <>
                    <Grid item md={2} xs={6}>
                      <Button
                        color="primary"
                        onClick={() => this.removerDatos()}
                        startIcon={<RestorePageTwoToneIcon />}
                      >
                        Deshacer Carga
                      </Button>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <h3>{"Vista Previa: (Solo PDF)"}</h3>
                    </Grid>
                    <Grid item md={5} xs={12}>
                      <CampoDeTexto
                        variant={"outlined"}
                        name="nombre"
                        label="Nombre del archivo"
                        requerido={true}
                        autoFocus={true}
                        inicial={this.state.fileName}
                        validacion={{ lim: 25 }}
                        onChange={this.handleOnChangeTexto}
                        validarEntrada={() => {}}
                        value={this.state.fileName}
                      />
                    </Grid>
                    <Grid item md={2} xs={6}>
                      <div
                        style={{
                          display: this.state.botonRegistrar ? "block" : "none",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleOnClickRegistroSSJ_masivo}
                          startIcon={<CloudUploadIcon />}
                          disabled={!this.state.archivo}
                        >
                          Registrar
                        </Button>
                      </div>
                    </Grid>
                  </>
                ) : (
                  <Grid item md={12} xs={false} />
                )}
              </Grid>
              <a
                id="superDownload"
                href={this.state.archivo}
                style={{ display: "none" }}
                download={this.state.filename}
              ></a>
              {this.state.archivo && this.state.extension === "pdf" ? (
                <div style={estilos.divini}>
                  <iframe
                    src={this.state.archivo}
                    height={800}
                    frameborder="1"
                    allowfullscreen
                    sandbox
                    width="100%"
                  ></iframe>
                </div>
              ) : (
                <Grid style={estilos.margen}>
                  {/**
                   * <h2>{"Vista previa(solo pdf):"}</h2>
                   */}

                  {(getUser().rol === "Coordinador Facultad" ||
                    getUser().rol === "Coordinador Programa") && (
                    <JUploadSSJ
                      embebed={true}
                      contained={true}
                      id_drop_zone={"drop_zone_archivo"}
                      onSuccesLoadURL={this.handleOnSuccesLoad}
                      onSuccesLoad={this.handleOnSuccesLoad}
                      formato={this.state.formato}
                      maxTamanio={this.state.maxTamanio}
                      extension="any"
                    />
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      );
    }
  }
}

export default VerInformacionRelevante;
