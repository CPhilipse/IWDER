window.onload = () => {}

const PIZZA = 'pizza';
const PASTA = 'pasta';
const SANDWICH = 'sandwich';
const filterDishes = () => {
    const elements = document.querySelectorAll("article");
    const showPizzas = document.getElementById("pizza").checked;
    const showPasta = document.getElementById("pasta").checked;
    const showSandwiches = document.getElementById("sandwiches").checked;
    const uncheckedAll = !showPizzas && !showPasta && !showSandwiches;

    for (let i = 0; i < elements.length; i++) {
        const article = document.querySelector(`#card${i}`);
        const elementCategory = article.dataset.category // pizza | pasta | sandwich

        if (uncheckedAll) {
            article.style.display = "";
        } else {
            if (showPizzas) {
                // Show only the pizza elements
                if (elementCategory === PIZZA) {
                    article.style.display = "";
                } else {
                    article.style.display = "none";
                }
            }

            if (showPasta) {
                // Show only the pasta elements
                if (elementCategory === PASTA) {
                    article.style.display = "";
                } else {
                    article.style.display = "none";
                }
            }

            if (showSandwiches) {
                // Show only the sandwich elements
                if (elementCategory === SANDWICH) {
                    article.style.display = "";
                } else {
                    article.style.display = "none";
                }
            }
        }
    }
}
