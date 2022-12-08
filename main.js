// Select element from the dom
const bookShelf = document.querySelector('.book-shelf');

const addBookForm = document.querySelector('.add-book-form');


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
  displayBooks() {
    const awesomeBookDB = [
      {
        title: 'book title 1',
        author: 'book autho 1',
        id: 'book id 1',
      },
      {
        title: 'book title 1',
        author: 'book autho 1',
        id: 'book id 1',
      }
    ];

    // console.log(awesomeBookDB);
    // const books = awesomeBookDB;
    // console.log(books);
    awesomeBookDB.forEach((book) => Views.addBook(book));
    // books.forEach((book) => Views.addBook(book));
  }

  static addBook(book) {
    
    // Create elements required for individual book
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookId = document.createElement('span');
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
    delBtn.className = 'delete-button';
    delBtn.setAttribute('type', 'button');
    delBtn.textContent = 'Delete Book';

    // Build a book card and attach it to the library
    bookCard.append(bookTitle, bookAuthor, bookId, delBtn);
    console.log(bookCard);
    bookShelf.appendChild(bookCard);

    // Add the book to localStorage
    // addBookToLS(book);
  }

  static clearInputField() {
    document.querySelector('input#book-title').value = '';
    document.querySelector('input#book-author').value = '';
  }

  static removeBook(item) {
    if (item.classList.contains('delete-button')) {
      item.parentElement.remove();
    }
  }
}


// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', Views.displayBooks)

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.querySelector('input#book-title').value;
  let author = document.querySelector('input#book-author').value;
  const bookId = Math.random();
  console.log(bookId);

  const book = new Book(title, author, bookId);
  console.log(book);
  Views.addBook(book);
  Views.clearInputField()
  
});

bookShelf.addEventListener('click', (e) => {
  Views.removeBook(e.target)
})