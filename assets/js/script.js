/* ---------------- GLOBAL VARIABLES ------------------------- */

/*  ---------------- FUNCTIONS ------------------------------ */

/* ------------------------- MAIN FUNCTION ---------------------------*/

/**
 * @function initializePokedex
 * description: Creates an Array with the id of the first 150 pokemon. Increment page.num for each new pokemon.
 * @returns {Array} An array with the id of the first 150
 */
function initializePokedex() {
    const classical = Array(150)
        .fill()
        .map(() => page.num++);

    return classical;
}

/**
 * @function main
 * description: Call @getPokemons , initialize  @scrollEventListener , hide footer and header after 5 seconds.
 */
function main() {
    getPokemons(initializePokedex())
        .then(data => createObjectPokemon(data))
        .then(pokemon => insertCardinHTML(pokemon));

    setTimeout(() => {
        hidden.forEach(element => element.classList.toggle('hide'));
        vmbutton.style.display = 'block';
        scrollEventListener(scroll);
    }, 5000);
}
main();
