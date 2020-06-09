import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const progs=[0,1,2,3];

const CheckboxList = (props) =>{
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const { programas, programa, setPrograma } = props;
  //const [programas, setProgramas] = React.useState([0,1,2,3]);

  const handleToggle = (event) => () => {
    const currentIndex = checked.indexOf(event);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(event);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setPrograma(event.target.value);
  };

  return (
    <List className={classes.root}>
      {programas.map((item) => {
          const labelId = `checkbox-list-label-${item}`;
        return (
          <ListItem key={item.ID_PROGRAMA} role={undefined} dense button onClick={handleToggle(item)}>
            <ListItemIcon>  
              <Checkbox
                edge="start"
                checked={checked.indexOf(item) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={programas.NOMBRE} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxList;