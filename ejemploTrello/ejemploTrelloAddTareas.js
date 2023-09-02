//Clase ejemploTrelloAddTareas:

/*Esta clase agrega la funcionalidad para crear nuevas tareas en una columna de Trello. 
Cuando el formulario se envía, crea un nuevo elemento de párrafo (<p>) que representa 
la tarea ingresada y le asigna clases y atributos para hacerlo arrastrable. Luego, 
agrega este nuevo elemento a la columna Trello y limpia el campo de entrada del formulario.*/


//Selecciona el formulario con el id "trelloForm"
const form = document.getElementById("trelloForm");

//Selecciona el campo de entrada con el id "cardInput"
const input = document.getElementById("cardInput");

//Selecciona la columna Trello con el id "trelloCol"
const columnaTrello = document.getElementById("trelloCol");

//Agrega un evento de "submit" al formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); //Evita que el formulario se envíe de manera convencional

    //Obtiene el valor del campo de entrada
    const value = input.value;

    //Si el valor está vacío, no hacer nada y salir de la función
    if (!value) return;

    //Crea un nuevo elemento de párrafo <p> para representar la nueva tarea
    const newTask = document.createElement("p");

    //Agrega la clase "tarea" al nuevo elemento
    newTask.classList.add("tarea");

    //Establece el atributo "draggable" como "true" para permitir que la tarea sea arrastrable
    newTask.setAttribute("draggable", "true");

    //Establece el contenido del nuevo elemento como el valor ingresado
    newTask.innerText = value;

    //Crea un botón de eliminar y le agrega la clase "eliminar"
    const eliminarBtn = document.createElement("span");
    eliminarBtn.classList.add("eliminar");
    eliminarBtn.innerText = "x";

    //Agrega un evento de clic para eliminar la tarea al hacer clic en el botón
    eliminarBtn.addEventListener("click", () => {
        newTask.remove(); // Elimina la tarea completa al hacer clic en el botón
    });

    //Agrega el botón de eliminar al nuevo elemento
    newTask.appendChild(eliminarBtn);

    //Agrega un evento de "dragstart" al nuevo elemento
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    //Agrega un evento de "dragend" al nuevo elemento
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    //Agrega el nuevo elemento a la columna Trello
    columnaTrello.appendChild(newTask);

    //Limpia el campo de entrada
    input.value = "";
});
