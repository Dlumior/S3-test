import React, { Component } from "react";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";
import JUploadSSJ from "jin-upload-ssj2";
import { GET } from "../../../Conexion/Controller";
import { IconButton, Grid, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import JDownloadButtonIcon from "downloadssj";
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
class VerInformacionRelevante extends Component {
  constructor() {
    super();
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
          { title: "Nombre del archivo", field: "nombreArchivo" },
          { title: "Vista Previa", field: "vistaPrevia" },
          { title: "Descargar", field: "descargar" },
        ],
        data: [],
      },
    };
    this.handleVistaPrevia = this.handleVistaPrevia.bind(this);
    this.handleDescargar = this.handleDescargar.bind(this);
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
  async handleVistaPrevia(e, idArchivo) {
    const { archivo } = this.state;
    if (archivo) {
      if (archivo.idArchivo !== idArchivo) {
        // si hay archivo i los id son dif,pide al back y muestra
        const archivo = await GET({servicio:`/api/alumno/informacionrelevante/descargar/${idArchivo}`});
      }else{
          //ya esta cargado, so, no hagas nada
      }
    }
  }
  async handleDescargar(e, idArchivo) {
    if (!this.state.archivo) {
      //descarga
      const archivo = await GET({servicio:`/api/alumno/informacionrelevante/descargar/${idArchivo}`});
        await this.setState({archivo:archivo});
      this.clickInput();
    }
  }
  async componentDidMount() {
    if (!this.props.idAlumno) return;
    let listaResultados = await GET({
      servicio: `/api/alumno/informacionrelevante/${this.props.idAlumno}`,
    });
    let datos = [];
    if(!listaResultados) return;
    if (listaResultados.informacionRelevante) {
      listaResultados.informacionRelevante.forEach((archivo,index) => {
        const { ID_INFORMACION_RELEVANTE, DESCRIPCION } = archivo;
        datos.push({
          nro: index + 1,
          nombreArchivo: DESCRIPCION,
          vistaPrevia: (
            <IconButton>
              <VisibilityTwoToneIcon
                fontSize="large"
                color="primary"
                aria-label="add"
                onClick={(e) =>
                  this.handleVistaPrevia(e, ID_INFORMACION_RELEVANTE)
                }
              />
            </IconButton>
          ),
          descargar: (
            <JDownloadButtonIcon
            />
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
  clickInput() {
    const inputElement = document.getElementById("superDownload");
    inputElement.click();
  }
  render() {
    return (
      <Grid container spacing={2} style={{ textAlign: "center" }}>
        {/**tabla de informacuion historica */}
        <Grid item md={4} xs={12}>
          {this.renderTabla(this.state.datosTabla)}
        </Grid>
        {/** vista previa y opcion de descarga */}
        <Grid item md={8} xs={12}>
        <a id="superDownload" href={this.props.archivo} style={{display: "none"}} download></a>
          {this.state.archivo ? (
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
            <Paper style={estilos.margen}>
              <a id="superDownload" href={this.state.archivo} style={{display: "none"}} download></a>
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
      </Grid>
    );
  }
}

export default VerInformacionRelevante;
