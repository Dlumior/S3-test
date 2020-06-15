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
    width: theme.spacing(35),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ComboBoxPrograma = (props) => {
  const classes = useStyles();
  const { programas, programa, setPrograma, cantProgramas } = props;

  const handleChangePrograma = (event) => {
    setPrograma(event.target.value);
  };

  return (
    <FormControl style={{width:230 }}>
      <InputLabel id={cantProgramas}>Programas</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={cantProgramas}
        value={programa}
        onChange={handleChangePrograma}
        fullWidth
      >
        {programas.map((item) => (
          <MenuItem key={item.ID_PROGRAMA} value={item.ID_PROGRAMA}>
            {item.NOMBRE}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBoxPrograma;
