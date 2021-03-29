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

    // Add event listeners for the 'Remove' from cart functionality on the cart page.
    const addEventListenersToRemoveFromCart = ['cartGame0', 'cartGame1'];
    addEventListenersToRemoveFromCart.map((id) => {
        const element = document.getElementById(id);
        if(element) {
            element.addEventListener("click", () => {
                removeFromCart(id);
            });
        }
    });

    // Add event listener to the 'Pay' button on the cart page.
    const payBtnId = 'payBtn';
    const payBtn = document.getElementById(payBtnId);
    if(payBtn) {
        payBtn.addEventListener("click", () => {
            pay()
        });
    }
}

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
    cartGame.dataset.removed = "true";

    const payBtn = document.getElementById('payBtn');
    const cartGame0 = document.getElementById("cartGame0");
    const cartGame1 = document.getElementById("cartGame1");

    const cartGame0IsRemoved = cartGame0.dataset.removed;
    const cartGame1IsRemoved = cartGame1.dataset.removed;

    // If all items are removed, disable the pay button.
    if(cartGame0IsRemoved === "true" && cartGame1IsRemoved === "true") {
        payBtn.innerHTML = "There are no items in your shopping cart";
        payBtn.disabled = true;
        payBtn.style.color = "#808080";
        return;
    }

    // Update the total price.
    if(id === "cartGame0") {
        payBtn.innerHTML = "Pay the total price of €59,99";
    }

    if(id === "cartGame1") {
        payBtn.innerHTML = "Pay the total price of €49,99";
    }
}

const pay = () => {
    // Clear cart, because the user has payed.
    const cartGame0 = document.getElementById('cartGame0');
    const cartGame1 = document.getElementById('cartGame1');
    cartGame0.style.display = "none";
    cartGame1.style.display = "none";

    // Show fancy payment message
    const payedTitle = document.getElementById('payedTitle');
    const payedSubtitle = document.getElementById('payedSubtitle');
    const display = "block";
    const animation = "fadeInOutTitle 3s ease infinite";
    payedTitle.style.display = display;
    payedSubtitle.style.display = display;
    payedTitle.style.animation = animation;
    payedSubtitle.style.animation = animation;

    const totalItemsTitle = document.getElementById('totalItems')
    totalItemsTitle.style.display = "none";

    const payBtn = document.getElementById('payBtn');
    payBtn.style.display = "none";
}
