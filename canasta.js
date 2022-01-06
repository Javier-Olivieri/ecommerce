// -------- CONSTANTES
const canastaLocalStorage = [];

// -------- CONSTANTES ELEMENTOS DEL DOM
const contenedorCanasta = document.getElementById("canasta");
const totalPagar = document.getElementById("total-pagar");



// ELIMINAR PRODUCTS DE LA CANASTA
const eliminarProducto = (producto) => {
  $(`#producto-canasta-${producto.id}`).remove();

  // El método indexOf me permite obtener el índice de algún item de un Array
  const index = canastaLocalStorage.findIndex(productoLocal => parseInt(producto.id) === parseInt(productoLocal.id));

  /* 
    El método splice permite eliminar un elemento de un Array, 
    paso el indice y cuantos elementos quiero eliminar
  */
  canastaLocalStorage.splice(index, 1);
  localStorage.setItem("canasta", JSON.stringify(canastaLocalStorage));
  sumarCanasta();
}


// -------- FUNCIONES
/* 
Con esta función puedo agregar productos del contenedor a la canasta 
*/
const convertirPrecioANumero = (precio) => parseInt(precio.replaceAll(",", ""));

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numeroAComas = (total) => {
  return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// SUMAR EL VALOR DEL PRODUCTO A LA CANASTA
const sumarCanasta = () => {
  let totalCanasta = 0;
  for (const producto of canastaLocalStorage) {
    totalCanasta = totalCanasta + (producto.precio * producto.cantidad);
  }
  $("#total-pagar").html(`$${numeroAComas(totalCanasta)}`);
  localStorage.setItem("totalAPagar", totalCanasta);
}

// TOGGLE BOTÓN CANASTA
$(".boton-canasta").on("click", function () {
  $("#contenedor-general-canasta").toggleClass("on");
});


// INSERTAR PRODUCTOS A LA CANASTA
const insertarProductosACanasta = (producto) => {
  if ($(`#producto-canasta-${producto.id}`).length === 0) {
    if (!$("#contenedor-general-canasta").hasClass("on")) {
      $(".boton-canasta").trigger("click");
    }
    $("#canasta").append(`
        <div class="producto-canasta" id="producto-canasta-${producto.id}">
          <img src="${producto.imagen}">
          <div class="descripcion-producto">
            <p>  Producto: ${producto.nombre}</p>
            <b> $ ${producto.precio}</b>
            <b> Cantidad: <span id="producto-cantidad-${producto.id}">${producto.cantidad}</span></b>
          </div>
          <button class="boton-eliminar" id="boton-${producto.id}">Eliminar</button>
        </div>
      `)

    $(`#boton-${producto.id}`).on("click", function () {
      eliminarProducto(producto);
    });

    canastaLocalStorage.push(producto);
  } else {
    const nuevaCantidad = parseInt($(`#producto-cantidad-${producto.id}`).html()) + 1;
    const i = canastaLocalStorage.findIndex(p => parseInt(p.id) === parseInt(producto.id))
    canastaLocalStorage[i] = { ...canastaLocalStorage[i], cantidad: nuevaCantidad };
    $(`#producto-cantidad-${producto.id}`).html(nuevaCantidad)
  }
  localStorage.setItem("canasta", JSON.stringify(canastaLocalStorage));
  sumarCanasta();
}