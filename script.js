let pokemons = [];

/**
 * 
 * loads pokemons from api into an array
 * and draws all pokemons from the array into seperate cards with name, picture and types 
 */

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        let urlX = `https://pokeapi.co/api/v2/pokemon/${responseAsJson['results'][i]['name']}`;
        let responseX = await fetch(urlX);
        let responseAsJsonX = await responseX.json();
        pokemons.push(responseAsJsonX);
        drawPokemons(responseAsJson, responseAsJsonX, i)
        for (let j = 0; j < responseAsJsonX['types'].length; j++) {
            decideBackgroundColor(i, j, responseAsJsonX);
        }
    }
}


/**
 * 
 * draw pokemons
 * 
 * @param {Json} responseAsJson loaded from API
 * @param {Json} responseAsJsonX  loaded from API
 * @param {number} i index of each pokemon
 */

function drawPokemons(responseAsJson, responseAsJsonX, i) {
    document.getElementById('cards-pokemon').innerHTML += `
        <div class="card" id= "card${i}" onclick ="showSingleCard(${i})">
            <p class="name-pokemon">${responseAsJson['results'][i]['name']}</p>
            <div id="type${i}">
            </div>
            <div class="image-pokemon-container">
            <img class="image-pokemon" src="${responseAsJsonX['sprites']['other']['dream_world']['front_default']}"></img>
            </div>
        </div>
        `;
}

/**
 *  the type of the pokemon decides the background color
 * 
 * @param {number} i index of each pokemon
 * @param {number} j ondex of each type of each pokemon
 * @param {Json} responseAsJsonX loaded from API
 */

function decideBackgroundColor(i, j, responseAsJsonX) {
    document.getElementById('type' + i).innerHTML += `
            <div class="types">
            ${responseAsJsonX['types'][j]['type']['name']}
            </div>
            `;
    document.getElementById('top-section').style.backgroundColor = setBackgroundColor(responseAsJsonX['types'][j]['type']['name']);
    document.getElementById('card' + i).style.backgroundColor = setBackgroundColor(responseAsJsonX['types'][j]['type']['name']);
}

/**
 * 
 * shows the by the parameter(id) selected pokemon in a seperate card with its abilities
 * 
 * @param {number} id is the index number of the selected pokemon
 */

function showSingleCard(id) {
    document.getElementById('main-container').style.display = "none";
    document.getElementById('card-singlePokemon').style.display = "flex";
    for (let j = 0; j < pokemons[id]['types'].length; j++) {
        document.getElementById('different_types').innerHTML += `
    <div class="types">
    ${pokemons[id]['types'][j]['type']['name']}
    </div>
    `;
        document.getElementById('top-section').style.backgroundColor = setBackgroundColor(pokemons[id]['types'][j]['type']['name']);        
    }
    showSkillsSinglePokemon(id)
    showBaseStats(id);

}

/**
 * show the skills of each pokemon
 * 
 * @param {number} id index of the selected pokemon
 */
function showSkillsSinglePokemon(id){
    document.getElementById('name-pokemon').innerHTML += `${pokemons[id]['name']}`;
    document.getElementById('poke-picture').src = `${pokemons[id]['sprites']['other']['dream_world']['front_default']}`;
    document.getElementById('weight').innerHTML += `${pokemons[id]['weight'] / 10}  kg`;
    document.getElementById('height').innerHTML += `${pokemons[id]['height']}  mm`;
    for (let i = 0; i < pokemons[id]['abilities'].length; i++) {
        document.getElementById('abilities').innerHTML += `${pokemons[id]['abilities'][i]['ability']['name']}, `;
    }
}

/**
 * change to the about section
 */

function changeToAbout() {
    document.getElementById('about-container').style.display = "flex";
    document.getElementById('baseStats').style.display = "none";
}

/**
 * change to the base stats section
 */

function changeToBaseStats() {
    document.getElementById('about-container').style.display = "none";
    document.getElementById('baseStats').style.display = "flex";
}

/**
 * change to the main section
 */

function changeToMainSite() {
    document.getElementById('different_types').innerHTML = '';
    document.getElementById('name-pokemon').innerHTML = '';
    document.getElementById('poke-picture').src = ''
    document.getElementById('weight').innerHTML = '';
    document.getElementById('height').innerHTML = '';
    document.getElementById('abilities').innerHTML = '';
    document.getElementById('main-container').style.display = "flex";
    document.getElementById('card-singlePokemon').style.display = "none";

}

/**
 * show the different base stats in percent by a progressbar
 * 
 * @param {number} id index of each pokemon
 */

function showBaseStats(id) {
    document.getElementById('hp_sub').style.width = `${pokemons[id]['stats']['0']['base_stat']}%`;
    document.getElementById('attack_sub').style.width = `${pokemons[id]['stats']['1']['base_stat']}%`;
    document.getElementById('defense_sub').style.width = `${pokemons[id]['stats']['2']['base_stat']}%`;
    document.getElementById('special-attack_sub').style.width = `${pokemons[id]['stats']['3']['base_stat']}%`;
    document.getElementById('special-defense_sub').style.width = `${pokemons[id]['stats']['4']['base_stat']}%`;
    document.getElementById('speed_sub').style.width = `${pokemons[id]['stats']['5']['base_stat']}%`
}

/**
 * set the background color
 * 
 * @param {string} type the different types of each pokemon
 * @returns the background color
 */

function setBackgroundColor(type) {
    if (type == 'normal') {
        return 'rgb(247, 207, 133)'
    }
    else if (type == 'grass' | 'Gras') {
        return 'rgb(105, 189, 105)'
    }
    else if (type == 'water' | 'Wasser') {
        return 'rgb(152, 152, 235)'
    }
    else if (type == 'fire' | 'Feuer') {
        return 'rgb(247, 162, 162)'
    }
    else if (type == 'bug' | 'Wanze') {
        return 'rgb(248, 169, 248)'
    }
}