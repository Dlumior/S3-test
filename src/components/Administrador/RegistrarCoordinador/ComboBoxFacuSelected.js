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
  const {nombre, programas, programa, setPrograma, setProgramas,cantProgramas } = props;

  console.log("PROG",nombre);
  const handleChangePrograma = (event) => {
    setPrograma(event.target.value);
    //quitamos ese valor del combobox
    console.log("programassss",programas);
    /*
    let arr=programas.filter(function(e){
      return e.ID_PROGRAMA!==event.target.value;
    });
    console.log("arr",arr);
    setProgramas(arr);
    console.log("prog",programas);
    */
  };

  return (
    <FormControl style={{width:230 }}>
      <InputLabel id={cantProgramas}>{props.nombre}</InputLabel>
      <Select
        disabled={props.nombre!==undefined}
        helperText="Facultad"
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
