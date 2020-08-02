import React, { Component } from "react";
import { Paper, Grid, Button } from "@material-ui/core";
//import JUpload from "../components/JUpload";
import JUploadSSJ from "jin-upload-ssj2";
import { POST } from "./../../../Conexion/Controller";
import RestorePageTwoToneIcon from "@material-ui/icons/RestorePageTwoTone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CampoDeTexto from "../Tutorias/CampoDeTexto.jsx";
import { getUser } from "../../../Sesion/Sesion";

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
};
class InformacionRelevante extends Component {
  constructor() {
    super();
    this.state = {
      ext: "",
      FILE: undefined,
      PDFURL: undefined, //"https://docs.google.com/spreadsheets/d/1oSxMZF5XqqBAKdB7NIhNqdsY9koleR6gQauWST-g6G0/edit#gid=1734096007",
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
      descripcion: "",
      Npartes:0,
    };
    this.handleOnSuccesLoad = this.handleOnSuccesLoad.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
    this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
    this.handleOnChangeFacultad = this.handleOnChangeFacultad.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.handleOnClickRegistroSSJ_masivo = this.handleOnClickRegistroSSJ_masivo.bind(
      this
    );
    this.removerDatos = this.removerDatos.bind(this);
  }
  handleOnChangeTexto = (e) => {
    // nombre y descripcion
    this.setState({ descripcion: e.value });
  };
  handleOnChangePrograma(listaPrograma) {
    //console.log("proograma:", listaPrograma);
    this.setState({ programas: listaPrograma });
  }
  handleOnChangeFacultad(facultad) {
    //console.log("HAAAAAAAAAA facu:", facultad);

    const usuario = this.state.usuario;
    const subrol = this.getSubRol(
      getUser().rol
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
      getUser().rol
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
  /**
   * buffer array read as text
   * @param {Buffer} file
   */
  handleOnSuccesLoadURL = async (file, fileName, ext) => {
    ////console.log("++URL: ", file);
    //console.log("JUpload SSJ length: ", file.length);
    ////console.log("JUpload SSJ split: ", file.split("\n"));
    const tamanio = file.length;
    // let splitedFile = [];
    // var i,
    //   j,
    //   chunk = 1024 * 100 * 5;
    // for (i = 0, j = tamanio; i < j; i += chunk) {
    //   splitedFile.push(file.slice(i, i + chunk));
    //   // do whatever
    // }
    // const Npartes = splitedFile.length;
    // //console.log("JUpload SSJ split: ", splitedFile);
    await this.setState({ FILE: file });
    this.setState({ fileName: fileName, ext: ext });
    if (ext === "pdf") {
      this.setState({ PDFURL: file });
    }
    //const alumnosFromCSV = await readCSV(file, "alumnos");
  };
  /**
   * buffer array read as text
   * @param {Buffer} file
   */
  handleOnSuccesLoad = async (file, fileName) => {
    //console.log("++64: ", file);

    this.setState({ fileName: fileName });
    this.setState({ FILE: file });
    //const alumnosFromCSV = await readCSV(file, "alumnos");
  };
  validarEntrada(error) {
    //console.log("errores:", error);
  }
  handleOnClickRegistroSSJ_masivo = async () => {
    new Promise(async (resolve, reject) => {
      await setTimeout(async () => {
        //await this.state.FILE.forEach(async (pedazo, index) => {
          const ARCHIVO = {
            archivo: {
              ID_ALUMNO: this.props.idAlumno,
              ARCHIVO: this.state.FILE,
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
            return;
          } else {
            //console.log("Se registró la informacion: ", response);
          }
       // });

        
      }, 1000);
      resolve();
    });
  };

  async componentDidMount() {
    const { usuario, idAlumno } = this.props;
    if (!usuario || !idAlumno) {
      return;
    }

    await this.setState({ loguedIn: true, usuario: usuario });
  }
  removerDatos() {
    this.setState({ PDFURL: undefined });
  }
  renderToolbar() {}
  render() {
    if (this.state.loguedIn) {
      return (
        <Grid container spacing={2} style={{ textAlign: "center" }}>
          <Grid container spacing={0}>
            {this.state.PDFURL ? (
              <Grid item md={2} xs={6}>
                <Button
                  color="primary"
                  onClick={() => this.removerDatos()}
                  startIcon={<RestorePageTwoToneIcon />}
                >
                  Deshacer Carga
                </Button>
              </Grid>
            ) : (
              <Grid item md={2} xs={false} />
            )}
            <Grid item md={5} xs={12}>
              <h3>{"Vista Previa: (Solo archivos .pdf)"}</h3>
            </Grid>
            <Grid item md={3} xs={12}>
              <CampoDeTexto
                variant={"outlined"}
                name="nombre"
                label="Descripcion o comentarios"
                requerido={true}
                autoFocus={true}
                inicial={this.state.fileName}
                validacion={{ lim: 25 }}
                onChange={this.handleOnChangeTexto}
                validarEntrada={this.validarEntrada}
                value={this.state.fileName}
              />
            </Grid>
            {this.state.PDFURL || this.state.FILE ? (
              <>
                <Grid item md={2} xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleOnClickRegistroSSJ_masivo}
                    startIcon={<CloudUploadIcon />}
                    disabled={!this.state.FILE}
                  >
                    Registrar
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item md={2} xs={false} />
            )}
          </Grid>

          <Grid item md={12} xs={12}>
            {this.state.PDFURL ? (
              <div style={estilos.divini}>
                <iframe
                  src={this.state.PDFURL}
                  height={800}
                  frameborder="1"
                  allowfullscreen
                  sandbox
                  width="100%"
                ></iframe>
              </div>
            ) : (
              <Paper style={estilos.margen}>
                <JUploadSSJ
                  embebed={true}
                  contained={true}
                  id_drop_zone={"drop_zone_archivo"}
                  onSuccesLoadURL={this.handleOnSuccesLoadURL}
                  onSuccesLoad={this.handleOnSuccesLoad}
                  formato={this.state.formato}
                  maxTamanio={this.state.maxTamanio}
                  extension="any"
                />
              </Paper>
            )}
          </Grid>

          {/** eliminar data */}
        </Grid>
      );
    } else {
      return <h1>Algo paso reintente en un momento</h1>;
    }
  }
}
export default InformacionRelevante;
{
  /**<TituloFormulario titulo="Importar Informacion relevante" />
   * Te la creiste Wey aun esta en construcción XDDDD
   * Lo que viste fue una ilusion XD
   * PD. holiiiiiiisss aha ha ha haaaa (Cat-2012)
   * PD2. TE ODIO HOOKS
   * PD3. lo subo cuando lo acabe DE hacerlo XDDDDDD
   */
}
