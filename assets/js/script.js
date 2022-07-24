/**
 * Global Variable
 * page.num: Acumulates a number representing the pokemon id
 * page.tag: Controls the internal cooldown of @viewMore
 * value: true  => @viewMore disabled
 * value: false => @viewMore enabled
 */
const page = { num: 1, tag: false };
const pokedex = document.querySelector('#cards');
const vmbutton = document.querySelector('#viewmore-button');
const url = {
    data: `https://pokeapi.co/api/v2/pokemon/`,
    desc: `https://pokeapi.co/api/v2/pokemon-species/`,
};
// FUNCTION THAT WILL BE CALLED TO INTERACT WITH THE API
/**
 * @function getPokemons
 * description: Access pokemon API (pokeapi.co) to manipulate data and create the pokemon objects
 * @param {array} pokeArray an Array of 20 integer elements representing pokemon id's
 * @returns {Promise} Promise wrapping the array of pokemon objects
 */
async function getPokemons(pokeArray) {
    const [data, description] = [[], []];

    for (const pokeNumber of pokeArray) {
        data.push(
            await fetch(url.data + `${pokeNumber}`).then(response =>
                response.json(),
            ),
        );

        description.push(
            await fetch(url.desc + `${pokeNumber}`).then(response =>
                response.json(),
            ),
        );

        // Adiciona description em Inglês no objeto data
        data[description.length - 1]['description'] = descriptionInEnglish(
            description[description.length - 1].flavor_text_entries,
        );
    }

    return data;
}

function createObjectPokemon(data) {
    const pokemon = data.map(result => ({
        name: result.name,
        id: result.id,
        image: result.sprites['other']['official-artwork']['front_default'],
        types: result.types.map(type => type.type.name),
        type: result.types.map(type => type.type.name).join('&nbsp|&nbsp'),
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
        <li class="card ${pokecard.types[0]}" onclick="selectedPokemon(${pokecard.id})">
            <div>
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
                .replace('Ké', 'kÉ');
            return flavor_text;
        }
    }
    return 'Description not found.';
}

/**
 * @function selectedPokemon
 * description: Get data about the selected Pokemon and call the @displayModal function
 * @param {number} id The corresponding id of the selected Pokemon
 */
async function selectedPokemon(id) {
    const data = await fetch(url.data + `${id}`).then(res => res.json());
    const description = await fetch(url.desc + `${id}`).then(res => res.json());
    data['description'] = descriptionInEnglish(description.flavor_text_entries);
    displayModal(data);
}

/**
 * @function displayModal
 * description: Creates a more descritive object from the selected Pokemon and insert the data into the html
 * @param {object} data object containing all data about a Pokemon
 */
function displayModal(data) {
    const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites['other']['official-artwork']['front_default'],
        types: data.types.map(type => type.type.name),
        type: data.types.map(type => type.type.name).join('&nbsp'),
        height: data.height,
        weight: data.weight,
        description: data.description,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialattack: data.stats[3].base_stat,
        specialdefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
    };

    let htmlTypes = ` `;
    for (const type of pokemon.types) {
        htmlTypes += `
            <p class="modal-type ${type}"> ${type} </p>
        `;
    }

    const html = `
        <div class="modal" onclick="closeModal()">
            <div class="card ${pokemon.types[0]}">
                <div class="modal-container-1">
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <img class="image" src=${pokemon.image} alt="imagem do ${pokemon.name}">
                    <p class="modal-description">${pokemon.description}</p>
                </div>
                <div class="modal-container-2">
                    <div id="div-types">
                        <h3 id="modal-types"> ${htmlTypes} </h3>
                    </div>
                    <div class="modal-stats">
                        <p class="modal-stat">Hit Points <span> ${pokemon.hp} </span> </p>
                        <p class="modal-stat">Height <span> ${pokemon.height} </span> </p>
                        <p class="modal-stat">Weight <span> ${pokemon.weight} </span> </p>
                        <p class="modal-stat">Attack <span> ${pokemon.attack} </span> </p>
                        <p class="modal-stat">Defense <span> ${pokemon.defense} </span> </p>
                        <p class="modal-stat">Special Attack <span> ${pokemon.specialattack} </span> </p>
                        <p class="modal-stat">Special Defense <span> ${pokemon.specialdefense} </span> </p>
                        <p class="modal-stat">Speed <span> ${pokemon.speed} </span> </p>
                    </div>
                </div>
            </div>
        </div> 
    `;

    pokedex.innerHTML = html + pokedex.innerHTML;
}

/**
 * @function closeModal
 * description: Close the modal window remove the code from the html
 */
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.parentElement.removeChild(modal);
}

/**
 * @function viewMore
 * Call the function @getPokemons passing an array of pokemon id's. Has an internal interval controlled by the  @page .tag key.
 * @param {array} pokeArray an Array of 20 integer elements representing pokemon id's
 */
function viewMore() {
    if (page.tag === true) return;
    page.tag = true;
    getPokemons(pokeArray())
        .then(data => createObjectPokemon(data))
        .then(pokemon => insertCardinHTML(pokemon));

    setTimeout(() => {
        page.tag = false;
    }, 2000);
}

/**
 * @function getPokemonbyScroll
 * Starts an EventListener that will call @viewMore when the user scrolls down the page.
 * @param {array} pokeArray an Array of 20 integer elements representing pokemon id's
 */
function getPokemonbyScroll() {
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 300) {
            if (page.tag === true) return;
            viewMore(pokeArray);
        }
    });
}

function viewMoreButton() {
    getPokemons(pokeArray())
        .then(data => createObjectPokemon(data))
        .then(pokemon => insertCardinHTML(pokemon));

    vmbutton.style.display = 'none';

    setTimeout(() => {
        getPokemonbyScroll();
    }, 2000);
}

// FUNCTION pokeArray - create an array of number of pokemon ids
const pokeArray = () =>
    Array(25)
        .fill()
        .map(() => page.num++);

// MAIN FUNCTION
/**
 * @function main
 * description: Creates and controlls pokearray, starts @getPokemonbyScroll and calls @getPokemons
 */
function main() {
    getPokemons(pokeArray())
        .then(data => createObjectPokemon(data))
        .then(pokemon => insertCardinHTML(pokemon));
}
main();
