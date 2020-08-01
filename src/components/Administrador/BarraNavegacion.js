import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link as LinkRouter } from "react-router-dom";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { logOut } from "../../Sesion/actions/sesionAction";
import { getUser, useUserValue } from "../../Sesion/Sesion";
import ImagenCircular from "../Shared/ImagenCircular";
import { Grid, ThemeProvider } from "@material-ui/core";
//import JToolbarSSJ from "jin-super-responsive-toolbar-ssj";
import JToolbarSSJ3 from "../Shared/Toolbar2.jsx";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const BarraNavegacion = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [{ usuario }, dispatch] = useUserValue();

  const handleClick = () => {
    //te odio hooks
    //console.log("Admin LOG OUTTTTT", props);
    logOut(dispatch);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const admin = getUser().usuario;
  console.log("=> ", getUser());
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/**
       <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ututor
          </Typography>
        </Toolbar>
      </AppBar> 
       */}
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <JToolbarSSJ3
            MenuIconButton={() => (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            )}
            imagenPerfil={
              admin.IMAGEN
                ? admin.IMAGEN
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
            rol={"Administrador"}
            NOMBRE={admin.NOMBRE}
            APELLIDOS={admin.APELLIDOS}
          />
        </AppBar>
      </ThemeProvider>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Grid container spacing={1}>
            <Grid item md={9}>
              <ImagenCircular
                src="https://ututor-recursos.s3.amazonaws.com/Imagenes/ututor-main-logo-inverted.png"
                logoVerde
              />
            </Grid>
            <Grid item md={3}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Grid>
            <Grid item md={12}>
              <Typography
                variant={"h6"}
                textAlign={"center"}
                style={{ "text-align": "center" }}
              >
                Administrador
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List>
          {[
            "Perfil",
            "Institución",
            "Facultades",
            "Coordinadores",
            "Unidades de Apoyo",
          ].map((text, index) => (
            // <LinkRouter to={}>
            <ListItem
              button
              key={text}
              component={LinkRouter}
              to={
                index === 5
                  ? "/"
                  : "/administrador/" +
                    text.split(" ").join("").toLowerCase().replace("ó", "o")
              }
              //onClick={handleClick}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <AccountCircleRoundedIcon color="primary" />
                ) : index === 1 ? (
                  <AccountBalanceRoundedIcon color="primary" />
                ) : index === 2 ? (
                  <AccountBalanceRoundedIcon color="primary" />
                ) : index === 3 ? (
                  <SupervisorAccountRoundedIcon color="primary" />
                ) : index === 4 ? (
                  <AccountBalanceRoundedIcon color="primary" />
                ) : (
                  <NoteAddRoundedIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} color="primary" />
            </ListItem>
            // </LinkRouter>
          ))}
          <ListItem
            button
            key={"Cerrar Sesion"}
            component={LinkRouter}
            to={"/"}
            onClick={handleClick}
          >
            <ListItemIcon>
              <ExitToAppRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Cerrar Sesión"} color="primary" />
          </ListItem>
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.contenido}
        {props.children}
      </main>
    </div>
  );
};

export default BarraNavegacion;
