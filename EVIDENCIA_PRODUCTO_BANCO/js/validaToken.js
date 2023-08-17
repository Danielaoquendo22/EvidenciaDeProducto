$(document).ready(function() {
    // Función para validar el token en el Local Storage
    function validarToken() {
      // Obtener el objeto del Local Storage
      var localStorageObj = JSON.parse(localStorage.getItem('usuarios'));
      let email
      let token
      // Obtener el objeto del Session Storage
      const sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario'));
      try{email = sessionStorageObj[0].userSession;
        token =sessionStorageObj[0].tokenSession;}
        catch{ email = null ;
           token = null }
      
      
      
      
      // Verificar si los datos existen en el Session Storage y el Local Storage
      if (sessionStorageObj  && localStorageObj) {
        // Buscar el usuario en el Local Storage por su email
        var foundUser = localStorageObj.find(function(user) {
          return user.email === email;
        });
  
        // Verificar si se encontró el usuario y el token coincide
        if (foundUser && foundUser.token === token) {
          return true; // El token es válido
        }
      }
  
      return false; // El token no es válido
    }
  
    // Verificar si el token es válido
    if (!validarToken()) {
      // Vaciar el contenido de la página y mostrar una alerta después de un retraso de 0 ms
      vaciarPagina();
      setTimeout(function() {
        alert("No tiene permisos para ver el contenido.");
      }, 100);
    }
  
    // Función para vaciar el contenido de la página
    function vaciarPagina() {
      $('body').empty();
    }
  });
  
  