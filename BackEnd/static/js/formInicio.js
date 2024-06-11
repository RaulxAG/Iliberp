
const formularios = document.getElementById('formularios');
const formIniciarSesion = document.getElementById("formIniciarSesion");
const formRegistrarse = document.getElementById("formRegistrarse");
let form = true;

function movieForm (direccion) {
    formularios.style.left = direccion === "left" ? "0" : "50%";
    form = !form;
    if (direccion === "left") {
        formIniciarSesion.classList.remove("d-flex");
        formIniciarSesion.classList.add("d-none");
        formRegistrarse.classList.remove("d-none");
        formRegistrarse.classList.add("d-flex");
    } else if (direccion === "right") {
        formIniciarSesion.classList.remove("d-none");
        formIniciarSesion.classList.add("d-flex");
        formRegistrarse.classList.remove("d-flex");
        formRegistrarse.classList.add("d-none");
    }
};