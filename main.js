// VARIABLES

// Select element from the dom
const bookShelf = document.querySelector('.book-shelf');
const addBookForm = document.querySelector('.add-book-form');

// FUNCTIONS
// Function to display date
const date = document.querySelector('.date');
const displayDate = () => {
  date.textContent = new Date().toLocaleString();
};
setInterval(displayDate, 1000);

// CLASSES
// Add Book class as a template to create books
class Book {
  constructor(_title, _author, _bookId) {
    this.title = _title;
    this.author = _author;
    this.bookId = _bookId;
  }
}

class BookPersistence {
  static getLSContent() {
    let LSContent;
    if (localStorage.getItem('books') === null) {
      LSContent = [];
    } else {
      LSContent = JSON.parse(localStorage.getItem('books'));
    }
    return LSContent;
  }

  static addBookToLS(element) {
    const AwesomeBookDB = BookPersistence.getLSContent();
    AwesomeBookDB.push(element);
    localStorage.setItem('books', JSON.stringify(AwesomeBookDB));
  }

  static removeBookLS(id) {
    // const bookId = Number(e.target.previousSibling.innerText);
    const newLSContent = BookPersistence.getLSContent();
    newLSContent.forEach((book, i, Arr) => {
      if (book.bookId === id) {
        Arr.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(newLSContent));
  }
}

// Add a class for views manipulation
class Views {
  static displayBooks() {
    const bookCase = BookPersistence.getLSContent();
    bookCase.forEach((book) => Views.addBook(book));
  }

  static addBook(book) {
    // Create elements required for individual book
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookId = document.createElement('span');
    const conjunction = document.createElement('span');
    const delBtn = document.createElement('button');

    // Assigning class, attributes and text content to the elements
    bookCard.className = 'book';
    bookShelf.className = 'book-shelf';
    bookTitle.className = 'book-title';
    bookTitle.textContent = book.title;
    bookAuthor.className = 'book-author';
    bookAuthor.textContent = book.author;
    bookId.innerText = book.bookId;
    bookId.setAttribute('style', 'display: none;');
    conjunction.className = 'conjunction';
    conjunction.textContent = 'by';
    delBtn.className = 'delete-button';
    delBtn.setAttribute('type', 'button');
    delBtn.textContent = 'Delete Book';

    // Build a book card and attach it to the library
    bookCard.append(bookTitle, conjunction, bookAuthor, bookId, delBtn);
    bookShelf.appendChild(bookCard);
  }

  static clearInputField() {
    document.querySelector('input#book-title').value = '';
    document.querySelector('input#book-author').value = '';
  }

  static removeBookDOM(item) {
    if (item.classList.contains('delete-button')) {
      item.parentElement.remove();
    }
  }
}

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', Views.displayBooks);

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('input#book-title').value;
  const author = document.querySelector('input#book-author').value;
  const bookId = Math.random();

  const book = new Book(title, author, bookId);
  Views.addBook(book);
  Views.clearInputField();
  BookPersistence.addBookToLS(book);
});

bookShelf.addEventListener('click', (e) => {
  Views.removeBookDOM(e.target);
  const idItemToRemove = Number(e.target.previousSibling.innerText);
  BookPersistence.removeBookLS(idItemToRemove);
});

// SINGLE PAGE APP
const listLink = document.querySelector('#list-link');
const addNewLink = document.querySelector('#add-new-link');
const contactLink = document.querySelector('#contact-link');

listLink.addEventListener('click', () => {
  document.querySelector('#list').classList.remove('hide');
  document.querySelector('#add-book').classList.add('hide');
  document.querySelector('#contact').classList.add('hide');
});

addNewLink.addEventListener('click', () => {
  document.querySelector('#list').classList.add('hide');
  document.querySelector('#add-book').classList.remove('hide');
  document.querySelector('#contact').classList.add('hide');
});

contactLink.addEventListener('click', () => {
  document.querySelector('#list').classList.add('hide');
  document.querySelector('#add-book').classList.add('hide');
  document.querySelector('#contact').classList.remove('hide');
});