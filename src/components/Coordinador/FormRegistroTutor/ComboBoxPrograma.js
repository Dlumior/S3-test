import React,{useEffect} from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { GET } from "../../../Conexion/Controller"; 

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(35),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ComboBoxPrograma = (props) => {
  const classes = useStyles();
  const { setPDisabled, programas, programa, setPrograma, enlace } = props;

  useEffect(() => {
    async function fetchData() {
      const endpoint = enlace;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("programasss:", res);
      setProgramas(res.facultad);
      console.log("programa:", programa);
    }
     fetchData();
  }, {});

  const handleChangePrograma = (event) => {
    setPrograma(event.target.value);
    setPDisabled(false);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select">Facultad</InputLabel>
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
  );
};

export default ComboBoxPrograma;
