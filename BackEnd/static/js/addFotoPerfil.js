// función de JavaScript que se utiliza para previsualizar una imagen seleccionada por el usuario antes de subirla al servidor
function addImg(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('profileImage');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
