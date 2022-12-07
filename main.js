// VARIABLEs
// ------------------------

// Designate a variable to store the books
let awesomeBookDB;

// Select element from the dom
const library = document.querySelector('.library');
const bookShelf = document.querySelector('.book-shelf');
const title = document.querySelector('input#book-title');
const author = document.querySelector('input#book-author');
const addBookForm = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('.add-book');

// FUNCTIONS
// ---------------------------

//1. function to get localStorage content
const getLocalStorageContent = () => {
  let LSContent;
  if (localStorage.getItem('books') === null) {
    LSContent = [];
  } else {
    LSContent = JSON.parse(localStorage.getItem('books'));
  } 
  return LSContent;
}


//2. Function to add data to localStorage
const addBookToLS = (element) => {
  awesomeBookDB = getLocalStorageContent()
  awesomeBookDB.push(element);
  localStorage.setItem('books', JSON.stringify(awesomeBookDB))
  }


//3. Function to add book to DOM
const addBook = (e) => {
  e.preventDefault()
// Define individual book
  const book = {
    title: title.value,
    author: author.value,
    id: Math.random()
  };
// Create elements required for individual book
  const bookCard = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor =  document.createElement('p');
  const bookId = document.createElement('span')
  const delBtn = document.createElement('button');
  const hr = document.createElement('hr');

// Assigning class, attributes and text content to the elements
  bookCard.className = 'book';
  bookShelf.className = 'book-shelf';
  bookTitle.className = 'book-title';
  bookTitle.textContent = book.title;
  bookAuthor.className = 'book-author';
  bookAuthor.textContent = book.author;
  bookId.innerText = book.id;
  bookId.setAttribute('style', 'display: none;');
  delBtn.className = 'delete-button';
  delBtn.setAttribute('type', 'button');
  delBtn.textContent = 'Delete Book';
  
  // Build a book card and attach it to the library
  bookCard.append(bookTitle, bookAuthor, bookId, delBtn, hr);
  bookShelf.appendChild(bookCard);

  // Add the book to localStorage
  addBookToLS(book);

  title.value = '';
  author.value = '';
}


//4. Function to remove book from DOM
const removeBook = (e) => {
  // Remove book from DOM
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();
  }
  // Remove book from local storage
  let idItemToRemove = Number(e.target.previousSibling.innerText);
  console.log(idItemToRemove);
  const indexITR = getLocalStorageContent().forEach((el, i, Arr) => {
    if( el.id === idItemToRemove) {
      
      console.log(i);
    }
  }) 

}


//5. Function to load localStorage content and render it on Document load
const loadLStoDOM = () => {

  const book = {
    title: title.value,
    author: author.value,
    id: Math.random()
  };

  getLocalStorageContent().forEach(el => {
    // Create elements required for individual book
  const bookCard = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor =  document.createElement('p');
  const bookId = document.createElement('span')
  const delBtn = document.createElement('button');
  const hr = document.createElement('hr');

// Assigning class, attributes and text content to the elements
  bookCard.className = 'book';
  bookShelf.className = 'book-shelf';
  bookTitle.className = 'book-title';
  bookTitle.textContent = el.title;
  bookAuthor.className = 'book-author';
  bookAuthor.textContent = el.author;
  bookId.innerText = el.id;
  bookId.setAttribute('style', 'display: none;') 
  delBtn.className = 'delete-button';
  delBtn.setAttribute('type', 'button');
  delBtn.textContent = 'Delete Book';
  
  
  bookCard.append(bookTitle, bookAuthor, bookId, delBtn, hr);
  bookShelf.appendChild(bookCard)

  });
}

// EVENT LISTENERS
// ------------------------

// Function to load all event listeners
const loadEventListeners = () => {
// Event listener to add book on form submit
addBookForm.addEventListener('submit', addBook);

// Event listener to remove book on delete button clicked
bookShelf.addEventListener('click', removeBook);

// Event listener to load localStorage content on DOM load
document.addEventListener('DOMContentLoaded', loadLStoDOM)
}

loadEventListeners();