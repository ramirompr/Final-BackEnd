document.addEventListener('DOMContentLoaded', function() {
  fetch('/turnos/list')
    .then(response => response.json())
    .then(data => {
      const turnosTableBody = document.getElementById('turnosTableBody');
      turnosTableBody.innerHTML = '';

      if (data.length > 0) {
        data.forEach(turno => {
          const row = document.createElement('tr');

          const pacienteIdCell = document.createElement('td');
          pacienteIdCell.textContent = turno.paciente.id;
          row.appendChild(pacienteIdCell);

          const odontologoIdCell = document.createElement('td');
          odontologoIdCell.textContent = turno.odontologo.id;
          row.appendChild(odontologoIdCell);

          const fechaTurnoCell = document.createElement('td');
          fechaTurnoCell.textContent = turno.fecha;
          row.appendChild(fechaTurnoCell);

          const actionsCell = document.createElement('td');
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.classList.add('btn', 'btn-danger');
          deleteButton.addEventListener('click', () => eliminarTurno(turno.id));
          actionsCell.appendChild(deleteButton);

          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.classList.add('btn', 'btn-primary', 'ms-2');
          editButton.addEventListener('click', () => editarTurno(turno.id));
          actionsCell.appendChild(editButton);

          row.appendChild(actionsCell);

          turnosTableBody.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        const messageCell = document.createElement('td');
        messageCell.colSpan = 4;
        messageCell.textContent = 'No hay turnos disponibles';
        row.appendChild(messageCell);
        turnosTableBody.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Ha ocurrido un error al obtener la lista de turnos:', error);
    });
});

function eliminarTurno(turnoId) {
  if (confirm('¿Estás seguro/a de eliminar este turno?')) {
    fetch(`/turnos/${turnoId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          alert('El turno ha sido eliminado correctamente');
          location.reload();
        } else {
          throw new Error('Ha ocurrido un error al eliminar el turno');
        }
      })
      .catch(error => {
        console.error('Ha ocurrido un error al eliminar el turno:', error);
        alert('Ha ocurrido un error al eliminar el turno');
      });
  }
}

function editarTurno(turnoId) {
  location.href = `/turnos/editar.html?id=${turnoId}`;
}