  // Esperar a que el DOM esté cargado
  document.addEventListener('DOMContentLoaded', function () {
    // Obtener el formulario por su ID
    const form = document.getElementById('add_new_paciente');

    // Agregar un evento de escucha para el evento submit del formulario
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevenir el envío del formulario por defecto

      // Obtener los valores ingresados por el usuario
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const email = document.getElementById('email').value;
      const documento = document.getElementById('documento').value;
      const fechaIngreso = document.getElementById('fechaIngreso').value;
      const calle = document.getElementById('calle').value;
      const numero = document.getElementById('numero').value;
      const localidad = document.getElementById('localidad').value;
      const provincia = document.getElementById('provincia').value;

      // Crear un objeto con los datos del nuevo paciente
      const nuevoPaciente = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        documento: documento,
        fechaIngreso: fechaIngreso,
        domicilio: {
          calle: calle,
          numero: numero,
          localidad: localidad,
          provincia: provincia
        }
      };

      // Enviar el objeto al servidor utilizando una solicitud POST con fetch o AJAX
      // Aquí hay un ejemplo de cómo hacerlo con fetch:
      fetch('/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPaciente)
      })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes hacer algo con la respuesta del servidor si es necesario
        console.log(data);
        alert('Nuevo paciente guardado correctamente');
        form.reset(); // Limpiar el formulario después de guardar el paciente
      })
      .catch(error => {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error al guardar el paciente:', error);
        alert('Error al guardar el paciente. Por favor, intenta nuevamente.');
      });
    });
  });