/**
 *
 * @param {*} lista
 * @param {*} identificador
 * @param {*} grupo
 */
export const parseMaterialJTable = async (lista, identificador, grupo) => {
  return new Promise((resolve, reject) => {
    try {
      let columnas = [];
      let data = lista[identificador];
      const tags = data[0];
      console.log("tags-> then", tags);
      let N = 0;
      tags.forEach((tag) => {
        if (grupo) {
          columnas.push({
            title: tag.toUpperCase(),
            field: tag.toLowerCase(),
            grouping: false,
          });
        } else {
          columnas.push({ title: tag, field: tag.toLowerCase() });
        }

        N++;
      });

      console.log("tags-> now", columnas);
      ///////////////
      let datafinal = [];
      data = data.slice(1); //quite los titlos
      let conErrores = false;
      data.forEach((registro, num) => {
        let dataregistro = {};
        let errores = [];
        //genero un key para bicar en el array
        dataregistro.key = num;

        columnas.forEach((tag, count) => {
          dataregistro[tag.field] = registro[count];
          /** Aqui va una validacion por tipo de entrada */
          errores += validacionDeEntrada(registro[count], tag.field);
        });

        console.log("[].length", errores);
        if (grupo) {
          if (errores.length > 0) {
            conErrores = true;
            dataregistro[grupo.toLowerCase()] = "Con errores";
            dataregistro.errores = errores;
          } else {
            dataregistro[grupo.toLowerCase()] = "Sin errores";
          }
        }
        datafinal.push(dataregistro);
      });
      console.log("datafinal-> now", datafinal);

      console.log(
        "Te odio hooks..... sabias que ya pude usar esa material table como clase con todas sus caracteristicas? XDD"
      );
      // Le agregamos el group solo a la fila de agruypacion
      if (grupo) {
        if (conErrores) {
          columnas.push({
            title: grupo,
            field: grupo.toLowerCase(),
            defaultGroupOrder: 0,
          });
          columnas.push({
            title: "ERRORES",
            field: "errores",
            grouping: false,
          });
        }
      }
      resolve({ data: datafinal, columns: columnas, huboErrores: conErrores });
    } catch (error) {
      resolve({ data: [], columns: [] });
    }
    //return {data: datafinal, columns:columnas};
  });
};
export const validateMaterialJTableData = async (dataIni, columIni, grupo) => {
  console.log("TablaSSJ lo que entra: ", dataIni);
  return new Promise((resolve, reject) => {
    let datafinal = dataIni;
    let columnas = [];
    let conErrores = false;
    try {
      console.log("Se logro entrar: ", {
        data: dataIni,
        columns: columIni,
        grupo: grupo,
      });

      //genero las columnas
      columIni.forEach((tag) => {
        if (grupo) {
          columnas.push({
            title: tag,
            field: tag.toLowerCase(),
            grouping: false,
          });
          console.log("Se logro agrupar: ");
        } else {
          columnas.push({ title: tag, field: tag.toLowerCase() });
          console.log("Se logro no agrupar: ");
        }
      });
      //genero y valido la data
      datafinal.forEach((registro,key) => {
        console.log("Se logro recorrer la data: ");
        registro.key=key;
        let errores = [];
        columIni.forEach((tag) => {
          if(!registro[tag.toLowerCase()]){
            registro[tag.toLowerCase()]="";
          }
          errores += validacionDeEntrada(
            registro[tag.toLowerCase()],
            tag.toLowerCase()
          );
        });
        console.log("Se logro recorrer y validar las columnas: ");
        if (errores.length > 0) {
          conErrores = true;
          registro[grupo.toLowerCase()] = "Con errores";
          registro.errores = errores;
        } else {
          registro[grupo.toLowerCase()] = "Sin errores";
        }
      });

      // Le agregamos el group solo a la fila de agruypacion
      if (grupo) {
        if (conErrores) {
          columnas.push({
            title: grupo,
            field: grupo.toLowerCase(),
            defaultGroupOrder: 0,
          });
          columnas.push({
            title: "Errores",
            field: "errores",
            grouping: false,
          });
        }
      }
      console.log("Se logro: ", {
        data: datafinal,
        columns: columnas,
        huboErrores: conErrores,
      });
      resolve({ data: datafinal, columns: columnas, huboErrores: conErrores });
      console.log("TablaSSJ lo que entra: ", datafinal);
    } catch (error) {
      console.log("TablaSSJ Se logro fallar: ");
      reject();
    }
  });
};

const regex = {
  email: /^[a-z0-9](\.?[a-z0-9]){5,}@pucp(\.edu)?\.pe$/,
  codigo: /[a-z]+/i,
  telefono: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  direccion: /[A-Za-záéíóúñ0-9 ()-,.]+/i,
};
export const validaciones = {
  nombre: { lim: 25, req: true },
  apellidos: { lim: 50, req: true },
  correo: { lim: 25, tipo: "email", req: true },
  telefono: { lim: 45, tipo: "telefono", req: false },
  direccion: { lim: 50, tipo: "direccion", req: true },
  codigo: { lim: 10, tipo: "codigo", req: true },
};
const dominio = "pucp.pe";

const dominio2 = "pucp.edu.pe";
/**
 *
 * @param {string} texto
 * @param {json} validacion
 */
export const validacionDeEntrada = (texto, nombre) => {
  const validacion = validaciones[nombre];
  console.log(
    "me toca validar a este men",
    texto + "-" + JSON.stringify(validacion) + "-" + nombre
  );
  if (!validacion.req) {
    return [];
  }
  let errores = [];
  // Validacion de limite de tamaño
  if (texto.length === 0) {
    errores.push(
       `*${nombre} no puede ser vacio\n`
    );
  }
  if (texto.length > validacion.lim) {
    errores.push(
      `*${nombre} debe ser maximo de ${validacion.lim} caracteres\n`
    );
  }
  // validacion en caso sea un email
  if (validacion.tipo === "email") {
    if (
      texto.substr(-dominio.length) !== dominio &&
      texto.substr(-dominio2.length) !== dominio2
    ) {
      let errorMessageDomain = "";
      if (dominio) {
        console.log("dom1: ", dominio);
        errorMessageDomain = errorMessageDomain + dominio;
      }
      if (dominio2) {
        console.log("dom2: ", dominio2);
        errorMessageDomain = errorMessageDomain + " - " + dominio2;
      }
      errores.push(
      `* Un correo valido debe contener caracteres alfanumericos, un "@" y ser del dominio de la institución: ${errorMessageDomain}\n`
      );
    }
  }

  //validacion en caso sea telefono
  if (validacion.tipo === "telefono") {
    if (regex.telefono.test(String(texto))) {
      errores.push(
        "* Un telefono valido debe contener caracteres numericos y los caracteres - , +, ( , )\n"
      );
    }
  }
  //validacion en caso sea direccion
  if (validacion.tipo === "direccion") {
    if (!regex.direccion.test(String(texto))) {
      errores.push(
        "* Una direccion valido debe contener caracteres alfanumericos y los caracteres - , ( , )\n"
      );
    }
  }
  //validacion en caso sea codigo
  if (validacion.tipo === "codigo") {
    //si encontr este patron , esta mal
    if (regex.codigo.test(String(texto))) {
      errores.push(
        "* Un codigo valido debe contener caracteres alfanumericos y caracters especiales\n"
      );
    }
  }
  //Si paso las validaciones errores sera "[ ]" sino habra contenido
  console.log("Validacion-> ", errores);
  return errores;
};
