import { filteredAttractions, showCards } from "../scripts.js";

export function AddNewPlace() {
  const modal = document.getElementById("addPlaceModal");
  modal.style.display = "block";
}

export function formHandler() {
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

export function clearForm() {
  const form = document.getElementById("addPlaceForm");
  form.reset();
}
