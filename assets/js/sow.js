document.addEventListener("DOMContentLoaded", function () {
  // ---------- CORRECCIÓN DE RUTAS EN GITHUB PAGES ----------
  if (window.location.hostname.includes("github.io")) {
    const links = document.querySelectorAll(
      'link[rel="stylesheet"], script[src], img[src]'
    );
    links.forEach((el) => {
      const attr = el.tagName === "LINK" ? "href" : "src";
      const value = el.getAttribute(attr);
      if (value && value.startsWith("../")) {
        el.setAttribute(attr, value.replace("../", "/DISENO_WEB/"));
      }
    });
  }

  // ---------- SECCIONES ----------
  const sections = document.querySelectorAll(".stack-section");

  // Activamos la primera sección
  if (sections.length > 0) {
    sections[0].classList.add("active");
    sections[0].style.zIndex = 10;
  }

  // ---------- SCROLL ENTRE SECCIONES CON INTERSECTIONOBSERVER ----------
  sections.forEach((section, index) => {
    const nextSection = sections[index + 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            nextSection &&
            !nextSection.classList.contains("active")
          ) {
            nextSection.classList.add("active");
            nextSection.style.zIndex = parseInt(section.style.zIndex || 10) + 1;
          }
        });
      },
      {
        root: null, // observa el scroll de la ventana
        threshold: 0.98, // cuando el 98% de la sección actual es visible
      }
    );

    observer.observe(section);
  });
});

// ----------MENÚ RESPONSIVE----------
// moved out of the forEach and with null checks
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const icon = burger ? burger.querySelector("i") : null;

  if (!burger || !menu) return;
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
    once: true,
  });

  // refresh AOS when scrolling inside custom scroll containers so AOS re-evaluates positions
  const sectionsContent = document.querySelectorAll(".section-content");
  let aosRefreshTimer;
  sectionsContent.forEach((c) => {
    c.addEventListener("scroll", () => {
      clearTimeout(aosRefreshTimer);
      aosRefreshTimer = setTimeout(() => {
        AOS.refresh();
      }, 120);
    });
  });

  // Enable AOS animations within scrollable containers
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
      const root = getScrollParent(el) || document;
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
