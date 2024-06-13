if (window.location.href.includes("details")) {
var addTimeCheckbox = document.querySelector("#addTime");
var timeInput = document.querySelector("#timeLine");
var startInput = document.getElementById("start");
var endInput = document.getElementById("end");
var commentsLine = document.getElementById("commentsLine")
var dateLine = document.getElementById("dateLine");
var btnSave =document.querySelector("#saveLine")

startInput.addEventListener("input", calculateTimeDifference);
endInput.addEventListener("input", calculateTimeDifference);
addTimeCheckbox.addEventListener("change", calculateTimeDifference);

addTimeCheckbox.addEventListener("change", function () {
    timeInput.readOnly = !this.checked;
    calculateManual();
});

startInput.addEventListener("input", calculateTimeDifference);
endInput.addEventListener("input", calculateTimeDifference);

//Lllamar a la funcion que habilita o desabilita el boton de guardar en todos los eventos
startInput.addEventListener("input", enableDisableSaveButton);
endInput.addEventListener("input", enableDisableSaveButton);
timeInput.addEventListener("input", enableDisableSaveButton);
commentsLine.addEventListener("input", enableDisableSaveButton);
dateLine.addEventListener("change", enableDisableSaveButton);

function calculateTimeDifference() {
    // Obtener las horas de inicio y fin
    var startTime = startInput.valueAsDate;
    var endTime = endInput.valueAsDate;

    if (startTime && endTime) {
        //Controlar el claculo negativo
        if (endTime.getTime() < startTime.getTime()) {
            timeInput.value="Horas negativas"
        }else{
            // Calcular la diferencia de tiempo en milisegundos
            let difference = endTime.getTime() - startTime.getTime(); 

            // Formatear la hora
            let hours = Math.floor(difference / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            // Formatear la diferencia como hh:mm
            let formattedDifference = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

            // Mostrar la hora calculada
            timeInput.value = formattedDifference;
        }

        

    } else {
        timeInput.value = '';
    }
}


addTimeCheckbox.addEventListener('change', calculateManual);
startInput.addEventListener('input', calculateManual);
timeInput.addEventListener('input', calculateManual);

function calculateManual() {
    if (addTimeCheckbox.checked && startInput.value) {
        let startTime = startInput.value;
        let timeParts = timeInput.value.split(':');

        // Expresión regular para el formato hh:mm
        let timePattern = /^\d{2}:\d{2}$/;

         // Verifica que haya dos partes en el tiempo empleado y que ambas partes sean números
         if (timeParts.length === 2 && timePattern.test(timeInput.value)) {
            if (timeInput.value !== "Horas negativas") {
                let startHours = parseInt(startTime.split(':')[0], 10);
                let startMinutes = parseInt(startTime.split(':')[1], 10);

                let additionalHours = parseInt(timeParts[0], 10);
                let additionalMinutes = parseInt(timeParts[1], 10);

                let endDate = new Date();
                endDate.setHours(startHours + additionalHours, startMinutes + additionalMinutes);

                let endHours = endDate.getHours().toString().padStart(2, '0');
                let endMinutes = endDate.getMinutes().toString().padStart(2, '0');

                endInput.value = `${endHours}:${endMinutes}`;
            } else {
                endInput.value = ""; // Limpiar el campo de hora de finalización si las horas son negativas
            }

        }
    }
}

// Función para habilitar o deshabilitar el botón de guardar
function enableDisableSaveButton() {
    let commentsLine = document.getElementById("commentsLine").value;
    let dateLine = document.getElementById("dateLine").value;
    let timeLine = document.getElementById("timeLine").value;
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    console.log(commentsLine+"-"+dateLine+"-"+timeLine+"-"+start+"-"+end)

    // Verificar si todos los campos están rellenos y la hora de fin no es menor que la de inicio
    if (commentsLine && dateLine && timeLine!=="Horas negativas" && start && end) {
        btnSave.disabled = false; // Habilitar el botón de guardar
    } else {
        btnSave.disabled = true; // Deshabilitar el botón de guardar
    }
}

}