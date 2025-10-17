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

  // Reset scroll interno (si existe)
  if (content) content.scrollTop = 0;

  // Scroll de la ventana hasta la sección
  section.scrollIntoView({ behavior: "smooth" });
}

// Manejo de scroll interno y superposición
sections.forEach((section, index) => {
  const content = section.querySelector(".section-content");
  if (!content) return; // <-- guard

  content.addEventListener("scroll", () => {
    const nextSection = sections[index + 1];
    const prevSection = sections[index - 1];

    // Scroll hacia abajo → activar siguiente sección
    if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
      if (nextSection) {
        nextSection.classList.add("active");
        nextSection.style.zIndex = parseInt(section.style.zIndex) + 1 || 11;
      }
    }

    // Scroll hacia arriba → permitir ver sección anterior
    if (content.scrollTop === 0) {
      if (prevSection) {
        prevSection.style.zIndex = parseInt(section.style.zIndex) - 1 || 9;
      }
    }
  });
});

// ----------MENÚ RESPONSIVE----------
// moved out of the forEach and with null checks
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const icon = burger ? burger.querySelector("i") : null;

  if (!burger || !menu) return; // safe exit if markup differs

  burger.addEventListener("click", () => {
    menu.classList.toggle("menu-show");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-show");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  });

  // ---------- AOS: initialize once and refresh on inner scroll ----------
  AOS.init({
    duration: 1000,
    once: true, // change to false if you want repeat animations
  });

  // refresh AOS when scrolling inside custom scroll containers so AOS re-evaluates positions
  const sectionsContent = document.querySelectorAll(".section-content");
  let aosRefreshTimer;
  sectionsContent.forEach((c) => {
    c.addEventListener("scroll", () => {
      clearTimeout(aosRefreshTimer);
      aosRefreshTimer = setTimeout(() => {
        AOS.refresh();
      }, 120); // throttle refresh to avoid heavy calls
    });
  });

  // ---------- IntersectionObserver fallback for elements inside scrollable containers ----------
  (function enableAOSInScrollContainers() {
    const isScrollable = (el) => {
      if (!el || el === document.body) return false;
      const style = getComputedStyle(el);
      return /(auto|scroll)/.test(
        style.overflow + style.overflowY + style.overflowX
      );
    };

    const getScrollParent = (node) => {
      let parent = node.parentElement;
      while (parent) {
        if (isScrollable(parent)) return parent;
        parent = parent.parentElement;
      }
      return null;
    };

    const aosElements = document.querySelectorAll("[data-aos]");
    aosElements.forEach((el) => el.classList.add("aos-init")); // ensure AOS initial class exists

    // Use a WeakMap to reuse observers per scroll container
    const observers = new WeakMap();

    aosElements.forEach((el) => {
      const root = getScrollParent(el) || document; // null => use document (window)
      // If root === document, leave AOS to handle window scrolling
      if (root === document) return;

      if (!observers.has(root)) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
                if (AOS && AOS.options && AOS.options.once) {
                  obs.unobserve(entry.target);
                }
              } else {
                if (!AOS.options.once)
                  entry.target.classList.remove("aos-animate");
              }
            });
          },
          {
            root: root,
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px",
          }
        );
        observers.set(root, obs);
      }

      observers.get(root).observe(el);
    });
  })();
});
