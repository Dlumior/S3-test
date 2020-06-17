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

const ComboBoxFacus = (props) => {
  const classes = useStyles();
  const { facultades, facultad, setFacultad} = props;


  const handleChangeFacu = (event) => {
      console.log("facCombo= ",facultad);
      setFacultad(event.target.value); 
      console.log("facultad",event.target.value);   
  };

  return (
    <FormControl style={{width:230 }}>
      <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select-label"
        value={facultad}
        onChange={handleChangeFacu}
        fullWidth
      >
        {facultades.map((item) => (
          <MenuItem key={item.ID_PROGRAMA} value={item.ID_PROGRAMA}>
            {item.NOMBRE}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBoxFacus;

