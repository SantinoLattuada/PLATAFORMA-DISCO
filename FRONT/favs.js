const favoriteRecords = ["disco1", "disco2", "disco3"];

function addFavorites(favorites) {
  const imgs = document.querySelectorAll("img");

  imgs.forEach((img) => {
    if (favorites.includes(img.id)) {
      const icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-star");
      img.parentElement.insertBefore(icon, img);
      
      icon.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el enlace de las imagenes se active
        icon.classList.toggle('favorite');
        img.parentElement.classList.toggle('favorite');
      });
    }
  });
}

addFavorites(favoriteRecords);