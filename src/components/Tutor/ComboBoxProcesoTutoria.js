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

const ProcesosTutoria = [
  { id: 1, nombre: "Tutoria Tipo1" },
  { id: 2, nombre: "Tutoria Tipo2" },
  { id: 3, nombre: "Tutoria Tipo3" },
];

const ComboBoxProcesoTutoria = () => {
  const classes = useStyles();
  const [procesoTutoria, setProcesoTutoria] = React.useState("");

  const handleChange = (event) => {
    setProcesoTutoria(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Procesos de tutoria</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={procesoTutoria}
        onChange={handleChange}
      >
        {ProcesosTutoria.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBoxProcesoTutoria;
