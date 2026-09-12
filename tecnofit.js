document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. VALIDACIÓN Y LÓGICA DE REGISTRO
  // ==========================================
  const formRegistro = document.getElementById("registroForm");

  if (formRegistro) {
    const contenedor = document.getElementById("contenedorDispositivos");
    const btnAgregar = document.getElementById("btnAgregarDispositivo");

    // Agregar dispositivo dinámico
    if (btnAgregar && contenedor) {
      btnAgregar.addEventListener("click", () => {
        const div = document.createElement("div");
        div.classList.add("dispositivo-item");
        div.innerHTML = `
          <button type="button" class="btn-eliminar">X</button>
          <div class="form-group">
            <label>Tipo de Dispositivo *</label>
            <select class="tipo-dispositivo">
              <option value="">Seleccione...</option>
              <option value="Smartwatch">Smartwatch</option>
              <option value="Banda Deportiva">Banda Deportiva</option>
              <option value="Ciclocomputador">Ciclocomputador</option>
              <option value="Audífonos">Audífonos</option>
            </select>
          </div>
          <div class="form-group">
            <label>Número de Serie (12 caracteres) *</label>
            <input type="text" class="serie-dispositivo" maxlength="12">
          </div>
        `;
        
        div.querySelector(".btn-eliminar").addEventListener("click", () => div.remove());
        contenedor.appendChild(div);
      });
    }

    // Validación del Formulario de Registro
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      // Limpiar errores previos
      document.querySelectorAll(".error").forEach(el => el.textContent = "");

      const mostrarError = (idError, mensaje) => {
        const el = document.getElementById(idError);
        if (el) el.textContent = mensaje;
      };

      // 1. Nombre Completo
      const nombreInput = document.getElementById("nombre");
      const nombreVal = nombreInput ? nombreInput.value.trim() : "";
      const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,80}$/;
      if (!nombreVal || !regexNombre.test(nombreVal)) {
        mostrarError("errorNombre", "Ingrese un nombre válido (solo letras, máx 80 caracteres).");
        valido = false;
      }

      // 2. Correo Institucional
      const emailInput = document.getElementById("email");
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const regexEmail = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl)$/;
      if (!emailVal || !regexEmail.test(emailVal) || emailVal.length > 60) {
        mostrarError("errorEmail", "Debe ser un correo institucional (@duoc.cl o @profesor.duoc.cl).");
        valido = false;
      }

      // 3. Contraseña
      const passInput = document.getElementById("password");
      const passVal = passInput ? passInput.value : "";
      const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%\&])[A-Za-z\d#$%\&]{8,}$/;
      if (!passVal || !regexPass.test(passVal)) {
        mostrarError("errorPassword", "Mín. 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (#, $, %, &).");
        valido = false;
      }

      // 4. Confirmación Contraseña
      const confirmInput = document.getElementById("confirmPassword");
      const confirmVal = confirmInput ? confirmInput.value : "";
      if (!confirmVal || confirmVal !== passVal) {
        mostrarError("errorConfirmPassword", "Las contraseñas no coinciden.");
        valido = false;
      }

      // 5. Teléfono (Opcional)
      const telInput = document.getElementById("telefono");
      const telVal = telInput ? telInput.value.trim() : "";
      if (telVal !== "" && !/^\d{9}$/.test(telVal)) {
        mostrarError("errorTelefono", "El teléfono debe contener exactamente 9 dígitos.");
        valido = false;
      }

      // 6. Validar Dispositivos dinámicos
      const itemsDispositivos = document.querySelectorAll(".dispositivo-item");
      const regexSerie = /^[a-zA-Z0-9]{12}$/;

      itemsDispositivos.forEach((item) => {
        const tipo = item.querySelector(".tipo-dispositivo").value;
        const serie = item.querySelector(".serie-dispositivo").value.trim();

        if (!tipo || !regexSerie.test(serie)) {
          mostrarError("errorDispositivos", "Todos los dispositivos deben tener un tipo seleccionado y un N° de serie de exactamente 12 caracteres alfanuméricos.");
          valido = false;
        }
      });

      if (valido) {
        alert("¡Registro exitoso en TECNOFIT!");
        formRegistro.reset();
        if (contenedor) contenedor.innerHTML = "";
      }
    });
  }

  // ==========================================
  // 2. VALIDACIÓN Y LÓGICA DE LOGIN
  // ==========================================
  const formLogin = document.getElementById("loginForm");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      const correoInput = document.getElementById("correoLogin");
      const passwordInput = document.getElementById("passwordLogin");
      const errorCorreo = document.getElementById("errorCorreoLogin");
      const errorPassword = document.getElementById("errorPasswordLogin");

      if (errorCorreo) errorCorreo.textContent = "";
      if (errorPassword) errorPassword.textContent = "";

      // 1. Correo Institucional
      const correoVal = correoInput ? correoInput.value.trim() : "";
      const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl)$/;

      if (!correoVal) {
        if (errorCorreo) errorCorreo.textContent = "El correo electrónico es obligatorio.";
        valido = false;
      } else if (correoVal.length > 60) {
        if (errorCorreo) errorCorreo.textContent = "El correo no puede tener más de 60 caracteres.";
        valido = false;
      } else if (!regexCorreo.test(correoVal)) {
        if (errorCorreo) errorCorreo.textContent = "Debe ser un correo institucional (@duoc.cl o @profesor.duoc.cl).";
        valido = false;
      }

      // 2. Contraseña
      if (!passwordInput || !passwordInput.value) {
        if (errorPassword) errorPassword.textContent = "Ingresa tu contraseña.";
        valido = false;
      }

      if (valido) {
        alert("¡Inicio de sesión exitoso en TECNOFIT!");
        window.location.href = "index.html";
      }
    });
  }

});