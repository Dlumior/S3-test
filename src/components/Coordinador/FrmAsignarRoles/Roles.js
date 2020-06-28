import React, {useEffect,useCallback, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    marginTop:"3%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Roles = (props) => {
  const rols=['Coordinador de Programa',
  'Tutor',
  'Alumno'
  ];
  const classes = useStyles();
  const {disabled,roles,setRoles,datos}=props;

  const handleToggle = (ind,value) => () => {
    const currentIndex =roles.indexOf(ind+2);
    //const newRol=[...roles];
    //console.log("newRol: ",newRol);
    if (currentIndex === -1) {
      roles.push(ind+2);
    } else {
      roles.splice(currentIndex,1);
    }
    console.log("roles: ",roles);
    //roles=newRol;
    setRoles({
      ...datos,
      roles:roles
    });
};

  return (

      <div>
          {<List dense className={classes.root}>
          <h3>Roles:</h3>
            {rols.map((value,index) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                <ListItem key={index}   button>
                    <ListItemText id={labelId} primary={value} />
                    <ListItemSecondaryAction>
                    <Checkbox
                        disabled={disabled}
                        edge="end"
                        color="primary"
                        id={index}
                        onChange={handleToggle(index,value)}
                        checked={roles[index]===(index+2)}
                        inputProps={{ 'aria-labelledby': labelId }}                        
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
            </List>}
      </div>
  );
}

export default Roles;