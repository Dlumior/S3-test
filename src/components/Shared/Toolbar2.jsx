import React, { Component } from "react";
import JToolbarSSJ from "jin-super-responsive-toolbar-ssj";
import { withStyles } from "@material-ui/core";
//import JToolbarSSJ2 from "./Toolbar.jsx";

const styles = (theme) => ({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("xs")]: {
        display: "none",
      },
    },
    grow: { flexGrow: 0.75 },
    growmid: { flexGrow: 0.35 },
  });
class JToolbarSSJ3 extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      return true;
    }
    return false;
  }
  render() {
    
    return (
      <div>
        <JToolbarSSJ
          MenuIconButton={this.props.MenuIconButton}
          imagenPerfil={this.props.imagenBase?`data:image/jpeg;base64,${this.props.imagenPerfil}`:this.props.imagenPerfil}
          rol={this.props.rol}
          NOMBRE={this.props.NOMBRE}
          APELLIDOS={this.props.APELLIDOS}
          classes={this.props.classes}
          CampanitaIconButton={this.props.CampanitaIconButton}
        />
      </div>
    );
  }
}

export default withStyles(styles)(JToolbarSSJ3);
