
function displaySavedBooks() {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const savedBooksContainer = document.getElementById('SavedBooksContainer');
  
    if (savedBooks.length === 0) {
      const pElem = document.createElement('p');
      pElem.id = 'notFoundSaved';
      pElem.innerText = 'No saved books found!';
      savedBooksContainer.appendChild(pElem);
    } else {
      savedBooks.forEach((book) => {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book');
  
        const imgElem = document.createElement('img');
        imgElem.classList.add('IMGelem')
        imgElem.src = book.image;
        imgElem.alt = "Can't open image";
        bookContainer.appendChild(imgElem);
  
        const titleElem = document.createElement('h2');
        titleElem.classList.add('titleElem');
        titleElem.innerText = book.title;
        bookContainer.appendChild(titleElem);
  
        const authorElem = document.createElement('p');
        authorElem.classList.add('authorElem');
        authorElem.innerText = book.author;
        bookContainer.appendChild(authorElem);
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Book';
        removeButton.classList.add('removeButton');
        bookContainer.appendChild(removeButton);
  
        savedBooksContainer.appendChild(bookContainer);
      });
  
      attachRemoveButtonListeners(); 
    }
  }
  
  function removeBookFromLocalStorage(title) {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const updatedBooks = savedBooks.filter((book) => book.title !== title);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  }

  
function attachRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll('.removeButton');
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const bookContainer = button.closest('.book');
        const title = bookContainer.querySelector('h2').innerText;
        removeBookFromLocalStorage(title);
        bookContainer.remove();
        alert('Book removed'); 
      });
    });
  }
  displaySavedBooks();
  