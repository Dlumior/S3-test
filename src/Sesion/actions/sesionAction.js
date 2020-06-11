import { POST } from "../../Conexion/Controller";
/**
 * 
 * @param {*} dispatch 
 * @param {*} usuario 
 * @param {*} password 
 */
export const iniciarSesion = async (dispatch, usuario, password) => {
  return new Promise((resolve, reject) => {
    
    try {
      //llamo al back aqui
      //await POST({servicio:"/api/login",request:usuario});
      console.log("iniciarSesion--->: ", usuario + "-> " + password);
      const user = {
        nombre: usuario + "**",
        apellido:password + "rated",
        foto: "foto",
        email: "email",
      };
      dispatch({
        type: "LOG_IN",
        sesion: user,
        auth: true,
      });
      resolve({status:true,data:usuario});

    } catch (error) {
      reject({status:false, data: "MALDICIOOOOOOOON"});
    }
  });
};
/**
 * 
 * @param {*} dispatch 
 * @param {*} usuario 
 * @param {*} password 
 */
export const registrarse = (dispatch, usuario, password) => {
  return new Promise((resolve, reject) => {
    try {
      //llamo al back aqui
      //await POST({servicio:"/api/registrarse",request:usuario});
      const usuario = {
        nombre: "Jin",
        apellido: "SSJ",
        foto: "foto",
        email: "email",
      };
      dispatch({
        type: "LOG_IN",
        sesion: usuario,
        auth: true,
      });
      resolve({status:true});

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
      const usuario = {
        nombre: "",
        apellido: "",
        foto: "",
        email: "",
      };
      dispatch({
        type: "FINISH_SESION",
        nuevoUsuario: usuario,
        auth: false,
      });
      resolve({status:true});
    } catch (error) {
      reject();
    }
  });
};
