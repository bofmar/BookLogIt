// Library Module
const library = (function(){
  const Library = [];
  
  //DOM Selectors
  const section = document.querySelector("section");
  const modal = document.querySelector(".modal");
  const form = document.querySelector("form");
  const openModalButton = document.querySelector(".open-modal");
  const closeModalButton = document.querySelector("#close");
  const submitModalButton = document.querySelector(".submit");

  // Bind Events
  section.addEventListener("click", _removeBook);
  section.addEventListener("click", _changeReadState);
  openModalButton.addEventListener("click", _openModal);
  closeModalButton.addEventListener("click", _closeModal);
  submitModalButton.addEventListener("click", _submitBook);

  // Methods
  function addBookToLibrary(book){
    Library.push(book);
    _display();
  }

  function _display(){
    section.textContent = "";
    section.innerHTML = Library.map((book,i) =>{
      return `
        <div class="card" data-attribute=${i}>
          <h2>"${book.title}"</h2>
          <h3>${book.author}</h3>
          <button class="${book.read? "active" : "inactive"}">${book.read ? "Read" : "Not read"}</button>
          <button class="remove-button">Remove</button>
        </div>    `
    }).join("");
  
    localStorage.setItem("books", JSON.stringify(Library));
  }

  function _removeBook(e){
    if(e.target.className !== "remove-button"){
      return;
    }
    const index = e.target.parentNode.dataset.attribute;
    Library.splice(index,1);
    _display();
  }

  function _changeReadState(e){
    if(e.target.className !== "active" && e.target.className !== "inactive"){
      return;
    }
    const index = e.target.parentNode.dataset.attribute;
    Library[index].flipRead();
    if(Library[index].read){
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

  // function _flipRead(book){
  //   book.read = !book.read;
  // }

  function _openModal(){
    modal.showModal();
  }

  function _closeModal(){
    form.reset();
    modal.close();
  }

  function _addNewBook(book){
    const newBook = new Book(book.title, book.author,book.read)
    addBookToLibrary(newBook);
  }

  function _submitBook(){
    const newBook = {
      title : form.querySelector("#title").value,
      author : form.querySelector("#author").value,
      read : form.querySelector("#read").checked
    };
  
    if(newBook.title === "" || newBook.author === ""){
      return
    }

    _addNewBook(newBook);
    _display();
    _closeModal();
  }

  // Initialize
  (function _initialize(){
    const tempArr = JSON.parse(localStorage.getItem("books")) || [];
    if(tempArr === []) return;

    tempArr.map(book => {
      _addNewBook(book);
    });
    
    _display();
  })();

  return {addBookToLibrary};
})();

// Book Object
function Book(title,author,read){
  this.title = title;
  this.author = author;
  this.read = read;
}

Book.prototype.flipRead = function(){
  this.read = !this.read;
}