window.addEventListener('load', function () {
  const formulario = document.querySelector('#add_new_odontologo');

  formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const formData = {
      matricula: document.querySelector('#matricula').value,
      nombre: document.querySelector('#nombre').value,
      apellido: document.querySelector('#apellido').value,
    };
    console.log(formData);
    const url = '/odontologos';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings)
      .then(response => response.json())
      .then(data => {
        let successAlert =
          '<div class="alert alert-success alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          '<strong></strong> Odontólogo agregado </div>';

        document.querySelector('#response').innerHTML = successAlert;
        document.querySelector('#response').style.display = 'block';
        resetUploadForm();
      })
      .catch(error => {
        let errorAlert =
          '<div class="alert alert-danger alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          '<strong> Error: </strong> No se pudo guardar el odontólogo. Intente nuevamente. </div>';

        document.querySelector('#response').innerHTML = errorAlert;
        document.querySelector('#response').style.display = 'block';
        resetUploadForm();
        console.log(error);
      });
  });

  function resetUploadForm() {
    document.querySelector('#matricula').value = '';
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellido').value = '';
  }
});