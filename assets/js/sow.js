const sections = document.querySelectorAll(".stack-section");

// Activamos la primera sección
sections[0].classList.add("active");
sections[0].style.zIndex = 10;

// Función para el menú de navegación
function goToSection(index) {
  const section = sections[index];
  const content = section.querySelector(".section-content");

  // Activar la sección y superponer
  section.classList.add("active");
  section.style.zIndex = 10 + index;

  // Reset scroll interno
  content.scrollTop = 0;

  // Scroll de la ventana hasta la sección
  section.scrollIntoView({ behavior: "smooth" });
}

// Manejo de scroll interno y superposición
sections.forEach((section, index) => {
  const content = section.querySelector(".section-content");

  content.addEventListener("scroll", () => {
    const nextSection = sections[index + 1];
    const prevSection = sections[index - 1];

    // Scroll hacia abajo → activar siguiente sección
    if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
      if (nextSection) {
        nextSection.classList.add("active");
        nextSection.style.zIndex = parseInt(section.style.zIndex) + 1;
      }
    }

    // Scroll hacia arriba → permitir ver sección anterior
    if (content.scrollTop === 0) {
      if (prevSection) {
        prevSection.style.zIndex = parseInt(section.style.zIndex) - 1;
      }
    }
  });
});
