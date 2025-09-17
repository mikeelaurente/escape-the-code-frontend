import TomSelect from "tom-select";

export function TomSelectCustom() {
  document.querySelectorAll(".select").forEach((el) => {
    new TomSelect(el, {
      create: false, // Disable creating new options
      maxItems: 1, // Single select
      placeholder: "Select an option",
      render: {
        option: (data, escape) =>
          `<div class="custom-icon">${escape(data.text)}</div>`, // Adds icon to each option
      },
    });
  });
}
