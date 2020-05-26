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
      procesoActivo: {},
      procesos: [],
    };
    this.activarTab = this.activarTab.bind(this);
  }
  activarTab(tab) {
    this.setState({ tabActivada: tab });
    this.setState({ procesoActivo: this.state.procesos[tab].proceso });
  }

  mostrarTab = (props) => {
    console.log("Render", props);
    this.setState({ procesoActivo: this.state.procesos[props.tab].proceso });
    return <this.state.procesoActivo />;
  };
  componentWillMount() {
    if (this.props.procesos) {
      this.setState({ procesos: this.props.procesos });
      this.setState({ procesoActivo: this.props.procesos[0].proceso });
    }
  }
  render() {
    return (
      <div>
        <Tabs
          value={this.state.tabActivada}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleTabOnChange}
          aria-label="disabled tabs example"
        >
          {this.props.procesos.map((proceso) => (
            <Tab
              onClick={() => this.activarTab(proceso.index)}
              label={proceso.titulo}
            />
          ))}
        </Tabs>
        <div style={style.envoltorioFormulario}>
          <Paper elevation={5} style={style.paper}>
            <this.state.procesoActivo />
          </Paper>
        </div>
      </div>
    );
  }
}

export default TabProceso;
