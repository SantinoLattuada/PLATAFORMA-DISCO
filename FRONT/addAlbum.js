const validateInputs = (titulo, anio, descripcion) => {
    if (titulo.trim() === '' && descripcion.trim() === '') {
        swal("Debes completar el título y la descripción", { icon: "error" });
        return false;
    } else if (titulo.trim() === '') {
        swal("Debes completar el título", { icon: "error" });
        return false;
    } else if (descripcion.trim() === '') {
        swal("Debes completar la descripción", { icon: "error" });
        return false;
    } else if (anio.trim() === '' || isNaN(anio)) {
        swal("Debes ingresar un año válido", { icon: "error" });
        return false;
    } else if (parseInt(anio) < 2016) {
        swal("El año debe ser igual o mayor a 2016", { icon: "error" });
        return false;
    }
    return true;
};

let boton = document.getElementById("enviarBtn");

const titulo = document.getElementById("titulo");
const anio = document.getElementById("anio");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");

boton.addEventListener("click", async function(e) {
    e.preventDefault();
    //const albumForm = document.getElementById('albumForm');
    if(!validateInputs(titulo.value, anio.value, descripcion.value)){
        return;
    }
    try {
        // Envía los datos al backend
        const response = await axios.post("http://localhost:5000/albums/band", {
            titulo: titulo.value,
            descripcion: descripcion.value,
            anio: anio.value,
            portada: imagen.value, 
            canciones: []
        });
        const albumId = response.data.id;
        if (albumId) {
            swal({
                title: "¡Álbum Creado!",
                text: "Has creado el álbum correctamente.",
                icon: "success",
                confirmButtonText: "Ok"
            })
            .then(() => {
                window.location.href = `./album.html?album=${albumId}`;
            });
            console.log(response.data);
        } else {
            console.error("No se recibió el ID del álbum del servidor");
        }
    } catch (error) {
        console.error("Error al enviar el álbum:", error);
        
    }
    //window.location.reload();
});