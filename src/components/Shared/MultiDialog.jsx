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
    const [tipo, mensajePropiamente] = mensaje.split(">");
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Dialog
            open={this.props.open}
            onClose={this.handleOnClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="form-dialog-title">
              <Grid container md={12} justify="center">
                {tipo === "C" ? (
                  <CheckCircleRoundedIcon
                    color="primary"
                    style={{ fontSize: 70 }}
                  />
                ) : tipo === "W" ? (
                  <WarningRoundedIcon
                    style={{ fontSize: 70, fill: "orange" }}
                  />
                ) : (
                  <CancelRoundedIcon color="error" style={{ fontSize: 70 }} />
                )}

                {/**
                 *
                 */}
              </Grid>
            </DialogTitle>
            <DialogContent>{mensajePropiamente}</DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleOnClose}
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

export default MultiDialog;
