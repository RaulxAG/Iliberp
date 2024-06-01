const queryStringCategory = window.location.href.split("/"); // dividir la url por el separador '/'.

let url_category = queryStringCategory[queryStringCategory.length - 2]; // recoger el nombre de la ultima posicion de la url, ejemplo: /hola/mundo/ de esta se recoge 'mundo'.

url_category = decodeURIComponent(url_category);

let selectedCategory = document.getElementById("optionCategory_"+url_category); // seleccionar el elemento HTML con el ID 'option_' seguido del nombre coincidente en la URL.
selectedCategory.getElementsByTagName("i")[0].style.border = "2px solid white"; // cambiar el color al elemento seleccionado.
