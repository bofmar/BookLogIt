// Book prototype

function Book(){  
}

Book.prototype.init = function(title,author,read){
  this.title = title;
  this.author = author;
  this.read = read;
}

Book.prototype.getTitle = function(){
  return this.title;
}

Book.prototype.getAuthor = function(){
  return this.author;
}

Book.prototype.isRead = function(){
  return this.read;
}

// Library Functions
const Library = [];

function addBookToLibrary(book){
  Library.push(book)
}

function displayLibrary(){
  const body = document.querySelector("body");
  body.innerHTML = Library.map(book =>{
    return `
      <div class="card">
        <h2>"${book.getTitle()}"</h2>
        <h3>${book.getAuthor()}</h3>
        <button class="${book.isRead()? "active" : "inactive"}">${book.isRead()? "Read" : "Not read"}</button>
        <button class="remove-button">Remove</button>
      </div>    `
  }).join("");
}

// Tests

const b1 = Object.create(Book.prototype);
b1.init("The Hobbit","J.R.R. Tolkien",true);

const b2 = Object.create(Book.prototype);
b2.init("The Lord Of The Rings: The fellowship of the ring","J.R.R. Tolkien",false)

addBookToLibrary(b1);
addBookToLibrary(b2);

console.table(Library);

displayLibrary();