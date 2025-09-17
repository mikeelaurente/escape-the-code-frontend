import flatpickr from "flatpickr";

export function FlatpickrCustom() {
  document.querySelectorAll(".flatpickr").forEach((el) => {
    flatpickr(el, {
      dateFormat: "d-m-Y",
      altInput: true,
    });
  });
}
