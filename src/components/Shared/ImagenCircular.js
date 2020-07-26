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
  imagenSquareMini: {
    marginTop: "3%",
    marginLeft: "3%",
    objectFit: "cover",
    width: "100%",
    minWidth: "100px",
    maxWidth: "150px",
  },
};
class ImagenCircular extends Component {
  render() {
    return (
      <Grid item md={12} xs={12}>
        <img
          style={this.props.square ? (this.props.size==="xs"?styles.imagenSquareMini: styles.imagenCircle) : styles.imagenCircle}
          src={this.props.src}
          alt=""
        />
      </Grid>
    );
  }
}

export default ImagenCircular;
