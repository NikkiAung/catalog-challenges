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
let filteredAttractions = [...attractions]; //spreading/copying since we want to preserve the original data

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  const titleContainer = document.querySelector(".title-container");
  cardContainer.innerHTML = "";

  // error handling if no data found
  if (filteredAttractions.length === 0) {
    // hide the title container since it's not needed when no data found
    titleContainer.style.display = "none";

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

  const templateCard = document.querySelector(".card");

  for (let place of filteredAttractions) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, place); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function restoreData() {
  filteredAttractions = [...attractions];
  showCards();
  alert("Original data has been restored!");
}

function editCardContent(card, place) {
  card.style.display = "block";
  // Update card content with attraction data
  card.querySelector("img").src = place.image;
  card.querySelector(".location").textContent = `📍 ${place.location}`;
  card.querySelector(".title").textContent = place.name;
  card.querySelector(".category-tag").textContent = place.category;
  card.querySelector(".description").textContent = place.description;

  // Update stats
  const stats = card.querySelectorAll(".stat-value");
  stats[0].textContent = `${(place.visitors / 1000).toFixed(0)}k`;
  stats[1].textContent = place.rating;

  // Update comments
  const commentContainer = card.querySelector(".comments");
  commentContainer.innerHTML =
    '<p style="margin-bottom: 5px">What tourists say :</p>';

  if (place.comments.length === 0) {
    const noCommentDiv = document.createElement("div");
    noCommentDiv.className = "comment";
    noCommentDiv.textContent = "No comments yet.";
    commentContainer.appendChild(noCommentDiv);
  } else {
    place.comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.textContent = `"${comment}"`;
      commentContainer.appendChild(commentDiv);
    });
  }

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", place.name, "- html: ", card);
}

function quizzAlert() {
  const userAnswer = prompt(
    "Which city is my hometown? 🤔\nHint: It starts with 'M' and is in Mon State."
  );

  if (!userAnswer) {
    alert("You didn't enter anything! Try again later.");
    return;
  }

  if (userAnswer.trim().toLowerCase() === "mawlamyine") {
    alert("🎉 Correct! Yes, Mawlamyine is my hometown. Thanks for guessing!");
  } else {
    alert("❌ Nope! Try again - it's in Mon State and starts with an 'M' 😉");
  }
}

