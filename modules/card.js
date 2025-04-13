import {
  filteredAttractions,
  showCards,
  updateFilteredAttractions,
} from "../scripts.js";

// note that filter method isn't used, maintaining O(1) space complexity.

export function editCardContent(card, place) {
  // desctructuring to make code more readable
  const {
    name,
    image,
    location,
    description,
    category,
    visitors,
    rating,
    comments,
  } = place;

  card.querySelector(".title").textContent = name;

  card.style.display = "block";
  // Update card content with attraction data
  card.querySelector("img").src = image;
  card.querySelector(".location").textContent = `📍 ${location}`;
  card.querySelector(".title").textContent = name;
  card.querySelector(".category-tag").textContent = category;
  card.querySelector(".description").textContent = description;

  // Update stats
  const stats = card.querySelectorAll(".stat-value");
  stats[0].textContent = `${(visitors / 1000).toFixed(0)}k`;
  stats[1].textContent = rating;

  // Update comments
  const commentContainer = card.querySelector(".comments");
  commentContainer.innerHTML =
    '<p style="margin-bottom: 5px">What tourists say :</p>';

  if (comments.length === 0) {
    const noCommentDiv = document.createElement("div");
    noCommentDiv.className = "comment";
    noCommentDiv.textContent = "No comments yet.";
    commentContainer.appendChild(noCommentDiv);
  } else {
    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.textContent = `"${comment}"`;
      commentContainer.appendChild(commentDiv);
    });
  }

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", name, "- html: ", card);
}

export function deletePlace(button) {
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
      filteredAttractions.splice(index, 1); // need to check here
      updateFilteredAttractions(filteredAttractions, true);
    }
    showCards();
  }
  // can use filter() method too
  // filteredAttractions = filteredAttractions.filter(
  //   (place) => place.name !== placeName
  // ); // since filter return new array. :)
  // and dun forget to showCards(); again since we are not in react :)

  // Will go wth index since its Space Complexity	is O(1), and it's in-place mutation, so no new array created like filter.
}

export function updatePlace(button) {
  const card = button.closest(".card");
  const placeName = card.querySelector(".title").textContent;
  const {
    name,
    image,
    location,
    description,
    category,
    visitors,
    rating,
    comments,
  } = filteredAttractions.find((p) => p.name === placeName);

  // Populate the modal with existing data
  const modal = document.getElementById("addPlaceModal");
  modal.querySelector("h2").textContent = "Update Place";

  document.getElementById("name").value = name;
  document.getElementById("image").value = image;
  document.getElementById("location").value = location;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;
  document.getElementById("visitors").value = visitors;
  document.getElementById("rating").value = rating;
  document.getElementById("comments").value = comments.join("\n");

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
    const index = filteredAttractions.findIndex((p) => p.name === name);
    if (index > -1) {
      filteredAttractions[index] = updatedPlace;
      updateFilteredAttractions(filteredAttractions, true);
    }
    showCards();
    modal.style.display = "none";
    form.reset();
  };
  // need to bock/display only after hitting btn, then the data is filled/loaded.
  modal.style.display = "block";
}
