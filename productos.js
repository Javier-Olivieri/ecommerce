const URL = "json/productos.json"
jQuery(() => {
  // -------- CONSTANTES ELEMENTOS DEL DOM
  const prodocutoLocalStorage = JSON.parse(localStorage.getItem("canasta"));

  // -------- FUNCIONES 
  /* 
    EJEMPLO DE USO DEL ONCLICK
    Función para crear productos dinámicamente y crearlos en el contenedor 
  */
  const insertarProductos = () => {
    $.get(URL, (respuesta, estado) => {
      console.log(respuesta);
      console.log(estado);
      if (estado === "success") {
        for (const producto of respuesta) {
          $('#listado').append(`
        <li class="producto" id="${producto.id}">
          <div class="imagen-producto">
            <img src="${producto.imagen}" alt="">
          </div>
          <p class="nombre">${producto.nombre}</p>
          <p class="precio">$${producto.precioLabel}</p>
        </li>`);
    
          $(`#${producto.id}`).on("click", function () {
            insertarProductosACanasta(producto);
          });
        }
      }
    });
  }

  //CÓDIGO
  insertarProductos();


  // Recorrer los productos del LocalStorage para insertarlos en la canasta
  if (prodocutoLocalStorage !== null) {
    for (const producto of prodocutoLocalStorage) {
      insertarProductosACanasta(producto);
    }
  }

  //console.log(canastaLocalStorage);
});