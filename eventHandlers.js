import {
  searchAttractions,
  filterByCategory,
  sortByRating,
} from "./modules/navbar.js";
import { deletePlace, updatePlace } from "./modules/card.js";
import { AddNewPlace, clearForm } from "./modules/modal.js";
import { quizzAlert, removeLastCard } from "./modules/footer.js";
import { restoreData } from "./scripts.js";

export function initializeEventListeners() {
  // Search buttons
  document.querySelector(".button-group").addEventListener("click", (e) => {
    if (e.target.dataset.search) {
      searchAttractions(e.target.dataset.search);
    }
  });

  // Category filter
  document.getElementById("categoryFilter").addEventListener("change", (e) => {
    filterByCategory(e.target.value);
  });

  // Rating sort
  document.getElementById("sortByRating").addEventListener("change", (e) => {
    sortByRating(e.target.value);
  });

  // Card actions using event delegation : handling from parent to children
  document.getElementById("card-container")?.addEventListener("click", (e) => {
    const actionButton = e.target.closest("[data-action]");
    if (!actionButton) return;
    // console.log(actionButton.dataset); // for debugging
    const action = actionButton.dataset.action;
    if (action === "delete") deletePlace(actionButton);
    if (action === "update") updatePlace(actionButton);
  });

  // Restore Data button
  document.getElementById("card-container")?.addEventListener("click", (e) => {
    if (e.target.id === "restoreDataBtn") {
      restoreData();
    }
  });

  // Modal buttons
  document
    .getElementById("addNewPlaceBtn")
    .addEventListener("click", AddNewPlace);
  document.getElementById("clearFormBtn").addEventListener("click", clearForm);

  // Footer buttons
  document.getElementById("quizBtn").addEventListener("click", quizzAlert);
  document
    .getElementById("removeCardBtn")
    .addEventListener("click", removeLastCard);
}
