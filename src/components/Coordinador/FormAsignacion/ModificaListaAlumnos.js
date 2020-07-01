import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList(props) {
  const {alumnos}=props;
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid container md={12} spacing={2}>
        <Grid item md={12}>
          <div className={classes.demo}>
            <List dense={dense}>
            {alumnos.map((value) => {
                return (
                <ListItem>
                    <ListItemText primary={value.USUARIO.NOMBRE+" "+value.USUARIO.APELLIDOS} />
                </ListItem>
                );
            })}
            </List>
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
}
