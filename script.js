async function loadPokemon(){
let url ='https://pokeapi.co/api/v2/pokemon/charmander';
let response = await fetch(url);
let responseAsJson = await response.json();
document.getElementById('name-pokemon').innerHTML = responseAsJson['name'];
document.getElementById('image-pokemon').src =responseAsJson['sprites']['other']['dream_world']['front_default']
console.log(responseAsJson);
}