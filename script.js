// Selectors
const main = document.querySelector("main");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");
const openButton = document.querySelector(".open-modal");
const closeButton = document.querySelector("#close");
const submitButton = document.querySelector(".submit");

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

  localStorage.setItem("books", JSON.stringify(Library));
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

openButton.addEventListener("click", ()=>{
  modal.showModal();
});

closeButton.addEventListener("click", ()=>{
  form.reset();
  modal.close();
});

submitButton.addEventListener("click", ()=>{
  const title = form.querySelector("#title").value;
  const author =form.querySelector("#author").value;
  const read = form.querySelector("#read").checked;

  if(title === "" || author === ""){
    return
  }

  const newBook = Object.create(Book.prototype);
  newBook.init(title,author,read);
  addBookToLibrary(newBook);
  displayLibrary();
  form.reset();
  modal.close();
});

(function initialState(){
  const tempArr = JSON.parse(localStorage.getItem("books")) || [];
  if(tempArr === []) return;

  tempArr.map(book => {
    const newBook = Object.create(Book.prototype);
    newBook.init(book.title, book.author, book.read);
    addBookToLibrary(newBook);
  })

  displayLibrary();
})()