/**
 * @param {object} page variável global, conta número de pokemons pegos na API
 */
const page = { num: 1, tag: false };

/**
 * @function getPokemon
 * Função que extrai dados da API de pokenos pokeapi.co
 */
async function getPokemon(poke_number) {
    const response_1 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${poke_number}`,
    );
    const response_2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${poke_number}`,
    );
    const data = await response_1.json();
    const description = await response_2.json();

    const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map(type => type.type.name).join(' '),
        description: description.flavor_text_entries[0].flavor_text,
    };

    document.querySelector('#cards').insertAdjacentHTML(
        'beforeend',
        `
  <article class="card">
    <div class="flip">
      <div class="card_front">
          <img class="image" src=${pokemon.image} alt="imagem do pokemon ${pokemon.name}">
          <div class="card-text">
              <h2 class="name">${pokemon.name}</h2>
              <p class="descrip">Nº ${pokemon.id}</p>
              <h4>Type</h4>
              <p class="descrip">${pokemon.type}</p>
              
          </div>
      </div>
    
      <div class="card_back">
          <div class="card-text">
              <h2 class="name">${pokemon.name}</h2>
              <h4>Description</h4>
              <p class="descrip">${pokemon.description}</p>
          </div>
      </div>
    </div>
  </article>
      `,
    );
}

/**
 * @function viewMore
 * Chama a função @getPokemon mais vinte vezes. Tem um intervalo interno de 2s para poder ser chamada novamente.
 */
function viewMore() {
    for (let i = 0; i < 20; i++) {
        page.num++;
        getPokemon(page.num);
    }

    setTimeout(() => {
        page.tag = false;
    }, 2000);
}

/**
 * @event addEventListener
 * @type {string, function}
 * addEventListener que chama @viewMore quando usuário chega ao final da página
 */
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 300) {
        if (page.tag === true) return;
        page.tag = true;
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
