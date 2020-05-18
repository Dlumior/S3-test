import React from "react";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    padding: theme.spacing(5),
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(5),
  },
}));

const NombrePrincipal = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xl" className={classes.customContainer}>
        <Grid container>
          <Grid
            item
            xs={10}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          >
            <Typography variant="h4">Facultades</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NombrePrincipal;
