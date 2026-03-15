// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .skill-group, .contact-item')
  .forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });