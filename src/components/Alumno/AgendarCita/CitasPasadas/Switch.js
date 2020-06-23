import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Paper, Tabs, Tab, Button, Grid, Dialog, Typography} from "@material-ui/core";


export default function SwitchLabels(props) {
  const {check,setSwitch}=props;
  /*
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  /*
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  */

  return (
    <div>
        <Grid container md={12} alignItems="flex-end">
            <Grid item md={1}>
                <Typography gutterBottom>No</Typography>
            </Grid>            
            <FormGroup row>
            <FormControlLabel
                control={
                <Switch
                    checked={check}
                    onChange={setSwitch}
                    color="primary"
                />
                }
            />
            </FormGroup>
            <Typography gutterBottom>Si</Typography>

        </Grid>        
    </div>
    
  );
}
