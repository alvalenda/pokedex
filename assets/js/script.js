/**
 * Variável global
 * page.num: Acumula número do pokemon a ser pego na API
 * page.tag: Controla intervalo para interno da função @viewMore
 * value: true  => @viewMore desabilitada
 * value: false => @viewMore habilitada
 */
const page = { num: 1, tag: false };

/**
 * @function getPokemon
 * Função que extrai dados da API de pokenos pokeapi.co
 */
async function getPokemon(poke_number) {
    const data_fetch = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${poke_number}`,
    );
    const description_fetch = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${poke_number}`,
    );

    const data = await data_fetch.json();
    const description = await description_fetch.json();

    const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites['other']['official-artwork']['front_default'],
        type: data.types.map(type => type.type.name).join(' '),
        description: description.flavor_text_entries[0].flavor_text,
    };

    const html = `
    <article class="card">
      <div class="flip">
            <img class="image" src=${pokemon.image} alt="imagem do pokemon ${pokemon.name}">
            <div class="card-text">
                <h2 class="card_title">${pokemon.name}</h2>
                <p class="card_subtitle">Nº ${pokemon.id}</p>
                <h4>Type</h4>
                <p class="card_subtitle">${pokemon.type}</p>
                <h4>Description</h4>
                <p class="card_subtitle">${pokemon.description}</p>
            </div>

      </div>
    </article>
    `;

    document.querySelector('#cards').insertAdjacentHTML('beforeend', html);
}

/**
 * @function viewMore
 * Chama a função @getPokemon vinte vezes. Tem um intervalo interno controlado pela variável @page
 */
function viewMore() {
    for (let i = 0; i < 20; i++) {
        page.num++;
        getPokemon(page.num);
    }

    setTimeout(() => {
        page.tag = false;
    }, 1000);
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
