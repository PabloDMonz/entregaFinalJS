class Lampara {
    constructor(datos) {
        this.id = datos.id;
        this.nombre = datos.nombre;
        this.precio = datos.precio;
        this.cantidad = datos.cantidad;
    }
}

//Recuperar lista del carrito
const carro = document.getElementById("carroCompra");
const recuperarLS = JSON.parse(localStorage.getItem('carritoCompras'));
const listaCarro = recuperarLS ? recuperarLS.map(item => new Lampara(item)) : [];

// Seleccionar el div donde se mostrará el carro de compras
const carroCompraDiv = document.getElementById("carroCompra");
carroCompraDiv.innerHTML = "";


// Crear el elemento para el mensaje de carrito vacío
const mensajeVacio = document.createElement("p");
mensajeVacio.classList.add("mensajeVacio");
mensajeVacio.textContent = "El carrito está vacío";
carroCompraDiv.appendChild(mensajeVacio);


const botonCompra = document.getElementById ("botones");
const agregarBotonComprar = document.createElement ("button");
agregarBotonComprar.textContent = "Confirmar compra";
agregarBotonComprar.classList.add("btn", "botonConfirmar");
agregarBotonComprar.addEventListener("click", () =>{
    if (listaCarro.length === 0) {
        Swal.fire({
            title: "El carrito está vacío",
            text: "Agrega productos al carrito antes de confirmar la compra",
            icon: "info"
        });
    } else {
        Swal.fire({
            title: "Muchas gracias por tu compra!",
            text: "Nos estaremos comunicando a tu email",
            icon: "success"
        });
    }
});
botonCompra.appendChild(agregarBotonComprar);

// Vaciar el carrito
const botonVaciar = document.createElement("button");
botonVaciar.textContent = "Vaciar Carrito";
botonVaciar.classList.add("btn", "botonVaciar");
if (listaCarro.length > 0) {
    botonVaciar.addEventListener("click", () => {
        listaCarro.length = 0;
        carroCompraDiv.innerHTML = "";  
        guardarCarritoLS();
        actualizarTotal();
        carroCompraDiv.appendChild(mensajeVacio)
        });
}

botonCompra.appendChild(botonVaciar);




// Verificar si el carrito está vacío
if (listaCarro.length === 0) {
    const nada = document.getElementById("carroCompra") 
    nada.appendChild(mensajeVacio);
} else {
    // Iterar el carrito
    listaCarro.forEach(lampara => {
        const lamparaDiv = document.createElement("div");
        lamparaDiv.classList.add("lampara-item");

        // Imagen en miniatura
        const imagenMiniatura = document.createElement("img");
        imagenMiniatura.src = `../assets/img/${lampara.nombre.toLowerCase()}.jpg`;
        imagenMiniatura.alt = lampara.nombre;
        imagenMiniatura.classList.add("miniatura-lampara");
        lamparaDiv.appendChild(imagenMiniatura);

        // Propiedades 
        const nombreElement = document.createElement("p");
        nombreElement.textContent = `Lámpara ${lampara.nombre}`;
        lamparaDiv.appendChild(nombreElement);

        const precioElement = document.createElement("p");
        precioElement.textContent = `$${lampara.precio}`;
        lamparaDiv.appendChild(precioElement);

        // Crear input para la cantidad
        const cantidadInput = document.createElement("input");
        cantidadInput.classList.add("inputCantidad");
        cantidadInput.type = "number";
        cantidadInput.value = lampara.cantidad;
        cantidadInput.min = 1;
        cantidadInput.addEventListener("change", (event) => {
            const cantidades = parseInt(event.target.value);
            lampara.cantidad = cantidades;
            subtotalLampara.textContent = `Subtotal: $${lampara.precio * cantidades}`;
            const index = listaCarro.findIndex(item => item.id === lampara.id);
            if (index !== -1) {
                listaCarro[index].cantidad = cantidades;
                guardarCarritoLS(); 
            }
            actualizarTotal();
        });
        lamparaDiv.appendChild(cantidadInput);

        // Subtotal
        const subtotalLampara = document.createElement("p");
        subtotalLampara.textContent = `Subtotal: $${lampara.precio * lampara.cantidad}`;
        lamparaDiv.appendChild(subtotalLampara);

        /// Botón para eliminar lamparas
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar-button", "btn", "btn-danger");
        botonEliminar.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // Icono de papelera de Font Awesome
        botonEliminar.addEventListener("click", () => {
            const index = listaCarro.findIndex(item => item.id === lampara.id);
            if (index !== -1) {
                listaCarro.splice(index, 1); 
                lamparaDiv.remove(); 
                guardarCarritoLS(); 
            }
        });
        lamparaDiv.appendChild(botonEliminar);

        // Agregar el elemento de la lampara al div del carro de compras
        carroCompraDiv.appendChild(lamparaDiv);
    });
}

// Guardar el carrito en LS
const guardarCarritoLS = () => {
    localStorage.setItem('carritoCompras', JSON.stringify(listaCarro));
};

// Total
const calcularTotal = (carrito) => {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    return total;
};

const actualizarTotal = () => {
    const total = calcularTotal(listaCarro);
    totalCompra.textContent = `Total: $${total}`;
};

const totalCompra = document.createElement("p");
totalCompra.classList.add("totalCompra");
totalCompra.textContent = `Total: $${calcularTotal(listaCarro)}`;
carroCompraDiv.appendChild(totalCompra);

guardarCarritoLS(); 



