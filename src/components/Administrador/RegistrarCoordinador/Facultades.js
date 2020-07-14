import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ComboBoxPrograma from "./ComboBoxPrograma";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import IconButton from '@material-ui/core/IconButton';

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
            console.log("programa ",programa);

          }else{
            setCantPrograma(cantProgramas => func);
            console.log("func",programasSeleccionados.length)
            console.log("func",cantProgramas)
            if (programasSeleccionados.length>=cantProgramas){
              programasSeleccionados.splice(-1);
            } 
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
                      setProgramas={setProgramas}
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
                setProgramas={setProgramas}
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