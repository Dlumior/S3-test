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
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { Link as LinkRouter } from "react-router-dom";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import { logOut } from "../../Sesion/actions/sesionAction";
import { useUserValue, getUser } from "../../Sesion/Sesion";
import NotificacionBtn from "../Alumno/Notificaciones/NotificacionBtn";
import { GET } from "../../Conexion/Controller";
import { Badge, Grid } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ImagenCircular from "../Shared/ImagenCircular";

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
    //padding: theme.spacing(3), innecesario, malogra el diseño
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const BarraNavegacion = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [{}, dispatch] = useUserValue();
  const [open, setOpen] = React.useState(false);

  const idUsuario = getUser().usuario.ID_USUARIO;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [numNotif, setNumNotif] = React.useState(0);
  const [refresh, setRefresh] = React.useState(0);

  const handleClick = () => {
    //te odio hooks
    console.log("Tutor LOG OUTTTTT", props);

    logOut(dispatch);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    console.log("current target:");
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    removeNotif();
  };

  async function removeNotif() {
    const endpoint = "/api/notificacion/actualizar/" + idUsuario;
    const params = { servicio: endpoint };
    const res = await GET(params);
    console.log(res);
    setNumNotif(0);
    // window.location.reload();
    setRefresh(1);
  }

  const menuId = "primary-menu";
  const changeNumNotif = (num) => setNumNotif(num);

  const renderMenu = (
    <NotificacionBtn
      anchorEl={anchorEl}
      menuId={menuId}
      isMenuOpen={isMenuOpen}
      handleMenuClose={handleMenuClose}
      changeNumNotif={changeNumNotif}
      refresh={refresh}
    />
  );
  const usuario = getUser().usuario;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
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
                | Tutor: {`${usuario.NOMBRE} ${usuario.APELLIDOS} `}
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
      {renderMenu}
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            "Perfil",
            "Solicitudes",
            "Mis Alumnos",
            "Mi Disponibilidad",
            "Sesiones",
            "Sesiones Grupales",
            "Mis Citas",
          ].map((text, index) => (
            <ListItem
              button
              key={text}
              component={LinkRouter}
              to={"/tutor/" + text.split(" ").join("").toLowerCase()}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <AccountCircleRoundedIcon color="primary" />
                ) : index === 1 ? (
                  <HowToRegRoundedIcon color="primary" />
                ) : index === 2 ? (
                  <SupervisorAccountRoundedIcon color="primary" />
                ) : index === 3 ? (
                  <ScheduleRoundedIcon color="primary" />
                ) : index === 4 || index === 5 ? (
                  <CalendarTodayIcon color="primary" />
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
            <Divider />
            
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
