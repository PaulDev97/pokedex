const form = document.getElementById('form')
const containerRender = document.querySelector('.container_pokemon')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
const url =  "https://pokeapi.co/api/v2/pokemon/"

const getPokemon = async ()=> {
  
  
  const id = input.value
  
  const response = await fetch(url + id)
  const data = await response.json()

  console.log(data)

  /*  const objPokemon = [{
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    ability: data.abilities[0].ability.name,
    img: data.sprites.other.dream_world.front_default
  }] */
 
  paintPokemon([data])

 
   input.value = ''
  return data
}



 const createPokemon = poke =>
 `
<div class="card_container">

      <div class="img_container">
        <img src="${poke.sprites.other.home.front_default}" alt="">
      </div>
  
      <div class="data_pokemon">
          <span>#${poke.id}</span>
          <h2>${poke.name}</h2>
      </div>

      <div class="types">
        <span>Type: </span>
        ${poke.types.map(type => {return  `<span class="${type.type.name}">${type.type.name} </span> `}).join('')}
       </div>
      
      <div class="details_container">
        <h3>Details</h3>
  
        <div class="stats_container">
          <div class="stats">
            <span>Height</span>
            <span>${poke.height/10}</span>
          </div>
  
          <div class="stats">
            <span>Weigth</span>
            <span>${poke.weight/10}</span>
          </div>
  
          <div class="stats">
            <span>Ability</span>
            <span>${poke.abilities[0].ability.name}</span>
          </div>
    
        </div>

      </div>

    </div>


`



const paintPokemon = pokemon => {
  containerRender.innerHTML = pokemon.map((item)=> createPokemon(item))
}


const init = (e) => {
  e.preventDefault()


  if(input.value == ''){
    containerRender.innerHTML = `
    <div class="input_empty">
      <span>⚠</span>
      <span>Por favor ingrese un numero</span>
   </div> 
    `
  }
  else if(input.value <= 0  || input.value > 649) {
    containerRender.innerHTML = `
    <div class="idAlert">
     <span>No se encontró el pokemon con el id ${input.value}</span>
    </div>
    `

    input.value = ''
  }
  else {
    getPokemon()
  }


}


btn.addEventListener('click',init)

