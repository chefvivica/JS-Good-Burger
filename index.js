document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/burgers"
  const burgerMenu = document.getElementById('burger-menu')
  const orderList = document.getElementById("order-list")
    
  showBugers()

  function getBurgers(){
    return fetch(baseUrl)
    .then(r=> r.json())    
  }

  function getSingleBurger(id){
    return fetch(`${baseUrl}/${id}`)
    .then(r=> r.json())  
  }

  function addBuger(burger){
    const burgerDiv = document.createElement('div')
    burgerDiv.innerHTML = `
      <div class="burger">
          <h3 class="burger_title"}>${burger.name}</h3>
          <img src="${burger.image}">
          <p class="burger_description">
          ${burger.description}
          </p>
          <button class="button" data-id= ${burger.id}>Add to Order</button>
      </div>
      `
      const btns = burgerDiv.querySelectorAll(".button")
        btns.forEach(function(btn){        
          btn.addEventListener("click", addToList)
        })
    return burgerDiv
  }

  function showBugers(burger){
    getBurgers().then(burgers =>{
      burgers.forEach(function(burger){
        const burgerDiv = addBuger(burger)
        burgerMenu.append(burgerDiv)
      })
    })
  }

  function addToList(e){
    let id = e.target.dataset.id
    getSingleBurger(id).then(burger=>{
      const burgerLi = document.createElement('li')
      burgerLi.textContent = burger.name
      orderList.append(burgerLi)
    }) 
  }   

  const form = document.getElementById('custom-burger')
  // const submitBtn = document.querySelector('input[type=submit]')
  form.addEventListener("submit",createABurger)
  function createABurger(e){
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const image = form.url.value
    let newBurger = { name, description, image }
    console.log(newBurger)
    fetch(baseUrl, {
      method: "POST",
      headers: {"accept": "application/json",    
                "content-type": "application/json"
               },
      body: JSON.stringify(newBurger)
    })
    form.reset()
  }
  
})


