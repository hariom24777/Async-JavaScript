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
    results.innerHTML = `<span style="color: red;">Please enter a valid numeric height (e.g., 175).</span>`;
    return;
  }

  if (!isValidNumber(weightInput)) {
    results.innerHTML = `<span style="color: red;">Please enter a valid numeric weight (e.g., 70.5).</span>`;
    return;
  }

  const height = parseFloat(heightInput);
  const weight = parseFloat(weightInput);

  // Range validation
  if (height <= 0 || height > 300) {
    results.innerHTML = `<span style="color: red;">Height must be between 0 and 300 cm.</span>`;
  } else if (weight <= 0 || weight > 500) {
    results.innerHTML = `<span style="color: red;">Weight must be between 0 and 500 kg.</span>`;
  } else {
    const bmi = weight / (height / 100) ** 2;
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    results.innerHTML = `
      <strong>Your BMI is ${bmi.toFixed(2)}</strong><br>
      <span style="color: #444;">Category: ${category}</span>
    `;
  }
});
