const archivo = '/lista.json';
let lamparas = []; 

// Obtener JSON
fetch(archivo)
  .then(response => response.json())
  .then(data => {
    lamparas = data; 
    console.log(lamparas); 

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
      });
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

  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

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



