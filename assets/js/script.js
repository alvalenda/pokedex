/**
 * @param {object} page variável global, conta número de pokemons pegos na API
 */
const page = { num: 1 };

/**
 * @function getPokemon
 * Função que extrai dados da API de pokenos pokeapi.co
 */
async function getPokemon(pokemon) {
    const response_1 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    );
    const data_1 = await response_1.json();

    const response_2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`,
    );
    const data_2 = await response_2.json();

    const pokeImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png`;
    const pokeName = data_1.name;
    const pokeId = data_1.id;
    const pokeTypes = data_1.types.map(type => type.type.name).join(' ');
    const pokeDescrip = data_2.flavor_text_entries[0].flavor_text;

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
              <p class="descrip">${pokeTypes}</p>
              
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
