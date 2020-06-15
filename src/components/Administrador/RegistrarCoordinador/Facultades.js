import React, { Component, useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import ListaProgramas from "../../Coordinador/ListaProgramas";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { GET } from "../../../Conexion/Controller";
import ComboBoxPrograma from "./ComboBoxPrograma";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Alertas from "../../Coordinador/Alertas";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import IconButton from '@material-ui/core/IconButton';
import errorObj from "../../Coordinador/FormRegistroTutor/errorObj.js";
import validateName from "../../Coordinador/FormRegistroTutor/validateName.js";
import validateLastNames from "../../Coordinador/FormRegistroTutor/validateLastNames.js";
import validatePhoneNumber from "../../Coordinador/FormRegistroTutor/validatePhoneNumber.js";
import validateAddress from "../../Coordinador/FormRegistroTutor/validateAddress.js";
import validateCode from "../../Coordinador/FormRegistroTutor/validateCode.js";
import validateEmail from "../../Coordinador/FormRegistroTutor/validateEmail.js";
import { wait } from "@testing-library/react";

const style = {
    paper: {
      marginTop: "4%",
      marginLeft: "4%",
      marginRight: "4%",
      marginBottom: "5%",
      flexDirection: "row",
      alignItems: "center",
      backgroundImage: "",
    },
    paperitem: {
        marginTop: "2%",
        marginLeft: "4%",
      },
      foto: {
        marginTop: "2%",
        marginLeft: "4%",
        marginTop: "4%",
        flexDirection: "row",
        alignItems: "center",
        backgroundImage: "",
      }
  };
    
const Facultades = (props) => {
    const { programasSeleccionados, setProgramasSeleccionados,programa,
        setPrograma,programas, setProgramas } = props;
    const [cantProgramas, setCantPrograma]=useState(0);

    const handleCantPrograma = (func) => {
        if (func>0){
          if (func>cantProgramas){  
            setCantPrograma(cantProgramas => func);
            console.log("func",func);
            programasSeleccionados.push(programa);
            console.log("programasSelecc",programasSeleccionados);
            console.log("programas ",programas);
            //var i=programas.indexof(programa);
            console.log("programa ",programa);

          }else{
            setCantPrograma(cantProgramas => func);
            console.log("func",func)
            programasSeleccionados.splice(-1);
            console.log("programasSelecc",programasSeleccionados)
          }
        }else{
          setCantPrograma(cantProgramas => 0);
        }
      };
    

    const renderPrograma = (cantProgramas) => {
        console.log("cant=",cantProgramas);
        let n=cantProgramas;
        let arregloProg=[];
        for (let i=0;i<n;i++){
          arregloProg.push(i);
          //programasSeleccionados.push(programa);
        }
          return(
            <div>
              <Grid item md={8}>
                {arregloProg.map((item) => (            
                    <ComboBoxPrograma
                      cantProgramas={cantProgramas}
                      programas={programas}
                      programa={programa[item]}
                      setPrograma={setPrograma}
                    />      
                ))}
              </Grid>
            </div> 
        );    
    }
  
    return (
      <>
        <Grid container md={12} spacing={1}>
            <Grid item md={8} >
                <ComboBoxPrograma
                cantProgramas={cantProgramas}
                programas={programas}
                programa={programa[0]}
                setPrograma={setPrograma}
                />
            </Grid>                           
                <Grid item md={4}> 
                    <IconButton color="primary" onClick={()=> handleCantPrograma(cantProgramas+1)}>
                    <AddBoxRoundedIcon
                    color="primary"
                    fontsize="large" />
                </IconButton>
                <IconButton color="primary" onClick={()=> handleCantPrograma(cantProgramas-1)}>
                    <IndeterminateCheckBoxRoundedIcon
                    color="primary"
                    fontsize="large" />
                </IconButton> 
                </Grid>         
                {cantProgramas>0 ? renderPrograma(cantProgramas): null}     
            </Grid> 
      </>
    );
  };
  
  export default Facultades;