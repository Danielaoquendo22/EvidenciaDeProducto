$(document).ready(function() {
    // Al enviar el formulario de inicio de sesión

    
    $("#login-form").submit(function(event) {
      event.preventDefault();
  
      // Obtener los valores de los campos de entrada
      var email = $("#email").val();
      var password = $("#password").val();
  
      // Obtener los usuarios del local storage o crear un nuevo array vacío
      var users = JSON.parse(localStorage.getItem("usuarios")) || [];
      var ifall = JSON.parse(localStorage.getItem("intentosFallidos")) || [];
      let index
      var userSessionAdmin = JSON.parse(sessionStorage.getItem("usuario")) || [];
  
      // Buscar el usuario correspondiente al correo electrónico ingresado
     var foundUser = users.find(function(user) {
        return user.email === email;
      });
  
      if (foundUser) {

        




        var foundUserIF = ifall.find(function(iff) {
          return iff.email === foundUser.email;
        });


        index = ifall.indexOf(foundUserIF);

        if (foundUserIF.intentosFallidos ===3){
          alert("Ya cumplio con los intentos permitidos, por favor comunicarse con el administrador")
          return
        }


        // Verificar la contraseña del usuario encontrado
        if (foundUser.password === password) {
          // Inicio de sesión exitoso
          alert("Inicio de sesión exitoso. ¡Bienvenido!");

          foundUserIF.email =  foundUserIF.email,
          foundUserIF.intentosFallidos =  0


          ifall[index] = foundUserIF

          test(ifall);
          

          var newUser = {
            userSession: foundUser.email,
            tokenSession: foundUser.token
          };

          userSessionAdmin.push(newUser);
          sessionStorage.setItem("usuario", JSON.stringify(userSessionAdmin));

          window.location.href = "aplicacion.html";
        } else {
          // Contraseña incorrecta
          alert("Contraseña incorrecta. Inténtalo nuevamente.");
          foundUserIF.intentosFallidos = parseInt(foundUserIF.intentosFallidos) + 1
          ifall[index] = foundUserIF

          test(ifall);
        }
      } else {
        // Usuario no encontrado
        alert("Usuario no encontrado. Regístrate para crear una cuenta.");

        


         
      }








    });

    const test = (object) => {

      localStorage.setItem('intentosFallidos', JSON.stringify(object));
      //sessionStorage.setItem("usuario", JSON.stringify(user));
    
    };
    
  
  
  });

 