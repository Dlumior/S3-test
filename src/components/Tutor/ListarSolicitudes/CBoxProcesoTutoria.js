import React from "react";
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
    minWidth: theme.spacing(30),
    marginTop: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CBoxProcesoTutoria = (props) => {
  const classes = useStyles();
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
    <>
      {/* <IconButton color="primary" className={classes.icon}>
        <LooksTwo />
      </IconButton> */}
      <FormControl className={classes.formControl} disabled={pDisabled}>
        <InputLabel id="demo-simple-select-label">
          Procesos de tutoria
        </InputLabel>
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
    </>
  );
};

export default CBoxProcesoTutoria;
