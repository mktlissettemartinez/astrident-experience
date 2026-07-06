const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const servicesGrid = document.querySelector('#servicesGrid');
const faqGrid = document.querySelector('#faqGrid');
const modal = document.querySelector('#serviceModal');
const modalClose = document.querySelector('.modal__close');
const modalImg = document.querySelector('#modalImg');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');
const modalBenefits = document.querySelector('#modalBenefits');

navToggle.addEventListener('click', () => nav.classList.toggle('is-open'));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('is-open')));

servicesGrid.innerHTML = services.map((service, index) => `
  <button class="service-card" data-index="${index}" aria-label="Ver ${service.title}">
    <span class="service-card__icon">${service.icon}</span>
    <strong>${service.title}</strong>
    <small>${service.short}</small>
  </button>
`).join('');

faqGrid.innerHTML = faqs.map(([question, answer]) => `
  <details>
    <summary>${question}</summary>
    <p>${answer}</p>
  </details>
`).join('');

servicesGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.service-card');
  if (!card) return;
  const service = services[Number(card.dataset.index)];
  modalImg.src = service.image;
  modalImg.alt = service.title;
  modalTitle.textContent = service.title;
  modalText.textContent = service.text;
  modalBenefits.innerHTML = service.benefits.map(item => `<li>${item}</li>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
});

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
  document.documentElement.style.setProperty('--my', `${event.clientY}px`);
});
