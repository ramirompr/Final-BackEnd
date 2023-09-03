document.addEventListener('DOMContentLoaded', function() {
  // Realizar una solicitud GET para obtener la lista de odontologos
  fetch('/odontologos/list')
    .then(response => response.json())
    .then(data => {
      // Manipular los datos recibidos, por ejemplo, mostrarlos en la consola o en la tabla HTML
      console.log(data); // Imprimir los datos en la consola

      // Obtener la tabla de odontologos en el DOM
      const odontologosTableBody = document.getElementById('odontologosTableBody');

      // Limpiar el contenido de la tabla
      odontologosTableBody.innerHTML = '';

      // Verificar si se recibieron odontologos
      if (data.length > 0) {
        // Iterar sobre los odontologos y agregar cada uno a la tabla
        data.forEach(odontologo => {
          const row = document.createElement('tr');

          const idCell = document.createElement('td');
          idCell.textContent = odontologo.id;
          row.appendChild(idCell);

          const nombreCell = document.createElement('td');
          nombreCell.textContent = odontologo.nombre;
          row.appendChild(nombreCell);

          const apellidoCell = document.createElement('td');
          apellidoCell.textContent = odontologo.apellido;
          row.appendChild(apellidoCell);

          const matriculaCell = document.createElement('td');
          matriculaCell.textContent = odontologo.matricula;
          row.appendChild(matriculaCell);

          const accionesCell = document.createElement('td');
          const editarButton = document.createElement('button');
          editarButton.textContent = 'Editar';
          editarButton.classList.add('btn', 'btn-primary', 'btn-sm');
          editarButton.addEventListener('click', () => {
            editarOdontologo(odontologo.id);
          });
          accionesCell.appendChild(editarButton);

          const eliminarButton = document.createElement('button');
          eliminarButton.textContent = 'Eliminar';
          eliminarButton.classList.add('btn', 'btn-danger', 'btn-sm');
          eliminarButton.addEventListener('click', () => {
            eliminarOdontologo(odontologo.id);
          });
          accionesCell.appendChild(eliminarButton);

          row.appendChild(accionesCell);

          odontologosTableBody.appendChild(row);
        });
      } else {
        // Si no hay odontologos, mostrar un mensaje en la tabla
        const row = document.createElement('tr');
        const messageCell = document.createElement('td');
        messageCell.colSpan = 5;
        messageCell.textContent = 'No hay odontologos registrados';
        row.appendChild(messageCell);
        odontologosTableBody.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Ha ocurrido un error al obtener la lista de odontologos:', error);
    });

  function eliminarOdontologo(id) {
    fetch(`/odontologos/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        alert(data); // Mostrar el mensaje de eliminación
        // Recargar la página o actualizar los datos de la vista
        location.reload(); // Recargar la página
        // Otra opción: actualizar solo los datos de la tabla de odontólogos
        // getOdontologos();
      })
      .catch(error => console.error(error));
  }

  function editarOdontologo(id) {
    // Redirigir a la página de edición de odontólogo con el ID correspondiente
    window.location.href = `/editar_odontologo.html?id=${id}`;
  }
});