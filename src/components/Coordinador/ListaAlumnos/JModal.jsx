import React, { Component } from "react";
import { thisExpression } from "@babel/types";
import "./styles_Jmodal.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
const estilo = {
  centerDialog: {
    marginLeft: "10%",
    marginRight: "10%",
    color: "#002D3D",
    textAlign: "center",
  },
};
class JModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    //this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.hadleClose();
  }

  render() {
    return (
      <>
        <Button onClick={() => this.handleClickOpen()}>ABRIR</Button>

        <Dialog
          open={this.props.open}
          onClose={() => this.handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            {this.props.titulo}
          </DialogTitle>
          <DialogContent dividers={"paper"}>
            <DialogContentText
              style={estilo.centerDialog}
              id="scroll-dialog-description"
              //ref={descriptionElementRef}
              tabIndex={-1}
            >
              {this.props.body}
            </DialogContentText>
          </DialogContent>
          {this.props.botonIzquierdo || this.props.derecho ? (
            <DialogActions>
              {this.props.botonIzquierdo ? (
                <Button
                  onClick={this.handleClose}
                  variant={"outlined"}
                  color="primary"
                >
                  {this.props.botonIzquierdo}
                </Button>
              ) : (
                <></>
              )}
              {this.props.botonDerecho ? (
                <Button
                  onClick={this.handleClose}
                  variant={"contained"}
                  color="primary"
                >
                  {this.props.botonDerecho}
                </Button>
              ) : (
                <></>
              )}
            </DialogActions>
          ) : (
            <></>
          )}
        </Dialog>
      </>
    );
  }
}
export default JModal;
