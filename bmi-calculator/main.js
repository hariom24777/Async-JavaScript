const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');
const root = document.documentElement;

// Set initial icon based on saved theme
if (localStorage.getItem('theme') === 'dark') {
  root.setAttribute('data-theme', 'dark');
  icon.className = 'ri-sun-line';
} else {
  icon.className = 'ri-moon-line';
}

toggleBtn.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';

  if (isDark) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    icon.className = 'ri-moon-line';
  } else {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    icon.className = 'ri-sun-line';
  }
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const heightInput = document.querySelector("#height").value.trim();
  const weightInput = document.querySelector("#weight").value.trim();
  const results = document.querySelector("#results");

  results.innerHTML = "";

  // Strict number validation (no letters or symbols)
  const isValidNumber = (value) => /^(\d+(\.\d+)?)$/.test(value);

  // Check if inputs are valid numbers
  if (!isValidNumber(heightInput)) {
    results.innerHTML = `<span style="color: var(--error-color);">Please enter a valid numeric height (e.g., 175).</span>`;
    return;
  }

  if (!isValidNumber(weightInput)) {
    results.innerHTML = `<span style="color: var(--error-color);">Please enter a valid numeric weight (e.g., 70.5).</span>`;
    return;
  }

  const height = parseFloat(heightInput);
  const weight = parseFloat(weightInput);

  // Range validation
  if (height <= 0 || height > 300) {
    results.innerHTML = `<span style="color: var(--error-color);">Height must be between 0 and 300 cm.</span>`;
  } else if (weight <= 0 || weight > 500) {
    results.innerHTML = `<span style="color: var(--error-color);">Weight must be between 0 and 500 kg.</span>`;
  } else {
    const bmi = weight / (height / 100) ** 2;
    let category = "";

    if (bmi < 18.6) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 28.9) category = "Overweight";
    else category = "Obese";

    results.innerHTML = `
      <strong>Your BMI is ${bmi.toFixed(2)}</strong><br>
      <span >Category: ${category}</span>
    `;
  }
});
