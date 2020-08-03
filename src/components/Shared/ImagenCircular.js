import React, { Component } from "react";
import { Grid } from "@material-ui/core";
const styles = {
  logo: {
    display: "flex",
    objectFit: "cover",
    width: "100%",
  },
  tablas: {
    minWidth: "40px",
    borderRadius: "50%",
    height: "70px"
  },
  cardsTutor: {
    minWidth: "40px",
    borderRadius: "50%",
    height: "50px"
  },
  xxs: {
    borderRadius: "50%",
    objectFit: "cover",
    width: "100%",
    minWidth: "40px",
    maxWidth: "40px",
    maxHeight: "80px",
  },
  institucion: {
    display: "flex",
    objectFit: "cover",
    width: "100%",
    minWidth: "100px",
    maxWidth: "150px",
    maxHeight: "80px",
  },
  imagenCircle: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: "50%",
    objectFit: "cover",
    width: "80%",
  },
  imagenSquare: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    objectFit: "cover",
    width: "80%",
  },
  imagenSquareMini: {
    display: "flex",
    objectFit: "cover",
    width: "100%",
    minWidth: "100px",
    maxWidth: "150px",
    maxHeight: "80px",
  },
  perfil: {
    objectFit: "cover",
    width: "100px",
    height: "100px",
    "object-position": "center",
  },
};
class ImagenCircular extends Component {
  render() {
    const { link, square, size, logoVerde, perfil, src, tablas } = this.props;
    console.log("Imagen circular PROPS: ", this.props);

    if (tablas) {
      return (
        <img
          style={styles.tablas}
          src={src}
          alt="logo-ututor"
        />
      );
    } else if (cardsTutor) {
      return (
        <img
          style={styles.cardsTutor}
          src={src}
          alt="logo-ututor"
        />
      );
    }
    else if (perfil) {
      return (
        <img
          style={styles.perfil}
          src={src}
          alt="logo-ututor"
        />
      );
    } else if (logoVerde) {
      return (
        <img
          style={styles.logo}
          src="https://ututor-recursos.s3.amazonaws.com/Imagenes/ututor-main-logo-inverted.png"
          alt="logo-ututor"
        />
      );
    } else if (link) {
      return (
        <a href={link}>
          <Grid item md={12} xs={12}>
            <img style={styles.institucion} src={this.props.src} alt="" />
          </Grid>
        </a>
      );
    } else if (square) {
      return (
        <Grid item md={12} xs={12}>
          <img
            style={
              this.props.size === "xs"
                ? styles.imagenSquareMini
                : styles.imagenCircle
            }
            src={this.props.src}
            alt=""
          />
        </Grid>
      );
    }
    if (size === "xs") {
      return (
        <Grid item md={12} xs={12}>
          <img style={styles.imagenSquareMini} src={this.props.src} alt="" />
        </Grid>
      );
    } else if (size === "xxs") {
      return <img style={styles.xxs} src={this.props.src} alt="" />;
    } else {
      return (
        <Grid item md={12} xs={12}>
          <img style={styles.imagenCircle} src={this.props.src} alt="" />
        </Grid>
      );
    }
  }
}

export default ImagenCircular;
