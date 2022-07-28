const hidden = document.querySelectorAll('.hidden-container');
const scroll = { scrollY: window.scrollY, tag: false };
const input = document.querySelector('#search-input');

/**
 * @function scrollEventListener
 * description: If the user scrolls down the page, the event listener will call @hideandShowElement funtion.
 * @param {object} scroll Object containing the two keys: scroll.scollY store the position Y of the scroll; scroll.tag store a boolean value that indicates controlls an internal interval.
 */
function scrollEventListener(scroll) {
    window.addEventListener('scroll', () => {
        if (scroll.tag === false) {
            scroll.tag = true;

            if (scroll.scrollY != window.scrollY) {
                scroll.scrollY = window.scrollY;
                hideandShowElement();
            }

            setTimeout(() => {
                scroll.tag = false;
            }, 6000);
        }
    });
}

/**
 * @function hideandShowElement
 * description: Toggle the class .hide on footer and header, toggleing it again after 6000 seconds.
 */
function hideandShowElement() {
    hidden.forEach(element => element.classList.toggle('hide'));

    setTimeout(() => {
        hidden.forEach(element => element.classList.toggle('hide'));
    }, 6000);
}

/**
 * @function searchPokemon
 * description: Search for a specific Pokemons in the list and hide the other cards
 */
function searchPokemon() {
    const cards = document.querySelectorAll('.card');
    const userText = input.value.trim().toLowerCase();

    if (userText === '') {
        cards.forEach(card => {
            card.style.display = 'flex';
        });
        page.tag = false;
    } else {
        page.tag = true;
        cards.forEach(card => {
            if (
                card
                    .querySelector('.card-name')
                    .innerText.toLowerCase()
                    .includes(userText) ||
                card
                    .querySelector('.card-type')
                    .innerText.toLowerCase()
                    .includes(userText) ||
                card
                    .querySelector('.card-id')
                    .innerText.toLowerCase()
                    .includes(userText)
            ) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}
