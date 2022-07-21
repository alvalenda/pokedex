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
    const types = data.types.map(type => type.type.name);
    const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites['other']['official-artwork']['front_default'],
        type: types.join(' | '),
        description: descriptionInEnglish(description.flavor_text_entries),
    };

    const html = `
    <li class="card ${types[0]}">
      <div class="flip">
            <img class="image" src=${pokemon.image} alt="imagem do ${pokemon.name}">
            <div class="card-text">
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <div class="card-type">
                <h3>Type</h3>
                <p class="card-subtitle">${pokemon.type}</p>
                </div>
                <h3>Description</h3>
                <p class="card-subtitle">${pokemon.description}</p>
            </li>

      </div>
    </article>
    `;

    document.querySelector('#cards').insertAdjacentHTML('beforeend', html);
}

/**
 * @function descriptionInEnglish
 * Searches for a description in English language   and returns the corresponding
 * @param {object} description an object with a list of descriptions
 * @returns a string containing the description in English language
 */
function descriptionInEnglish(description) {
    // description.flavor_text_entries
    console.log(description);
    for (const text of description) {
        if (text.language.name === 'en') {
            const flavor_text = text.flavor_text.replace('\u000c', ' ');
            return flavor_text;
        }
    }
    return 'Description not found.';
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
    while (page.num < 21) {
        getPokemon(page.num);
        page.num++;
    }
}
main();
