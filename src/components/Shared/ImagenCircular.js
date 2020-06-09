import React, { Component } from "react";
import { Grid } from "@material-ui/core";
const styles = {
  imagen: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: "50%",
    objectFit: "cover",
    width: "100%",
  },
};
class ImagenCircular extends Component {
  render() {
    return (
        <Grid item md={12} xs={12}>
        {/*<img style={styles.imagen} src="https://pbs.twimg.com/profile_images/1536302406/AlyciaPurrott1-SPD_400x400.jpg" alt=""/>*/}
        <img style={styles.imagen} src= {this.props.src} alt=""/>
      </Grid>
    );
  }
}

export default ImagenCircular;
