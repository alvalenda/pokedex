/**
 * @param {object} page variável global, conta número de pokemons pegos na API
 */
const page = { num: 1 };

/**
 * @function getPokemon
 * Função que extrai dados da API de pokenos pokeapi.co
 */
async function getPokemon(pokemon) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await response.json();

    let response2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`,
    );
    let data2 = await response2.json();

    let pokeImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png`;
    let pokeName = data.name;
    let pokeId = data.id;
    let pokeType = data.types[0].type.name;
    let pokeDescrip = data2.flavor_text_entries[0].flavor_text;

    document.querySelector('#cards').insertAdjacentHTML(
        'beforeend',
        `
  <article class="card">
    <div class="flip">
      <div class="card_front">
          <img class="image" src=${pokeImage}>
          <div class="card-text">
              <h2 class="name">${pokeName}</h2>
              <p class="descrip">Nº ${pokeId}</p>
              <h4>Type</h4>
              <p class="descrip">${pokeType}</p>
              
          </div>
      </div>
    
      <div class="card_back">
          <div class="card-text">
              <h2 class="name">${pokeName}</h2>
              <h4>Description</h4>
              <p class="descrip">${pokeDescrip}</p>
          </div>
      </div>
    </div>
  </article>
      `,
    );
}

/**
 * @function viewMore
 * Função viewMore da aula da API RickAndMorty
 */
function viewMore() {
    page.num++;
    getPokemon(page.num);
}

/**
 * @event addEventListener
 * @type {string, function}
 * addEventListener que chama @viewMore quando usuário chega ao final da página
 */
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 300) {
        viewMore();
    }
});

/**
 * @event main
 * description: Função Principal da pokedex que inicia @getPokemon
 */
function main() {
    while (page.num < 20) {
        getPokemon(page.num);
        page.num++;
    }
}
main();
