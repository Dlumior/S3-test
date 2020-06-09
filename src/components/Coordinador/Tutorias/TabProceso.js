import React, { Component } from "react";
import { Tab, Tabs, Paper } from "@material-ui/core";
const style = {
  paper: {
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
  envoltorioFormulario: {
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "2%",
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
  tabs: {
    backgroundColor: "#ffffff",
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
    this.rendertabs = this.rendertabs.bind(this);
  }
  activarTab(tab) {
    console.log("lo que seaCTM!!!!");
    this.setState({ tabActivada: tab });
    this.setState({ procesoActivo: this.state.procesos[tab].proceso });
  }

  mostrarTab = (props) => {
    console.log("Render", props);
    this.setState({ procesoActivo: this.state.procesos[props.tab].proceso });
    return <this.state.procesoActivo regreso={this.activarTab}/>;
  };

  componentWillMount() {
    if (this.props.procesos) {
      this.setState({ procesos: this.props.procesos });
      this.setState({ procesoActivo: this.props.procesos[0].proceso });
    }
  }
  rendertabs() {
    if (
      this.props.procesos.length === 1 &&
      this.props.procesos[0].titulo.length === 0
    ) {
      return <></>;
    }
    return (
      <Tabs
        centered
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
    );
  }
  render() {    
    return (
      <div style={style.tabs}>
        {this.rendertabs()}
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
