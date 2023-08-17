$(document).ready(function() {


  // Al hacer clic en el botón de selección de avatar
  $("#avatar-selector").click(function() {
    // Obtener las imágenes disponibles y generar el HTML correspondiente
    var images = ["Imagen1.png", "Imagen2.png", "Imagen3.png","Imagen4.png", "Imagen5.png","Imagen7.png"]; // Aquí debes especificar las imágenes disponibles
    var imageHtml = "";
    images.forEach(function(image) {
        imageHtml += '<div class="col-4"><img src="imagenes/' + image + '" class="img-thumbnail"></div>';
    });

    // Agregar el HTML al cuerpo del modal
    $("#avatar-modal .modal-body .row").html(imageHtml);

    // Mostrar el modal
    $("#avatar-modal").modal("show");
});

// Al seleccionar una imagen del modal
$("#avatar-modal").on("click", "img", function() {
    var selectedImage = $(this).attr("src");

    // Mostrar la ruta de la imagen seleccionada en el campo de entrada de texto
    $("#avatar").val(selectedImage);

    // Cerrar el modal
    $("#avatar-modal").modal("hide");
});





    // Al enviar el formulario
    $("#registration-form").submit(function(event) {
      event.preventDefault();
  
      // Obtener los valores de los campos
      var firstName = $("#first-name").val();
      var lastName = $("#last-name").val();
      var email = $("#email").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirm-password").val();
      var saldo = $("#saldo").val();
      var numeroCuenta = $("#cuenta").val();
      var secondName = $("#second-name").val();
      var secondLastName = $("#second-last-name").val();
      var rImg =  $("#avatar").val();

      
  
      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        $("#error-message").text("Las contraseñas no coinciden.");
        return;
      }
  
      // Validar el formato del correo electrónico
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        $("#error-message").text("El correo electrónico no es válido.");
        return;
      }
  
      // Obtener los usuarios del local storage o crear un nuevo array
      var users = JSON.parse(localStorage.getItem("usuarios")) || [];
      var intentos = JSON.parse(localStorage.getItem("intentosFallidos")) || [];
  
      // Verificar si el correo electrónico ya existe en la lista de usuarios
      var userExists = users.some(function(user) {
        return user.email === email;
      });
  
      if (userExists) {
        $("#error-message").text("El correo electrónico ya está registrado.");
        return;
      }
  
      // Generar un token de autenticación (aquí se puede utilizar una lógica más segura)
      var token = Math.random().toString(36).substr(2);
  
      // Crear un nuevo objeto de usuario
      var newUser = {
        firstName: firstName,
        secondName: secondName,
        lastName: lastName,
        secondLastName: secondLastName,
        email: email,
        saldo: saldo,
        numeroCuenta: numeroCuenta,
        password: password,
        token: token,
        avatar: rImg
      };
      var newIf = {

        email: email,
        intentosFallidos: 0


      }
  
      // Agregar el nuevo usuario a la lista
      users.push(newUser);
      intentos.push(newIf);
  
      // Guardar la lista de usuarios actualizada en el local storage
      localStorage.setItem("usuarios", JSON.stringify(users));
      localStorage.setItem("intentosFallidos", JSON.stringify(intentos));
  
      // Limpiar los campos del formulario
      $("#registration-form")[0].reset();
  
      // Mostrar un mensaje de éxito
      $("#error-message").text("Perfil creado exitosamente.");

      window.open('Login.html');
    });
  });
  