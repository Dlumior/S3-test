import "./styles_Jloading.css";
import React from "react";
import { Component } from "react";
const estilo={
  loading:{
    marginTop: "25%",
    color: "#3AAFA9",
    textAlign: "center",
  }
}
export default class Jloading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
      <div className="lds-roller" style={estilo.loading}>
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
      </>
    );
  }
}
