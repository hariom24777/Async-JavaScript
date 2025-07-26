const toggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Check saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  rootElement.setAttribute('data-theme', savedTheme);
  toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    rootElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '🌙';
  } else {
    rootElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '☀️';
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

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    results.innerHTML = `
      <strong>Your BMI is ${bmi.toFixed(2)}</strong><br>
      <span >Category: ${category}</span>
    `;
  }
});
