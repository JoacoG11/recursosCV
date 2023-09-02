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

//Selecciona todos los elementos con la clase ".btn btn-primary"
//const eliminarBotones = document.querySelectorAll(".btn btn-primary");

//Coleccion que guarda la info de las crads en forma de objetos
var cradsColect = []; 

//coleccion para manejar el local storage
//var storedArray =[];

var cardIds = 0;

var idActual;

//Control de localStorage//
/*function loadToStorage() {
    const arrayJason = JSON.stringify(cradsColect);

    //almacena en el local storage la cadena JSON bajo una clave especifica "cards"
    localStorage.setItem("cards", arrayJason);
}

function reloadStorage(){

    //recupera la cadena JSON almacenada en local storage
    const storedArrayJSON = localStorage.getItem("cards");

    //si hay datos almacenados en local storage los convertimos de nuevo en array
    if(storedArray){
        storedArray = JSON.parse(storedArrayJSON);
    }

    //ahora la var storedArray contiene los datos almacenados en localStorage
    console.log(storedArray);

    //convierte el array actualizado a un acadena JSON
    const updateArrayJSON = JSON.stringify(storedArray);

    //almacena la cadena JSON actualizada en local storage bajo la misma clave
    localStorage.setItem("cards", updateArrayJSON);
}*/
//Control de localStorage//


//crea un elemento nuevo y lo agrega a la coleccion en base al input del usuario
function addCradToColection() {

    //toma el input y lo trimea
    const inputValue = input.value.trim();

    //si el input no es vacio
    if (inputValue) {
        console.log(inputValue);

        //separa contenido del input en base a ","
        const valores = inputValue.split(",");

        //guardo en variabes lo escrito por el usuario
        cardIds++;
        let id = cardIds
        let titulo = valores[0];
        let texto = valores[1];
        
        console.log(titulo);

        //defino las propiedades del nuevo objeto
        const nuevaCard = {
            id: id,
            titulo: titulo,
            texto: texto,
            fechaLimite: null
        }
        console.log(nuevaCard);

        //Agrego el objeto a la coleccion
        cradsColect.push(nuevaCard);
        
        //loadToStorage();

        //Se crea estructura de la card
        let cardElem = 

            `<img src="logiciels-gestion-des-taches-1280x640-1.png" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nuevaCard.titulo}</h5>
                        <p class="card-text">${nuevaCard.texto}.</p>
                        <button class="btn btn-primary" onclick="eliminarCard(this, ${nuevaCard.id})" >Delete</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="editarFechaModal" onclick="abrirModalEditarFecha(${nuevaCard.id})">
                            Editar
                        </button>
                    </div>`

        return cardElem;
    }
    else { 
        return null;
    }
};


function eliminarCard(boton, idNumerico) {
    // Obtener la tarjeta (card) padre del botón
    let card = boton.closest('.card');

    console.log("ID de la tarjeta:", idNumerico);

    // Comprobar si se encontró la tarjeta
    if (card) {
        // Obtenemos el índice del objeto en el array cradsColect
        let objetoEncontradoIndex = cradsColect.findIndex(objeto => objeto.id === idNumerico);

        // Comprobamos si se encontró el objeto
        if (objetoEncontradoIndex !== -1) {
            // Eliminar el objeto del array
            cradsColect.splice(objetoEncontradoIndex, 1);
        }

        // Eliminar la tarjeta del DOM
        card.remove();

        //loadToStorage();

        console.log("Array actualizado:", cradsColect);
    }
}

//Agrega un evento de "submit" al formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); //Evita que el formulario se envíe de manera convencional
    newTask = addCradToColection();
    if(newTask){
        var z = document.createElement('div'); // is a node
        z.classList.add("card");
        z.setAttribute("draggable", "true");
        z.setAttribute("style", "width: 18rem");

        z.addEventListener("dragstart", () =>{
            z.classList.add("is-dragging");
        } );

        z.addEventListener("dragend", () => {
            z.classList.remove("is-dragging");
        })

        //var ultElem = cradsColect[cradsColect.length - 1];

        //if(){
            z.setAttribute("id", cardIds)
        //}

        z.innerHTML = newTask;
        console.log(z);
        columnaTrello.appendChild(z);
    }

    //Limpia el campo de entrada
    input.value = "";
});

