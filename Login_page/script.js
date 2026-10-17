function flipCard() {
  const card = document.getElementById("authCard");
  card.classList.toggle("flipped");
}

function togglePassword(id, button) {
  const input = document.getElementById(id);
  const icon = button.querySelector("i");
  const isVisible = input.type === "password";

  input.type = isVisible ? "text" : "password";
  icon.classList.toggle("fa-eye", !isVisible);
  icon.classList.toggle("fa-eye-slash", isVisible);
  button.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
  button.setAttribute("aria-pressed", String(isVisible));
}

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDark ? "light" : "dark";
  const label = `Switch to ${isDark ? "dark" : "light"} mode`;
  themeToggle.setAttribute("aria-label", label);
  themeToggle.setAttribute("title", label);
  themeToggle.querySelector("i").className = `fa-solid fa-${isDark ? "moon" : "sun"}`;
});

const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

function validatePasswordMatch() {
  confirmPassword.setCustomValidity(
    confirmPassword.value && confirmPassword.value !== signupPassword.value
      ? "Passwords do not match."
      : ""
  );
}

signupPassword.addEventListener("input", validatePasswordMatch);
confirmPassword.addEventListener("input", validatePasswordMatch);

