/* eslint max-classes-per-file: ["error", 5] */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookManager {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookList = document.getElementById('book-list');
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooks();
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
    this.displayBooks();
  }

  displayBooks() {
    this.bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const item = document.createElement('div');
      item.className = 'book-item';
      item.innerHTML = `
          <span>"${book.title}" by ${book.author}</span>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
      this.bookList.appendChild(item);
    });

    document.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        this.removeBook(index);
      });
    });
  }
}

class Navigation {
  constructor() {
    this.sections = {
      list: document.getElementById('book-list-section'),
      add: document.getElementById('add-book-section'),
      contact: document.getElementById('contact-section'),
    };

    document.getElementById('nav-list').addEventListener('click', () => this.show('list'));
    document.getElementById('nav-add').addEventListener('click', () => this.show('add'));
    document.getElementById('nav-contact').addEventListener('click', () => this.show('contact'));
  }

  show(section) {
    Object.values(this.sections).forEach((sec) => sec.classList.add('hidden'));
    this.sections[section].classList.remove('hidden');
  }
}

class DateTimeDisplay {
  constructor() {
    this.dateContainer = document.getElementById('date-time');
    this.startClock();
  }

  startClock() {
    this.updateDate();
    setInterval(() => this.updateDate(), 1000); // updates every second
  }

  updateDate() {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    this.dateContainer.innerText = now.toLocaleString('en-US', options);
  }
}

class App {
  constructor() {
    this.bookManager = new BookManager();
    this.navigation = new Navigation();
    this.dateTime = new DateTimeDisplay();

    this.form = document.getElementById('add-book-form');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const book = new Book(title, author);
      this.bookManager.addBook(book);
      this.form.reset();
      this.navigation.show('list');
    });

    this.bookManager.displayBooks();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});