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
import { initializeEventListeners } from "./eventHandlers.js";
import { editCardContent } from "./modules/card.js";
import { formHandler } from "./modules/modal.js";

export let allAttractions = JSON.parse(localStorage.getItem("attractions")) || [
  ...attractions,
];

export let filteredAttractions = [...allAttractions]; //spreading/copying since we want to preserve the original data

// centre funtion to update the both arrays
export function updateFilteredAttractions(
  newAttractions,
  isCompleteUpdate = false
) {
  if (isCompleteUpdate) {
    // Update both arrays when adding/removing places
    allAttractions = newAttractions;
    filteredAttractions = [...newAttractions];
    localStorage.setItem("attractions", JSON.stringify(allAttractions));
  } else {
    // Update only filtered view for search/filter/sort operations
    filteredAttractions = newAttractions;
  }
}

function errorHandlerShowCards(cardContainer, titleContainer, category = "") {
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
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 600px; margin: 0 auto;">
        <h2 style="font-size: clamp(1.5rem, 4vw, 2rem) color:black">Oops! No ${category} Places Available...</h2>
        <img style="width: 100%; max-width: 400px;" src="https://cdn.prod.website-files.com/5ff8fc486c14537c168fc87d/6216e7110d373d4d6ce3f052_filecut_397x23%201%20(Traced)%402x.png" alt="snap-decorative-line"/>
      </div>
      <img style="width: 200px; height: auto; margin: 0 auto;"
      src="https://sdk.bitmoji.com/render/panel/49e0bea0-86e7-4e11-9929-72128d76c4a8-dd24bd1d-c2de-480e-9afa-d267efdf5017-v1.png?transparent=1&palette=1"
      alt="snap-notfound-sticker"
      />
      ${
        !category
          ? `<p>All places have been deleted. Click the button below to restore the original data.</p>      <button class="button" id="restoreDataBtn" style="margin-top: 20px;">Restore Original Data</button>`
          : ""
      }
    `;
    cardContainer.appendChild(noDataMessage);
    return;
  }
}

// This function adds cards the page to display the data in the array
export function showCards(category = "") {
  const cardContainer = document.getElementById("card-container");
  const titleContainer = document.querySelector(".title-container");

  // show error message if main DOM elements are not found
  if (!cardContainer || !titleContainer) {
    console.error("Required DOM elements not found");
    return;
  }
  cardContainer.innerHTML = "";
  errorHandlerShowCards(cardContainer, titleContainer, category);

  const templateCard = document.querySelector(".card");

  for (let place of filteredAttractions) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, place); // Edit card with each place values like name, image, location, etc.
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

export function restoreData() {
  updateFilteredAttractions([...attractions], true);
  showCards();
  alert("Original data has been restored!");
}

// This calls the addCards(), formHandler() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeEventListeners();
    showCards();
    formHandler();
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
