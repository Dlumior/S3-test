import React, { Component } from "react";
import {
  Paper,
  Tabs,
  Grid,
  TextField,
  Tab,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
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
class FormularioRegistrarAlumno extends Component {
  constructor() {
    super();
    this.state = {
      currentProgram: "INF",
      programs: ["", "INF", "IND", "ING"],
      student: {
        userName: "",
        userLastName: "",
        email: "",
        //password: "",
        currentProgram: "",
        telephone: "",
        address: "",
      },
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnClick(e) {
    /** Registar */
    e.preventDefault(); //prevenir que se refresque la pantalla
    console.log("user: ", this.state.user);
    let {
      userName,
      userLastName,
      email,
      //currentProgram,
      telephone,
      address,
    } = this.state.student;
    const nuevoEstudiante = {
      student: {
        names: userName,
        lastnames: userLastName,
        studentCode: 20202020,
        email: email,
        phoneNumber: telephone,
        address: address,
        username: "username",
        password: "password",
      },
    };
    //let endpoint = '/api/student';
    const props = { endpoint: "/api/student", request: nuevoEstudiante };
    console.log("saving new student in DB:", nuevoEstudiante);
    //let newStudents = await Networking.POST(props);
    //console.log("got updated students from back:", newStudents);
  }
  handleOnChange = (e) => {
    let student = Object.assign({}, this.state.student);
    student[e.target.name] = e.target.value;
    this.setState({ student: student });
  };
  handleTabOnChange = (e) => {
    //para cuando funcione la pestaña de importar alumnos
  };
  handleOnChangeSelect = (e) => {
    this.setState({ currentProgram: e.target.value });
    console.log(e.target.value);
  };
  render() {
    return (
      <div>
        <Paper square style={style.paper}>
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabOnChange}
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
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    name="userLastName"
                    label="Apellidos"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Correo"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <br />
                  <InputLabel>Programa</InputLabel>
                  <Select
                    fullWidth
                    value={this.state.currentProgram}
                    onChange={this.handleOnChangeSelect}
                    name="currentProgram"
                  >
                    {this.state.programs.map((program) => (
                      <MenuItem value={program}>{program}</MenuItem>
                    ))}
                  </Select>

                  <br />
                </Grid>
              </Grid>

              <Grid item md={3} xs={4} style={style.paper}>
                <Grid item md={12} xs={12}>
                  <TextField
                    name="telephone"
                    fullWidth
                    label="Telefono"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    name="address"
                    fullWidth
                    label="Direccion"
                    onChange={this.handleOnChange}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    name="code"
                    fullWidth
                    label="codigo"
                    onChange={this.handleOnChange}
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
                 onClick={this.handleOnClick}
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
      </div>
    );
  }
}

export default FormularioRegistrarAlumno;

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