function removeLastCard() {
  filteredAttractions.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

function searchAttractions(searchType) {
  // toLowerCase is **important** to ensure case-insensitive search
  // console.log(searchType); // debugging
  const query = document.getElementById("search-input").value.toLowerCase();
  // console.log(query); // debugging
  let searchResults;
  if (searchType === "location") {
    searchResults = attractions.filter((place) =>
      place.name.toLowerCase().includes(query)
    );
  } else if (searchType === "state") {
    searchResults = filteredAttractions.filter((place) =>
      place.location.toLowerCase().includes(query)
    );
  }

  // error handling if no results found

  if (searchResults.length === 0) {
    alert(`No places found for "${query}". Showing all places instead.`);
    filteredAttractions = [...attractions]; // Reset to show all places
  } else {
    filteredAttractions = searchResults;
  }

  showCards();
  document.getElementById("search-input").value = ""; // Clear search input after search button is clicked for UI/UX improvement
}

function AddNewPlace() {
  const modal = document.getElementById("addPlaceModal");
  modal.style.display = "block";
}

function formHandler() {
  const modal = document.getElementById("addPlaceModal");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("addPlaceForm");

  span.onclick = function () {
    // console.log("Close button clicked"); //debugging
    modal.style.display = "none";
  };

  // This is when the user clicks anywhere outside of the modal, close it :)
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  form.onsubmit = function (e) {
    // prevent the data loss when the form is submitted due to default refresh
    e.preventDefault();

    const newPlace = {
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      visitors: parseInt(document.getElementById("visitors").value),
      rating: parseFloat(document.getElementById("rating").value),
      comments: document.getElementById("comments").value
        ? document.getElementById("comments").value.split("\n")
        : [],
    };

    filteredAttractions.push(newPlace);
    showCards();
    modal.style.display = "none";
    form.reset();
  };
}

function filterByCategory(category) {
  if (!category) {
    filteredAttractions = [...attractions];
  } else {
    filteredAttractions = attractions.filter(
      (place) => place.category === category // note to use === instead of == for both type and value checking
    );
  }
  // need to showCards() again since we are not in react :), can use useEffect() in react
  showCards();
}

function sortByRating(option) {
  // use sort() method to sort the array, with the manipulation of sign - & + for ascending & descending order
  switch (option) {
    case "AAV": // Asc Annual Visitors
      filteredAttractions.sort((a, b) => a.visitors - b.visitors);
      break;
    case "DAV": // Dsc Annual Visitors
      filteredAttractions.sort((a, b) => b.visitors - a.visitors);
      break;
    case "ARR": // Asc Rating Review
      filteredAttractions.sort((a, b) => a.rating - b.rating);
      break;
    case "DRR": // Dsc Rating Review
      filteredAttractions.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // no option selected -> restore original order
      filteredAttractions = [...attractions];
      break;
  }
  showCards();
}

function deletePlace(button) {
  // the power of **this** reference to the button is that we can use it to find the card that contains the place name
  const card = button.closest(".card");
  const placeName = card.querySelector(".title").textContent;

  // alert the user before deleting the place
  const confirmDelete = confirm(
    `Are you sure you want to delete ${placeName}?`
  );

  // Manipulating unique index to remove its place from the array
  if (confirmDelete) {
    const index = filteredAttractions.findIndex(
      (place) => place.name === placeName
    );
    if (index > -1) {
      filteredAttractions.splice(index, 1);
      showCards();
    }
  }
  // can use filter() method too
  // filteredAttractions = filteredAttractions.filter(
  //   (place) => place.name !== placeName
  // ); // since filter return new array. :)
  // and dun forget to showCards(); again since we are not in react :)

  // Will go wth index since its Space Complexity	is O(1), and it's in-place mutation, so no new array created like filter.
}

function updatePlace(button) {
  const card = button.closest(".card");
  const placeName = card.querySelector(".title").textContent;
  const place = filteredAttractions.find((p) => p.name === placeName);

  // Populate the modal with existing data
  const modal = document.getElementById("addPlaceModal");
  document.getElementById("name").value = place.name;
  document.getElementById("image").value = place.image;
  document.getElementById("location").value = place.location;
  document.getElementById("description").value = place.description;
  document.getElementById("category").value = place.category;
  document.getElementById("visitors").value = place.visitors;
  document.getElementById("rating").value = place.rating;
  document.getElementById("comments").value = place.comments.join("\n");

  // Update form handler for editing
  const form = document.getElementById("addPlaceForm");
  form.onsubmit = function (e) {
    e.preventDefault();

    // Update the place object
    const updatedPlace = {
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      visitors: parseInt(document.getElementById("visitors").value),
      rating: parseFloat(document.getElementById("rating").value),
      // the power of ternary operator is here
      comments: document.getElementById("comments").value
        ? document.getElementById("comments").value.split("\n")
        : [],
    };

    // Find and update the place in filteredAttractions
    const index = filteredAttractions.findIndex((p) => p.name === place.name);
    if (index > -1) {
      filteredAttractions[index] = updatedPlace;
    }

    showCards();
    modal.style.display = "none";
    form.reset();
  };
  // need to bock/display as soon as submit is hit
  modal.style.display = "block";
}

function clearForm() {
  const form = document.getElementById("addPlaceForm");
  form.reset();
}
// This calls the addCards(), formHandler() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  showCards(), formHandler();
});

window.quizzAlert = quizzAlert;
window.removeLastCard = removeLastCard;
window.searchAttractions = searchAttractions;
window.AddNewPlace = AddNewPlace;
window.filterByCategory = filterByCategory;
window.sortByRating = sortByRating;
window.updatePlace = updatePlace;
window.deletePlace = deletePlace;
window.clearForm = clearForm;
window.restoreData = restoreData;
