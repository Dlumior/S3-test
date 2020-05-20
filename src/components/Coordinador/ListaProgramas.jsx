import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText } from "@material-ui/core";

class ListaProgramas extends React.Component {
  constructor() {
    super();
    this.state = {
      programas: [
        { ID: 1, NOMBRE: "" },
        { ID: 2, NOMBRE: "Ingenieria Informatica" },
        { ID: 3, NOMBRE: "Ingenieria industrial" },
        { ID: 4, NOMBRE: "Ingenieria Civil" },
        { ID: 5, NOMBRE: "Ingenieria Mecatronicaaaaaaaaaaaaaa" },
      ],
      programa: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.renderProgramas = this.renderProgramas.bind(this);
  }
  handleOnChange(e) {
    this.props.escogerPrograma( e.target.value);
    this.setState({ programa: e.target.value });
    e.target.value=this.state.programa;

  }
  renderProgramas = () => {
    return (
      <div>
        {this.state.programas.map((programa) => (
          <MenuItem key={programa.ID} value={programa.NOMBRE}>
            {" "}
            {programa.NOMBRE}
          </MenuItem>
        ))}
      </div>
    );
  };
  componentDidMount() {
    /** METODO GET PENDIENTE
        let listaProgramas = await Conexion.GET({this.props.enlace});
        if(listaProgramas) this.setstate({programas:listaProgramas});
    */
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.programas != this.state.programas) {
      return true;
    }
    if (nextState.programa != this.state.programa) {
      return true;
    }
    return false;
  }
  render() {
    return (
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
          {this.state.programas.map((programa) => (
            <MenuItem key={programa.ID} value={programa}>
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