function abrirModalEditarFecha(idTarjeta) {

    idActual = idTarjeta;
    

    // Configura el modal con la información de la tarjeta
    const tarjeta = cradsColect.find(objeto => objeto.id === idTarjeta);
    const fechaLimiteInput = document.getElementById('fechaLimite');
    fechaLimiteInput.value = tarjeta.fechaLimite || ''; // Establece la fecha límite actual si existe

    console.log(idActual);

    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('editarFechaModal'));
    modal.show();
}

const dateBtnElem = document.getElementsByClassName('btn btn-primary date-btn')[0]

dateBtnElem.addEventListener( "click", guardarFechaLimite);

function guardarFechaLimite() {

    const modalElem = document.getElementsByClassName('modal-dialog')[0]

    console.log("aca");
    const fechaLimiteInput = document.getElementById('fechaLimite');
    const nuevaFechaLimite = fechaLimiteInput.value;

    // Actualiza la fecha límite en la tarjeta correspondiente
    const tarjeta = cradsColect.find(objeto => objeto.id === idActual); 
    tarjeta.fechaLimite = nuevaFechaLimite;

    console.log(tarjeta);
    console.log("la fecha para el elem" + idActual + "es" + cradsColect[0].fechaLimite);

    // Cierra el modal
    const modal = new bootstrap.Modal(document.getElementById('editarFechaModal'));
    alertar(nuevaFechaLimite);
    checkDate(nuevaFechaLimite, idActual);
}

function alertar(nuevaFechaLimite){
    
    //indicamos la nueva fecha seteada
    alert("La fecha limite de la tarea se actualizo a: " + nuevaFechaLimite);
}

function checkDate(fechaLimite, idActual){
    console.log("marcha");
    let fecha = fechaLimite;

    if(fecha){
        let fechaActual = new Date();
        let fechaLimDate = new Date (fecha);

        if(fechaLimDate < fechaActual){
            moverTarjetaAtrasada(idActual);
        }
    }
}

function moverTarjetaAtrasada(id) {
    debugger

    let tarjeta = cradsColect.find(objeto => objeto.id === id);
    let tarjetaElem = document.getElementById(tarjeta.id); // Suponiendo que el ID de la tarjeta coincide con su elemento en el DOM

    if (tarjeta && tarjetaElem) {

        tarjetaElemCopia = tarjetaElem;
        // Elimina la tarjeta de su columna actual
        tarjetaElem.remove();

        // Agrega la tarjeta a la columna "Atrasado"
        const columnaAtrasado = document.getElementById('atrasado'); // Asegúrate de tener una clase para la columna "Atrasado"
        if (columnaAtrasado) {
            columnaAtrasado.appendChild(tarjetaElemCopia);
        }
    }
}

function alertarTareasProximasAVencer() {
    const hoy = new Date(); // Obtenemos la fecha actual

    // Recorremos el array cradsColect
    for (const tarea of cradsColect) {
        if (tarea.fechaLimite) {
            // Convertimos la fecha límite de la tarea a un objeto Date
            const fechaLimite = new Date(tarea.fechaLimite);

            // Calculamos la diferencia en milisegundos entre la fecha límite y hoy
            const diferenciaTiempo = fechaLimite - hoy;

            // Calculamos la diferencia en días
            const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

            // Verificamos si la tarea está a un día de vencer
            if (diferenciaDias === 1) {
                // Mostramos una alerta con el título de la tarea
                alert(`La tarea "${tarea.titulo}" está a un día de vencer.`);
            }
        }
    }
}

const b = setInterval(alertarTareasProximasAVencer, 10000)

const a = setInterval(checkDate, 1000)











