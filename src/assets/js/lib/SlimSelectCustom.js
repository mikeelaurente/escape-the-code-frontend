import SlimSelect from "slim-select";

export function SlimSelectCustom() {
  document.querySelectorAll(".select").forEach((el) => {
    new SlimSelect({
      select: el,
      settings: {
        showSearch: false,
      },
    });
  });

  document.querySelectorAll(".select-search").forEach((el) => {
    new SlimSelect({
      select: el,
      settings: {
        showSearch: true,
      },
    });
  });
}
