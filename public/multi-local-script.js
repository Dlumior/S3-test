
async function onSignIn(googleUser) {
  console.log("LOGIN DE GOOOGLEEEEEEEEEE");
  var profile = googleUser.getBasicProfile();
  if (!profile) return;

  const usuarioCorreo = "alum77@pucp.edu.pe";//profile.getEmail();
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
  window.location.replace("./"+ responseJson.usuario.ROLs[0].DESCRIPCION.toLowerCase());
}
