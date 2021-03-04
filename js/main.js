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
        const article = document.querySelector(`#card${i}`);
        // pizza | pasta | sandwich - data category
        // Prevent from showing error with ?, it'll ignore the error if dataset is null.
        const elementCategory = article.dataset.category

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
