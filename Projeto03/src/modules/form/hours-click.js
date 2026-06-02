export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available");
  hours.forEach((available) => {
    available.addEventListener("click", () => {
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected");
      });

      available.classList.add("hour-selected")
    });
  });
}
