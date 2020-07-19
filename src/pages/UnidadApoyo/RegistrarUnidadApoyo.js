import React, { Component, useEffect,useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import * as Controller from "../../Conexion/Controller";
import errorObj from "../../components/Coordinador/FormRegistroTutor/errorObj";
import Alertas from "../../components/Coordinador/Alertas";
import validateEmail from "../../components/Coordinador/FormRegistroTutor/validateEmail"

const handleName = (e, datosForm, setDatosForm, errors, setErrors) => {
    if (e.target.value.length > 40) {
        const error = {
            error: true,
            mesage: "La longitud máxima del nombre es de 40 caracteres."
        }
        setErrors({ ...errors, name: error });
    } else {
        const error = {
            error: false,
            mesage: ""
        }
        setErrors({ ...errors, name: error });

        setDatosForm({
            ...datosForm,
            NOMBRE: e.target.value,
        });
    }
};

const handleTelefono = (e, datosForm, setDatosForm, errors, setErrors) => {
    if (isNaN(e.target.value)) {
        const error = {
            error: true,
            message: "El teléfono debe ser una cadena numérica."
        }
        setErrors({ ...errors, telefono: error });
    } else if (e.target.value.length > 15) {
        const error = {
            error: true,
            message: "El teléfono debe ser máximo de 15 caracteres."
        }
        setErrors({ ...errors, telefono: error });
    } else {
        const error = {
            error: false,
            message: ""
        }
        setErrors({ ...errors, telefono: error });

        setDatosForm({
            ...datosForm,
            TELEFONO: e.target.value,
        });
    }
};

const handleCorreo = (e, datosForm, setDatosForm, errors, setErrors, dominio1, dominio2) => {
    const res = validateEmail(e.target.value, dominio1, dominio2);
    setErrors({ ...errors, email: res });
    
    setDatosForm({
      ...datosForm,
      CORREO: e.target.value,
    });
};

const handleContacto = (e, datosForm, setDatosForm, errors, setErrors) => {
    if (e.target.value.length > 100) {
        const error = {
            error: true,
            message: "La longitud máxima del nombre es de 100 caracteres."
        }
        setErrors({ ...errors, contacto: error });
    } else {
        const error = {
            error: false,
            message: ""
        }
        setErrors({ ...errors, contacto: error });

        setDatosForm({
            ...datosForm,
            CONTACTO: e.target.value,
        });
    }
};




const RegistrarUnidadApoyo = () => {
    const [datosForm, setDatosForm] = React.useState({
        NOMBRE:"",
        TELEFONO: "",
        CORREO:"",
        CONTACTO:""
    });

    const [alerta, setAlerta]=useState({
        mensajeStrong: "",
        mensajeStrongError: "por favor revisalos!",
        mensajeStrongExito: "satisfactoriamente!",
        mensajeError: "Existen errores al completar el formulario",
        mensajeExito: "Unidad de Apoyo registrada",
        mensaje: "",
    });
    const [severidad, setSeveridad] = useState({
        severidad:"",
        severW:"warning",
        severE:"error",
        severS:"success"
    });

    const [errors, setErrors] = useState(errorObj);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        setSeveridad({
          severidad:"",
        });     

        setAlerta({
          mensaje:"",
        }); 
        
        window.location.reload();
    };

    const handleClick = async (e, datosForm, setDatosForm) => {
        console.log("ERRORS handleclick: ", errors);

        if (datosForm.NOMBRE==="" || datosForm.CORREO==="" || datosForm.TELEFONO==="" || datosForm.CONTACTO==="") {
            console.log("error vacia");
            setSeveridad( {severidad: "error"} );     
            setAlerta( {mensaje: "Todos los datos son obligatorios."} ); 

            return;
        } 

        if (errors.name.error) {
            console.log("error nombre");
            setSeveridad( {severidad: "error"} );     
            setAlerta( {mensaje: errors.name.mesage} ); 

            return
        }
        if (errors.telefono.error) {
            console.log("error telefono");
            setSeveridad( {severidad: "error"} );     
            setAlerta( {mensaje: errors.telefono.message} ); 

            return
        }
        if (errors.email.error) {
            console.log("error email");
            setSeveridad( {severidad: "error"} );     
            setAlerta( {mensaje: errors.email.mesage} ); 

            return
        }
        if (errors.contacto.error) {
            console.log("error contacto");
            setSeveridad( {severidad: "error"} );     
            setAlerta( {mensaje: errors.name.message} ); 

            return
        }

        const props = { servicio: "/api/areaapoyo", request: {areaApoyo: datosForm} };
        // console.log("saving new coord in DB:", datosForm);
        let newAreaApoyo = await Controller.POST(props);
        console.log("resp from back:", newAreaApoyo);

        if (newAreaApoyo){
            if (newAreaApoyo.error) {
                setSeveridad({severidad: "error"});     
                setAlerta({mensaje: newAreaApoyo.error});   
            } else {
                setSeveridad({severidad: "success"});     
                setAlerta({mensaje: "Unidad de apoyo registrada"}); 
            }
        }
    }

    const [dominio1, setDominio1] = useState("");
    const [dominio2, setDominio2] = useState("");

    useEffect(() => {
        async function fetchDominios() {
          let institucion = await Controller.GET({servicio:"/api/institucion"});

          setDominio1(institucion.institucion.DOMINIO);
          setDominio2(institucion.institucion.DOMINIO2);
        }
    
        fetchDominios();
    }, [dominio1, dominio2]);

    useEffect(() => {
        console.log("severidad: ", severidad.severidad);
        console.log("alerta: ", alerta);
    }, [severidad, alerta]);

    return (
        <div>
          <Button 
            variant="contained"
            color="primary"
            onClick={handleClickOpen}>
            Registrar
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <Alertas
                severity={severidad.severidad}
                titulo={"Observacion:"}
                alerta={alerta}
            />

            <DialogTitle id="form-dialog-title">
            <Grid container md={12} spacing={1}>
                <Grid item md={11} >
                  Registrar Unidades de Apoyo
                </Grid>
                <Grid item md={1} alignContent="flex-end">
                  <CloseRoundedIcon onClick={handleClose}/>
                </Grid>
              </Grid>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={12}>
                    <Grid item md={12} sm container>
                        <Grid item xs container direction="column" justify={"center"} spacing={2}>

                            <Grid item xs>
                                <TextField
                                    required
                                    error={errors.name.error}
                                    margin="dense"
                                    id="nombre"
                                    label="Nombre"
                                    fullWidth
                                    onChange={(e) => handleName(e, datosForm, setDatosForm, errors, setErrors)}
                                    helperText={errors.name.mesage}
                                />
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    required
                                    error={errors.telefono.error}
                                    margin="dense"
                                    id="TELEFONO"
                                    label="Teléfono"
                                    fullWidth
                                    onChange={(e) => handleTelefono(e, datosForm, setDatosForm, errors, setErrors)}
                                    helperText={errors.telefono.message}
                                />
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    required
                                    error={errors.email.error}
                                    margin="dense"
                                    id="CORREO"
                                    label="Correo"
                                    fullWidth
                                    onChange={(e) => handleCorreo(e, datosForm, setDatosForm, errors, setErrors, dominio1, dominio2)}
                                    helperText={errors.email.mesage}
                                />
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    required
                                    error={errors.contacto.error}
                                    margin="dense"
                                    id="CONTACTO"
                                    label="Contacto"
                                    fullWidth
                                    onChange={(e) => handleContacto(e, datosForm, setDatosForm, errors, setErrors)}
                                    helperText={errors.contacto.message}
                                />
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
              <Button 
                variant="outlined"
                onClick={handleClose} color="primary">
                Cancelar
              </Button>
    
              <Button 
                variant="contained"
                onClick={(e) => handleClick(e, datosForm, setDatosForm)}
                color="primary"
              >
                Crear
              </Button>
            </DialogActions>

          </Dialog>
        </div>
      );
};

export default RegistrarUnidadApoyo;