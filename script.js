// ==========================================
// FELINÉ - SCRIPT COMPLETO
// ==========================================

// ==========================================
// DATOS
// ==========================================

let cart = JSON.parse(localStorage.getItem("felineCart")) || [];
let favorites = JSON.parse(localStorage.getItem("felineFavorites")) || [];


// ==========================================
// DESCRIPCIONES DE PRODUCTOS
// ==========================================

const descripciones = {

    "Juguete Interactivo PawFun":
        "Divertido juguete interactivo diseñado para estimular el entretenimiento y la actividad de tu mascota. Ideal para juegos de lanzar, morder y perseguir.",

    "Cama CozyPaw":
        "Cama suave y cómoda diseñada para que tu mascota tenga un espacio acogedor donde descansar y dormir.",

    "Collar Royal Pink":
        "Elegante collar con diseño premium, pensado para brindar comodidad y estilo durante los paseos.",

    "Comedero Premium Duo":
        "Comedero doble práctico y elegante para mantener el alimento y el agua de tu mascota organizados.",

    "Correa Comfort Walk":
        "Correa ligera y resistente para paseos cómodos y seguros.",

    "Rascador CatTower":
        "Rascador para gatos diseñado para jugar, trepar y mantener sus uñas saludables.",

    "Cama MeowNest":
        "Cama acolchada y confortable creada especialmente para los momentos de descanso de tu gato.",

    "Juguete MousePlay":
        "Pequeño juguete interactivo perfecto para estimular el instinto de juego y caza de los gatos.",

    "Transportadora TravelPet":
        "Transportadora cómoda y segura para viajar con tu mascota de forma práctica.",

    "Set de Cepillo & Peine":
        "Set de cuidado para mantener el pelaje limpio, suave y libre de nudos.",

    "Arnés Soft Comfort":
        "Arnés acolchado que proporciona comodidad y un ajuste seguro durante los paseos.",

    "Bandana Chic":
        "Bandana ligera con un diseño elegante para darle un toque especial al estilo de tu mascota.",

    "Botella Portátil PetDrink":
        "Botella portátil especialmente diseñada para ofrecer agua a tu mascota durante los paseos.",

    "Toalla Súper Absorbente":
        "Toalla suave y absorbente ideal para secar a tu mascota después del baño.",

    "Plato Antideslizante":
        "Plato resistente con base antideslizante para evitar movimientos durante la comida.",

    "Juguete Cuerda Nudos":
        "Juguete resistente de cuerda ideal para juegos de tirar y morder.",

    "Collar LED Night Safety":
        "Collar con iluminación LED para mejorar la visibilidad de tu mascota durante los paseos nocturnos.",

    "Fuente de Agua Automática":
        "Fuente automática que mantiene el agua en movimiento para ofrecer una experiencia de hidratación más atractiva.",

    "Mochila Pet Backpack":
        "Mochila cómoda y práctica para transportar a tu mascota durante paseos y viajes.",

    "Kit de Higiene Premium":
        "Kit completo con productos esenciales para mantener la higiene y el cuidado diario de tu mascota."
};


// ==========================================
// INICIAR PÁGINA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    actualizarContadorCarrito();

    cargarFavoritos();

    activarProductos();

    activarBuscador();

    activarNewsletter();

    activarNavegacion();

});


// ==========================================
// ACTIVAR TODOS LOS PRODUCTOS
// ==========================================

function activarProductos() {

    // Productos destacados
    document.querySelectorAll(".product-card")
        .forEach(card => {

            prepararProducto(card);

        });


    // Productos del catálogo
    document.querySelectorAll(".catalog-card")
        .forEach(card => {

            prepararProducto(card);

        });

}


// ==========================================
// PREPARAR CADA PRODUCTO
// ==========================================

