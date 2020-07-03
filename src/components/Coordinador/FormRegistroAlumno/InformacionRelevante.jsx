import React, { Component } from "react";
import { getUser } from "../../../Sesion/Sesion";
import TituloFormulario from "../Tutorias/TituloFormulario";
import EnConstruccion from "../../Shared/EnConstruccion";
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
class InformacionRelevante extends Component {
  render() {
    return (
      <div>
        {/**<TituloFormulario titulo="Importar Informacion relevante" />
         * Te la creiste Wey aun esta en construcción XDDDD
         * Lo que viste fue una ilusion XD
         * PD. holiiiiiiisss aha ha ha haaaa (Cat-2012)
         * PD2. TE ODIO HOOKS
         * PD3. lo subo cuando lo acabe DE hacerlo XDDDDDD
         */}
        <iframe
          className="portalDimensionalDeJin"
          src={`http://localhost:3001/ImportarInformacionRelevante/${JSON.stringify(
            getUser().usuario.CORREO
          )}/${this.props.idAlumno}`}
          width="100%"
          height={1000}
          frameborder="0"
          allowfullscreen
          sandbox
          styler={style.otherDimension}
        ></iframe>
      </div>
    );
  }
}

export default InformacionRelevante;
