import React from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { LooksTwo } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    minWidth: theme.spacing(30),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ComboBoxProcesoTutoria = (props) => {
  const classes = useStyles();
  // const [procesoTutoria, setProcesoTutoria] = React.useState("");
  const {
    procesosTutoria,
    procesoTutoria,
    setProcesoTutoria,
  } = props;

  const handleChange = (event) => {
    setProcesoTutoria(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">
          Procesos de tutoria
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={procesoTutoria}
          onChange={handleChange}
        >
          {procesosTutoria.map((item) => (
              <MenuItem
                key={item.ID_PROCESO_TUTORIA}
                value={item.ID_PROCESO_TUTORIA}
              >
                {item.NOMBRE}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ComboBoxProcesoTutoria;
