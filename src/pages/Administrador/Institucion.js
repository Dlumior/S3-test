const titulo = "Configuracion de la Institución";
class Institucion extends Component {
  constructor() {
    super();
    this.state = {
      procesos: [
        {
          index: 0,
          proceso: FormNuevaTutoria,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <NombrePrincipal titulo={titulo} />
        <TabProceso procesos={this.state.procesos} />
      </div>
    );
  }
}
