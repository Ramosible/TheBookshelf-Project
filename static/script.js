const categoryForm = document.getElementById('categoryForm');
const ListArticle = document.getElementById('ListArticle');
categoryForm.addEventListener('submit', function(event) {
event.preventDefault(); 

  try {
    const selectedOption = document.getElementById('categ').value;

    fetch('https://www.googleapis.com/books/v1/volumes?q=' + selectedOption)
      .then(response => response.json())
      .then(data => {
        ListArticle.innerHTML = '';

        const bookNames = data.items.map(item => item.volumeInfo.title);
        const bookPhotos = data.items.map(item => {
          if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
            return item.volumeInfo.imageLinks.thumbnail;
          } else if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail) {
            return item.volumeInfo.imageLinks.smallThumbnail;
          } else {
            return 'https://example.com/placeholder.jpg';
          }
        });

        bookNames.forEach((bookName, index) => {
          const divElem = document.createElement("div");
          const pelem = document.createElement("p");
          const brelem = document.createElement("br");
          const imgElem = document.createElement("img");
          imgElem.src = bookPhotos[index]; 
          imgElem.classList.add("BooksClass");
          pelem.classList.add("H2");
          divElem.classList.add("divConteiner");
          divElem.appendChild(pelem);
          divElem.appendChild(brelem);
          divElem.appendChild(imgElem); 
          ListArticle.appendChild(divElem);
          pelem.innerText = bookName;
        });

        console.log(bookNames);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  } catch (error) {
    console.log('Error:', error);
  }
});
