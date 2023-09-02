//Clase ejemploTrelloEliminarTareas:

/*Esta clase se encarga de agregar un evento de clic a una serie de botones 
con la clase ".eliminar". Cuando se hace clic en uno de estos botones, 
elimina el elemento padre que contiene la tarea y el botón "eliminar". 
Esto se logra a través de la manipulación del DOM (Document Object Model).*/


// Selecciona todos los elementos con las clases ".btn" y ".btn-primary"
const eliminarBotones = document.querySelectorAll(".btn.btn-primary");

// Itera sobre cada botón de eliminar
eliminarBotones.forEach(boton => {
    // Define la función eliminarCard aquí (como lo hiciste en tu código anterior)
    function eliminarCard(boton) {
    }
    
    // Asigna la función eliminarCard al evento onclick de cada botón
    boton.onclick = function() {
        // Obtener la tarjeta (card) padre del botón
        var card = boton.closest('.card');
    
        // Comprobar si se encontró la tarjeta
        if (card) {
            // Eliminar la tarjeta del DOM
            card.remove();
        }
    };
});