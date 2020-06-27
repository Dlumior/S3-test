import React, { Component } from "react";
const styles = {
  imagen: {
    objectFit: "cover",
    width: "100%",
  },
};
class EnConstruccion extends Component {
  render() {
    return (
      <div>
        <img
          style={styles.imagen}
          src="https://ututor-recursos.s3.amazonaws.com/holiiiis4.png"
        />
      </div>
    );
  }
}

export default EnConstruccion;
