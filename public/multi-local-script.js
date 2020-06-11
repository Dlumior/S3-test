
async function onSignIn(googleUser) {
  console.log("HAAAAAA ");
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  if (profile) {
    const JinSSJHAAA = {
      id: profile.getId(),
      nombre: profile.getName(),
      image: profile.getImageUrl(),
      correo: profile.getEmail(),
    };
    var auth2 = gapi.auth2.getAuthInstance();
    await auth2.signOut();
    if (!sessionStorage.getItem("usuario_logueado")) {
      sessionStorage.setItem("usuario_logueado", JSON.stringify(JinSSJHAAA));
      window.location.replace("./");
    }
  }
}
