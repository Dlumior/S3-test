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
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link as LinkRouter } from "react-router-dom";
import { logOut } from "../../Sesion/actions/sesionAction";
import { useUserValue, getUser } from "../../Sesion/Sesion";
import { Badge, Menu, MenuItem, Grid } from "@material-ui/core";
import NotificacionBtn from "./Notificaciones/NotificacionBtn";
import { GET } from "../../Conexion/Controller";
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
    //padding: theme.spacing(3), -> innecesario,malogra el diseño
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
  const idUsuario = getUser().usuario.ID_USUARIO;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [numNotif, setNumNotif] = React.useState(0);
  const [refresh, setRefresh] = React.useState(0);

  const changeNumNotif = (num) => setNumNotif(num);

  const [{}, dispatch] = useUserValue();
  const handleClick = () => {
    //te odio hooks
    //console.log("Alumno LOG OUTTTTT", props);

    logOut(dispatch);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    //console.log("current target:");
    //console.log(event.currentTarget);

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
    //console.log(res);
    if (res) {
      setNumNotif(0);
      // window.location.reload();
      setRefresh(1);
    }
  }

  const menuId = "primary-menu";

  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorReference="anchorPosition"
  //     anchorPosition={{ top: 70, left: window.screen.width - 50 }}
  //     id={menuId}
  //     keepMounted
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "right",
  //     }}
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );
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
            <Grid item md={1} sm={2} xs={4} xl={1}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={3} xl={3}>
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

                <Grid item md={9} xs={9} xl={9} style={{ textAlign: "left" }}>
                  <ImagenCircular
                    size={"xs"}
                    square={true}
                    src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={10} sm={9} xs={5} xl={10}>
              <Typography variant="h6" noWrap style={{ marginTop: "0.8%" }}>
                | Alumno: {`${usuario.NOMBRE} ${usuario.APELLIDOS} `}
              </Typography>
            </Grid>
            <Grid item md={1} sm={1} xs={3} xl={1} style={{ textAlign: "right" }}>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop} ></div>
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

        {/*mostrar tutorias fijas para 1era semana */}
        <List>
          {["Solicitar Tutor Fijo", "Perfil", "Agendar Cita", "Mis Citas"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                component={LinkRouter}
                to={"/alumno/" + text.split(" ").join("").toLowerCase()}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountCircleRoundedIcon  color="primary"/>
                  ) : index === 2 ? (
                    <DateRangeRoundedIcon  color="primary"/>
                  ) : index === 1 ? (
                    <TodayRoundedIcon  color="primary"/>
                  ) : (
                    <NoteAddRoundedIcon  color="primary"/>
                  )}
                </ListItemIcon>
                <ListItemText primary={text}  color="primary"/>
              </ListItem>
            )
          )}

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
            <ListItemText primary={"Cerrar Sesion"}  color="primary"/>
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
