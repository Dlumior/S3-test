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
class ListaProgramas extends React.Component {
  constructor() {
    super();
    this.state = {
      programas: [
        
      ],
      programa: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnChange(e) {      
      let programa = e.target.value;
      let programas = [];
      programas.push(programas);
    //cambio para que envie string y no array
    await this.props.escogerPrograma(programa.ID_PROGRAMA);
    this.setState({ programa: e.target.value });
    e.target.value=this.state.programa;
  }
 
  async componentDidMount() {
    let listaProgramas = await Conexion.GET({servicio:this.props.enlace});
    console.log("programas",listaProgramas);
    this.setState({programas:listaProgramas.programa});
    console.log("programas del state",this.state.programas);    
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.programas !== this.state.programas) {
      return true;
    }
    if (nextState.programa !== this.state.programa) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <FormControl width={"5"}>
        <InputLabel  id="demo-simple-select-placeholder-label-label">
          {this.props.titulo}
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.state.programa}
          onChange={this.handleOnChange}
        >
          {this.state.programas.map((programa) => (
            <MenuItem key={programa.ID_PROGRAMA} value={programa}>
              {" "}
              {programa.NOMBRE}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Escoja el programa</FormHelperText>
      </FormControl>
    );
  }
}
export default ListaProgramas;
