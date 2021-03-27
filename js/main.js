const OLDEST = 1980;
const OLD = 1990;
const NEWER = 2000;
const NEWEST = 2010;
const CURRENT = 2021;

// COLOR PALETTE
// BLUE : #30A9DE
// YELLOW : #EFDC05
// RED : #E53A40
// BLACK : #090707
// GRAY : #808080
// WHITE : #FFFFFF

// Filter games based on date.
const filterGames = () => {
    const elements = document.querySelectorAll("main > article > article");

    const oldestIsChecked = document.getElementById("1980").checked;
    const oldIsChecked = document.getElementById("1990").checked;
    const newerIsChecked = document.getElementById("2000").checked;
    const newestIsChecked = document.getElementById("2010").checked;
    const uncheckedAll = !oldestIsChecked && !oldIsChecked && !newerIsChecked && !newestIsChecked;

    for (let i = 0; i < elements.length; i++) {
        const gameElement = document.getElementById(`${i}`);
        const gameDate = gameElement.dataset.releasedate;

        // Remove fade in when filtering.
        gameElement.style.animationName = "none";

        // Remove unchecked category elements
        if (!oldestIsChecked || !oldIsChecked || !newerIsChecked || !newestIsChecked) {
            gameElement.style.display = "none";
        }

        if (uncheckedAll) {
            // Show all elements when nothing is checked.
            gameElement.style.display = "";
        } else {
            if (oldestIsChecked && gameDate >= OLDEST && gameDate <= OLD) {
                gameElement.style.display = "";
            }

            if (oldIsChecked && gameDate >= OLD && gameDate <= NEWER) {
                gameElement.style.display = "";
            }

            if (newerIsChecked && gameDate >= NEWER && gameDate <= NEWEST) {
                gameElement.style.display = "";
            }

            if (newestIsChecked && gameDate >= NEWEST && gameDate <= CURRENT) {
                gameElement.style.display = "";
            }
        }
    }
}

const filterFavourites = () => {
    const elements = document.querySelectorAll("article > article");
    const checkedFavourites = document.getElementById("favourites").checked;

    for (let i = 0; i < elements.length; i++) {
        const article = document.getElementById(`card${i}`);

        const heart = document.getElementById(`hartje${i}`);
        const favouriteStatus = heart.dataset.hartje;

        if (!checkedFavourites) {
            article.style.display = "";
        }

        const isFavourite = favouriteStatus === "isFavourite" && checkedFavourites;
        const isNotFavourite = favouriteStatus === "isNotFavourite" && checkedFavourites;

        // Show the dishes that are favourite and only when favourites is checked.
        if (isFavourite) {
            article.style.display = "";
        }

        // Hide the dishes that are not favourite and only when favourites is checked.
        if (isNotFavourite) {
            article.style.display = "none";
        }
    }
}

const makeFavourite = (id) => {
    const element = document.getElementById(id);
    const favouriteStatus = element.dataset.hartje;

    // getElementsByClassName returns collection
    const topRightCircle = document.getElementsByClassName('topRightCircle');
    const topLeftCircle = document.getElementsByClassName('topLeftCircle');

    // Get last char of id which makes each element unique
    const lastCharOfId = id.slice(-1);

    // If element is favourite, than make it not the favourite. Else make it favourite.
    if(favouriteStatus === 'isFavourite') {
        element.dataset.hartje = 'isNotFavourite';

        element.style.backgroundColor = "antiquewhite";
        topRightCircle[lastCharOfId].style.backgroundColor = "antiquewhite";
        topLeftCircle[lastCharOfId].style.backgroundColor = "antiquewhite";
    } else {
        element.dataset.hartje = 'isFavourite';

        element.style.backgroundColor = "red";
        topRightCircle[lastCharOfId].style.backgroundColor = "red";
        topLeftCircle[lastCharOfId].style.backgroundColor = "red";
    }
}

const addToCart = (id) => {
    const cartCount = document.getElementById('count');
    const count = cartCount.dataset.count;
    // Convert count to int so we can add 1 to it.
    const countInt = parseInt(count);

    // Show count on site
    cartCount.innerHTML = count;

    // Update data count
    cartCount.dataset.count = `${countInt + 1}`;

    // Change text in btn to success message and back to initial state.
    const gameElement = document.getElementById(id);
    gameElement.innerHTML = "Successfully added to cart";

    setTimeout(() => {
        gameElement.innerHTML = "Add to cart";
    }, 4000);
}
