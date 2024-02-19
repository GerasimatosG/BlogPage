document.addEventListener('DOMContentLoaded',function(){

  const searchBtn = document.querySelector(".searchButton");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");
 

    searchBtn.addEventListener('click',function(){
        searchBar.style.visibility = "visible";
        this.setAttribute("aria-expanded","true");
        searchInput.focus();
    })
   

    searchClose.addEventListener('click',function(){
        searchBar.style.visibility = "hidden";
        this.setAttribute("aria-expanded","false");  
        searchInput.value = "";
    })
 
    
})