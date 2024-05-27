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

document.addEventListener("DOMContentLoaded", function() {
  const albumId = getAlbumIdFromUrl();
  
  document.getElementById("home").addEventListener("click", function(){
      window.location.href = "index.html";
  });

  document.getElementById("addAlbum").addEventListener("click", function(){
      window.location.href = "addAlbum.html";
  });

  document.getElementById("editAlbum").addEventListener("click", function(){
      if (albumId) {
          window.location.href = `editAlbum.html?album=${albumId}`;
      } else {
          window.location.href = "editAlbum.html";
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

  if (albumId) {
    loadAlbumDetails(albumId);
  }

  document.getElementById("botonEdit").addEventListener("click", editAlbum);

  document.getElementById("botonCancel").addEventListener("click", function() {
    window.location.href = `./album.html?album=${albumId}`;
  });
});

const getAlbumIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("album");
};

const getInputValues = () => {
  return {
    titulo: document.getElementById("titulo").value,
    anio: document.getElementById("anio").value,
    descripcion: document.getElementById("descripcion").value,
    portada: document.getElementById("portada").value,
  };
};

const loadAlbumDetails = async (albumId) => {
  try {
    const response = await axios.get(`http://localhost:5000/albums/band/${albumId}`);
    const album = response.data;
    document.getElementById("titulo").value = album.titulo;
    document.getElementById("anio").value = album.anio;
    document.getElementById("descripcion").value = album.descripcion;
    document.getElementById("portada").value = album.portada;
  } catch (error) {
    console.error("Error loading album details:", error);
    swal("Error", "No se pudo cargar la información del álbum", "error");
  }
};

const editAlbum = async (e) => {
  e.preventDefault();
  const albumId = getAlbumIdFromUrl();
  const albumData = getInputValues();

  if (!validateInputs(albumData.titulo, albumData.anio, albumData.descripcion)) {
    return; 
  }

  try {
    await axios.put(`http://localhost:5000/albums/band/${albumId}`, albumData);
    swal({
      title: "¡Álbum editado!",
      text: "Has modificado el álbum correctamente.",
      icon: "success",
      confirmButtonText: 'Ok'
    }).then(() => {
      window.location.href = `./album.html?album=${albumId}`;
    });
  } catch (error) {
    console.error("Error editing album:", error);
    swal("Error", "No se pudo editar el álbum", "error");
  }
};
