import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import React, { Component } from "react";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import theme from "../../theme";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Jloading from "../Coordinador/FormRegistroAlumno/Jloading";

class MultiDialog extends Component {
  constructor(props) {
    super();
    this.state = { open: props.open };
    this.handleOnClose = this.handleOnClose.bind(this);
  }
  handleOnClose() {
    this.setState({ open: false });
    this.props.onCloseDialog();
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.open !== this.props.open) {
      return true;
    }
    return false;
  }
  render() {
    const { mensaje, open } = this.props;

    if (mensaje === "") {
      return <></>;
    } else {
      const [tipo, mensajePropiamente] = mensaje.split(">");
      return (
        <div style={{ display: mensajePropiamente === "" ? "none" : "block" }}>
          <ThemeProvider theme={theme}>
            <Dialog
              open={this.props.open}
              scroll={"paper"}
              onClose={this.handleOnClose}
              aria-describedby="scroll-dialog-description"
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="scroll-dialog-title">
                <Grid container md={12} justify="center">
                  {tipo === "X" ? (
                    <CancelRoundedIcon color="error" style={{ fontSize: 70 }} />
                  ) : tipo === "L" ? (
                    <Jloading mensaje={""} size={"xs"} />
                  ) : tipo === "C" ? (
                    <CheckCircleRoundedIcon
                      color="primary"
                      style={{ fontSize: 70 }}
                    />
                  ) : tipo === "W" ? (
                    <WarningRoundedIcon
                      style={{ fontSize: 70, fill: "orange" }}
                    />
                  ) : (
                    <></>
                  )}

                  {/**
                   *
                   */}
                </Grid>
              </DialogTitle>
              
              <DialogContent >
                {mensajePropiamente}
                </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleOnClose}
                  style={{display:(tipo === "L")?"none":"block"}}
                >
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </div>
      );
    }
  }
}

export default MultiDialog;
