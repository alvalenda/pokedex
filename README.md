# Pokédex
[Deploy in github-pages](https://alvalenda.github.io/pokedex/)

## Functions

`pokeArray`: Creates an array of integers representing pokemon id's. Auto increment array values.

`getPokemons`: Access pokemon API (pokeapi.co) to get the pokemon raw data.
 * @param {array} `pokeArray` an Array of integer elements  representing pokemon id's
 * @returns {promise} A promise wrapping the array of pokemon objects.

`createObjectPokemon`: Transform the raw data into pokemon object.
 * @param {array} `data` Object containing pokemon raw data.
 * @returns {promise} A Promise wrapping a pokemon selected data object.

`insertCardinHTML`: Inject a list of pokemon into a html document.
 * @param {array} `pokemon` an array of pokemon objects to insert into the html document.

`descriptionInEnglish`: Searches for a description in English language and returns the corresponding string.
 * @param {object} `description` An object with an Array of descriptions strings.
 * @returns {promise} a string containing the description in English language.

`selectedPokemon`: Get a Pokemon data and call the @displayModal function.
 * @param {number} `id` The corresponding id of a Pokemon.

`displayModal`: Creates a more descritive object from a selected Pokemon and insert the data into the html.
 * @param {object} `data` An object containing a single Pokemon data.

`closeModal`: Removes modal element from the html document.

`viewMore`: Call the function @getPokemons passing an array of pokemon id's. Has an internal interval controlled by the @page.tag.

`getPokemonbyScroll`: Starts an EventListener that will call @viewMore when the user scrolls down the page.

`viewMoreButton`: Get data from more Pokemon and starts the @getPokemonbyScroll event listener.

`scrollEventListener`: If the user scrolls down the page, the event listener will call @hideandShowElement funtion.
 * @param {object} `scroll` Object containing the two keys: 
    * `scroll.scollY` store the position Y of the scroll; 
    * `scroll.tag` store a boolean value that indicates controlls an internal interval.

`hideandShowElement`: Toggle the **CSS** class `.hide` on html document elements selected by `hidden`, toggleing it again after 5 seconds.

`main`: Call @getPokemons , initialize  @scrollEventListener , hide footer and header after 5 seconds.

## Global Variables

`page`: Controlls the number of pokemon created and the internal interval from the API calls. 
 * `page.num`: Acumulates a number representing the pokemon id.
 * `page.tag`: Controls the internal cooldown of @viewMore.

 `scroll`: Controlls the number of pokemon created and the internal interval from the API calls. 
 * `scroll.scrollY`: store the position Y of the scroll.
 * `page.tag`: store a boolean value that controlls an internal cooldown of @scrollEventListener.

`pokedex`: Contains a selected html document element. 

`vmbutton`: Contains a selected html document element.

`hidden`: Contains a selected html document element.

`url`: Contains two url's adressing to the data and description sources.

---

Language: JavaScript  
Technologies: HTML, CSS  
Workload: 20 hours  

---

Flavio Alvarenga 2022  

---

