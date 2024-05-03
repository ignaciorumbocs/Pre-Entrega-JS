let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const container = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProducto = document.querySelector("#carrito-producto");
const carritoTotal = document.querySelector("#carrito-total");
const botonComprar = document.querySelector("#Comprar");
fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    cargar(data);
    console.log(data);
    actualizarCarrito();
    Comprar();
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });
const Comprar = () => {
  botonComprar.addEventListener("click", () => {
    Swal.fire({
      title: "¿Seguro que quieres finalizar tu compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Comprar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Gracias Por su Compra!",
          icon: "success",
        });
        vaciarCarro();
      }
    });
  });
};
const vaciarCarro = () => {
  carrito = [];
  actualizarCarrito();
  sumarTotal();
};

const cargar = (productos) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("productos");
    div.innerHTML = `
            <img class="producto-img" src="${producto.img}">
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>`;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Comprar";
    button.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
    div.append(button);
    container.append(div);
  });
};
const agregarAlCarrito = (producto) => {
  const itemEncontrado = carrito.find((item) => item.id === producto.id);
  if (itemEncontrado) {
    itemEncontrado.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
  sumarTotal();
};

const sumarTotal = () => {
  let total = 0;
  carrito.forEach(function (producto) {
    total += producto.precio * producto.cantidad;
  });
  carritoTotal.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("carrito-total");
  div.innerHTML = `<h2>El total es:</h2>
  <h3>$${total}</h3>`;
  carritoTotal.append(div);
};
const actualizarCarrito = () => {
  let iconoBorrar = "img/borrar.png";
  carritoProducto.innerHTML = "";
  carrito.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>`;
    let button = document.createElement("button");
    button.classList.add("boton-borrar");
    button.innerHTML = `<button> <img src="${iconoBorrar}" alt=""></button>`;
    button.addEventListener("click", () => {
      borrarProducto(producto.id);
    });
    div.append(button);
    carritoProducto.append(div);
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const borrarProducto = (id) => {
  carrito.forEach((producto) => {
    if (producto.id === id) {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else if (producto.cantidad === 1) {
        carrito = carrito.filter((word) => word.id !== id);
      }
    }
  });
  actualizarCarrito();
  sumarTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
