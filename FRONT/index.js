document.addEventListener('DOMContentLoaded', function() {
  const albumId = getAlbumIdFromUrl();

  document.getElementById("home").addEventListener("click", function(){
      window.location.href = 'index.html';
  });

  document.getElementById("addAlbum").addEventListener("click", function(){
      window.location.href = 'addAlbum.html';
  });

  document.getElementById("tours").addEventListener("click", function(){
      window.location.href = "Tours.html";
  });

  document.getElementById("logout").addEventListener("click", function(){
      window.location.href = "login.html";
  });
});
const getAlbumIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("album");
};


document.addEventListener('DOMContentLoaded', function() {
    getAlbums();
});

const getAlbums =  async () => {
    try{
    const response = await axios.get('http://localhost:5000/albums/band')
    response.data.map((album)=> {
      renderAlbums(album)})
    }
    catch(error){
      // Aviso de error al cargar los albums
    }
  }
  const renderAlbums = (album) => {
    console.log(album);
    //Indico en que parte del documento HTML debe mostrarse
    const div = document.getElementsByClassName('songs')[0]
    const newDiv = document.createElement('div')
    newDiv.classList.add('mb-20')

    //Muestro la imagen, en caso de no tener muestro la default
    const img = document.createElement('img')
    img.classList.add('rounded','cursor-pointer')
    img.style.width = '250px'; // Establecer ancho en 250px
    img.style.height = '250px'; // Establecer alto en 250px
    img.src= album.portada ? album.portada : 'https://imgur.com/0uSALUr.png'

    //Muestro el titulo
    const h2 = document.createElement("h2");
    h2.textContent = album.titulo;

    //Muestro el HREF (OPCIONAL)
    const a = document.createElement("a");
    a.href = "http://localhost:5000/albums/band/" + album._id; //Linea no necesaria

    //Hago el redirect
    const redirect = (id) => { window.location.href = `./album.html?album=${id}`}
    img.addEventListener('click', () => redirect(album._id));
    a.text = album.titulo ? album.titulo : 'Disco';


    div.appendChild(newDiv)
    newDiv.appendChild(a);
    newDiv.appendChild(img)

    const p = document.createElement('p')
    p.classList.add('text-white','text-center', 'text-xl', 'font-bold')
    p.textContent = album.anio
    newDiv.appendChild(p)

    //Icono delete Album
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('cursor-pointer', 'ml-4');
    deleteIcon.innerHTML = '<i class="fa fa-trash text-red-500"></i>';

    deleteIcon.addEventListener('click', function(){
      deleteAlbum(album._id, album.titulo);
    })
    newDiv.appendChild(deleteIcon);
  }



const deleteAlbum = async (albumId, albumTitle) => {
  try {
    await axios.delete(`http://localhost:5000/albums/band/${albumId}`);
    swal("Éxito", `Borraste ${albumTitle} de la lista`, "success")
      .then(() => {
        window.location.reload();
      });
  } catch (error) {
    console.error(error);
    swal("Error", "No se pudo eliminar el álbum", "error");
  }
};