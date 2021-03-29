/** COLOR PALETTE */
// BLUE : #30A9DE
// RED : #E53A40
// BLACK : #090707
// GRAY : #808080
// WHITE : #FFFFFF

// Force scroll to top on refresh for a better animation experience.
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

const OLDEST = 1980;
const OLD = 1990;
const NEWER = 2000;
const NEWEST = 2010;
const CURRENT = 2021;

window.onload = () => {
    // Add event listeners for filter
    const addEventListenersToFilter = [OLDEST, OLD, NEWER, NEWEST];
    addEventListenersToFilter.map((date) => {
        const element = document.getElementById(`${date}`);
        if(element) {
            element.addEventListener("click", () => {
                filterGames();
            });
        }
    });

    // Add event listeners for the 'Add to cart' functionality.
    const addEventListenersToAddToCartBtn = new Array(20).fill(0);
    addEventListenersToAddToCartBtn.map((_, index) => {
        const element = document.getElementById(`game${index}`);
        if(element) {
            element.addEventListener("click", () => {
                addToCart(`game${index}`);
            });
        }
    });

    // Add event listener for the 'Add to cart' functionality on game details.
    const elementId = 'game';
    const element = document.getElementById(elementId);
    if(element) {
        element.addEventListener("click", () => {
                addToCart(elementId)
        })
    }
};

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

const updateCartNumber = () => {
    const cartCount = document.getElementById('count');
    const count = cartCount.dataset.count;
    // Convert count to int so we can add 1 to it.
    const countInt = parseInt(count);

    // Show count on site
    cartCount.innerHTML = count;

    // Update data count
    cartCount.dataset.count = `${countInt + 1}`;
}

const notifyUserItemSuccessfullyAdded = (id) => {
    // Change text in btn to success message and back to initial state.
    const gameElement = document.getElementById(id);
    gameElement.innerHTML = "Successfully added to cart";
    setTimeout(() => {
        gameElement.innerHTML = "Add to cart";
    }, 4000);
}

const removePricetag = (id) => {
    // Remove price tag temp of the corresponding item
    // to make room for the expanded button.
    const priceTagElements = document.getElementsByClassName('priceTag');

    // Extract number id from string id
    let arrayOfStringId = id.match(/\d/g);
    arrayOfStringId = arrayOfStringId.join("");
    const intId = parseInt(arrayOfStringId);

    if(priceTagElements?.length > 0) {
        for (let i = 0; i < priceTagElements.length; i++) {
            priceTagElements[intId].style.display = "none";
        }
    }

    setTimeout(() => {
        if(priceTagElements?.length > 0) {
            for (let i = 0; i < priceTagElements.length; i++) {
                priceTagElements[intId].style.display = "";
            }
        }
    }, 4000);
}

const addToCart = (id) => {
    updateCartNumber();
    notifyUserItemSuccessfullyAdded(id);

    const onGameDetailsPage = id === 'game';
    if(!onGameDetailsPage) {
        removePricetag(id);
    }
}

const removeFromCart = (id) => {
    const cartGame = document.getElementById(id);
    cartGame.style.display = "none";
}

const pay = () => {
    // Clean cart, because the user has payed.
    const cartGame0 = document.getElementById('cartGame0');
    const cartGame1 = document.getElementById('cartGame1');
    cartGame0.style.display = "none";
    cartGame1.style.display = "none";

    // Show fancy payment message
    const payedTitle = document.getElementById('payedTitle');
    const payedSubtitle = document.getElementById('payedSubtitle');
    payedTitle.style.display = "block";
    payedSubtitle.style.display = "block";
    payedTitle.style.animation = "fadeInOutTitle 3s ease infinite";
    payedSubtitle.style.animation = "fadeInOutSubtitle 3s ease infinite";

    const totalItemsTitle = document.getElementById('totalItems')
    totalItemsTitle.style.display = "none";

    const payBtn = document.getElementById('payBtn');
    payBtn.style.display = "none";
}
