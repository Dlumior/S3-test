import React from "react";
import { getUser } from "../../../Sesion/Sesion";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const Programas = [
//   { id: 1, nombre: "Programa Tipo1" },
//   { id: 2, nombre: "Programa Tipo2" },
//   { id: 3, nombre: "Programa Tipo3" },
// ];

const ComboBoxFacultades = (props) => {
  const classes = useStyles();
  const { programas, programa, setPrograma, setDisabled } = props;

  const handleChangePrograma = (event) => {
    setPrograma(event.target.value);
    setDisabled(false);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label={programa}
          id="demo-simple-select"
          value={programa}
          onChange={handleChangePrograma}
        >
          {programas.map((item) => (
            <MenuItem
              key={
                getUser().rol === "Coordinador Programa"
                  ? item.FACULTAD.ID_PROGRAMA
                  : item.ID_PROGRAMA
              }
              value={
                getUser().rol === "Coordinador Programa"
                  ? item.FACULTAD.ID_PROGRAMA
                  : item.ID_PROGRAMA
              }
            >
              {getUser().rol === "Coordinador Programa"
                ? item.FACULTAD.NOMBRE
                : item.NOMBRE}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ComboBoxFacultades;
