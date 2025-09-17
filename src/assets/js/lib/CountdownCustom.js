export function CountdownCustom() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  // Function to initialize countdown for each countdown element
  function initializeCountdown(countdownElement) {
    const targetDateAttr = countdownElement.getAttribute("data-date");
    const targetTimeAttr = countdownElement.getAttribute("data-time");

    if (!targetDateAttr || !targetTimeAttr) {
      console.error("Missing 'data-date' or 'data-time' attribute.");
      return;
    }

    // Parsing the date and time
    const [dayOfMonth, month, year] = targetDateAttr.split("-").map(Number);
    const [time, period] = targetTimeAttr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    // Convert 12-hour time format to 24-hour format
    const finalHours =
      period.toLowerCase() === "pm" && hours !== 12
        ? hours + 12
        : period.toLowerCase() === "am" && hours === 12
        ? 0
        : hours;

    const targetDate = new Date(
      year,
      month - 1,
      dayOfMonth,
      finalHours,
      minutes,
      0
    );

    if (isNaN(targetDate.getTime())) {
      console.error("Invalid date:", targetDateAttr);
      return;
    }

    // Countdown logic
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        countdownElement.querySelector(".days").innerText = "00";
        countdownElement.querySelector(".hours").innerText = "00";
        countdownElement.querySelector(".minutes").innerText = "00";
        countdownElement.querySelector(".seconds").innerText = "00";
        clearInterval(intervalId);
        return;
      }

      // Calculate the time remaining
      const daysLeft = Math.floor(distance / day);
      const hoursLeft = Math.floor((distance % day) / hour);
      const minutesLeft = Math.floor((distance % hour) / minute);
      const secondsLeft = Math.floor((distance % minute) / second);

      // Update the DOM with zero-padding for all time units
      countdownElement.querySelector(".days").innerText = String(
        daysLeft
      ).padStart(2, "0");
      countdownElement.querySelector(".hours").innerText = String(
        hoursLeft
      ).padStart(2, "0");
      countdownElement.querySelector(".minutes").innerText = String(
        minutesLeft
      ).padStart(2, "0");
      countdownElement.querySelector(".seconds").innerText = String(
        secondsLeft
      ).padStart(2, "0");
    };

    // Start the countdown
    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to set values immediately
  }

  // Apply the countdown to each element
  document.querySelectorAll(".countdown").forEach(initializeCountdown);
}
