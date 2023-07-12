const SearchBookbtn = document.getElementById('SearchBookbtn');
SearchBookbtn.addEventListener('click', getBooks);

const Article = document.getElementById('SearchedBooksList');

async function getBooks() {
  try {
    const searchInput = document.getElementById('searchInput');
    const searched = searchInput.value;

    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + searched);
    const data = await response.json();

    Article.innerHTML = ''; 

    if (data.totalItems === 0 || data.items === undefined) {
      const pElem = document.createElement("p");
      pElem.id = "notFound";
      pElem.innerText = "No books found!";
      Article.appendChild(pElem);
    } else {
      const bookNames = data.items.map(item => item.volumeInfo.title);
      const bookPhotos = data.items.map(item => (
        item.volumeInfo.imageLinks?.thumbnail || 'No Image Available'
      ));
      const bookAuthors = data.items.map(item => item.volumeInfo.authors || []);

      bookNames.forEach((bookName, index) => {
        const authorElem = document.createElement("p");
        const divElem = document.createElement("div");
        const h2elem = document.createElement("h2");
        const imgElem = document.createElement("img");
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Book";
        imgElem.src = bookPhotos[index];
        imgElem.alt = "can't open image";
        imgElem.classList.add("bookImg");
        h2elem.classList.add("bookNames");
        divElem.classList.add("books");
        authorElem.classList.add("authorsP");
        saveButton.classList.add("savebutton");
        authorElem.innerText = bookAuthors[index].join(', ');
        divElem.appendChild(authorElem);
        divElem.appendChild(imgElem);
        divElem.appendChild(h2elem);
        divElem.appendChild(saveButton);
        h2elem.innerText = bookName;
        Article.appendChild(divElem);

        
        saveButton.addEventListener('click', function() {
         
        const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
          
       const isBookSaved = savedBooks.some(savedBook => savedBook.title === bookName);
          
      if (!isBookSaved) {
            
        const book = {
              title: bookName,
              author: bookAuthors[index].join(','),
              image: bookPhotos[index]
            };
            savedBooks.push(book);
            localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
            alert('Book saved!');
          } else {
            alert('Book already saved!');
          }
        });
      });
    }

  } catch (error) {
    const pElem = document.createElement("p");
    pElem.id = "notFound";
    pElem.innerText = "No books found!";
    Article.innerHTML = ''; 
    Article.appendChild(pElem);
    console.log('Error:', error);
  }
}
