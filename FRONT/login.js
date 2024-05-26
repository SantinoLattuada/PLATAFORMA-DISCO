//---------------------------------------------PLEDU 12, OBJETOS---------------------------------------------------

function validateInputs(mail, contraseña){
    if(mail.trim() == '' && contraseña.trim() == ''){
        swal("Debes completar el mail y la contraseña", { icon: "error"
        });
    }
    else if(mail.trim() == ''){
        swal("Debes completar el mail", { icon: "error"
        });
    }
    else if(contraseña.trim() == ''){
        swal("Debes completar la contraseña", { icon: "error"
        });
    }
    
    else if(contraseña.length < 6){
        swal("Tu contraseña es demasiado corta (min 6 caracteres)", { icon: "error"
        });
    } 
    else{
        swal("Iniciaste Sesión correctamente");
    }
};


let boton = document.getElementById("boton");

boton.addEventListener("click", function(){
    let mail = document.getElementById("mail").value;
    let contraseña = document.getElementById("contraseña").value;

    validateInputs(mail, contraseña);
});