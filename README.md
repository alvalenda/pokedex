# Pokédex
[Deploy github pages](https://alvalenda.github.io/pokedex/)

## Functions

`pokeArray`: Creates an array of integers representing pokemon id's

`getPokemons`: Access pokemon API (pokeapi.co) to manipulate data and create the pokemon objects.
 * @param {array} `pokeArray` an Array of integer elements  representing pokemon id's
 * @returns {Promise} Promise wrapping the array of pokemon objects

`createObjectPokemon`: Transform the raw data into pokemon object of selected data.
 * @param {array} `data` Object containing pokemon raw data
 * @returns {promise} Promise wrapping a pokemon selected data object

`insertCardinHTML`: Inject a list of pokemon into a html document.
 * @param {array} `pokemon` an array of pokemon objects to insert into the html document

`descriptionInEnglish`: Searches for a description in English language and returns the corresponding string.
 * @param {object} `description` An object with an Array of descriptions strings
 * @returns {promise} a string containing the description in English language

`selectedPokemon`: Get a Pokemon data and call the @displayModal function.
 * @param {number} `id` The corresponding id of a Pokemon

`displayModal`: Creates a more descritive object from a selected Pokemon and insert the data into the html.
 * @param {object} `data` An object containing a single Pokemon data

`closeModal`: Removes modal element from the html document.

`viewMore`: Call the function @getPokemons passing an array of pokemon id's. Has an internal interval controlled by the @page.tag.

`getPokemonbyScroll`: Starts an EventListener that will call @viewMore when the user scrolls down the page.

`viewMoreButton`: Get data from more Pokemon and starts the @getPokemonbyScroll event listener.

`main`: Call @getPokemons initializing the page.

## Global Variables

`page`: Controlls the number of pokemon created and the internal interval from the API calls. 
 * `page.num`: Acumulates a number representing the pokemon id
 * `page.tag`: Controls the internal cooldown of @viewMore

`pokedex`: Contains a selected html document element. 

`vmbutton`: Contains a selected html document element.

`url`: Contains two url's adressing to the data and description sources.

---

Language: JavaScript  
Technologies: HTML, CSS  
Workload: 20 hours  

---

Flavio Alvarenga 2022  

---

