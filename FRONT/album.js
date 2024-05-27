const getAlbumIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get('album');
  console.log("Album ID from URL:", albumId);  // Verifica el ID del álbum obtenido
  return albumId;
};

document.addEventListener("DOMContentLoaded", function() {
  const albumId = getAlbumIdFromUrl();
  if (albumId) {
    getAlbum(albumId);
  } else {
    console.error("Album ID is undefined");
  }

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
  console.log("Fetching album with id:", albumId)
});


const getAlbum = async (albumId) => {
  try {
      //console.log("Fetching album with id:", albumId);
      const response = await axios.get(`http://localhost:5000/albums/band/${albumId}`);
      console.log(response.data);
      const albumToUse = response.data;
      renderAlbum(albumToUse);
  } catch (error) {
    console.log(error);
      swal({
          title: "Error!",
          text: `${error.response.data}`,
          icon: "error",
          confirmButtonText: "Ok"
      });
      redirect("./index.html");
  }
}
function renderAlbum(album) {
  const div = document.getElementById("view-album");

  //Mostrar titulo
  const h1 = document.createElement("h1");
  h1.classList.add('text-white', 'text-5xl', 'mt-20', 'mb-4', 'ml-4', 'font-bold');
  h1.textContent = album.titulo;
  div.appendChild(h1);

  //Mostrar Portada de album
  const img = document.createElement("img")
  img.src= album.portada ? album.portada : "https://imgur.com/0uSALUr.png"
  img.alt = "Portada de ${album.titulo}";
  img.style.width = "250px"; // Ajusta el tamaño de la imagen según tus necesidades
  img.style.height = "250px";
  div.appendChild(img);

  //Mostrar descripcion
  const p = document.createElement("p");
  p.classList.add('text-white', 'mb-4', 'ml-4', 'w-1/2');
  p.textContent = "Descripción: " + album.descripcion;
  div.appendChild(p);
  
  //Render songs
  if (album.canciones) {
    renderSongs(album); 
  }
  
  //Agregar canciones
  
  const redirect = (id) => { window.location.href = `./addSongs.html?album=${id}` }
  const boton = document.getElementById("boton");
  boton.addEventListener("click", () => redirect(getAlbumIdFromUrl()));

  const redirect2 = (id) => { window.location.href = `./editAlbum.html?album=${id}` }
  const boton2 = document.getElementById("boton2");
  boton2.addEventListener("click", () => redirect2(getAlbumIdFromUrl()));
}

function renderSongs(album) {
  const div = document.getElementById("view-album");
  const songList = document.createElement('ol');
  songList.classList.add('list-decimal', 'ml-6');

  album.canciones.forEach((cancion, index) => {
    const songItem = document.createElement('li');
    songItem.classList.add('text-white', 'flex', 'items-center', 'justify-between', 'my-2');

    const songDetails = document.createElement('span');
    songDetails.textContent = `${index + 1}. ${cancion.titulo} - ${cancion.duracion}`;
    songItem.appendChild(songDetails);

    const actions = document.createElement('div');

    const youtubeIcon = document.createElement('a');
    youtubeIcon.href = cancion.youtubeLink;
    youtubeIcon.target = '_blank';
    youtubeIcon.classList.add('ml-4');
    youtubeIcon.innerHTML = '<i class="fa fa-youtube-play text-red-500"></i>';
    actions.appendChild(youtubeIcon);

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('ml-4', 'cursor-pointer');
    deleteIcon.innerHTML = '<i class="fa fa-trash text-red-500"></i>';

    deleteIcon.addEventListener("click", function(){
      const index = Array.from(songList.children).indexOf(songItem);
      const updatedAlbum = { ...album }; 
      updatedAlbum.canciones.splice(index, 1);
      deleteSong(updatedAlbum); 
    });
    actions.appendChild(deleteIcon);

    songItem.appendChild(actions);
    songList.appendChild(songItem);
  });

  div.appendChild(songList);
}
const deleteSong = async (updatedAlbum) => {
  try {
    const id = updatedAlbum._id;
      const response = await axios.put(`http://localhost:5000/albums/band/${id}`, updatedAlbum);
      swal("Éxito", "La canción ha sido eliminada correctamente", "success")
          .then(() => {
              window.location.reload();
          });
  } catch (error) {
      console.error(error);
      swal("Error", "No se pudo eliminar la canción", "error");
  }
};