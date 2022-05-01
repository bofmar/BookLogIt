let darkMode = localStorage.getItem("darkMode");
const darkModeButton = document.querySelector("#dark-toggle");

const enableDarkMode = () => {
  document.body.classList.add("dark");
  document.querySelector("header").classList.add("header-dark");
  localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () =>{
  document.body.classList.remove("dark");
  document.querySelector("header").classList.remove("header-dark");
  localStorage.setItem("darkMode", null);
}

(function initialState(){
  if(darkMode === "enabled"){
    enableDarkMode();
  }
})();

darkModeButton.addEventListener("click", (e)=>{
  e.preventDefault(); // stop page from reloading
  darkMode = localStorage.getItem("darkMode");
  if(darkMode !== "enabled"){
    enableDarkMode();
  }
  else{
    disableDarkMode();
  }
});