function prepararProducto(card) {

    const nombreElemento =
        card.querySelector("h3");

    const imagenElemento =
        card.querySelector("img");

    const precioElemento =
        card.querySelector("strong") ||
        card.querySelector("p");


    if (
        !nombreElemento ||
        !imagenElemento ||
        !precioElemento
    ) {

        return;

    }


    const nombre =
        nombreElemento.textContent.trim();

    const precio =
        precioElemento.textContent.trim();

    const imagen =
        imagenElemento.src;


    // ======================================
    // CLICK EN EL PRODUCTO
    // ======================================

    card.addEventListener("click", event => {

        // No abrir modal al presionar corazón
        if (
            event.target.closest(".favorite")
        ) {

            return;

        }


        mostrarProducto({

            nombre: nombre,

            precio: precio,

            imagen: imagen,

            descripcion:
                descripciones[nombre] ||
                "Producto premium FELINÉ diseñado para ofrecer comodidad, seguridad y bienestar a tu mascota."

        });

    });


    // ======================================
    // BOTÓN FAVORITO
    // ======================================

    const favorite =
        card.querySelector(".favorite");


    if (favorite) {

        favorite.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleFavorito(
                    nombre,
                    favorite
                );

            }
        );

    }

}


// ==========================================
// MOSTRAR PRODUCTO
// ==========================================

