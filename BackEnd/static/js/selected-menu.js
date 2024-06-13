const queryString = window.location.href.split("/"); // dividir la url por el separador '/'.

let url_category = queryString[queryString.length - 2]; // recoger el nombre de la ultima posicion de la url, ejemplo: /hola/mundo/ de esta se recoge 'mundo'.

url_category = decodeURIComponent(url_category);

let selected = document.getElementById("option_"+url_category); // seleccionar el elemento HTML con el ID 'option_' seguido del nombre coincidente en la URL.
selected.style.backgroundColor = "#1e2225"; // cambiar el color al elemento seleccionado.
