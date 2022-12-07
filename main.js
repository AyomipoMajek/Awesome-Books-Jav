// VARIABLES

// Designate a variable to store the books
let awesomeBookDB;

// Select element from the dom
const library = document.querySelector('.library')
const bookShelf = document.querySelector('.book-shelf');
const title = document.querySelector('input#book-title');
const author = document.querySelector('input#book-author');
const addBookForm = document.querySelector('.add-book-form')
const addBookBtn = document.querySelector('.add-book');

// FUNCTIONS
// Function to add book to DOM
const addBook = (e) => {
  e.preventDefault()
// Define individual book
const book = {
  title: title.value,
  author: author.value
}
// Create elements required for individual book
const bookCard = document.createElement('div');
const bookTitle = document.createElement('p');
const bookAuthor =  document.createElement('p');
const delBtn = document.createElement('button');

// Assigning class, attributes and text content to the elements
bookCard.className = 'book';
 bookShelf.className = 'book-shelf'
 bookTitle.className = 'book-title';
 bookTitle.textContent = book.title;
 bookAuthor.className = 'book-author';
 bookAuthor.textContent = book.author;
 
 delBtn.className = 'delete-button'
 delBtn.setAttribute('type', 'button')
 delBtn.textContent = 'Delete Book'
 
 const hr = document.createElement('hr');
 
 bookCard.append(bookTitle, bookAuthor, delBtn, hr);
 bookShelf.appendChild(bookCard)


 title.value = '';
 author.value = '';
console.log(bookShelf);
}



// EVENTLISTENERS



// Function to load all event listeners
const loadEventListeners = () => {
addBookForm.addEventListener('submit', addBook)
}

loadEventListeners();