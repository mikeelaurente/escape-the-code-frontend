export default function circleTextSpin() {
  const circleText = document.querySelector(".circle-spinner-button .text");
  if (circleText) {
    circleText.innerHTML = circleText.innerText
      .split("")
      .map(
        (char, i) =>
          `<span style="transform:rotate(${i * 6}deg)">${char}</span>`
      )
      .join("");
  }
}
