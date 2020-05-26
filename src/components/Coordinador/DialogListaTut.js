import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as Controller from "./../../Conexion/Controller";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText } from "@material-ui/core";

import {Paper,Tabs,Tab,Radio,} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';


class DialogListaTut extends Component {
    constructor() {
        super();
        this.state={
            tutores:[],
            tutor:[]
        };    
        this.renderTutores = this.renderTutores.bind(this);
        
    };
    async componentDidMount(){
        let arregloDeTutores=await Controller.GET({servicio:this.props.enlace});
        console.log("arreglo: ",arregloDeTutores);
        
        this.setState({tutores:arregloDeTutores.tutor});    
        console.log("TUTORES del state",this.state.tutores);
    }
    shouldComponentUpdate(nextState, nextProps) {
        if (nextState.tutores != this.state.tutores) {
          return true;
        }
        if (nextState.tutor != this.state.tutor) {
          return true;
        }
        return false;
    }  
    async handleOnChange(e) {
        let tutor = e.target.value;
        let tutores = [];
        tutores.push(tutor.ID_TUTOR);
      await this.props.escogerTutor(tutores);
      this.setState({ tutor: e.target.value });
      e.target.value=this.state.tutor;
  
    }
    renderTutores = () => {
        return (
          <div>
            {this.state.tutores.map((tutor) => (
              <MenuItem key={tutor.ID} value={tutor.NOMBRE}>
                {" "}
                {tutor.NOMBRE}
              </MenuItem>
            ))}
          </div>
        );
      };
    render(){
        return (
            <FormControl fullWidth>
                <InputLabel  id="demo-simple-select-placeholder-label-label">
                {this.props.titulo}
                </InputLabel>
                <Select
                    value={this.state.tutor}
                    onChange={this.handleOnChange}
                    displayEmpty
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

export default DialogListaTut;