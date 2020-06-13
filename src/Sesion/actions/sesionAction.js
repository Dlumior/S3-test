import { POST } from "../../Conexion/Controller";
import { localLogOut, localLogin, getUser } from "../Sesion";
/**
 *
 * @param {*} dispatch
 * @param {*} usuario
 * @param {*} password
 */
export const iniciarSesion = async (dispatch, nombreUsuario, contrasenha) => {
  return new Promise(async (resolve, reject) => {
    try {
      const datosUsuario = {
        usuario: {
          USUARIO: nombreUsuario,
          CONTRASENHA: contrasenha,
        },
      };
      console.log("LOGUEANDOOO...", datosUsuario);
      const usuarioLogueado = await POST({
        servicio: "/api/usuario/login",
        request: datosUsuario,
      });
      console.log("consegui...", usuarioLogueado);
      if (usuarioLogueado.usuario!== null) {
        dispatch({
          type: "LOG_IN",
          usuario: usuarioLogueado,
          auth: true,
        });
        localLogin(usuarioLogueado);
        resolve({ status: true, data: usuarioLogueado });
      }
      reject({ status: false, data: "MALDICIOOOOOOOON" });
    } catch (error) {
      reject({ status: false, data: "MALDICIOOOOOOOON" });
    }
  });
};
/**
 *
 * @param {dispatchAciton} dispatch
 * @param {*} usuario
 * @param {*} password
 */
export const registrarse = (dispatch, newUser) => {
  return new Promise((resolve, reject) => {
    try {
      //llamo al back aqui
      //let new User = await POST({servicio:"/api/registrarse",request:usuario});
      dispatch({
        type: "LOG_IN",
        usuario: newUser,
        auth: true,
      });
      localLogin(newUser);
      resolve({ status: true });
    } catch (error) {
      reject();
    }
  });
};
/**
 *
 * @param {*} dispatch
 */
export const logOut = (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      //llamo al back aqui
      //await POST({servicio:"/api/registrarse",request:usuario});

      dispatch({
        type: "FINISH_SESION",
        usuario: {},
        auth: false,
      });
      localLogOut();
      resolve({ status: true });
    } catch (error) {
      reject({ status: false });
    }
  });
};
/**
 *
 * @param {*} dispatch
 * @param {*} usuario
 */
export const inicializarSesion = (dispatch, usuario) => {
  console.log("Inicializando...");
  try {
    //chequeo al el storage
    let usuarioLogueado = getUser();
    console.log("Revisando Storage", usuarioLogueado);
    if (usuarioLogueado) {
      console.log("Storage Data inicial", usuarioLogueado);
      dispatch({
        type: "INITIALIZE_SESION",
        usuario: usuarioLogueado,
        auth: true,
      });
      return { status: true, data: usuarioLogueado };
    }
    console.log("Storage vacio", usuarioLogueado);

    dispatch({
      type: "INITIALIZE_SESION",
      usuario: usuario,
      auth: false,
      // },
    });
    return { status: false, data: "storage vacio" };
  } catch (error) {
    return { status: false, data: "MALDICIOOOOOOOON" };
  }
};
