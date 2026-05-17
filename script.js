const siteConfig = {
  whatsappNumber: "5521968940932",
  whatsappMessage: "Olá, vim através do seu site e gostaria de saber mais sobre seus serviços.",
  instagramUrl: "https://www.instagram.com/marliafisioterapeuta",
  coverageText: "Atendimento domiciliar. A região e a disponibilidade são confirmadas no primeiro contato.",
};

function buildWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function applyContactLinks() {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage);
  const whatsappLinks = document.querySelectorAll("[data-wa-link]");
  const instagramLinks = document.querySelectorAll("[data-instagram-link]");
  const instagramItems = document.querySelectorAll("[data-instagram-item]");
  const coverageTargets = document.querySelectorAll("[data-coverage-text]");

  whatsappLinks.forEach((link) => {
    link.setAttribute("href", whatsappUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  instagramLinks.forEach((link) => {
    if (siteConfig.instagramUrl) {
      link.setAttribute("href", siteConfig.instagramUrl);
      link.hidden = false;
      return;
    }

    link.hidden = true;
  });

  instagramItems.forEach((item) => {
    item.hidden = !siteConfig.instagramUrl;
  });

  coverageTargets.forEach((item) => {
    item.textContent = siteConfig.coverageText;
  });
}

function applyCurrentYear() {
  const yearTarget = document.getElementById("current-year");

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

function setupStickyNav() {
  const nav = document.querySelector(".nav");

  if (!nav) {
    return;
  }

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 220)}ms`;
    observer.observe(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyContactLinks();
  applyCurrentYear();
  setupStickyNav();
  setupRevealAnimations();
});
