document.addEventListener('DOMContentLoaded', function() {
    const albumId = getAlbumIdFromUrl();
  
    document.getElementById("home").addEventListener("click", function(){
        window.location.href = 'index.html';
    });
  
    document.getElementById("addAlbum").addEventListener("click", function(){
        window.location.href = 'addAlbum.html';
    });
  
    document.getElementById("editAlbum").addEventListener("click", function(){
        if (albumId) {
            window.location.href = `editAlbum.html?album=${albumId}`;
        } else {
            window.location.href = 'editAlbum.html';
        }
    });
  
    document.getElementById("addSongs").addEventListener("click", function(){
        if (albumId) {
            window.location.href = `addSongs.html?album=${albumId}`;
        } else {
            window.location.href = "addSongs.html";
        }
    });
  
    document.getElementById("tours").addEventListener("click", function(){
        window.location.href = "Tours.html";
    });
  
    document.getElementById("logout").addEventListener("click", function(){
        window.location.href = "login.html";
    });
  });
  
const getAlbumIdFromUrl = function(){
    const params = new URLSearchParams(window.location.search);
    return params.get("album");
};

const getAlbum = async (albumId) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/albums/band/${albumId}`);
        return data;
    } catch (error) {
        console.error(error);
        swal("Error", "No se pudo obtener la información del álbum", "error");
    }
};
let boton = document.getElementById("botonEdit")
boton.addEventListener("click", function(){
    addSong()
});
document.getElementById("botonCancel").addEventListener("click", function(){
    window.location.href = `./album.html?album=${albumId}`;
});

const addSong = async () => {
    
    const albumId = getAlbumIdFromUrl();
    const numCancion = document.getElementById("numCancion").value;
    const titulo = document.getElementById("title").value;
    const artista = document.getElementById("artista").value;
    const duracion = document.getElementById("duracion").value;
    const youtubeLink = document.getElementById("url").value;

    const newSong = { titulo, artista, duracion, youtubeLink, numCancion };

    try {
        const album = await getAlbum(albumId);

        // Agrego la canción nueva al array de canciones
        album.canciones.push(newSong);

        // Hacer la petición PUT para actualizar el álbum
        await axios.put(`http://localhost:5000/albums/band/${albumId}`, album);

        // Mostrar alerta de éxito y redirigir a la vista del álbum
        swal("Éxito", "La canción ha sido añadida correctamente", "success")
            .then(() => {
                window.location.href = `./album.html?album=${albumId}`;
            });
    } catch (error) {
        console.error(error);
        swal("Error", "No se pudo añadir la canción", "error");
    }
};
