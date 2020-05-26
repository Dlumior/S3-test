import React from "react";
import { Grid, Chip, makeStyles, Paper, IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const mesArray = [
  { mes: "Enero" },
  { mes: "Febrero" },
  { mes: "Marzo" },
  { mes: "Abril" },
  { mes: "Mayo" },
  { mes: "Junio" },
  { mes: "Julio" },
  { mes: "Agosto" },
  { mes: "Septiembre" },
  { mes: "Octubre" },
  { mes: "Noviembre" },
  { mes: "Diciembre" },
];

const useStyles = makeStyles((theme) => ({
  fixedChip: {
    width: theme.spacing(12),
  },
  separation: {
    marginBottom: theme.spacing(4),
  },
}));

const Scroller = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.separation}
      >
        <Grid item>
          <IconButton color="inherit">
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Grid>
        {mesArray.map((item) => (
          <Grid key={item.mes} item>
            <Chip
              color="primary"
              label={item.mes}
              clickable
              className={classes.fixedChip}
            />
          </Grid>
        ))}
        <Grid item>
          <IconButton color="inherit">
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Scroller;
