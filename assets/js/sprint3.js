const root = document.documentElement;
const body = document.body;

const progress = document.createElement('div');
progress.className = 'progress-line';
document.body.appendChild(progress);

const orb = document.createElement('div');
orb.className = 'cursor-orb';
document.body.appendChild(orb);

const particles = document.createElement('div');
particles.className = 'particle-field';
particles.setAttribute('aria-hidden', 'true');
for (let i = 0; i < 22; i += 1) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.setProperty('--dx', `${Math.random() * 70 - 35}px`);
  particle.style.setProperty('--dy', `${Math.random() * -80 - 18}px`);
  particle.style.setProperty('--duration', `${7 + Math.random() * 7}s`);
  particle.style.animationDelay = `${Math.random() * 4}s`;
  particles.appendChild(particle);
}
document.body.appendChild(particles);

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  root.style.setProperty('--scroll-progress', `${progressValue}%`);
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const pageSections = sectionLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    pageSections.forEach(section => section.classList.remove('section-active'));
    entry.target.classList.add('section-active');
    sectionLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.45 });
pageSections.forEach(section => sectionObserver.observe(section));

function attachTilt(element) {
  element.addEventListener('pointermove', event => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    element.style.setProperty('--rx', `${py * -8}deg`);
    element.style.setProperty('--ry', `${px * 10}deg`);
    element.style.setProperty('--card-x', `${x}px`);
    element.style.setProperty('--card-y', `${y}px`);
    element.classList.add('is-tilting');
  });
  element.addEventListener('pointerleave', () => {
    element.classList.remove('is-tilting');
    element.style.removeProperty('--rx');
    element.style.removeProperty('--ry');
  });
}

document.querySelectorAll('.hero__visual').forEach(attachTilt);

const dynamicTiltObserver = new MutationObserver(() => {
  document.querySelectorAll('.service-card:not([data-tilt])').forEach(card => {
    card.dataset.tilt = 'true';
    attachTilt(card);
  });
});
dynamicTiltObserver.observe(document.body, { childList: true, subtree: true });

document.addEventListener('pointerover', event => {
  if (event.target.closest('a,button,.service-card,summary')) body.classList.add('cursor-expand');
});
document.addEventListener('pointerout', event => {
  if (event.target.closest('a,button,.service-card,summary')) body.classList.remove('cursor-expand');
});
