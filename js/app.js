
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update copyright year
  const currentYear = new Date().getFullYear();

  document.querySelectorAll("#year, .current-year").forEach(element => {
    element.textContent = currentYear;
  });

  // School name
  if (typeof SCHOOL_NAME !== "undefined") {
    document.querySelectorAll("[data-school-name]").forEach(element => {
      element.textContent = SCHOOL_NAME;
    });
  }

  // Mobile navigation
  const menu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menu && navigation) {
    menu.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  }
});
