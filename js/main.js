const PIZZA = 'pizza';
const PASTA = 'pasta';
const SANDWICH = 'sandwich';

// Filter dishes based on checked categories.
const filterDishes = () => {
    const elements = document.querySelectorAll("article > article");

    const checkedPizzas = document.getElementById("pizza").checked;
    const checkedPasta = document.getElementById("pasta").checked;
    const checkedSandwiches = document.getElementById("sandwiches").checked;
    const uncheckedAll = !checkedPizzas && !checkedPasta && !checkedSandwiches;

    for (let i = 0; i < elements.length; i++) {
        const article = document.getElementById(`card${i}`);
        // pizza | pasta | sandwich - data category
        const elementCategory = article.dataset.category;

        // Remove unchecked category elements
        if (!checkedPizzas || !checkedPasta || !checkedSandwiches) {
            article.style.display = "none";
        }

        if (uncheckedAll) {
            // Show all elements when nothing is checked.
            article.style.display = "";
        } else {
            // If pizza is checked, show pizzas
            if (checkedPizzas) {
                if (elementCategory === PIZZA) {
                    article.style.display = "";
                }
            }

            // If pasta is checked, show pasta
            if (checkedPasta) {
                if (elementCategory === PASTA) {
                    article.style.display = "";
                }
            }

            // If sandwiches is checked, show sandwiches
            if (checkedSandwiches) {
                if (elementCategory === SANDWICH) {
                    article.style.display = "";
                }
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
