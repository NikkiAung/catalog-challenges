import { filteredAttractions, showCards } from "../scripts.js";

export function quizzAlert() {
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

export function removeLastCard() {
  filteredAttractions.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}
