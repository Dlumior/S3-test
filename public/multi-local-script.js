
async function onSignIn(googleUser) {
  console.log("LOGIN DE GOOOGLEEEEEEEEEE");
  var profile = googleUser.getBasicProfile();
  if (!profile) return;

  const usuarioCorreo = "itsame@pucp.pe";//profile.getEmail();
  var auth2 = gapi.auth2.getAuthInstance();
  await auth2.signOut();
  // Si aun no estoy logueado
  //if (!sessionStorage.getItem("Sesion")) {
  let usuarioLogueado = await fetch("/api/usuario/" + usuarioCorreo, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let responseJson = await usuarioLogueado.json();
  console.log("google obtains: ", responseJson);
  sessionStorage.setItem("Sesion",JSON.stringify(
    responseJson
  ));
  //console.log("responseJson.usuario",responseJson.usuario.ROL_X_USUARIO_X_PROGRAMAss);
  window.location.replace("./"+ responseJson.usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION.toLowerCase());
}
