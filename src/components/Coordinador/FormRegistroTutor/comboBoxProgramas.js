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
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ComboBoxPrograma = (props) => {
  const classes = useStyles();
  const { disabled, programas, programa, setPrograma } = props;

  const handleChangePrograma = (event) => {
    setPrograma(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl} disabled={disabled}>
        <InputLabel id="demo-simple-select-label">Programa</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={programa}
          onChange={handleChangePrograma}
        >
          {programas.map((item) => (
            <MenuItem key={item.ID_PROGRAMA} value={item.ID_PROGRAMA}>
              {item.NOMBRE}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ComboBoxPrograma;
