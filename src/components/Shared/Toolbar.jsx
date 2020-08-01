import { Toolbar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ImagenCircular from "./ImagenCircular";
import { GET } from "../../Conexion/Controller";


class JToolbarSSJ2 extends Component {
  constructor(props) {
    super();
    this.state = {
      institucion: undefined,
      hide: undefined,
    };
  }
  async componentDidMount() {
    const myInsitucion = await GET({ servicio: "/api/institucion" });
    console.log("SSJ_GET", myInsitucion);
    if (myInsitucion) {
      if (myInsitucion.institucion) {
        this.setState({ institucion: myInsitucion.institucion });
      }
    }
    this.setState({ hide: this.props.onHideMenuIcon });
  }
  componentDidUpdate(nextProps) {
    if (nextProps.onHideMenuIcon !== this.props.onHideMenuIcon) {
      this.setState({ hide: nextProps.onHideMenuIcon });
    }
  }
  render() {
    const { classes, rol, NOMBRE, APELLIDOS, imagenPerfil } = this.props;
    const { institucion } = this.state;
    return (
      <div>
        <Toolbar>
          {this.props.MenuIconButton ? (
            <this.props.MenuIconButton />
          ) : (
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <MenuIcon />
            </IconButton>
          )}
          <ImagenCircular size={"xxs"} src={imagenPerfil} />
          <Typography variant="h6">
            {` | ${rol}: ${NOMBRE} ${APELLIDOS} `}
          </Typography>
          <div className={classes.growmid} />
          <div className={classes.sectionDesktop}>
            <ImagenCircular
              size={"xs"}
              square={true}
              src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
            />
          </div>

          <div className={classes.sectionMobile}>
            <ImagenCircular
              size={"xs"}
              square={true}
              src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
            />
          </div>

          <div className={classes.grow} />

          {this.props.CampanitaIconButton &&
          (rol === "Tutor" || rol === "Alumno") ? (
            <this.props.CampanitaIconButton />
          ) : (
            <></>
          )}
          <div className={classes.sectionDesktop}>
            {institucion ? (
              <ImagenCircular
                link={institucion.PAGINA_WEB}
                size={"xs"}
                square={true}
                src={`data:image/${institucion.EXTENSION};base64,${institucion.IMAGEN}`}
              />
            ) : (
              <></>
            )}
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default JToolbarSSJ2;
