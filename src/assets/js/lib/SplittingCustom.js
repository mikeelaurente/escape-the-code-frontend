import Splitting from "splitting";

export function SplittingCustom() {
  document.querySelectorAll(".text-split-words").forEach((el) => {
    Splitting({ target: el, by: "words" });
  });
}