function mostrarProducto(producto) {

    // Si ya existe un modal, eliminarlo
    document.querySelector(".product-modal")?.remove();


    const modal =
        document.createElement("div");

    modal.className =
        "product-modal";


    const esFavorito =
        favorites.includes(producto.nombre);


    modal.innerHTML = `

        <div class="product-modal-box">

            <!-- CERRAR -->

            <button
                class="close-product"
                aria-label="Cerrar"
            >
                ×
            </button>


            <!-- IMAGEN GRANDE -->

            <div class="modal-product-image">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

            </div>


            <!-- INFORMACIÓN -->

            <div class="modal-product-info">

                <span class="product-category">
                    FELINÉ PREMIUM
                </span>


                <h2>
                    ${producto.nombre}
                </h2>


                <div class="modal-stars">

                    <span class="stars">
                        ★★★★★
                    </span>

                    <span>
                        Producto recomendado
                    </span>

                </div>


                <strong class="modal-price">
                    ${producto.precio}
                </strong>


                <p class="modal-description">
                    ${producto.descripcion}
                </p>


                <!-- CARACTERÍSTICAS -->

                <div class="product-features">

                    <div>
                        <i class="fa-solid fa-paw"></i>
                        Calidad premium
                    </div>

                    <div>
                        <i class="fa-solid fa-shield-heart"></i>
                        Seguro para mascotas
                    </div>

                    <div>
                        <i class="fa-solid fa-truck"></i>
                        Envíos rápidos
                    </div>

                    <div>
                        <i class="fa-solid fa-rotate-left"></i>
                        Devoluciones fáciles
                    </div>

                </div>


                <!-- BOTONES -->

                <div class="product-actions">

                    <button
                        class="modal-like ${
                            esFavorito ? "liked" : ""
                        }"
                    >

                        <i class="${
                            esFavorito
                                ? "fa-solid"
                                : "fa-regular"
                        } fa-heart"></i>

                        <span>
                            ${
                                esFavorito
                                    ? "Te gusta"
                                    : "Me gusta"
                            }
                        </span>

                    </button>


                    <button
                        class="add-modal-cart"
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                        AÑADIR AL CARRITO

                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    // Animación de entrada

    setTimeout(() => {

        modal.classList.add("show");

    }, 10);


    // ======================================
    // CERRAR
    // ======================================

    modal.querySelector(
        ".close-product"
    ).addEventListener(
        "click",
        () => {

            cerrarModal(modal);

        }
    );


    // Cerrar haciendo clic fuera

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                cerrarModal(modal);

            }

        }
    );


    // ======================================
    // BOTÓN ME GUSTA
    // ======================================

    modal.querySelector(
        ".modal-like"
    ).addEventListener(
        "click",
        () => {

            const boton =
                modal.querySelector(
                    ".modal-like"
                );


            toggleFavorito(
                producto.nombre,
                boton
            );


            const ahoraEsFavorito =
                favorites.includes(
                    producto.nombre
                );


            boton.classList.toggle(
                "liked",
                ahoraEsFavorito
            );


            boton.innerHTML = `

                <i class="${
                    ahoraEsFavorito
                        ? "fa-solid"
                        : "fa-regular"
                } fa-heart"></i>

                <span>
                    ${
                        ahoraEsFavorito
                            ? "Te gusta"
                            : "Me gusta"
                    }
                </span>

            `;

        }
    );


    // ======================================
    // AÑADIR AL CARRITO
    // ======================================

    modal.querySelector(
        ".add-modal-cart"
    ).addEventListener(
        "click",
        () => {

            agregarAlCarrito({

                nombre:
                    producto.nombre,

                precio:
                    producto.precio,

                imagen:
                    producto.imagen

            });


            const boton =
                modal.querySelector(
                    ".add-modal-cart"
                );


            boton.innerHTML = `

                <i class="fa-solid fa-check"></i>

                AGREGADO AL CARRITO

            `;


            boton.classList.add("added");


            setTimeout(() => {

                cerrarModal(modal);

            }, 900);

        }
    );

}


// ==========================================
// FAVORITOS
// ==========================================

function toggleFavorito(
    nombre,
    boton
) {

    const index =
        favorites.indexOf(nombre);


    if (index === -1) {

        favorites.push(nombre);

        boton.classList.add("liked");


        if (
            boton.querySelector("i")
        ) {

            boton.querySelector("i")
                .className =
                "fa-solid fa-heart";

        }


        mostrarNotificacion(
            "Producto agregado a favoritos ❤️"
        );


    } else {

        favorites.splice(index, 1);

        boton.classList.remove("liked");


        if (
            boton.querySelector("i")
        ) {

            boton.querySelector("i")
                .className =
                "fa-regular fa-heart";

        }


        mostrarNotificacion(
            "Producto eliminado de favoritos"
        );

    }


    localStorage.setItem(
        "felineFavorites",
        JSON.stringify(favorites)
    );

}


// ==========================================
// CARGAR FAVORITOS
// ==========================================

function cargarFavoritos() {

    document.querySelectorAll(".product-card")
        .forEach(card => {

            const nombre =
                card.querySelector("h3")
                    ?.textContent
                    .trim();

            const boton =
                card.querySelector(".favorite");


            if (
                boton &&
                favorites.includes(nombre)
            ) {

                boton.classList.add("liked");

                boton.innerHTML =
                    '<i class="fa-solid fa-heart"></i>';

            }

        });

}


// ==========================================
// CARRITO
// ==========================================

function agregarAlCarrito(producto) {

    const existente =
        cart.find(
            item =>
                item.nombre ===
                producto.nombre
        );


    if (existente) {

        existente.cantidad++;

    } else {

        cart.push({

            nombre:
                producto.nombre,

            precio:
                producto.precio,

            imagen:
                producto.imagen,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarContadorCarrito();


    mostrarNotificacion(
        `${producto.nombre} agregado al carrito 🛒`
    );

}


// ==========================================
// GUARDAR CARRITO
// ==========================================

function guardarCarrito() {

    localStorage.setItem(
        "felineCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// CONTADOR CARRITO
// ==========================================

function actualizarContadorCarrito() {

    const contador =
        document.querySelector(".cart span");


    if (!contador) return;


    const cantidad =
        cart.reduce(
            (total, producto) =>
                total +
                producto.cantidad,
            0
        );


    contador.textContent =
        cantidad;


    contador.style.display =
        cantidad > 0
            ? "flex"
            : "none";

}


// ==========================================
// ABRIR CARRITO
// ==========================================

const cartIcon =
    document.querySelector(".cart");


cartIcon?.addEventListener(
    "click",
    mostrarCarrito
);


// ==========================================
// MOSTRAR CARRITO
// ==========================================

function mostrarCarrito() {

    document.querySelector(
        ".cart-modal"
    )?.remove();


    const modal =
        document.createElement("div");

    modal.className =
        "cart-modal";


    let total = 0;


    cart.forEach(producto => {

        total +=
            parseFloat(
                producto.precio
                    .replace("$", "")
            ) *
            producto.cantidad;

    });


    modal.innerHTML = `

        <div class="cart-box">

            <button class="close-cart">
                ×
            </button>


            <h2>
                🛒 Mi carrito
            </h2>


            <div class="cart-products">

                ${
                    cart.length === 0

                    ? `

                        <div class="empty-cart">

                            <span>
                                🐾
                            </span>

                            <p>
                                Tu carrito está vacío.
                            </p>

                        </div>

                    `

                    : cart.map(
                        (producto, index) => `

                        <div class="cart-item">

                            <img
                                src="${producto.imagen}"
                                alt="${producto.nombre}"
                            >


                            <div class="cart-item-info">

                                <h3>
                                    ${producto.nombre}
                                </h3>

                                <p>
                                    ${producto.precio}
                                </p>


                                <div class="quantity">

                                    <button
                                        onclick="cambiarCantidad(
                                            ${index},
                                            -1
                                        )"
                                    >
                                        −
                                    </button>


                                    <span>
                                        ${producto.cantidad}
                                    </span>


                                    <button
                                        onclick="cambiarCantidad(
                                            ${index},
                                            1
                                        )"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            <button
                                class="remove-item"
                                onclick="eliminarProducto(${index})"
                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    `
                    ).join("")
                }

            </div>


            <div class="cart-footer">

                <div class="cart-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        $${total.toFixed(2)}
                    </strong>

                </div>


                <button
                    class="checkout-button"
                    onclick="finalizarCompra()"
                >
                    FINALIZAR COMPRA
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    setTimeout(() => {

        modal.classList.add("show");

    }, 10);


    modal.querySelector(
        ".close-cart"
    ).addEventListener(
        "click",
        () => cerrarModal(modal)
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                cerrarModal(modal);

            }

        }
    );

}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function cambiarCantidad(
    index,
    cantidad
) {

    cart[index].cantidad += cantidad;


    if (
        cart[index].cantidad <= 0
    ) {

        cart.splice(index, 1);

    }


    guardarCarrito();

    actualizarContadorCarrito();


    document.querySelector(
        ".cart-modal"
    )?.remove();


    mostrarCarrito();

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(index) {

    const producto =
        cart[index];


    cart.splice(index, 1);


    guardarCarrito();

    actualizarContadorCarrito();


    document.querySelector(
        ".cart-modal"
    )?.remove();


    mostrarNotificacion(
        `${producto.nombre} eliminado del carrito`
    );


    setTimeout(() => {

        mostrarCarrito();

    }, 300);

}


// ==========================================
// FINALIZAR COMPRA
// ==========================================

function finalizarCompra() {

    if (cart.length === 0) {

        mostrarNotificacion(
            "Tu carrito está vacío 🐾"
        );

        return;

    }


    mostrarNotificacion(
        "¡Compra realizada correctamente! 💗"
    );


    cart = [];


    guardarCarrito();

    actualizarContadorCarrito();


    document.querySelector(
        ".cart-modal"
    )?.remove();

}


// ==========================================
// BUSCADOR
// ==========================================

function activarBuscador() {

    const searchButton =
        document.querySelector(
            ".header-icons button:first-child"
        );


    if (!searchButton) return;


    searchButton.addEventListener(
        "click",
        () => {

            const overlay =
                document.createElement("div");


            overlay.className =
                "search-overlay";


            overlay.innerHTML = `

                <div class="search-box">

                    <button class="close-search">
                        ×
                    </button>


                    <h2>
                        Buscar productos
                    </h2>


                    <div class="search-input">

                        <i class="fa-solid fa-search"></i>

                        <input
                            type="text"
                            id="searchInput"
                            placeholder="¿Qué estás buscando?"
                        >

                    </div>


                    <div
                        class="search-results"
                        id="searchResults"
                    ></div>

                </div>

            `;


            document.body.appendChild(
                overlay
            );


            setTimeout(() => {

                overlay.classList.add(
                    "show"
                );

            }, 10);


            const input =
                overlay.querySelector(
                    "#searchInput"
                );


            input.focus();


            input.addEventListener(
                "input",
                () => {

                    buscarProductos(
                        input.value
                    );

                }
            );


            overlay.querySelector(
                ".close-search"
            ).addEventListener(
                "click",
                () => cerrarModal(overlay)
            );


            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        cerrarModal(
                            overlay
                        );

                    }

                }
            );

        }
    );

}


