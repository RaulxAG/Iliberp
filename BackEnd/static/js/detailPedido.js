let inputs = document.getElementsByClassName("input");
let btnEdit = document.getElementById("buttonEdit");
let saveDiv = document.getElementsByClassName("formulario__buttons")[0]

btnEdit.addEventListener("click", () => {
    Array.from(inputs).forEach(input => {
        input.disabled = false;
    });

    btnEdit.classList.add("d-none");
    saveDiv.classList.remove("d-none");
})