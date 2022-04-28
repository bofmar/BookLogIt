// Selectors
const main = document.querySelector("main");

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

Book.prototype.flipRead = function(){
  this.read = !this.read;
}

// Library Functions
const Library = [];

function addBookToLibrary(book){
  Library.push(book)
}

function displayLibrary(){
  main.textContent = "";
  main.innerHTML = Library.map((book,i) =>{
    return `
      <div class="card" data-attribute=${i}>
        <h2>"${book.getTitle()}"</h2>
        <h3>${book.getAuthor()}</h3>
        <button class="${book.isRead()? "active" : "inactive"}">${book.isRead()? "Read" : "Not read"}</button>
        <button class="remove-button">Remove</button>
      </div>    `
  }).join("");
}

// Events
function removeItem(e){
  if(e.target.className !== "remove-button"){
    return;
  }
  const index = e.target.parentNode.dataset.attribute;
  Library.splice(index,1);
  displayLibrary();
}

function changeReadState(e){
  if(e.target.className !== "active" && e.target.className !== "inactive"){
    return;
  }
  const index = e.target.parentNode.dataset.attribute;
  Library[index].flipRead();
  if(Library[index].isRead()){
    e.target.classList.remove("inactive");
    e.target.classList.add("active");
    e.target.innerText = "Read"
  }
  else{
    e.target.classList.remove("active");
    e.target.classList.add("inactive");
    e.target.innerText = "Not read";
  }
}

main.addEventListener("click", removeItem); 
main.addEventListener("click", changeReadState);
// delegate the event to the parent, since the children might not exist on page load

// Tests

const b1 = Object.create(Book.prototype);
b1.init("The Hobbit","J.R.R. Tolkien",true);

const b2 = Object.create(Book.prototype);
b2.init("The Lord Of The Rings: The fellowship of the ring","J.R.R. Tolkien",false)

addBookToLibrary(b1);
addBookToLibrary(b2);

console.table(Library);

displayLibrary();