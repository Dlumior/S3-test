import React, { Component } from "react";
import { Grid } from "@material-ui/core";
const styles = {
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
};
class ImagenCircular extends Component {
  render() {
    return (
        <Grid item md={12} xs={12}>
        <img style={this.props.square? styles.imagenSquare:styles.imagenCircle} src= {this.props.src} alt=""/>
      </Grid>
    );
  }
}

export default ImagenCircular;
