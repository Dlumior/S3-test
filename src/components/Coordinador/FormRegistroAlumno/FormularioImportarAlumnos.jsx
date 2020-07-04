import React, { Component } from "react";
import { Paper, ThemeProvider } from "@material-ui/core";
import EnConstruccion from "../../Shared/EnConstruccion";
import TituloFormulario from "../Tutorias/TituloFormulario";
import { getUser } from "../../../Sesion/Sesion";
import JinUploadSSJ from "jin-upload-ssj";
import theme from "../../../theme";
import { withRouter } from "react-router-dom";
const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
};
class FormularioImportarAlumnos extends Component {
  render() {
    return (
      <div>
        {/**
         * Te la creiste Wey aun esta en construcción XDDDD
         * Lo que viste fue una ilusion XD
         * PD. holiiiiiiisss aha ha ha haaaa (Cat-2012)
         * PD2. TE ODIO HOOKS
         * PD3. lo subo cuando lo acabe de hacerloXDDDDDD
         */}
        <div>
          <div>
            <div>
              <div>
                <JinUploadSSJ
                  usuario={getUser().usuario}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormularioImportarAlumnos;
