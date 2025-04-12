import { attractions } from "../data.js";
import {
  updateFilteredAttractions,
  filteredAttractions,
  showCards,
} from "../scripts.js";

export function searchAttractions(searchType) {
  // toLowerCase & trim are **important** to ensure case-insensitive search & remove leading/trailing spaces
  // console.log(searchType); // debugging
  let query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
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
    updateFilteredAttractions([...attractions]); // Reset to show all places
  } else {
    updateFilteredAttractions(searchResults);
  }

  showCards();
  document.getElementById("search-input").value = ""; // Clear search input after search button is clicked for UI/UX improvement
}

export function filterByCategory(category) {
  if (!category) {
    updateFilteredAttractions([...attractions]);
  } else {
    const filtered = attractions.filter(
      (place) => place.category === category // note to use === instead of == for both type and value checking
    );
    updateFilteredAttractions(filtered);
  }
  // need to showCards() again since we are not in react :), can use useEffect() in react
  showCards();
}

export function sortByRating(option) {
  let sorted = [...filteredAttractions];
  // use sort() method to sort the array, with the manipulation of sign - & + for ascending & descending order
  switch (option) {
    case "AAV": // Asc Annual Visitors
      sorted.sort((a, b) => a.visitors - b.visitors);
      break;
    case "DAV": // Dsc Annual Visitors
      sorted.sort((a, b) => b.visitors - a.visitors);
      break;
    case "ARR": // Asc Rating Review
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case "DRR": // Dsc Rating Review
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // no option selected -> restore original order
      sorted = [...attractions];
      break;
  }
  updateFilteredAttractions(sorted);
  showCards();
}
