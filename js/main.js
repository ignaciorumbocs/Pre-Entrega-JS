const carritoDeCompras = {
  carrito: JSON.parse(localStorage.getItem("carrito")) || [],

  productos: [
    { id: 1, titulo: "Auriculares", precio: 3000, img: "img/headset-logo.png" },
    { id: 2, titulo: "Teclado", precio: 2000, img: "img/keyboard-logo.png" },
    { id: 3, titulo: "Notebook", precio: 15000, img: "img/laptop-logo.png" },
    { id: 4, titulo: "Monitor", precio: 5000, img: "img/monitor-logo.png" },
    { id: 5, titulo: "Mouse", precio: 1500, img: "img/mouse-logo.png" },
  ],

  container: document.querySelector("#productos"),
  carritoProducto: document.querySelector("#carrito-producto"),
  carritoTotal: document.querySelector("#carrito-total"),

  cargarProductos: function () {
    this.container.innerHTML = "";
    this.productos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("productos");
      div.innerHTML = `
        <img class="producto-img" src="${producto.img}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
      `;

      const button = document.createElement("button");
      button.classList.add("producto-btn");
      button.innerText = "Comprar";
      button.addEventListener("click", () => {
        this.agregarAlCarrito(producto);
      });
      div.append(button);
      this.container.append(div);
    });
  },

  agregarAlCarrito: function (producto) {
    const itemEncontrado = this.carrito.find((item) => item.id === producto.id);
    if (itemEncontrado) {
      itemEncontrado.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.actualizarCarrito();
  },

  actualizarCarrito: function () {
    const iconoBorrar = "img/borrar.png";
    this.carritoProducto.innerHTML = "";
    this.carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
        <p>Cant: ${producto.cantidad}</p>
      `;
      const button = document.createElement("button");
      button.classList.add("boton-borrar");
      button.innerHTML = `<button> <img src="${iconoBorrar}" alt=""></button>`;
      button.addEventListener("click", () => {
        this.borrarProducto(producto.id);
      });
      div.append(button);
      this.carritoProducto.append(div);
    });

    const total = this.carrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    this.carritoTotal.innerHTML = `
      <div class="carrito-total">
        <h2>El total es:</h2>
        <h3>$${total}</h3>
      </div>
    `;

    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  },

  borrarProducto: function (id) {
    const productoEncontrado = this.carrito.find(
      (producto) => producto.id === id
    );
    if (productoEncontrado) {
      if (productoEncontrado.cantidad > 1) {
        productoEncontrado.cantidad--;
      } else {
        this.carrito = this.carrito.filter((producto) => producto.id !== id);
      }
      this.actualizarCarrito();
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  },

  inicializar: function () {
    this.cargarProductos();
    this.actualizarCarrito();
  },
};

carritoDeCompras.inicializar();
