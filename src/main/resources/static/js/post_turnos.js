// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el formulario de agregar turno
  const form = document.getElementById('add_new_turno');

  // Escuchar el evento submit del formulario
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    const idPaciente = document.getElementById('idPaciente').value;
    const idOdontologo = document.getElementById('idOdontologo').value;
    const fecha = document.getElementById('fecha').value;

    // Crear un objeto turno con los valores del formulario
    const turno = {
      paciente: {
        id: idPaciente
      },
      odontologo: {
        id: idOdontologo
      },
      fecha: fecha
    };

    // Realizar una solicitud POST al servidor para guardar el turno
    fetch('/turnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(turno)
    })
      .then(response => response.json())
      .then(data => {
        // Mostrar la respuesta del servidor
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'El turno se ha guardado correctamente.';
        responseDiv.style.display = 'block';

        // Limpiar el formulario
        form.reset();
      })
      .catch(error => {
        // Mostrar mensajes de error en caso de que la solicitud falle
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'Error al guardar el turno. Por favor, intenta nuevamente.';
        responseDiv.style.display = 'block';
        console.error('Error al guardar el turno:', error);
      });
  });
});