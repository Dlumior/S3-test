import React from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(30),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const ProcesosTutoria = [
//   { id: 1, nombre: "Tutoria Tipo1" },
//   { id: 2, nombre: "Tutoria Tipo2" },
//   { id: 3, nombre: "Tutoria Tipo3" },
// ];

const ComboBoxProcesoTutoria = (props) => {
  const classes = useStyles();
  // const [procesoTutoria, setProcesoTutoria] = React.useState("");
  const {
    pDisabled,
    procesosTutoria,
    procesoTutoria,
    setProcesoTutoria,
  } = props;

  const handleChange = (event) => {
    setProcesoTutoria(event.target.value);
  };

  return (
    <FormControl className={classes.formControl} disabled={pDisabled}>
      <InputLabel id="demo-simple-select-label">Procesos de tutoria</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={procesoTutoria}
        onChange={handleChange}
      >
        {!pDisabled &&
          procesosTutoria.map((item) => (
            <MenuItem
              key={item.PROCESO_TUTORIA.ID_PROCESO_TUTORIA}
              value={item.PROCESO_TUTORIA.ID_PROCESO_TUTORIA}
            >
              {item.PROCESO_TUTORIA.NOMBRE}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default ComboBoxProcesoTutoria;
