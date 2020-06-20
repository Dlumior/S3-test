import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText } from "@material-ui/core";
import * as Conexion from "../../../Conexion/Controller";

class ListaTutores extends React.Component {
  constructor() {
    super();
    this.state = {
      tutores: [
        
      ],
      tutor: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnChange(e) {
      let tutor = e.target.value;
      let tutores = [];
      tutores.push(tutor.ID_TUTOR);
    await this.props.escogerTutor(tutor.ID_TUTOR);
    this.setState({ tutor: e.target.value });
    e.target.value=this.state.tutor;
  }
  async componentDidMount() {
    let listaTutor = await Conexion.GET({servicio:this.props.enlace});
    console.log("TUTORES",listaTutor);
    this.setState({tutores:listaTutor.tutores});    
    console.log("TUTORES del state",this.state.tutores);
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.tutores !== this.state.tutores) {
      return true;
    }
    if (nextState.tutor !== this.state.tutor) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <FormControl >
        <InputLabel  id="demo-simple-select-placeholder-label-label">
          {this.props.titulo}
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label-label"
          value={this.state.tutor}
          onChange={this.handleOnChange}
          displayEmpty
        >
          {this.state.tutores.map((tutor) => (
            <MenuItem key={tutor.ID_TUTOR} value={tutor}>
              {" "}
              {tutor.USUARIO.NOMBRE + " " + tutor.USUARIO.APELLIDOS}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Escoja el Tutor</FormHelperText>
      </FormControl>
    );
  }
}
export default ListaTutores;