// ==========================================
// BUSCAR
// ==========================================

function buscarProductos(texto) {

    const resultados =
        document.querySelector(
            "#searchResults"
        );


    if (!resultados) return;


    const productos =
        document.querySelectorAll(
            ".product-card, .catalog-card"
        );


    const busqueda =
        texto
            .toLowerCase()
            .trim();


    if (!busqueda) {

        resultados.innerHTML = "";

        return;

    }


    let encontrados = [];


    productos.forEach(card => {

        const nombre =
            card.querySelector("h3")
                ?.textContent
                .trim();

        const precioElemento =
            card.querySelector("strong") ||
            card.querySelector("p");

        const imagen =
            card.querySelector("img")
                ?.src;


        if (
            nombre &&
            nombre
                .toLowerCase()
                .includes(busqueda)
        ) {

            encontrados.push({

                nombre: nombre,

                precio:
                    precioElemento
                        ?.textContent
                        .trim(),

                imagen: imagen

            });

        }

    });


    if (
        encontrados.length === 0
    ) {

        resultados.innerHTML = `

            <div class="no-results">

                <span>
                    🐱
                </span>

                <p>
                    No encontramos ese producto.
                </p>

            </div>

        `;

        return;

    }


    resultados.innerHTML =
        encontrados
            .map(producto => `

                <div class="search-result">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >


                    <div>

                        <h3>
                            ${producto.nombre}
                        </h3>

                        <strong>
                            ${producto.precio}
                        </strong>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// NEWSLETTER
// ==========================================

function activarNewsletter() {

    const formulario =
        document.querySelector(
            ".newsletter form"
        );


    if (!formulario) return;


    formulario.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                formulario.querySelector(
                    "input"
                );


            const email =
                input.value.trim();


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                mostrarNotificacion(
                    "Introduce un correo válido 📩"
                );

                return;

            }


            mostrarNotificacion(
                "¡Te has suscrito correctamente! 💗"
            );


            input.value = "";

        }
    );

}


// ==========================================
// NOTIFICACIONES
// ==========================================

function mostrarNotificacion(mensaje) {

    document.querySelector(
        ".notification"
    )?.remove();


    const notification =
        document.createElement("div");


    notification.className =
        "notification";


    notification.innerHTML = `

        <i class="fa-solid fa-paw"></i>

        <span>
            ${mensaje}
        </span>

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 20);


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}


// ==========================================
// CERRAR MODALES
// ==========================================

function cerrarModal(modal) {

    modal.classList.remove(
        "show"
    );


    setTimeout(() => {

        modal.remove();

    }, 300);

}


// ==========================================
// NAVEGACIÓN
// ==========================================

function activarNavegacion() {

    document.querySelectorAll(
        ".nav a"
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const destino =
                    link.getAttribute(
                        "href"
                    );


                if (
                    destino &&
                    destino.startsWith("#")
                ) {

                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (elemento) {

                        event.preventDefault();


                        elemento.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                }

            }
        );

    });

}