/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// submission with more data from data.js, using dict to store data
import { attractions } from "./data.js";
import * as navbar from "./js/navbar.js"; // searchAttractions | filterByCategory | sortByRating
import * as card from "./js/card.js"; // editCardContent | deletePlace | updatePlace
import * as modal from "./js/modal.js"; // AddNewPlace | formHandler | clearForm
import * as footer from "./js/footer.js"; // quizzAlert | removeLastCard

export let filteredAttractions = [...attractions]; //spreading/copying since we want to preserve the original data

// centre funtion to update the filterAttractions array
export function updateFilteredAttractions(newAttractions) {
  filteredAttractions = newAttractions;
}

function errorHandlerShowCards(cardContainer, titleContainer) {
  // show the title only if there are cards to display using ternary operator
  titleContainer.style.display =
    filteredAttractions.length === 0 ? "none" : "block";

  // error handling if no data found
  if (filteredAttractions.length === 0) {
    const noDataMessage = document.createElement("div");
    noDataMessage.style.cssText = `
      text-align: center;
      padding: 50px;
      color: #666;
      font-family: 'Roboto', sans-serif;
      font-size: 1.2rem;
    `;
    noDataMessage.innerHTML = `
      <h2 style="margin-bottom: 20px;">No Places Available</h2>
      <img style="width: 200px; height: auto; margin: 0 auto;"
      src="https://sdk.bitmoji.com/render/panel/49e0bea0-86e7-4e11-9929-72128d76c4a8-dd24bd1d-c2de-480e-9afa-d267efdf5017-v1.png?transparent=1&palette=1"
      alt="snap-notfound-sticker"
      />
      <p>All places have been deleted. Click the button below to restore the original data.</p>
      <button class="button" onclick="restoreData()" style="margin-top: 20px;">Restore Original Data</button>
    `;
    cardContainer.appendChild(noDataMessage);
    return;
  }
}

// This function adds cards the page to display the data in the array
export function showCards() {
  const cardContainer = document.getElementById("card-container");
  const titleContainer = document.querySelector(".title-container");
  cardContainer.innerHTML = "";

  // show error message if main DOM elements are not found
  if (!cardContainer || !titleContainer) {
    console.error("Required DOM elements not found");
    return;
  }

  errorHandlerShowCards(cardContainer, titleContainer);

  const templateCard = document.querySelector(".card");

  for (let place of filteredAttractions) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, place); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function restoreData() {
  updateFilteredAttractions([...attractions]);
  showCards();
  alert("Original data has been restored!");
}

// **window code**
// window.searchAttractions = searchAttractions;
// window.filterByCategory = filterByCategory;
// window.sortByRating = sortByRating;
// window.AddNewPlace = AddNewPlace;
// window.formHandler = formHandler;
// window.clearForm = clearForm;
// window.quizzAlert = quizzAlert;
// window.removeLastCard = removeLastCard;
// window.deletePlace = deletePlace;
// window.updatePlace = updatePlace;
// window.restoreData = restoreData;

// Assign functions to window object, cleaner code, reference to above window code
Object.assign(window, {
  ...navbar,
  ...card,
  ...modal,
  ...footer,
  restoreData,
});

// This calls the addCards(), formHandler() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    showCards();
    modal.formHandler();
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
