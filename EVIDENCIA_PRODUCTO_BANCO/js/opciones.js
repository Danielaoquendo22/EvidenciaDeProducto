$(document).ready(function () {

  
  
  var lisMov = [];

  
  
  
  
  
 

// dark mode
  // Obtener el estado actual del modo
  var isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Establecer el modo inicial
  setDarkMode(isDarkMode);

  // Cambiar el modo cuando se cambia el estado del checkbox
  $('#darkModeSwitch').change(function() {
    toggleDarkMode();
  });

  // Función para cambiar el modo entre oscuro y claro
  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    setDarkMode(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }

  // Función para establecer el modo (activar/desactivar clases)
  function setDarkMode(enabled) {
    if (enabled) {
     
      $('body').addClass('dark-mode');
    } else {
     
      $('body').removeClass('dark-mode');
    }
  }

  ///dark mode



  // Manejar el evento de clic en los enlaces del sidebar
  $('.list-group-item').on('click', function (e) {
    e.preventDefault();
    var target = $(this).data('target');
    mostrarContenido(target);
  });
  // Manejar el evento de clic en el botón de logout
  $('#logoutBtn').on('click', function () {
    sessionStorage.removeItem('usuario');
    window.location.href = 'login.html'; // Redirigir a la página de login
  });

  // Función para mostrar el contenido correspondiente
  function mostrarContenido(target) {
    $('.main-content .content').hide(); // Ocultar todos los contenidos

    $('#' + target).show(); // Mostrar el contenido seleccionado
  }


  $('[data-target="perfil"]').click(function () {

    var hora =  Date.now();

      
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

    var formattedTimestamp = new Intl.DateTimeFormat('es-ES', options).format(hora);

    var localStorageObj = JSON.parse(localStorage.getItem('usuarios'));
    let email
    // Obtener el objeto del Session Storage
    let sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario'));
    try {
      email = sessionStorageObj[0].userSession;
      token = sessionStorageObj[0].tokenSession;
    }
    catch {
      email = null;
      token = null
    }

    if (sessionStorageObj && localStorageObj) {
      // Buscar el usuario en el Local Storage por su email
      var foundUser = localStorageObj.find(function (user) {
        return user.email === email;
      });


      // Mostrar la información del usuario en los campos correspondientes
      $('#firstName').val(foundUser.firstName);
      $('#lastName').val(foundUser.lastName);
      $('#email').val(foundUser.email);
      $('#saldo').val(foundUser.saldo);
      $('#cuenta').val(foundUser.numeroCuenta);
      $('#secondLastName').val(foundUser.secondLastName);
      $('#secondName').val(foundUser.secondName);
      $('#avatar').attr("src",foundUser.avatar);



      var movimientos = {
        username: foundUser.email,
        transaccion: 'Tipo de Transferencia: Consulta - ' +  ' Fecha : '  + formattedTimestamp
      };


      lisMov.push(movimientos);




    }
  }

  );




  // Habilitar la edición al hacer clic en el botón "Editar"


  $('#editBtn').on('click', function (e) {
    e.preventDefault();
    mostrarContenido('perfil');
    $("#perfil input").prop("disabled", false); // Habilitar los campos de entrada
    $("#saldo").prop("disabled", true); // Disable the #saldo field
    $("#cuenta").prop("disabled", true); // Disable the #cueta field
    $(this).addClass("d-none"); // Ocultar el botón "Editar"
    $("#saveBtn").removeClass("d-none"); // Mostrar el botón "Guardar"


  });






  // Guardar la información editada al hacer clic en el botón "Guardar"

  $('#saveBtn').on('click', function (e) {
    e.preventDefault();


    let localStorageObj = JSON.parse(localStorage.getItem('usuarios')|| []);
    let token
    let index
    // Obtener el objeto del Session Storage
    let sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario')|| []);
    try {
      token = sessionStorageObj[0].tokenSession;
    }
    catch {
      token = null
    }

    if (sessionStorageObj && localStorageObj) {
      // Buscar el usuario en el Local Storage por su email
      let foundUser = localStorageObj.find(function (user) {
        return user.token === token;
      });

      index = localStorageObj.indexOf(foundUser);

     




      foundUser.firstName = $('#firstName').val();
      foundUser.lastName = $('#lastName').val();
      foundUser.email = $('#email').val();
      foundUser.saldo = $('#saldo').val();
      foundUser.numeroCuenta = $('#cuenta').val();
      foundUser.secondLastName = $('#secondLastName').val();
      foundUser.secondName = $('#secondName').val();
      foundUser.token = foundUser.token;
      foundUser.password = foundUser.password;
      foundUser.avatar = foundUser.avatar;

      var userSessionAdmin =  [];




      var newUser = {
        userSession: $('#email').val(),
        tokenSession: sessionStorageObj[0].tokenSession
      };

      userSessionAdmin.push(newUser);
      sessionStorage.setItem("usuario", JSON.stringify(userSessionAdmin));


    


      localStorageObj[index] = foundUser

      test(localStorageObj);


    }

    // Deshabilitar la edición y volver a mostrar el botón "Editar"
    $('#profile-form input').prop('disabled', true);
    $(this).addClass("d-none"); // Ocultar el botón "Editar"
    $("#editBtn").removeClass("d-none"); // Mostrar el botón "Guardar"
  });


  const test = (object) => {

    localStorage.setItem('usuarios', JSON.stringify(object));
    //sessionStorage.setItem("usuario", JSON.stringify(user));
  
  };
  


  // Form submit event
  $('#consignacion').submit(function(event) {
    event.preventDefault(); // Prevent form submission
    
    if (this.checkValidity()) {

      var valor  = $("#valorC").val();
      var hora =  Date.now();

      
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

      var formattedTimestamp = new Intl.DateTimeFormat('es-ES', options).format(hora);
  
      // Generar el fragmento de HTML con la información del ticket
      var infoTicket = '<div class="profile-image">'+
      '<img src="Imagenes/Peliculas.png">' +
      ' </div>'+
      '<div class="test">'+
        '<h2> Consignación </h2>' +
        '<p> Tu valor consignado : ' + valor + '</p>' +
        '<p> Fecha de la consignación : ' + formattedTimestamp + '</p>' +
        ' </div>';
  
      // Agregar el HTML al cuerpo del modal
      $("#modalBody").html(infoTicket);
  
      // Mostrar el modal
      $("#infoCompraModal").modal("show");

      //$("#infoCompraModal").modal("hide");
       $(".modal-backdrop").remove();
      
   
    } else {
      // Form is invalid, display validation messages
      this.classList.add('was-validated');
    }

   
    
    let localStorageObj = JSON.parse(localStorage.getItem('usuarios')|| []);
    let token
    let index
    // Obtener el objeto del Session Storage
    let sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario')|| []);
    try {
      token = sessionStorageObj[0].tokenSession;
    }
    catch {
      token = null
    }

    if (sessionStorageObj && localStorageObj) {
      // Buscar el usuario en el Local Storage por su email
      let foundUser = localStorageObj.find(function (user) {
        return user.token === token;
      });

      index = localStorageObj.indexOf(foundUser);

     




      foundUser.firstName = foundUser.firstName;
      foundUser.lastName = foundUser.lastName;
      foundUser.email = foundUser.email;
      foundUser.saldo = (parseInt(foundUser.saldo) + parseInt(valor));
      foundUser.secondLastName = foundUser.secondLastName;
      foundUser.numeroCuenta = foundUser.numeroCuenta;
      foundUser.secondName = foundUser.secondName;
      foundUser.token = foundUser.token;
      foundUser.password = foundUser.password;
      foundUser.avatar = foundUser.avatar;

      var userSessionAdmin =  [];




      var newUser = {
        userSession: $('#email').val(),
        tokenSession: sessionStorageObj[0].tokenSession
      };

      userSessionAdmin.push(newUser);
      sessionStorage.setItem("usuario", JSON.stringify(userSessionAdmin));


    


      localStorageObj[index] = foundUser

      test(localStorageObj);


      var movimientos = {
        username: foundUser.email,
        transaccion: 'Tipo de Transferencia: Consignacion - Valor: ' +  valor +  ' Fecha : '  + formattedTimestamp
      };


      lisMov.push(movimientos);



    }



    







  });





 
  $("#infoCompraModal .btn-secondary").on("click", function() {
    $("#infoCompraModal").modal("hide");
    $("#consignacion")[0].reset();
  });


  $("#infoRetiroModal .btn-secondary").on("click", function() {
    $("#infoRetiroModal").modal("hide");
    $("#ret")[0].reset();
  });

  $("#infoTransferirModal .btn-secondary").on("click", function() {
    $("#infoTransferirModal").modal("hide");
    $("#transf")[0].reset();
  });
  


  $('#ret').submit(function(event) {
    event.preventDefault(); // Prevent form submission
    
    if (this.checkValidity()) {

      var valor  = $("#valorR").val();
      var hora =  Date.now();
      let localStorageObj = JSON.parse(localStorage.getItem('usuarios')|| []);
    let token
    let index
    // Obtener el objeto del Session Storage
    let sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario')|| []);
    try {
      token = sessionStorageObj[0].tokenSession;
    }
    catch {
      token = null
    }

    if (sessionStorageObj && localStorageObj) {
      // Buscar el usuario en el Local Storage por su email
      let foundUser = localStorageObj.find(function (user) {
        return user.token === token;
      });

      index = localStorageObj.indexOf(foundUser);
      if (validaSaldo(valor,foundUser.saldo)){
         
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

      var formattedTimestamp = new Intl.DateTimeFormat('es-ES', options).format(hora);

      // Generar el fragmento de HTML con la información del ticket
      var infoTicket = '<div class="profile-image">'+
      '<img src="Imagenes/Peliculas.png">' +
      ' </div>'+
      '<div class="test">'+
        '<h2> Retiro </h2>' +
        '<p> Tu valor retirado : ' + valor + '</p>' +
        '<p> Fecha del retiro : ' + formattedTimestamp + '</p>' +
        ' </div>';
  
      // Agregar el HTML al cuerpo del modal
      $("#modalBodyRetiro").html(infoTicket);
  
      // Mostrar el modal
      $("#infoRetiroModal").modal("show");

      //$("#infoCompraModal").modal("hide");
       $(".modal-backdrop").remove();


       foundUser.firstName = foundUser.firstName;
       foundUser.lastName = foundUser.lastName;
       foundUser.email = foundUser.email;
       foundUser.saldo = (parseInt(foundUser.saldo) - parseInt(valor));
       foundUser.secondLastName = foundUser.secondLastName;
       foundUser.numeroCuenta = foundUser.numeroCuenta;
       foundUser.secondName = foundUser.secondName;
       foundUser.token = foundUser.token;
       foundUser.password = foundUser.password;
       foundUser.avatar = foundUser.avatar;
 
       var userSessionAdmin =  [];
 
 
 
 
       var newUser = {
         userSession: $('#email').val(),
         tokenSession: sessionStorageObj[0].tokenSession
       };
 
       userSessionAdmin.push(newUser);
       sessionStorage.setItem("usuario", JSON.stringify(userSessionAdmin));
 
 
     
 
 
       localStorageObj[index] = foundUser
 
       test(localStorageObj);

       var movimientos = {
        username: foundUser.email,
        transaccion: 'Tipo de Transferencia: Retiro - Valor: ' +  valor + ' Fecha : '  + formattedTimestamp
      };
       
       lisMov.push(movimientos);

 
      }else{
        alert("No se puede realizar el retiro dado que el saldo es inferior al monto deseado")
      }

     
  
    
      
   
    } else {
      // Form is invalid, display validation messages
      this.classList.add('was-validated');
    }

   
    
    

     




     

    }



    







  });



  $('#transf').submit(function(event) {
    event.preventDefault(); // Prevent form submission
 
    if (this.checkValidity()) {

      var valor  = $("#valorT").val();
      var hora =  Date.now();

      
    let localStorageObj = JSON.parse(localStorage.getItem('usuarios')|| []);
    let token
    let index
    // Obtener el objeto del Session Storage
    let sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario')|| []);
    try {
      token = sessionStorageObj[0].tokenSession;
    }
    catch {
      token = null
    }

    if (sessionStorageObj && localStorageObj) {
      // Buscar el usuario en el Local Storage por su email
      let foundUser = localStorageObj.find(function (user) {
        return user.token === token;
      });

      index = localStorageObj.indexOf(foundUser);


      if (validaSaldo(valor,foundUser.saldo)){
        
      
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

      var formattedTimestamp = new Intl.DateTimeFormat('es-ES', options).format(hora);

      // Generar el fragmento de HTML con la información del ticket
      var infoTicket = '<div class="profile-image">'+
      '<img src="Imagenes/Peliculas.png">' +
      ' </div>'+
      '<div class="test">'+
        '<h2> Transferencia </h2>' +
        '<p> Tu valor transferido : ' + valor + '</p>' +
        '<p> Fecha de la transferencia : ' + formattedTimestamp + '</p>' +
        ' </div>';
  
      // Agregar el HTML al cuerpo del modal
      $("#modalBodyTransferencia").html(infoTicket);
  
      // Mostrar el modal
      $("#infoTransferirModal").modal("show");

      //$("#infoCompraModal").modal("hide");
       $(".modal-backdrop").remove();

       
      foundUser.firstName = foundUser.firstName;
      foundUser.lastName = foundUser.lastName;
      foundUser.email = foundUser.email;
      foundUser.saldo = (parseInt(foundUser.saldo) - parseInt(valor));
      foundUser.secondLastName = foundUser.secondLastName;
      foundUser.numeroCuenta = foundUser.numeroCuenta;
      foundUser.secondName = foundUser.secondName;
      foundUser.token = foundUser.token;
      foundUser.password = foundUser.password;
      foundUser.avatar = foundUser.avatar;

      var userSessionAdmin =  [];




      var newUser = {
        userSession: $('#email').val(),
        tokenSession: sessionStorageObj[0].tokenSession
      };

      userSessionAdmin.push(newUser);
      sessionStorage.setItem("usuario", JSON.stringify(userSessionAdmin));


    


      localStorageObj[index] = foundUser

      test(localStorageObj);

      var movimientos = {
        username: foundUser.email,
        transaccion: 'Tipo de Transferencia: Transferencia - Valor: ' +  valor + ' Fecha : '  + formattedTimestamp
      };


      lisMov.push(movimientos);

      }else{

        alert("No se puede realizar la transferencia")


      }
   
    } else {
      // Form is invalid, display validation messages
      this.classList.add('was-validated');
    }

   
    }



  });


  function validaSaldo(cantidadOut, saldo) {
    if (cantidadOut<=saldo){
      return true;

    }else{
      return false;
    }
  }


  function obtenerTransaccionesPorUsuario(username) {
    var transacciones = [];
  
    for (var i = 0; i < lisMov.length; i++) {
      if (lisMov[i].username === username) {
        transacciones.push(lisMov[i].transaccion);
      }
    }
  
    return transacciones;
  }

  function mostrarTransaccionesEnDiv(username) {
    var transacciones = obtenerTransaccionesPorUsuario(username);
    var movimientosDiv = document.getElementById("movimientos");
    
    // Limpiar el contenido actual del div
    movimientosDiv.innerHTML = "";
    
    // Crear y agregar elementos HTML para cada transacción
    for (var i = 0; i < transacciones.length; i++) {
      var transaccionElem = document.createElement("p");
      transaccionElem.textContent = transacciones[i];
      movimientosDiv.appendChild(transaccionElem);
    }
    
    // Mostrar el div
    movimientosDiv.style.display = "block";
  }


  $('[data-target="movimientos"]').click(function () {

   
    // Obtener el objeto del Session Storage
    let sessionStorageObj = JSON.parse(sessionStorage.getItem('usuario'));
    mostrarTransaccionesEnDiv(sessionStorageObj[0].userSession);
   

    
  }

  );


});
