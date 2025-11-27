function flatten(obj, acc, currentKey = '') {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      flatten(obj[key], acc, key);
    } else {
      if (currentKey && currentKey.length > 0) {
        acc[`${currentKey}[${key}]`] = obj[key];
      } else {
        acc[key] = obj[key];
      }
    }
  }
}

export function toSearchParams(obj) {
  const searchParams = new URLSearchParams();
  const acc = {};
  flatten(obj, acc);

  for (const key in acc) {
    searchParams.append(key, acc[key]);
  }

  return searchParams;
}

export function debounce(func, delay) {
  let timeoutId; // Stores the timer ID

  return function (...args) {
    const context = this; // Preserve 'this' context

    clearTimeout(timeoutId); // Clear any existing timer

    timeoutId = setTimeout(() => {
      func.apply(context, args); // Execute the original function after the delay
    }, delay);
  };
}
