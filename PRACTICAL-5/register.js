// =========================================
// Practical 5 - Registration form validation
// =========================================

const form = document.querySelector("#register-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const mobileInput = document.querySelector("#mobile");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm-password");
const courseInput = document.querySelector("#course");
const yearInput = document.querySelector("#year");
const termsInput = document.querySelector("#terms");

const strengthBar = document.querySelector("#strength-bar");
const strengthText = document.querySelector("#strength-text");
const successMsg = document.querySelector("#success-msg");

// regex patterns
const namePattern = /^[A-Za-z ]{2,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[6-9]\d{9}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// ---- error message helpers ----
function showError(id, message) {
  const errorEl = document.querySelector("#" + id + "-error");
  errorEl.textContent = message;
}

function clearError(id) {
  showError(id, "");
}

// ---- field validators (each returns true/false) ----
function validateName() {
  if (!namePattern.test(nameInput.value.trim())) {
    showError("name", "Enter a valid name (letters only, 2-50 characters).");
    return false;
  }
  clearError("name");
  return true;
}

function validateEmail() {
  if (!emailPattern.test(emailInput.value.trim())) {
    showError("email", "Enter a valid email address.");
    return false;
  }
  clearError("email");
  return true;
}

function validateMobile() {
  if (!mobilePattern.test(mobileInput.value.trim())) {
    showError("mobile", "Enter a valid 10-digit mobile number.");
    return false;
  }
  clearError("mobile");
  return true;
}

function validatePassword() {
  if (!passwordPattern.test(passwordInput.value)) {
    showError("password", "Password needs 8+ characters with upper, lower, number and symbol.");
    return false;
  }
  clearError("password");
  return true;
}

function validateConfirm() {
  if (confirmInput.value === "" || confirmInput.value !== passwordInput.value) {
    showError("confirm-password", "Passwords do not match.");
    return false;
  }
  clearError("confirm-password");
  return true;
}

function validateCourse() {
  if (courseInput.value === "") {
    showError("course", "Please select a course.");
    return false;
  }
  clearError("course");
  return true;
}

function validateYear() {
  if (yearInput.value === "") {
    showError("year", "Please select a year.");
    return false;
  }
  clearError("year");
  return true;
}

function validateGender() {
  const checked = document.querySelector('input[name="gender"]:checked');
  if (!checked) {
    showError("gender", "Please select a gender.");
    return false;
  }
  clearError("gender");
  return true;
}

function validateTerms() {
  if (!termsInput.checked) {
    showError("terms", "You must accept the terms to continue.");
    return false;
  }
  clearError("terms");
  return true;
}

// ---- password strength meter ----
function checkStrength() {
  const value = passwordInput.value;
  let score = 0;

  if (value.length >= 8) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[\W_]/.test(value)) score++;

  let label = "";
  let color = "";
  let width = "0%";

  if (value === "") {
    label = "";
    width = "0%";
  } else if (score <= 2) {
    label = "Weak";
    color = "#e63946";
    width = "33%";
  } else if (score <= 4) {
    label = "Medium";
    color = "#f4a261";
    width = "66%";
  } else {
    label = "Strong";
    color = "#2a9d8f";
    width = "100%";
  }

  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;
  strengthText.textContent = label;
}

// ---- real-time validation (as the user types/selects) ----
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
mobileInput.addEventListener("input", validateMobile);

passwordInput.addEventListener("input", function () {
  validatePassword();
  checkStrength();
  if (confirmInput.value !== "") {
    validateConfirm();
  }
});

confirmInput.addEventListener("input", validateConfirm);
courseInput.addEventListener("change", validateCourse);
yearInput.addEventListener("change", validateYear);
termsInput.addEventListener("change", validateTerms);

document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
  radio.addEventListener("change", validateGender);
});

// ---- final validation on submit ----
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const results = [
    validateName(),
    validateEmail(),
    validateMobile(),
    validatePassword(),
    validateConfirm(),
    validateCourse(),
    validateYear(),
    validateGender(),
    validateTerms()
  ];

  const allValid = results.every(function (result) {
    return result === true;
  });

  if (allValid) {
    successMsg.textContent = "Registration successful!";
    form.reset();
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
  } else {
    successMsg.textContent = "";
  }
});
