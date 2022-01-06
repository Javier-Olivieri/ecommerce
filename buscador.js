jQuery(() => {
    // -------- CONSTANTES NEGOCIO
    const URL = "json/sugeridos.json";
    let posicionSugerido = null;
  
    // -------- CONSTANTES ELEMENTOS DEL DOM
    const insertarBusquedasSugeridas = () => {
      $.get(URL, (respuesta, estado) => {
        console.log(respuesta);
        console.log(estado);
        if (estado === "success") {
          for (const sugerido of respuesta) {
            $("#sugeridos").append(`
            <li>${sugerido}</li>
          `);
          };
        }
      })
    }
  
    // CÓDIGO DE INPUT DE MI BUSCADOR
    $("#buscador-producto").on("focus", () => { $("#sugeridos").toggleClass("activo") });
      $("#buscador-producto").on("blur", () => { $("#sugeridos").toggleClass("activo") });
      $("#buscador-producto").on("keydown", (e) => {
        if (e.keyCode == '38') { // 38 corresponde al key code de flecha hacia arriba;
          console.log("Flecha hacia arriba");
          if (posicionSugerido === 0 || posicionSugerido === null) {
            // Cuando llego a 0, o es la primera iteración, quiero que vaya al úlitmo valor de la lista
            posicionSugerido = productosSugeridos.length - 1;
          }
          else posicionSugerido--; // Resto un valor para que 
          e.target.value = productosSugeridos[posicionSugerido];
        }
        else if (e.keyCode == '40') { // 40 corresponde al key code de flecha hacia abajo;
          console.log("Flecha hacia abajo");
          if (posicionSugerido === (productosSugeridos.length - 1)) {
            posicionSugerido = 0;
          }
          else if (posicionSugerido === null) posicionSugerido = 0;
          else posicionSugerido++;
          e.target.value = productosSugeridos[posicionSugerido];
        }
        console.log(posicionSugerido);
      });
  
      const validarFormulario = (form) => {
        form.preventDefault();
        console.log(`Buscar productos por ${form.target.children[0].value}`);
      }
  
      $("#formulario-buscador").on("submit", validarFormulario);
  
      //CÓDIGO
      insertarBusquedasSugeridas();
  
    });