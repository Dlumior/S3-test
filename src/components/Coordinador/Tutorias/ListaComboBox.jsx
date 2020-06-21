import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText, Paper } from "@material-ui/core";
import * as Conexion from "../../../Conexion/Controller";
const estilos = {
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "3%",
    flexDirection: "column",
  },
};
/**
 * Ejemplo de invocacion con datos fijos(se le debe entragar el array con los datos)
 * el prop "datos" es opcional,pero si se manda ya no hara llamado al backend
 * 
 * <ListaComboBox
      escogerItem={this.handleOnChangeDuracion}
      titulo={"Duracion Maxima"}
      datos={[
        { ID: 30, NOMBRE: "30 min" },
        { ID: 60, NOMBRE: "60 min" },
      ]}
      id={"ID"}
      nombre={"NOMBRE"}
    />
 * 
 * Ejemplo de invocacion con llamado al backend:
 * 
 * <ListaComboBox
      titulo={"Programas"}
      enlace={"/api/programa"}
      id={"ID_PROGRAMA"}
      nombre={"NOMBRE"}
      keyServicio={"programa"}
      escogerItem={this.handleOnChangePrograma}
    />
 * 
 */
class ListaComboBox extends Component {
  constructor() {
    super();
    this.state = {
      listaItems: [],
      item: [],
      mensajeError: "",
      local: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  async handleOnChange(e) {
    //if lcal
    if (this.state.listaItems.length === 0) return;
    if (this.state.mensajeError.length > 0) {
      this.setState({
        mensajeError: "",
      });
    }
    let item = e.target.value;
    let listaItems = [];
    listaItems.push(item[this.props.id]);
    await this.props.escogerItem(listaItems);
    this.setState({ item: e.target.value });
    //e.target.value = this.state.item;
  }

  async componentDidMount() {
    if (this.props.datos) {
      this.setState({ listaItems: this.props.datos });
      this.setState({ local: true });
      return;
    }

    let listaItems = await Conexion.GET({ servicio: this.props.enlace });
    if (!listaItems || listaItems.length===[]) {
      this.setState({ listaItems: [] });
    } else {
      if (this.props.inicial) {
        console.log("item---->: ", listaItems);

        if (this.state.item && listaItems.length>0) {
          
          this.setState({ item: listaItems[this.props.keyServicio][0] });
          await this.setState({
            listaItems: listaItems[this.props.keyServicio],
          });
          await this.props.escogerItem([this.state.item[this.props.id]]);
        }
      }
    }
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.listaItems !== this.state.listaItems) {
      return true;
    }
    if (nextState.item !== this.state.item) {
      return true;
    }
    return false;
  }
  handleOnClick(e) {
    console.log("CLLIIIIIIICK");
    if (this.state.listaItems.length === 0) return;

    if (this.state.item.length === 0) {
      if (this.state.mensajeError.length === 0) {
        this.setState({
          mensajeError: "Debe escoger al menos un " + this.props.mensaje,
        });
      }
    }
  }
  render() {
    console.log("COMBOOO:", this.props.enlace);
    return (
      <Paper elevation={0} style={estilos.paper}>
        {this.props.small ? <></> : <br />}
        <FormControl fullWidth onClick={this.handleOnClick}>
          <InputLabel>{this.props.titulo}</InputLabel>
          {/* combo box propiamente */}
          <Select value={this.state.item} onChange={this.handleOnChange}>
            {this.state.listaItems.map((item) => (
              <MenuItem key={item[this.props.id]} value={item}>
                {" "}
                {item[this.props.nombre]}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {this.props.placeholder
              ? this.props.placeholder
              : "placeholder sin definir"}
          </FormHelperText>
        </FormControl>
        <FormHelperText error>{this.state.mensajeError}</FormHelperText>
      </Paper>
    );
  }
}

export default ListaComboBox;
