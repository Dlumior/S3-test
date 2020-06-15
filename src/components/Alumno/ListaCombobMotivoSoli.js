import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText, Paper } from "@material-ui/core";
import { GET } from "../../Conexion/Controller";

const estilos = {
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
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
class ListaCombobMotivoSoli extends Component {
  constructor() {
    super();
    this.state = {
      listaItems: [],
      item: [],
      mensajeError: "",
      local: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  
    }
    
    async handleOnChange(e) {
      //if lcal
    if (this.state.item.length === 0) {
      if (this.state.mensajeError.length === 0) {
        this.setState({
          mensajeError: "Debe escojer al menos un " + this.props.mensaje,
        });
      }
    }
    if (this.state.mensajeError.length > 0) {
      this.setState({
        mensajeError: "",
      });
    }
    let item = e.target.value;
    let listaItems = [];
    listaItems.push(item);
    await this.props.escogerItem(listaItems);
    this.setState({ item: e.target.value });
    e.target.value = this.state.item;
  }

  async componentDidMount() {
    if (this.props.datos) {
      this.setState({ listaItems: this.props.datos });
      this.setState({local:true});
      return;
    }
    let listaItems = await  GET({ servicio: this.props.enlace });
    this.setState({ listaItems: listaItems[this.props.keyServicio] });
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

  handleOnClick(e){
    console.log("CLLIIIIIIICK");
    if (this.state.item.length === 0) {
      if (this.state.mensajeError.length === 0) {
        this.setState({
          mensajeError: "Debe escojer al menos un " + this.props.mensaje,
        });
      }
    }
  }
  
 

  render() {
    return (
      <Paper elevation={0} style={estilos.paper}>
        <br />
        <FormControl fullWidth onclick={this.handleOnClick}>
          <InputLabel >
            {this.props.titulo}
          </InputLabel>
          {/* combo box propiamente */}
          <Select
            value={this.state.item}
            onChange={this.handleOnChange}
            //displayEmpty
          >
             
               {this.state.listaItems.map((item) => (
              <MenuItem key={item[this.props.id]} value={item}>
                {" "}
                {item[this.props.nombre]}
              </MenuItem>
            ))}
               

          {/*
          <MenuItem value={1}>Académico</MenuItem>
          <MenuItem value={2}>Académico Administrativo</MenuItem>
          <MenuItem value={3}>Vocacional</MenuItem>
          <MenuItem value={4}>Personal</MenuItem>
          <MenuItem value={5}>Otro</MenuItem>
          */}

          </Select>
          <FormHelperText>Escoja el motivo</FormHelperText>
        </FormControl>
        <FormHelperText error>{this.state.mensajeError}</FormHelperText>
      </Paper>
    );
  }
}

export default ListaCombobMotivoSoli;
