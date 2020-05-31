import React, { Component } from "react";
import { Tab, Tabs, Paper } from "@material-ui/core";
import FormNuevaTutoria from "./FormNuevaTutoria";
import ListaTutorias from "./ListaTutorias";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
  formRegistrarAlumno: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    marginLeft: "3%",
    marginRight: "3%",
  },
  envoltorioFormulario: {
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "2%",
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
};
class TabProceso extends Component {
  constructor() {
    super();
    this.state = {
      tabActivada: 0,
      fomularioNuevaTutoria: FormNuevaTutoria,
      listaDeTutorias: ListaTutorias
    };
    this.activarTab = this.activarTab.bind(this);
  }
  activarTab(tab) {
    this.setState({ tabActivada: tab });
  }
  mostrarTab = (tab) =>{
    console.log("Render");
    switch(tab){
      case 0:  return(<this.state.fomularioNuevaTutoria/>);
      case 1:  return(<this.state.listaDeTutorias/>);
      default: return(<></>);
    }
  }
  render() {
    return (
      <div>
        <Tabs
          centered
          value={this.state.tabActivada}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleTabOnChange}
          aria-label="disabled tabs example"
        >
          <Tab onClick={() =>this.activarTab(0)} label="Nueva Tutoría" />
          <Tab onClick={()=>this.activarTab(1)} label="Lista Tutorías" />
        </Tabs>
        <div style={style.envoltorioFormulario}>
          <Paper elevation={5} style={style.paper}>
            {this.mostrarTab(this.state.tabActivada)}
          </Paper>
        </div>
      </div>
    );
  }
}

export default TabProceso;
