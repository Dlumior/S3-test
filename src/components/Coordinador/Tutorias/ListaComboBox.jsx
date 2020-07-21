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
    //this.handleOnClick = this.handleOnClick.bind(this);
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
    // decido si devuelvo Id o el objeto completo
    if (this.props.allObject) {
      //console.log("All object activated: ", item);
      await this.props.escogerItem(item);
    } else {
      listaItems.push(item[this.props.id]);
      listaItems.push(item["DURACION"]);  //trato de devolver tambien en el array la duracion caso tuto variable

      await this.props.escogerItem(listaItems);
    }

    this.setState({ item: e.target.value });
    //e.target.value = this.state.item;
  }

  async componentDidMount() {
    let listaItems;
    if (this.props.datos) {
      //console.log("this.props.datos---->: ", listaItems);
      listaItems = this.props.datos;

    } else {
      listaItems = await Conexion.GET({ servicio: this.props.enlace });
      if(!listaItems) return;
      //console.log("No habian this.props.datos---->: ", listaItems);
      //console.log("this.props.enlace nuevo", this.props.enlace);

      //console.log("*entreeeee---->nuevo", listaItems);
    }
    if (
      !listaItems[this.props.keyServicio] ||   listaItems[this.props.keyServicio].length === 0
    ) {
      //console.log("*entreeeee---->vacio", listaItems);
      if (this.props.allObject) {
        this.props.escogerItem(undefined);
      } else {

        this.props.escogerItem([0]);
      }

      await this.setState({ listaItems: [] });
    } else {
      /** Parche porque el api devuelve Json diferente cuando es coord de facultad o de programa */

      if (listaItems[this.props.keyServicio].length > 0) {
        //console.log( "entreeeee---->: ",  this.props.subnombre ? listaItems[this.props.keyServicio][0][this.props.subnombre] : listaItems[this.props.keyServicio][0] );
        // En item el primero
        this.setState({
          item: listaItems[this.props.keyServicio][0],
        });
        //En la lista todo
        await this.setState({
          listaItems: listaItems[this.props.keyServicio],
        });
        //le digo al formulario padre que ya escogi uno
        
        await this.props.escogerItem(
          this.props.subnombre
            ? [this.state.item[this.props.subnombre][this.props.id]]
            : [this.state.item[this.props.id],this.state.item["DURACION"]]
        );
      }

    }
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.enlace !== this.props.enlace) {
      //console.log("Nueva enlace", nextProps.enlace);
      let listaItems = await Conexion.GET({ servicio: nextProps.enlace });
      //console.log("this.props.enlace nuevo", this.props.enlace);

      //console.log("*entreeeee---->nuevo", listaItems);

      if (
        !listaItems[this.props.keyServicio] ||
        listaItems[this.props.keyServicio].length === 0
      ) {
        //console.log("*entreeeee---->vacio", listaItems);
        if (this.props.allObject) {
          this.props.escogerItem(undefined);
        } else {
          this.props.escogerItem([0]);
        }

        await this.setState({ listaItems: [] });
      } else {
        /** Parche porque el api devuelve Json diferente cuando es coord de facultad o de programa */

        if (listaItems[this.props.keyServicio].length > 0) {
          /*console.log(
            "entreeeee---->: ",
            this.props.subnombre
              ? listaItems[this.props.keyServicio][0][this.props.subnombre]
              : listaItems[this.props.keyServicio][0]
          );*/
          // En item el primero
          this.setState({
            item: listaItems[this.props.keyServicio][0],
          });
          //En la lista todo
          await this.setState({
            listaItems: listaItems[this.props.keyServicio],
          });
          //le digo al formulario padre que ya escogi uno
          if (this.props.allObject) {
            await this.props.escogerItem(
              this.props.subnombre
                ? this.state.item[this.props.subnombre]
                : this.state.item
            );
          } else {
            await this.props.escogerItem(
              this.props.subnombre
                ? [this.state.item[this.props.subnombre][this.props.id]]
                : [this.state.item[this.props.id]]
            );
          }
        }
      }
    }
  }

  render() {
    //console.log("**listaItems Vacio", this.state.listaItems);
    if (this.state.listaItems.length === 0) {
      return <h1></h1>;
    } else {
      return (
        <Paper elevation={0} style={estilos.paper}>
          {this.props.small ? <></> : <br />}

          <FormControl fullWidth>
            <InputLabel>{this.props.titulo}</InputLabel>

            {/* combo box propiamente */}
            <Select value={this.state.item} onChange={this.handleOnChange}>
              {this.state.listaItems.map((item) => (
                <MenuItem
                  key={
                    this.props.subnombre
                      ? item[this.props.subnombre][this.props.id]
                      : item[this.props.id]
                  }
                  value={item}
                >
                  {this.props.subnombre
                    ? item[this.props.subnombre][this.props.nombre]
                    : item[this.props.nombre]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {this.props.placeholder ? this.props.placeholder : ""}
            </FormHelperText>
          </FormControl>
          <FormHelperText error>{this.state.mensajeError}</FormHelperText>
        </Paper>
      );
    }
  }
}

export default ListaComboBox;
