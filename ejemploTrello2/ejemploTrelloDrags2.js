//Clase ejemploTrelloDrags:

/*Esta clase implementa la funcionalidad de arrastrar y soltar tareas 
en áreas designadas. Las tareas arrastrables se pueden mover entre columnas y 
se reordenarán según su posición en relación con el cursor. La función 
insertAboveTask calcula la tarea más cercana por encima de la posición del cursor 
y determina dónde se debe insertar la tarea arrastrada.*/


//Selecciona todos los elementos con la clase ".card" que son arrastrables
const draggables = document.querySelectorAll(".card");

//Selecciona todos los elementos con la clase ".columna" que son áreas donde se pueden soltar las tareas
const droppables = document.querySelectorAll(".columna");

//Itera sobre cada elemento ".card" seleccionado

draggables.forEach(card => {
    /*//Agrega un evento de "dragstart" a cada tarea
    card.addEventListener("dragstart", () => {
        //Cuando comienza el arrastre de una tarea, se agrega la clase "is-dragging" a esa tarea
        card.classList.add("is-dragging");
    });

    //Agrega un evento de "dragend" a cada tarea
    card.addEventListener("dragend", () => {
        //Cuando finaliza el arrastre de una tarea, se quita la clase "is-dragging" de esa tarea
        card.classList.remove("is-dragging");
    });*/
});


//Itera sobre cada elemento ".columna" seleccionado
droppables.forEach(zona => {
    zona.addEventListener("dragover", (e) => {
        e.preventDefault();

        //Llama a la función insertAboveTask para determinar la posición del nuevo elemento
        const btnTask = insertAboveTask(zona, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        //Si no hay un elemento más cercano, agrega el elemento arrastrado al final de la zona
        if (!btnTask) {
            zona.appendChild(curTask);
        } else {
            //Si hay un elemento más cercano, inserta el elemento arrastrado antes de él
            zona.insertBefore(curTask, btnTask);
        }     
    });
});

//Función para encontrar la tarea más cercana encima de la posición actual del cursor
const insertAboveTask = (zona, mouseY) => {
    const els = zona.querySelectorAll(".card:not(.is-dragging)");

    let tareaMasCercana = null;
    let desplazamientoMasCercano = Number.NEGATIVE_INFINITY;

    //Itera sobre todas las tareas en la zona actual
    els.forEach((card) => {
        //Obtiene el valor de la coordenada superior (top) 
        //del elemento actual en relación con la ventana gráfica 
        //utilizando getBoundingClientRect(). Esto proporciona la 
        //posición vertical de la parte superior del elemento en la ventana del navegador.
        const { top } = card.getBoundingClientRect();

        //Calcula la distancia vertical entre la posición actual
        //del cursor en la ventana del navegador (almacenada en la 
        //variable mouseY) y la posición superior del elemento actual (almacenada en top). 
        //Esto da como resultado la distancia vertical entre el cursor y la parte superior de la tarea.
        const offset = mouseY - top;

        //Encuentra la tarea más cercana por encima de la posición actual del cursor
        if (offset < 0 && offset > desplazamientoMasCercano) {
            //Si se cumple la condición anterior, actualiza 
            //el valor de desplazamientoMasCercano con el valor de offset. 
            //Esto rastrea la distancia más pequeña entre el cursor y la parte superior de una tarea.
            desplazamientoMasCercano = offset;

            //Si se cumple la condición anterior, actualiza la variable 
            //tareaMasCercana con el elemento tarea. Esto guarda la referencia 
            //al elemento de tarea que está más cerca del cursor.
            tareaMasCercana = card;
        }
    });

    //Devuelve la tarea más cercana encontrada.
    return tareaMasCercana;
};
