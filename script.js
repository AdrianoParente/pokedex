async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        let urlX = `https://pokeapi.co/api/v2/pokemon/${responseAsJson['results'][i]['name']}`;
        let responseX = await fetch(urlX);
        let responseAsJsonX = await responseX.json();
        console.log(responseAsJsonX);
        document.getElementById('cards-pokemon').innerHTML += `
 <div class="card">
 <p class="name-pokemon">${responseAsJson['results'][i]['name']}</p>
 <img class="image-pokemon" src="${responseAsJsonX['sprites']['other']['dream_world']['front_default']}">
</div>
 `;

    }


    console.log(responseAsJson);

}