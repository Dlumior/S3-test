import React from 'react';
import {
    Paper,
    Tabs,
    Tab,
    Typography,
    Grid,
    TextField,
    Button,
    Container,
    Select,
    MenuItem,
    InputLabel,
  } from "@material-ui/core";
//import NombrePrincipal from "../../components/Shared/NombrePrincipal";

const style = {
    paper: {
      marginTop: "4%",
      marginLeft: "3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    },
    form: {
      width: "100%",
      marginTop: "1%",
      alignItems: "center",
    },
    registryTitle: {
      marginTop: "3%",
      marginLeft: "3%",
      alignItems: "center",
    },
  };

const RegistrarAlumno = () => {
    //this.handleOnClick = this.handleOnClick.bind(this);
    //this.handleOnChange = this.handleOnChange.bind(this);
    return (
        /*ACA VIENE LA COPIA DESCARADA DE JIN :3 */

        <Container fullWidth disableGutters maxWidth={"xl"}>
        <Typography component="h1" variant="h5" style={style.registryTitle}>
            <h2>Registro de Alumnos</h2>
        </Typography>
        <Paper square style={style.paper}>
        <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            //onChange={this.handleTabOnChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Ingresar Alumnos">vadvawedv</Tab>
            <Tab label="Importar Alumnos" disabled />
        </Tabs>
        </Paper>

        <div style={styles.wrapperForm}>
        <br />
        <div style={styles.frmStudentRegister}>
            <Grid container spacing={5}>
            <Grid item md={1} xs={1} style={style.paper} />
            <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={12} xs={12}>
                <TextField
                    fullWidth
                    name="userName"
                    label="Nombres"
                    //onChange={this.handleOnChange}
                />
                </Grid>
                <Grid item md={12} xs={12}>
                <TextField
                    fullWidth
                    name="userLastName"
                    label="Apellidos"
                    //onChange={this.handleOnChange}
                />
                </Grid>
                <Grid item md={12} xs={12}>
                <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Correo"
                    //onChange={this.handleOnChange}
                />
                </Grid>
                <Grid item md={12} xs={12}>
                <br />
                <InputLabel>Programa</InputLabel>
                {/*<Select
                    fullWidth
                    //value={this.state.currentProgram}
                    //onChange={this.handleOnChangeSelect}
                    name="currentProgram"
                >
                    {this.state.programs.map((program) => (
                    <MenuItem value={program}>{program}</MenuItem>
                    ))}
                </Select>
                */}
                <br />
                </Grid>
            </Grid>

            <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={12} xs={12}>
                <TextField
                    name="telephone"
                    fullWidth
                    label="Telefono"
                    //onChange={this.handleOnChange}
                />
                </Grid>
                <Grid item md={12} xs={12}>
                <TextField
                    name="address"
                    fullWidth
                    label="Direccion"
                    //onChange={this.handleOnChange}
                />
                </Grid>
                <Grid item md={12} xs={12}>
                <TextField
                    name="code"
                    fullWidth
                    label="codigo"
                    //onChange={this.handleOnChange}
                />
                </Grid>
            </Grid>

            <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={6} xs={10}>
                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    //onClick={this.handleOnClick}
                >
                    Guardar
                </Button>
                </Grid>
            </Grid>
            <Grid item md={1} xs={1} style={style.paper} />
            </Grid>
        </div>
        <br /> <br /> <br /> <br />
        </div>
        </Container>
    );

};

export default RegistrarAlumno;

var styles = {
    frmStudentRegister: {
      alignSelf: "center",
      width: "90%",
      backgroundColor: "#ffffff",
      marginLeft: "3%",
      marginRight: "3%",
    },
    wrapperForm: {
      paddingTop: "1%",
      paddingBottom: "2%",
      width: "100%",
      backgroundColor: "#f2f2f2",
    },
  };



