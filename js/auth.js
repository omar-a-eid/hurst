export default function auth(path) {
  let isLogged = sessionStorage.getItem("loggedUser");
  if (!isLogged && path) {
    window.location.href = path;
  }
  return isLogged;
}
