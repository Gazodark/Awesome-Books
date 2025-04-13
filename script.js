document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('books');
  const bookForm = document.getElementById('book-form');
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  const books = JSON.parse(localStorage.getItem('books')) || [];

  function displayBooks() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `"${book.title}" by ${book.author} 
                <button class="remove-btn" onclick="removeBook(${index})">Remove</button>`;
      bookList.appendChild(li);
    });
  }

  function addBook(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title && author) {
      books.push({ title, author });
      localStorage.setItem('books', JSON.stringify(books));
      titleInput.value = '';
      authorInput.value = '';
      displayBooks();
    }
  }

  window.removeBook = function (index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    // Ensure the displayBooks function is called to update the UI after removing a book
    displayBooks();

    // Resolve any potential merge conflicts by ensuring the localStorage is updated correctly
    const resolvedBooks = JSON.parse(localStorage.getItem('books')) || [];
    if (resolvedBooks.length !== books.length) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  };

  bookForm.addEventListener('submit', addBook);
  displayBooks();
});