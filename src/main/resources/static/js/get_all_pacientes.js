// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
  // Obtener la referencia al tbody de la tabla
  const pacientesTableBody = document.getElementById('pacientesTableBody');

  // Función para eliminar un paciente
  function eliminarPaciente(id) {
    fetch(`/pacientes/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
      alert(data); // Mostrar el mensaje de eliminación
      location.reload(); // Recargar la página para reflejar los cambios
    })
    .catch(error => console.error(error));
  }

  // Función para actualizar un paciente
  function actualizarPaciente(id, nuevoPaciente) {
    fetch(`/pacientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoPaciente)
    })
    .then(response => response.text())
    .then(data => {
      alert(data); // Mostrar el mensaje de actualización
      location.reload(); // Recargar la página para reflejar los cambios
    })
    .catch(error => console.error(error));
  }

  // Obtener la lista de pacientes del servidor
  fetch('/pacientes/list')
    .then(response => response.json())
    .then(data => {
      // Recorrer la lista de pacientes y agregar filas a la tabla
      data.forEach(paciente => {
        // Crear una nueva fila
        const row = document.createElement('tr');

        // Agregar las celdas con los datos del paciente
        const idCell = document.createElement('td');
        idCell.textContent = paciente.id;
        row.appendChild(idCell);

        const nombreCell = document.createElement('td');
        nombreCell.textContent = paciente.nombre;
        row.appendChild(nombreCell);

        const apellidoCell = document.createElement('td');
        apellidoCell.textContent = paciente.apellido;
        row.appendChild(apellidoCell);

        const documentoCell = document.createElement('td');
        documentoCell.textContent = paciente.documento;
        row.appendChild(documentoCell);

        const fechaIngresoCell = document.createElement('td');
        fechaIngresoCell.textContent = paciente.fechaIngreso;
        row.appendChild(fechaIngresoCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = paciente.email;
        row.appendChild(emailCell);

        const modificarCell = document.createElement('td');
        const modificarButton = document.createElement('button');
        modificarButton.textContent = 'Modificar';
        modificarButton.classList.add('btn', 'btn-primary');
        modificarButton.addEventListener('click', function () {
          // Obtener los nuevos datos del paciente (por ejemplo, mediante un formulario o ventana de diálogo)
          const nuevosDatos = {
            nombre: 'Nuevo nombre',
            apellido: 'Nuevo apellido',
            documento: 'Nuevo documento',
            fechaIngreso: 'Nueva fecha de ingreso',
            email: 'Nuevo email'
          };

          actualizarPaciente(paciente.id, nuevosDatos);
        });
        modificarCell.appendChild(modificarButton);
        row.appendChild(modificarCell);

        const eliminarCell = document.createElement('td');
        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.classList.add('btn', 'btn-danger');
        eliminarButton.addEventListener('click', function () {
          eliminarPaciente(paciente.id);
        });
        eliminarCell.appendChild(eliminarButton);
        row.appendChild(eliminarCell);

        // Agregar la fila a la tabla
        pacientesTableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
});