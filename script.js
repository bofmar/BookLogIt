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

// Tests

const b1 = Object.create(Book.prototype);
b1.init("Test","McTestson",true);

const b2 = Object.create(Book.prototype);
b2.init("Bob","McBobson",false)

addBookToLibrary(b1);
addBookToLibrary(b2);

console.table(Library);