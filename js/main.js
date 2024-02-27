//Lista de productos
const lamparas = [
    {id:1, nombre: "London", precio: 60000, diametro:50, altura:45},
    {id:2, nombre: "Hawaii", precio: 30000, diametro:50, altura:20},
    {id:3, nombre: "Nairobi", precio: 30000, diametro:35, altura:50},
    {id:4, nombre: "Shangai", precio: 40000, diametro:60, altura:25},
    {id:5, nombre: "Vienna", precio: 50000, diametro:70, altura:40},
    {id:6, nombre: "Munich", precio: 60000, diametro:80, altura:35},
    {id:7, nombre: "Miami", precio: 35000, diametro:50, altura:25},
    {id:8, nombre: "Cordoba", precio: 35000, diametro:40, altura:45},
    {id:9, nombre: "Habana", precio: 35000, diametro:30, altura:75},
    {id:10, nombre: "Siberia", precio: 30000, diametro:30, altura:25},
    {id:11, nombre: "Paris", precio: 33000, diametro:25, altura:40},
    {id:12, nombre: "Praga", precio: 26000, diametro:33, altura:18},
]

/*
// Definición de la clase Producto
class Producto {
    constructor(id, nombre, precio, altura, diametro) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;        
        this.diametro = diametro;
        this.altura = altura;
        
    }
}

const lamparas = []

fetch('/lista.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            const nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.diametro, producto.altura);
            lamparas.push(nuevoProducto);
        });

        console.log(lamparas);
    })
    .catch((error) => {
        console.log('Error al cargar los datos:', error);
    });

    console.log(lamparas)*/



//Carrito de compras
let carritoCompras = []

//Guardar carrito
const guardarCarritoLS = () => {
  localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras));
};

// Cargar el carrito desde LS
const cargarCarritoLS = () => {
  const carritoGuardado = localStorage.getItem('carritoCompras');
  if (carritoGuardado) {
      carritoCompras = JSON.parse(carritoGuardado);
  }
};

//Transformar lista de productos en grilla interactiva
const grillaLamparas = document.getElementById("divLamparas");

lamparas.forEach(lampara => {
  const lamparaDiv = document.createElement('div');
  lamparaDiv.classList.add('contenedor', 'col-lg-3', 'col-md-6', 'col-sm-12');

  //Agregar imagenes a cada div
  const imagen = document.createElement('img');
  imagen.src = `../assets/img/${lampara.nombre.toLowerCase()}.jpg`;
  imagen.alt = lampara.nombre;
  imagen.classList.add('fotoLampara');
  imagen.addEventListener('click', ()=>{
      //Libreria - Información de la lámpara
      Swal.fire({
          title: lampara.nombre,
          text: `Diametro: ${lampara.diametro}cm Altura: ${lampara.altura}cm`,
          imageUrl: `../assets/img/${lampara.nombre.toLowerCase()}.jpg`,
          imageWidth: 350,
          imageHeight: 350,
          imageAlt: lampara.nombre                
        });
  })
  lamparaDiv.appendChild(imagen);

  //Agregar propiedades de objetos al div
  const nombre = document.createElement('h3');
  nombre.textContent = lampara.nombre;
  nombre.classList.add('text-center');
  lamparaDiv.appendChild(nombre);

  const precio = document.createElement('h4');
  precio.textContent = `$${lampara.precio}`;
  lamparaDiv.appendChild(precio);


  //Botón de comprar
  const botonCompra = document.createElement('button');
  botonCompra.textContent = 'Agregar al carrito';
  botonCompra.id = 'botonComprar';
  botonCompra.classList.add('btn', 'btn-success', 'botonComprar');
  botonCompra.addEventListener('click', () =>{
    //agregar cantidad de lamparas compradas
    const cantEnCarrito = carritoCompras.findIndex(item => item.id === lampara.id);
    if (cantEnCarrito !== -1) {        
        if (carritoCompras[cantEnCarrito].cantidad === null || carritoCompras[cantEnCarrito].cantidad === undefined) {
            carritoCompras[cantEnCarrito].cantidad = 1;
        } else {
            carritoCompras[cantEnCarrito].cantidad += 1;
        }
    } else {        
        lampara.cantidad = 1;
        lampara.imagenUrl = imagen.src;
        carritoCompras.push(lampara);
    }
      const Toast = Swal.mixin({                
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Agregada"
          
        });
      
      guardarCarritoLS(); // Actualizar el carrito en localStorage
      
  });
  lamparaDiv.appendChild(botonCompra);

  grillaLamparas.appendChild(lamparaDiv);
  
});

cargarCarritoLS();

//Revisar si el carrito está vacío
document.addEventListener("DOMContentLoaded", () => {
  const carritoGuardado = localStorage.getItem('carritoCompras');
  if (carritoGuardado) {
      listaCarro = JSON.parse(carritoGuardado);
  } else {
      listaCarro = []; 
  }
});
