// VARIABLES

// Select element from the dom
const bookShelf = document.querySelector('.book-shelf');
const addBookForm = document.querySelector('.add-book-form');


// CLASSES
// Add Book class as a template to create books
class Book {
  constructor(_title, _author, _bookId) {
    this.title = _title;
    this.author = _author;
    this.bookId = _bookId;
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
    const conjunction= document.createElement('span');
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
})