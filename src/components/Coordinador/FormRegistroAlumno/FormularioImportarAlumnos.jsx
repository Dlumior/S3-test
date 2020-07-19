import React, { Component } from "react";
import { Paper, Grid, Button } from "@material-ui/core";

import JMaterialCSVUploadSSJ from "jinssj-mat-table-drop-upload-csv";

import {
  parseMaterialJTable,
  validateMaterialJTableData,
} from "./utilssj/UtilsSSJ.js";
import RestorePageTwoToneIcon from "@material-ui/icons/RestorePageTwoTone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { GET, POST } from "../../../Conexion/Controller.js";
import CampoDeTexto from "../Tutorias/CampoDeTexto.jsx";
import ListaComboBox from "../Tutorias/ListaComboBox.jsx";
import ListaEtiquetas from "../Tutorias/ListaEtiquetas.jsx";
import JModal from "../ListaAlumnos/JModal.jsx";
import Jloading from "./Jloading.jsx";
import { getUser } from "../../../Sesion/Sesion.js";
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
      open: false,
    };
    this.handleOnSuccesLoad = this.handleOnSuccesLoad.bind(this);
    this.validarEntrada = this.validarEntrada.bind(this);
    this.handleOnChangeTexto = this.handleOnChangeTexto.bind(this);
    this.getSubRol = this.getSubRol.bind(this);
    this.getEnlace = this.getEnlace.bind(this);
    this.handleOnChangeFacultad = this.handleOnChangeFacultad.bind(this);
    this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
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

  async handleOnClickRegistroSSJ_masivo() {
    alert("Registrando Alumnos espere...");
    this.handleClickOpenLoading();
    const { data } = this.state.alumnosTabla;
    const tags = this.state.columnasLimpias;
    console.log("Registrando ", data);
    if (!data || data?.length === 0) {
      alert("aun no hay datos sorry man XD");
      this.handleCloseLoading();
      return;
    }
    let alumnosMasivo = [];
    await data.forEach(async (registro) => {
      let ALUMNO = {};
      await tags.forEach((tag) => {
        ALUMNO[tag.toUpperCase()] = registro[tag.toLowerCase()];
      });
      ALUMNO.PROGRAMA = this.state.programas;
      ALUMNO.CONTRASENHA = "youthinkyouknowme";
      ALUMNO.USUARIO = ALUMNO.CORREO;
      ALUMNO.ETIQUETA = this.state.etiquetas;
      console.log("Registrando ALUMNO", ALUMNO);
      //console.log("Podria registrar: ", ALUMNO);
      alumnosMasivo.push(ALUMNO);
    });
    let response = await POST({
      servicio: "/api/alumno/registromasivo",
      request: { alumnos: alumnosMasivo },
    });
    if (!response || response.error) {
      alert("Hubo un error insperado");
    } else if (response.errores) {
      alert("Error ", response.errores);
    } else {
      //se registro bien
    }
    this.handleCloseLoading();
  }
  handleOnChangeEtiquetas = async (etiqueta) => {
    //primero que llegue
    //luego que se guarde en un state
    //console.log("LLegue: ", etiqueta);
    const listaEtiquetas = [];
    etiqueta.forEach((element) => {
      if (element.agregar) {
        listaEtiquetas.push(element.id);
      }
    });
    await this.setState({ etiquetas: listaEtiquetas });
    //this.setState({tutoria:tutoria});
    console.log("Seteado: ", this.state.etiqueta);
  };
  handleOnChangePrograma(listaPrograma) {
    console.log("proograma:", listaPrograma);
    this.setState({ programas: listaPrograma });
  }
  handleOnChangeFacultad(facultad) {
    console.log("HAAAAAAAAAA facu:", facultad);

    const usuario = this.state.usuario;
    const subrol = this.getSubRol(getUser().rol);
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
        <Grid item md={8} xs={8} />
        {/** Boton registarr */}
        <Grid item md={2} xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOnClickRegistroSSJ_masivo}
            startIcon={<CloudUploadIcon />}
          >
            Registrar
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
          title="Vista Previa de los datos antes del registro (solo archivos .CSV)"
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
          <JModal
            titulo={"Mensaje de uTutor.com"}
            body={<Jloading mensaje={"Registrando Alumnos"} />}
            open={this.state.open}
            hadleClose={this.handleCloseLoading}
            //botonIzquierdo={"Cancelar"}
            //botonDerecho={"Continuar"}
          />
          <Grid container spacing={1} style={estilos.paper}>
            {/** nombre del archivo */}
            <Grid item md={2} xs={12}>
              <CampoDeTexto
                variant={"outlined"}
                name="nombre"
                label="Nombre del archivo"
                requerido={true}
                autoFocus={true}
                inicial={this.state.fileName}
                validacion={{ lim: 25 }}
                onChange={this.handleOnChangeTexto}
                validarEntrada={this.validarEntrada}
                value={this.state.fileName}
              />
            </Grid>
            {/**CB1 */}
            <Grid item md={3} xs={12}>
              <ListaComboBox
                mensaje="facultad"
                titulo={"Facultad"}
                enlace={this.getEnlace(this.state.usuario)}
                id={"ID_PROGRAMA"}
                nombre={"NOMBRE"}
                subnombre={
                  this.getSubRol(getUser().rol) === "programa"
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
            {/**CB2 */}
            <Grid item md={3} xs={12}>
              {this.state.filtroFacultad ? (
                <ListaComboBox
                  mensaje="programa"
                  titulo={"Programa"}
                  enlace={this.state.filtroFacultad}
                  id={"ID_PROGRAMA"}
                  nombre={"NOMBRE"}
                  keyServicio={
                    this.getSubRol(getUser().rol) === "programa"
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
            {/**Etiquetas */}
            <Grid item md={4} xs={12}>
              <ListaEtiquetas
                small={true}
                strecht={false}
                titulo={"Etiquetas(opcional):"}
                obtenerEtiquetas={this.handleOnChangeEtiquetas}
                enlace={"/api/etiqueta"}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {this.renderTable(this.state.alumnosTabla)}
            </Grid>
          </Grid>
          {/**
           * Te la creiste Wey aun esta en construcción XDDDD
           * Lo que viste fue una ilusion XD
           * PD. holiiiiiiisss aha ha ha haaaa (Cat-2012)
           * PD2. TE ODIO HOOKS
           * PD3. lo subo cuando lo acabe de hacerloXDDDDDD
           */}

          {/**
                   * <JinUploadSSJ
                  usuario={getUser().usuario}
                />
                   */}
        </>
      );
    } else {
      return <Jloading mensaje={"Cargando"} size={"xs"} />;
    }
  }
}

export default FormularioImportarAlumnos;
