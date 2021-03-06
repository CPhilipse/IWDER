const PIZZA = 'pizza';
const PASTA = 'pasta';
const SANDWICH = 'sandwich';

// Filter dishes based on checked categories.
const filterDishes = () => {
    const elements = document.querySelectorAll("article > article");
    const hearts = document.querySelectorAll("article > article > .hartje");
    console.log(hearts);
    const checkedPizzas = document.getElementById("pizza").checked;
    const checkedPasta = document.getElementById("pasta").checked;
    const checkedSandwiches = document.getElementById("sandwiches").checked;
    const uncheckedAll = !checkedPizzas && !checkedPasta && !checkedSandwiches;

    const checkedFavourites = document.getElementById("favourites").checked;

    for (let i = 0; i < elements.length; i++) {
        const article = document.getElementById(`card${i}`);
        // pizza | pasta | sandwich - data category
        const elementCategory = article.dataset.category;

        // abstract this in its own function. - favourites.
        const heart = document.getElementById(`hartje${i}`);
        const topRightCircle = document.getElementsByClassName('topRightCircle')
        const topLeftCircle = document.getElementsByClassName('topLeftCircle')
        // const elementHeart = heart.dataset.hartje;
        console.log(">>> H", topRightCircle);
        if (checkedFavourites) {
            heart.style.backgroundColor = "red";
            topRightCircle[0].style.backgroundColor = "red";
        }





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
