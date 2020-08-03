import "./styles_Jloading.css";
import React from "react";
import { Component } from "react";
const estilo = {
  generalBlanco:{
    marginTop: "2%",
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  general: {
    textAlign: "center",
  },
  loading: {
    marginTop: "25%",
    color: "#3AAFA9",
    textAlign: "center",
  },
  miniLoading: {
    color: "#3AAFA9",
    textAlign: "center",
  },
  md: {
    textAlign: "center",
    marginTop: "15%",
  },
  lg: {
    textAlign: "center",
    marginTop: "30%",
  },
  base: {
    height: "20px",
  },
  tema: {
    background: "#3AAFA9",
  },
};
export default class Jloading extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { size, base,fondoBlanco } = this.props;
    if (size === "lg") {
      return (
        <div style={estilo.general}>
          <div className="lds-roller" style={estilo.lg}>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
          </div>
          <p>{this.props.mensaje}</p>
          <div style={base ? estilo.base : { display: "none" }}></div>
        </div>
      );
    } else if (size === "md") {
      return (
        <div style={fondoBlanco?estilo.generalBlanco:estilo.general}>
          <div className="lds-roller" style={estilo.md}>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
            <div style={estilo.tema}></div>
          </div>
          <p>{this.props.mensaje}</p>
          <div style={base ? estilo.base : { display: "none" }}></div>
        </div>
      );
    } else
      return (
        <div style={{ textAlign: "center" }}>
          <div
            className="lds-roller"
            style={
              this.props.size === "xs" ? estilo.miniLoading : estilo.loading
            }
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{this.props.mensaje}</p>
        </div>
      );
  }
}
