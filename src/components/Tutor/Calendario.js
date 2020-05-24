import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ImgTutor from "../../components/Tutor/tutor.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
const useStyles = makeStyles((theme) => ({
    diasclase: {
      height: 400,
    },
    texto_dias: {
        textAlign: "center",
    }
  }));

const Calendario = () => {
    const classes = useStyles();

    return (
        <div>
            <div>
                <Grid container xs={12} spacing={5} justify="center" alignItems="center">
                    <Grid item>
                        <ArrowBackIosRoundedIcon color="primary" />
                    </Grid>
                    <Grid item>
                        <h2>MARZO</h2>
                    </Grid>
                    <Grid item>
                        <ArrowForwardIosRoundedIcon color="primary" />
                    </Grid>
                </Grid>
                
                <Grid container xs={12} spacing={5} justify="center" alignItems="center">
                    <Grid item xs={2}>
                        <Paper elevation={2} className={classes.diasclase}>
                            <div  className={classes.texto_dias}>Lunes</div>
                        </Paper>
                    </Grid>  
                    <Grid item xs={2}>
                        <Paper elevation={2} className={classes.diasclase}>
                            <div className={classes.texto_dias}>Martes</div>
                        </Paper>
                    </Grid> 
                    <Grid item xs={2}>
                        <Paper elevation={2} className={classes.diasclase}>
                            <div className={classes.texto_dias}>Miércoles</div>
                        </Paper>
                    </Grid>  
                    <Grid item xs={2}>
                        <Paper elevation={2} className={classes.diasclase}>
                            <div className={classes.texto_dias}>Jueves</div>
                        </Paper>
                    </Grid>  
                    <Grid item xs={2}>
                        <Paper elevation={2} className={classes.diasclase}>
                            <div className={classes.texto_dias}>Viernes</div>
                        </Paper>
                    </Grid> 
                    <Grid item xs={2}>
                        <Paper elevation={2} className={classes.diasclase}>
                            <div className={classes.texto_dias}>Sábado</div>
                        </Paper>
                    </Grid> 
                </Grid>
            </div>
        </div>
    );
};

export default Calendario;