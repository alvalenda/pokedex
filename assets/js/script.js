/**
 * Global Variable
 * page.num: Acumulates a number representing the pokemon id
 * page.tag: Controls the internal cooldown of @viewMore
 * value: true  => @viewMore disabled
 * value: false => @viewMore enabled
 */
const page = { num: 1, tag: false };
const pokedex = document.querySelector('#cards');

// FUNCTION THAT WILL BE CALLED TO INTERACT WITH THE API
/**
 * @function getPokemons
 * description: Access pokemon API (pokeapi.co) to manipulate data and create the pokemon objects, then inject on html document
 * @param {array} pokeArray an Array of 20 integer elements representing pokemon id's
 * @returns {Promise} Promise wrapping the array of pokemon objects
 */
async function getPokemons(pokeArray) {
    const [data, description] = [[], []];

    for (const pokeNumber of pokeArray) {
        data.push(
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`).then(
                response => response.json(),
            ),
        );

        description.push(
            await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${pokeNumber}`,
            ).then(response => response.json()),
        );

        // Adiciona description em Inglês no objeto data
        data[description.length - 1]['description'] = descriptionInEnglish(
            description[description.length - 1].flavor_text_entries,
        );
    }

    const pokemon = data.map(result => ({
        name: result.name,
        id: result.id,
        image: result.sprites['other']['official-artwork']['front_default'],
        types: result.types.map(type => type.type.name),
        type: result.types.map(type => type.type.name).join('&nbsp&nbsp'),
        description: result.description,
    }));

    return pokemon;
}

/**
 * @function insertCardinHTML
 * description: Inject a list of pokemon into a html document
 * @param {object:array} pokemon an array of pokemon objects to insert into the html document
 */
function insertCardinHTML(pokemon) {
    for (const pokecard of pokemon) {
        const html = `
        <li class="card ${pokecard.types[0]}">
            <div class="flip">
                <img class="image" src=${pokecard.image} alt="imagem do ${pokecard.name}">
                <div class="card-text">
                    <h2 class="card-title">${pokecard.id}. ${pokecard.name}</h2>
                    <div class="card-type">
                        <h3>Type</h3>
                        <p class="card-subtitle">${pokecard.type}</p>
                    </div>
                    <h3>Description</h3>
                        <p class="card-subtitle">${pokecard.description}</p>
                </div>
            </div>
        </li>
        `;
        pokedex.insertAdjacentHTML('beforeend', html);
    }
}

/**
 * @function descriptionInEnglish
 * Searches for a description in English language and returns the corresponding string
 * @param {object} description an object with an Array of descriptions strings
 * @returns a string containing the description in English language
 */
function descriptionInEnglish(description) {
    for (const text of description) {
        if (text.language.name === 'en') {
            const flavor_text = text.flavor_text
                .replace('\u000c', ' ')
                .replace('POKéMON', 'POKÉMON');
            return flavor_text;
        }
    }
    return 'Description not found.';
}

// SECONDARY FUNCTIONS
/**
 * @function viewMore
 * Call the function @getPokemons passing an array of pokemon id's. Has an internal interval controlled by the  @page .tag key.
 * @param {array} pokeArray an Array of 20 integer elements representing pokemon id's
 */
function viewMore(pokeArray) {
    if (page.tag === true) return;
    page.tag = true;
    getPokemons(pokeArray()).then(pokemon => insertCardinHTML(pokemon));

    setTimeout(() => {
        page.tag = false;
    }, 2000);
}

/**
 * @function getPokemonbyScroll
 * Starts an EventListener that will call @viewMore when the user scrolls down the page.
 * @param {array} pokeArray an Array of 20 integer elements representing pokemon id's
 */
function getPokemonbyScroll(pokeArray) {
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 350) {
            if (page.tag === true) return;
            viewMore(pokeArray);
        }
    });
}

// MAIN FUNCTION
/**
 * @function main
 * description: Creates and controlls pokearray, starts @getPokemonbyScroll and calls @getPokemons
 */
function main() {
    const pokeArray = () =>
        Array(20)
            .fill()
            .map(() => page.num++);

    getPokemonbyScroll(pokeArray);
    getPokemons(pokeArray()).then(pokemon => insertCardinHTML(pokemon));
}
main();
