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
import { useUserValue, getUser } from "../../Sesion/Sesion";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { logOut } from "../../Sesion/actions/sesionAction";
import { Grid, ThemeProvider } from "@material-ui/core";
import ImagenCircular from "../Shared/ImagenCircular";
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
  const [{}, dispatch] = useUserValue();

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
  const { usuario, rol } = getUser();
  console.log(">Jenn98=>", usuario);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/*
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar color="#000000">
        <Grid container spacing={1}>
            <Grid item md={1} xs={4} xl={1}>
              <Grid container spacing={1}> 
                <Grid item md={3} xs={2} xl={2}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    style={{ textAlign: "left" }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>

                <Grid item md={9} xs={10} xl={10} style={{textAlign: "left"}}>
                  <ImagenCircular
                    size={"xs"}
                    square={true}
                    src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={10} xs={5} xl={10}>
              <Typography variant="h6" noWrap style={{ marginTop: "0.8%" }}>
                | Coordinador: {`${usuario.NOMBRE} ${usuario.APELLIDOS} `}
              </Typography>
            </Grid>
            <Grid item md={1} xs={3} xl={1}>
             
                 
              <div className={classes.grow} />
              <div className={classes.sectionDesktop} />
              <IconButton
                aria-label="norifications of the user"
                aria-controls="primary-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <Badge badgeContent={numNotif} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

               
              
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ThemeProvider theme={theme}>
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
              usuario.IMAGEN
                ? usuario.IMAGEN
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
            rol={rol}
            NOMBRE={usuario.NOMBRE}
            APELLIDOS={usuario.APELLIDOS}
          />
        </ThemeProvider>
      </AppBar>
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
                {rol}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List>
          {[
            "Perfil",
            "Facultades",
            "Programas",
            "Coordinadores de Programa",
            "Procesos de Tutoria",
            "Alumnos",
            "Tutores",
            "Disponibilidades",
            "Asignacion de Tutor",
            "Asignar Roles",
            "Reportes",
          ]
            .filter((e) =>
              getUser().rol === "Coordinador Programa"
                ? e !== "Coordinadores de Programa" && e !== "Facultades"
                : e === e
            )
            .map((text, index) => (
              <ListItem
                button
                key={text}
                component={LinkRouter}
                //to={"/coordinador/" + text.toLowerCase()}
                to={
                  index === 11
                    ? "/"
                    : "/coordinador/" + text.split(" ").join("").toLowerCase()
                }
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountCircleRoundedIcon color="primary" />
                  ) : index === 1 ? (
                    <AccountBalanceRoundedIcon color="primary" />
                  ) : index === 2 ? (
                    getUser().rol === "Coordinador Facultad" ? (
                      <AccountBalanceRoundedIcon color="primary" />
                    ) : (
                      <NoteAddRoundedIcon color="primary" />
                    )
                  ) : index === 3 || index === 4 ? (
                    <NoteAddRoundedIcon color="primary" />
                  ) : index === 7 ? (
                    getUser().rol === "Coordinador Facultad" ? (
                      <NoteAddRoundedIcon color="primary" />
                    ) : (
                      <SupervisorAccountRoundedIcon color="primary" />
                    )
                  ) : index === 8 ? (
                    getUser().rol === "Coordinador Facultad" ? (
                      <SupervisorAccountRoundedIcon color="primary" />
                    ) : (
                      <AssessmentRoundedIcon color="primary" />
                    )
                  ) : index === 9 ? (
                    <SupervisorAccountRoundedIcon color="primary" />
                  ) : index === 10 ? (
                    <AssessmentRoundedIcon color="primary" />
                  ) : (
                    <NoteAddRoundedIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
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
            <ListItemText primary={"Cerrar Sesion"} />
          </ListItem>
        </List>
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
