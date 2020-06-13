import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText, Paper } from "@material-ui/core";
import * as Conexion from "../../../Conexion/Controller";
const estilos = {
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
    flexDirection: "column",
  },
};
/**
 * @deprecated Clase deprecada, ahora la clase generica de cualquier item es ListaComboBox.jsx
 */
class ListaFacultades extends React.Component {
  constructor() {
    super();
    this.state = {
      facultades: [
        
      ],
      facultad: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnChange(e) {
      let facultad = e.target.value;
      let facultades = [];
      facultades.push(facultad.ID_PROGRAMA);
    await this.props.escogerFacultad(facultades);
    this.setState({ facultad: e.target.value });
    e.target.value=this.state.facultad;
  }
 
  async componentDidMount() {
    let listaFacultades = await Conexion.GET({servicio:this.props.enlace});
    console.log("facultades",listaFacultades);
    this.setState({facultades:listaFacultades.facultad});
    console.log("facultades del state",this.state.facultades);    
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.facultades !== this.state.facultades) {
      return true;
    }
    if (nextState.facultad !== this.state.facultad) {
      return true;
    }
    return false;
  }
  
  render() {
    return (
      <Paper elevation={0} style={estilos.paper}>
      <br />
      <FormControl fullWidth>
        <InputLabel  id="demo-simple-select-placeholder-label-label">
          {this.props.titulo}
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.state.programa}
          onChange={this.handleOnChange}
          displayEmpty
        >
          {this.state.facultades.map((facultad) => (
            <MenuItem key={facultad.ID_PROGRAMA} value={facultad}>
              {" "}
              {facultad.NOMBRE}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Escoja la facultad</FormHelperText>
      </FormControl>
      </Paper>
    );
  }
}
export default ListaFacultades;
