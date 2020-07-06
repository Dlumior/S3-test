import React,{ Component, useEffect,useState } from "react";
import { Grid, Paper, IconButton } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaCoordinadores from "../../components/Administrador/RegistrarCoordinador/ListaCoordinadores";

const UnidadApoyo = () => {

  return (
    <div>
      <NombrePrincipal titulo="Unidades de Apoyo" />  

      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        {/* <Grid item>
        <RegistrarCoordinador/>
        </Grid> */}

        <Grid item>
            <IconButton color="primary">
                <RefreshRoundedIcon
                color="primary">
                </RefreshRoundedIcon>
            </IconButton>
        </Grid>    

      </Grid>

      <ListaCoordinadores /> 
    </div>
  );
};

export default UnidadApoyo;
