document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelectorAll(".current-year");

  year.forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  const menu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menu && navigation) {
    menu.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  }

  document.querySelectorAll("[data-school-name]").forEach(element => {
    element.textContent = SCHOOL_NAME;
  });
});
