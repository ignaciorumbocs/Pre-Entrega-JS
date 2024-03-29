const arrayProductos = [
  { nombre: "Teclado Dragonborn", precio: 5000 },
  { nombre: "Final Mouse", precio: 4000 },
  { nombre: "Auriculares Razer", precio: 6000 },
  { nombre: "Sky Pad", precio: 2000 },
  { nombre: "Motinor Zowie", precio: 7000 },
];
const arrayCarrito = [];
///////////////////////// FUNCIONES ////////////////////////////
function mostrarCarrito() {
  let carrito = "Productos del Carrito:\n";
  arrayCarrito.forEach(function (producto) {
    carrito += producto.nombre + " - $" + producto.precio + "\n";
  });
  return carrito;
}

function agregarProducto(iProducto) {
  arrayCarrito.push(arrayProductos[iProducto]);
}

function quitarUltimoProducto() {
  arrayCarrito.pop();
}

function limpiarArray() {
  arrayCarrito = [];
}

function quitarProducto(i) {
  arrayCarrito.splice(i, 1);
}

function mostrarProductos() {
  let lista = "Lista de productos:\n";
  arrayProductos.forEach(function (elemento, i) {
    lista += i + 1 + ". " + elemento.nombre + " - $" + elemento.precio + "\n";
  });

  return lista;
}

function realizarCompra() {
  let total = 0;
  while (true) {
    let productoSeleccionado = prompt(
      mostrarProductos() +
        "\n Ingrese el numero del producto que desea. 'fin' para finalizar compra o 'eliminar' para quitar un producto"
    );
    if (productoSeleccionado.toLowerCase() === "fin") {
      break;
    } else if (productoSeleccionado.toLowerCase() === "eliminar") {
      let productoEliminado = prompt(
        "Ingrese el numero del producto que desee eliminar"
      );
      let iEliminar = parseInt(productoEliminado) - 1;
      if (iEliminar >= 0 && iEliminar < arrayCarrito.length) {
        total -= arrayCarrito[iEliminar].precio;
        quitarProducto(iEliminar);
        alert("El producto ha sido eliminado");
      } else {
        alert("Opción Incorrecta");
      }
    } else {
      let iAgregar = parseInt(productoSeleccionado) - 1;
      if (iAgregar >= 0 && iAgregar < arrayProductos.length) {
        total += arrayProductos[iAgregar].precio;
        agregarProducto(iAgregar);
        alert(
          "Has agregado un " + arrayProductos[iAgregar].nombre + " al carrito"
        );
      } else {
        alert("Opción Incorrecta");
      }
    }
  }
  alert(
    mostrarCarrito() + "---------------------------\n" + "El total es $" + total
  );
  mostrarProductos();
}

realizarCompra();
