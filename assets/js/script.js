/* ---------------- GLOBAL VARIABLES ------------------------- */

/*  ---------------- FUNCTIONS ------------------------------ */

/* ------------------------- MAIN FUNCTION ---------------------------*/

/**
 * @function initializePokedex
 * description: Creates an Array with the id of the first 150 pokemon. Increment page.num for each new pokemon.
 * @returns {Array} An array with the id of the first 150
 */
async function initializePokedex() {
    const classical = [
        await getPokemons(pokeArray()).then(data => createObjectPokemon(data)),
        await getPokemons(pokeArray()).then(data => createObjectPokemon(data)),
        await getPokemons(pokeArray()).then(data => createObjectPokemon(data)),
    ];

    classical.forEach((value, i) => {
        insertCardinHTML(value);
    });
}

/**
 * @function main
 * description: Call @getPokemons , initialize  @scrollEventListener , hide footer and header after 5 seconds.
 */
function main() {
    initializePokedex();

    setTimeout(() => {
        hidden.forEach(element => element.classList.toggle('hide'));
        vmbutton.style.display = 'block';
        scrollEventListener(scroll);
    }, 5000);
}
main();
