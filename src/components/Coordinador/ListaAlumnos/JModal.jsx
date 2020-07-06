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
  Grid,
} from "@material-ui/core";
import ImagenCircular from "../../Shared/ImagenCircular";
import TituloFormulario from "../Tutorias/TituloFormulario";
const estilo = {
  centerDialog: {
    marginLeft: "1%",
    marginRight: "1%",
    color: "#002D3D",
    textAlign: "center",
    minHeight:550,
    maxHeight: 900
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
componentDidMount(){
this.setState({open:false});
}
  render() {
    const {maxWidth} = this.props;
    const titleSize= maxWidth==="xl"?1:2;
    return (
      <>
        <Dialog
          open={this.props.open}
          onClose={() => this.handleClose}
          scroll={"paper"}
          fullWidth
          maxWidth={maxWidth}
          aria-describedby="scroll-dialog-description"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            <Grid container spacing={2}>

            <Grid item md={titleSize} xs={titleSize}>
                <ImagenCircular 
                src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted.png"
                square
                />
            </Grid>
            <Grid item md={12-titleSize} xs={12-titleSize}>
            <TituloFormulario titulo={this.props.titulo} />

              
            </Grid>
            </Grid>
            
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
          {this.props.botonIzquierdo || this.props.botonDerecho ? (
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
