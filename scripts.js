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
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let place of filteredAttractions) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, place); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
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

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  filteredAttractions.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

function searchAttractions() {
  // toLowerCase is **important** to ensure case-insensitive search
  const query = document.getElementById("search-input").value.toLowerCase();
  filteredAttractions = attractions.filter((place) =>
    place.name.toLowerCase().includes(query)
  );
  showCards();
  query.innerHTML = ""; // Clear search input after search button is clicked
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

// This calls the addCards(), formHandler() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  showCards(), formHandler();
});

window.quoteAlert = quoteAlert;
window.removeLastCard = removeLastCard;
window.searchAttractions = searchAttractions;
window.AddNewPlace = AddNewPlace;
