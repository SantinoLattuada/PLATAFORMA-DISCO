let nombre = prompt("¿Cuál es tu nombre?");
while(nombre.length < 3){

    if(nombre.length == 0 || nombre.length < 3){
        if(nombre.length == 0){
            alert("Debes completar el nombre");
            nombre = prompt("¿Cuál es el nombre?");
        }
        else{
            nombre = prompt("Nombre demasiado corto, tu nombre debe tener al menos 3 letras");    
        }
    }
}
let edad = parseInt(prompt("¿Cuál es tu edad?"));
while(edad <= 0 || edad >= 100){
    edad = parseInt(prompt("Porfavor, ingrese una edad real"));
}
let span = document.getElementById("welcome");
//span.textContent = "hola" + nombre;

let nombreMayuscula = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();;
//Mensaje Bienvenida
span.innerHTML = "Hola " + nombreMayuscula + " de " + edad + " años. Te damos la bienvenida, a continuación tenes toda la información sobre la compra de tickets para DUKI.";
// alert("Hola "+ nombre +" de "+ edad + " años, te interesaría adquirir tickets?");

let spanNombre = document.getElementById("name");
spanNombre.innerHTML = "Hola, " + nombreMayuscula;
//<i class="fa-regular fa-ticket"></i>
const i = document.getElementById("img");
//i.setAttribute("src");


//---------------------------------------------PLEDU 10, VARIABLES Y FUNCIONES ---------------------------------------------------

function getTickets(cantAComprar, cantEvento){
    if(cantEvento == 0){
        swal("Lo lamentamos mucho, no tenemos más disponibilidad. A comprar la reventa!", { icon: "error"
        });
    }
    else if (cantAComprar <= cantEvento){
        swal("Su compra fue finalizada con exitos. Disfrute de su show");
        cantEvento -= cantAComprar;
    }
    else{
        swal("Lo lamentamos mucho, no tenemos más disponibilidad. A comprar la reventa!", { icon: "error"
        });
    }
    return cantEvento;
}
let cantAComprar;

let evento1 = document.getElementById("evento1");
evento1.addEventListener("click", function(){
    let cantEvento = tickets.arenaVfg;
    cantAComprar = parseInt(prompt("Ingrese la cantidad de entradas que quiere, actualmente hay " + cantEvento + " disponibles"));
    cantEvento = getTickets(cantAComprar, cantEvento);
    tickets.arenaVfg = cantEvento;
    if(tickets.arenaVfg == 0){
        disableSoldOutButtons(evento1);
    }
});

let evento2 = document.getElementById("evento2");
evento2.addEventListener("click", function(){
    cantEvento = tickets.monterrey;
    cantAComprar = parseInt(prompt("Ingrese la cantidad de entradas que quiere, actualmente hay " + cantEvento + " disponibles"));
    cantEvento = getTickets(cantAComprar, cantEvento);
    tickets.monterrey = cantEvento;
    if(tickets.monterrey == 0){
        disableSoldOutButtons(evento2);
    }
});

let evento3 = document.getElementById("evento3");
evento3.addEventListener("click", function(){
    cantEvento = tickets.mexicoCity;
    cantAComprar = parseInt(prompt("Ingrese la cantidad de entradas que quiere, actualmente hay " + cantEvento + " disponibles"));
    cantEvento = getTickets(cantAComprar, cantEvento);
    tickets.mexicoCity = cantEvento;
    if(tickets.mexicoCity == 0){
        disableSoldOutButtons(evento3);
    }
});

let evento4 = document.getElementById("evento4");
evento4.addEventListener("click", function(){
    cantEvento = tickets.bernabeu;
    cantAComprar = parseInt(prompt("Ingrese la cantidad de entradas que quiere, actualmente hay " + cantEvento + " disponibles"));
    cantEvento = getTickets(cantAComprar, cantEvento);
    tickets.bernabeu = cantEvento;
    if(tickets.bernabeu == 0){
        disableSoldOutButtons(evento4);
    }
});

//---------------------------------------------PLEDU 11, VARIABLES Y FUNCIONES ---------------------------------------------------

let botones = document.querySelectorAll("button");
if(edad < 18){
    swal("Sos menor, no podes comprar tickets :(", {
        icon: "error"
    });

    botones.forEach(function(botonActual) {
        botonActual.disabled = true;
        botonActual.style.backgroundColor = "gray";
    });
}
//---------------------------------------------PLEDU 12, OBJETOS---------------------------------------------------

let tickets = {
    arenaVfg: 500,
    monterrey: 800,
    mexicoCity: 200,
    bernabeu: 1500,
}
function disableSoldOutButtons(boton){
    boton.disabled = true;
    boton.textContent = "SOLD OUT"
}
