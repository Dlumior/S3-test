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
          src={this.props.src}
        />
      </div>
    );
  }
}

export default EnConstruccion;
