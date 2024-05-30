var addTimeCheckbox = document.querySelector("#addTime");
var timeInput = document.querySelector("#time");
var startInput = document.getElementById("start");
var endInput = document.getElementById("end");


startInput.addEventListener("input", calculateTimeDifference);
endInput.addEventListener("input", calculateTimeDifference);
addTimeCheckbox.addEventListener("change", calculateTimeDifference);

addTimeCheckbox.addEventListener("change", function () {
    timeInput.disabled = !this.checked;
    calculateManual();
});

startInput.addEventListener("input", calculateTimeDifference);
endInput.addEventListener("input", calculateTimeDifference);


function calculateTimeDifference() {
    // Obtener las horas de inicio y fin
    var startTime = startInput.valueAsDate;
    var endTime = endInput.valueAsDate;

    if (startTime && endTime) {
        // Calcular la diferencia de tiempo en milisegundos
        var difference = endTime.getTime() - startTime.getTime();

        // Formatear la hora
        var hours = Math.floor(difference / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        // Formatear la diferencia como hh:mm
        var formattedDifference = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

        // Mostrar la hora calculada
        timeInput.value = formattedDifference;

    } else {
        timeInput.value = '';
    }
}


addTimeCheckbox.addEventListener('change', calculateManual);
startInput.addEventListener('input', calculateManual);
timeInput.addEventListener('input', calculateManual);

function calculateManual() {
    if (addTimeCheckbox.checked && startInput.value) {
        var startTime = startInput.value;
        var timeParts = timeInput.value.split(':');

        // Expresión regular para el formato hh:mm
        var timePattern = /^\d{2}:\d{2}$/;

         // Verifica que haya dos partes en el tiempo empleado y que ambas partes sean números
         if (timeParts.length === 2 && timePattern.test(timeInput.value)) {
            var startHours = parseInt(startTime.split(':')[0], 10);
            var startMinutes = parseInt(startTime.split(':')[1], 10);

            var additionalHours = parseInt(timeParts[0], 10);
            var additionalMinutes = parseInt(timeParts[1], 10);

            var endDate = new Date();
            endDate.setHours(startHours + additionalHours, startMinutes + additionalMinutes);

            var endHours = endDate.getHours().toString().padStart(2, '0');
            var endMinutes = endDate.getMinutes().toString().padStart(2, '0');

            endInput.value = `${endHours}:${endMinutes}`;
        }
    }
}