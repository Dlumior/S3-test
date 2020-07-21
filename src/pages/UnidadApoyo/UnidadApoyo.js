import { GET } from "../../Conexion/Controller";
import React,{ Component, useEffect,useState } from "react";
import { Grid, Paper, IconButton } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaCoordinadores from "../../components/Administrador/RegistrarCoordinador/ListaCoordinadores";
import ListaUnidadApoyo from "./ListaUnidadApoyo"
import RegistrarUnidadApoyo from "./RegistrarUnidadApoyo"

const UnidadApoyo = () => {

  return (
    <div>
      <NombrePrincipal titulo="Unidades de Apoyo" />  

      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        <Grid item>
          <RegistrarUnidadApoyo/>
        </Grid>

        <Grid item>
            <IconButton color="primary">
                <RefreshRoundedIcon
                color="primary">
                </RefreshRoundedIcon>
            </IconButton>
        </Grid>    

      </Grid>

      <ListaUnidadApoyo/> 
    </div>
  );
};

export default UnidadApoyo;
