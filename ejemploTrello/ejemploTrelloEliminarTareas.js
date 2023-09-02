//Clase ejemploTrelloEliminarTareas:

/*Esta clase se encarga de agregar un evento de clic a una serie de botones 
con la clase ".eliminar". Cuando se hace clic en uno de estos botones, 
elimina el elemento padre que contiene la tarea y el botón "eliminar". 
Esto se logra a través de la manipulación del DOM (Document Object Model).*/


//Selecciona todos los elementos con la clase ".eliminar"
const eliminarBotones = document.querySelectorAll(".eliminar");

//Itera sobre cada botón de eliminar
eliminarBotones.forEach(boton => {
    //Agrega un evento de clic a cada botón
    boton.addEventListener("click", () => {
        //Selecciona el elemento padre (el <p> que contiene la tarea y la "x")
        const tareaAEliminar = boton.parentElement;

        //Elimina el elemento padre (la tarea completa)
        tareaAEliminar.remove();
    });
});