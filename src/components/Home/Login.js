import React from 'react';
import {makeStyles} from '@material-ui/core';
import {Paper, Typography, FormControl, FormHelperText, InputLabel, Input, Grid, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(10),
      width: theme.spacing(55),
      height: theme.spacing(55),
    },
  }));

const Login = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper elevation={5} className={classes.root}>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                    <Grid item sm={12}>
                        <Typography variant="h5">
                            Iniciar Sesión
                        </Typography>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <InputLabel htmlFor="user">Usuario</InputLabel>
                            <Input id="user"  />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <Input id="password"  />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <Button color="primary" variant="contained">Ingresar</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Login;